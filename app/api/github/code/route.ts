import { NextResponse } from 'next/server';

async function fetchGithubFile(path: string) {
  const owner = 'abhinandanmishra1';
  const repo = 'frontend-365';
  const branch = 'main';
  
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3.raw',
      // Add GitHub token if you're hitting rate limits
      // 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  return response.text();
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const month = searchParams.get('month');
    const year = searchParams.get('year');

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    const path = `projects/${year}/${month}/project${projectId}/index.tsx`;
    const code = await fetchGithubFile(path);

    return NextResponse.json({ code });
  } catch (error) {
    console.error('Error fetching code:', error);
    return NextResponse.json(
      { error: 'Failed to fetch code from GitHub' },
      { status: 500 }
    );
  }
} 