import { FacebookIcon, LinkedinIcon, TwitterIcon } from "../project24";
import { GithubIcon, Globe, InstagramIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import React from "react";

type SocialProfile = {
  platform:
    | "github"
    | "linkedin"
    | "twitter"
    | "instagram"
    | "facebook"
    | "website";
  url: string;
  username?: string;
};

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  website: Globe,
};

interface SocialProfilesProps {
  profiles: SocialProfile[];
  size?: number;
  className?: string;
}

const SocialProfiles = ({
  profiles,
  size = 24,
  className = "",
}: SocialProfilesProps) => {
  return (
    <div className={`flex space-x-2 items-center ${className}`}>
      <TooltipProvider>
        {profiles.map((profile, index) => {
          const Icon = socialIcons[profile.platform];

          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-accent"
                  onClick={() => window.open(profile.url, "_blank")}
                >
                  <Icon size={size} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {profile.username ? `@${profile.username}` : profile.url}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
};

export default function Project25() {
  const profiles: SocialProfile[] = [
    {
      platform: "github",
      url: "https://github.com/abhinandanmishra1",
      username: "abhinandanmishra1",
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com/in/abhinandanmishra1",
      username: "abhinandanmishra1",
    },
    {
      platform: "twitter",
      url: "https://twitter.com/abhinandan_0001",
      username: "abhinandanmishra1",
    },
    {
      platform: "instagram",
      url: "https://instagram.com/abhinandan_mishra_1",
      username: "abhinandan_mishra_1",
    },
    {
      platform: "facebook",
      url: "https://facebook.com/username",
      username: "abhinandanmishra1",
    },
  ];

  return (
    <div className="p-4">
      <SocialProfiles profiles={profiles} />
    </div>
  );
}
