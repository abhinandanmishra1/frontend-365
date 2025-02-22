import {
  Pause,
  Play,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX
} from "lucide-react";
import React, { useEffect, useRef, useState } from 'react';

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface AudioSource {
  src: string;
  type: string;
}

interface AudioPlayerProps {
  sources: AudioSource[];
  onNext?: () => void;
  onPrevious?: () => void;
  onShuffle?: () => void;
  className?: string;
}

const AudioPlayer= ({ 
  sources,
  onNext,
  onPrevious,
  onShuffle,
  className = ""
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLInputElement | null>(null);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = (): void => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newValue: number[]): void => {
    if (!audioRef.current) return;

    const volumeValue = newValue[0];
    setVolume(volumeValue);
    audioRef.current.volume = volumeValue;
    setIsMuted(volumeValue === 0);
  };

  const handleProgressChange = (newValue: number[]): void => {
    if (!audioRef.current) return;

    const progressValue = newValue[0];
    const time = (progressValue / 100) * duration;
    setCurrentTime(time);
    audioRef.current.currentTime = time;
  };

  const toggleMute = (): void => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (onNext) onNext();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onNext]);

  return (
    <div className={`bg-card rounded-lg p-4 shadow-lg ${className}`}>
      <audio ref={audioRef} preload="metadata" className="hidden">
        {sources.map((source, index) => (
          <source key={index} src={source.src} type={source.type} />
        ))}
      </audio>

      <div className="space-y-2">
        <Slider
          value={[currentTime ? (currentTime / duration) * 100 : 0]}
          onValueChange={handleProgressChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="text-muted-foreground hover:text-foreground"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume * 100]}
            onValueChange={(value) => handleVolumeChange([value[0] / 100])}
            className="w-24"
          />
        </div>

        <div className="flex items-center gap-2">
          {onShuffle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onShuffle}
              className="text-muted-foreground hover:text-foreground"
            >
              <Shuffle size={20} />
            </Button>
          )}
          {onPrevious && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onPrevious}
              className="text-muted-foreground hover:text-foreground"
            >
              <SkipBack size={20} />
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            onClick={togglePlay}
            className="h-12 w-12"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </Button>
          {onNext && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onNext}
              className="text-muted-foreground hover:text-foreground"
            >
              <SkipForward size={20} />
            </Button>
          )}
        </div>

        <div className="w-32" />
      </div>
    </div>
  );
};


export default function Project28(){
  const audioSources: AudioSource[] = [
    {
      src: "https://cdn.freesound.org/previews/789/789122_5674468-lq.mp3",
      type: "audio/mpeg"
    },
    {
      src: "https://cdn.freesound.org/previews/789/789122_5674468-lq.ogg",
      type: "audio/ogg"
    }
  ];

  const handleNext = (): void => {
    console.log("Next track");
  };

  const handlePrevious = (): void => {
    console.log("Previous track");
  };

  const handleShuffle = (): void => {
    console.log("Shuffle playlist");
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <AudioPlayer
        sources={audioSources}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onShuffle={handleShuffle}
        className="max-w-2xl"
      />
    </div>
  );
};
