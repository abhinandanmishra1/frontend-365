"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Github } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getProject } from "@/lib/utils";
import { useParams } from "next/navigation";

export default function ProjectDetailPage() {
  const params = useParams();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const loadProject = async () => {
      const data = await getProject(params.id as string);
      setProject(data);
    };
    loadProject();
  }, [params.id]);

  if (!project) return <div>Loading...</div>;

  const ProjectComponent = dynamic(
    () => import(`@/projects/project${project.id}`),
    {
      loading: () => <div>Loading...</div>,
      ssr: false,
    }
  );

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">{project.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-2">Features:</h3>
            <ul className="list-disc list-inside mb-4">
              {project.features.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <h3 className="font-semibold mb-2">Technologies Used:</h3>
            <ul className="list-disc list-inside">
              {project.technologies.map((tech: string, index: number) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Live Demo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted flex items-center justify-center">
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
          <pre className="p-4 bg-muted rounded-md overflow-x-auto">
            <code>{project.codeSnippet}</code>
            <iframe
              src={`https://codesandbox.io/p/github/abhinandanmishra1/frontend-365/main?embed=1&file=/projects/project${project.id}/index.tsx`}
              style={{
                width: "100%",
                height: "500px",
                border: "0",
                borderRadius: "4px",
                overflow: "hidden",
              }}
              title="abhinandanmishra1/frontend-365/main"
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            ></iframe>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
