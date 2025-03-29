import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Eye, GitBranch, Search, Star, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  location: string;
  company: string;
  blog: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
}

interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export default function GitHubUserSearch() {
  const [username, setUsername] = useState('abhinandanmishra1');
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchUser = async () => {
    if (!username) return;
    
    setLoading(true);
    setError('');
    setUser(null);
    setRepos([]);
    
    try {
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) {
        throw new Error(`User not found: ${userResponse.statusText}`);
      }
      const userData = await userResponse.json();
      setUser(userData);
      
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
      if (reposResponse.ok) {
        const reposData = await reposResponse.json();
        setRepos(reposData);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  useEffect(() => {
    searchUser();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 pt-6 space-y-6">
      <h1 className="text-3xl font-bold">GitHub User Search</h1>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Enter GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchUser()}
          />
        </div>
        <Button onClick={searchUser} disabled={loading || !username}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>
      
      {error && (
        <Card className="border-red-300 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      )}
      
      {loading ? (
        <UserProfileSkeleton />
      ) : user ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader className="flex flex-col items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar_url} alt={user.login} />
                <AvatarFallback>{user.login.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4 text-center">{user.name || user.login}</CardTitle>
              <CardDescription className="text-center">
                <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  @{user.login}
                </a>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {user.bio && <p>{user.bio}</p>}
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-lg font-semibold">{user.public_repos}</p>
                  <p className="text-sm text-gray-500">Repos</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">{user.followers}</p>
                  <p className="text-sm text-gray-500">Followers</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">{user.following}</p>
                  <p className="text-sm text-gray-500">Following</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {user.company && (
                  <p className="text-sm flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {user.company}
                  </p>
                )}
                {user.location && (
                  <p className="text-sm flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {user.location}
                  </p>
                )}
                {user.blog && (
                  <p className="text-sm flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
                    </svg>
                    <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline truncate">
                      {user.blog}
                    </a>
                  </p>
                )}
                <p className="text-sm flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Joined on {formatDate(user.created_at)}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="md:col-span-2">
            <Tabs defaultValue="repositories">
              <TabsList className="w-full">
                <TabsTrigger value="repositories" className="flex-1">Repositories</TabsTrigger>
                <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="repositories" className="space-y-4 mt-4">
                {repos.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-gray-500">No repositories found</p>
                    </CardContent>
                  </Card>
                ) : (
                  repos.map(repo => (
                    <Card key={repo.id}>
                      <CardHeader>
                        <CardTitle>
                          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            {repo.name}
                          </a>
                        </CardTitle>
                        <CardDescription>{repo.description || 'No description available'}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between items-center">
                        <div className="flex gap-4">
                          <span className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4" />
                            {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1 text-sm">
                            <GitBranch className="h-4 w-4" />
                            {repo.forks_count}
                          </span>
                          <span className="flex items-center gap-1 text-sm">
                            <Eye className="h-4 w-4" />
                            {repo.watchers_count}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {repo.language && (
                            <Badge variant="outline">{repo.language}</Badge>
                          )}
                          <span className="text-xs text-gray-500">
                            Updated {formatDate(repo.updated_at)}
                          </span>
                        </div>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="activity" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Repository Distribution</h3>
                        <div className="h-4 w-full bg-gray-200 rounded-full mt-2">
                          <div 
                            className="h-4 bg-blue-500 rounded-full" 
                            style={{width: '100%'}}
                          />
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span>Public Repos: {user.public_repos}</span>
                          <span>Public Gists: {user.public_gists}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">Social Statistics</h3>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <Card>
                            <CardContent className="pt-6">
                              <div className="text-center">
                                <p className="text-3xl font-bold">{user.followers}</p>
                                <p className="text-sm text-gray-500">Followers</p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="pt-6">
                              <div className="text-center">
                                <p className="text-3xl font-bold">{user.following}</p>
                                <p className="text-sm text-gray-500">Following</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">Account Age</h3>
                        <p className="mt-2">
                          {user.login} has been on GitHub since {formatDate(user.created_at)}
                          ({Math.floor((new Date().getTime() - new Date(user.created_at).getTime()) / 
                            (1000 * 60 * 60 * 24 * 365))} years)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function UserProfileSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader className="flex flex-col items-center">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-6 w-32 mt-4" />
          <Skeleton className="h-4 w-24 mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <Skeleton className="h-6 w-12 mx-auto" />
              <Skeleton className="h-4 w-16 mx-auto mt-1" />
            </div>
            <div>
              <Skeleton className="h-6 w-12 mx-auto" />
              <Skeleton className="h-4 w-16 mx-auto mt-1" />
            </div>
            <div>
              <Skeleton className="h-6 w-12 mx-auto" />
              <Skeleton className="h-4 w-16 mx-auto mt-1" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
      
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
