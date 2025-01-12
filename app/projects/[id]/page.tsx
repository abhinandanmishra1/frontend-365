"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Copy, Github } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import dynamic from "next/dynamic";
import { getProject } from "@/lib/utils";
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useParams } from "next/navigation";

async function getProjectCode(projectId: number) {
  const response = await fetch(`/api/github/code?projectId=${projectId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch code");
  }
  const data = await response.json();
  return data.code;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const [project, setProject] = useState<any>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      const data = await getProject(params.id as string);
      setProject(data);
      const codeData = await getProjectCode(data.id);
      setCode(codeData);
    };
    loadData();
  }, [params.id]);

  const ProjectComponent = useMemo(() => {
    return dynamic(
      () => import(`@/projects/project${project?.id}`),
      {
        loading: () => <div>Loading...</div>,
        ssr: false,
      }
    );
  }, [project?.id]);

  if (!project) return <div>Loading...</div>;
  
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">{project.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] overflow-y-auto">
            <h3 className="font-semibold mb-2">Features:</h3>
            <ul className="list-disc list-inside mb-4">
              {project.features.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <h3 className="font-semibold mb-2">Technologies Used:</h3>
            <ul className="list-disc list-inside mb-4">
              {project.technologies.map((tech: string, index: number) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>

            <h3 className="font-semibold mb-2">Resources:</h3>
            <ul className="list-disc list-inside">
              {project.resources.map((resource: string, index: number) => (
                <li key={index}>
                  <a href={resource} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
            
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Live Demo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted flex items-center justify-center w-full h-[500px] overflow-y-auto">
              <ProjectComponent />
            </div>
            <div className="mt-4 space-x-4">
              <Button asChild>
                <Link href={`/projects/${project.id}/live`}>
                  View Live Demo
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href={`https://github.com/abhinandanmishra1/frontend-365/blob/main/projects/project${project.id}/index.tsx`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Code Snippet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <pre className="">
              <SyntaxHighlighter
                language="tsx"
                style={oneDark}
                wrapLines
                wrapLongLines
                className="p-4 bg-muted rounded-md overflow-x-auto overflow-y-auto max-h-[500px]"
              >
                {code ? code : "Loading..."}
              </SyntaxHighlighter>
            </pre>
            {isCopied ? (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => {
                  navigator.clipboard.writeText(code);
                }}
              >
                <Check className="h-4 w-4 text-green-500" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-white"
                onClick={() => {
                  navigator.clipboard.writeText(code);
                  setIsCopied(true);
                  setTimeout(() => {
                    setIsCopied(false);
                  }, 2000);
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
