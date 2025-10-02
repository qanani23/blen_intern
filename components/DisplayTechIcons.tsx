"use client";
import React, { useEffect, useState } from "react";
import { cn, getTechLogos } from "@/lib/utils";
import Image from "next/image";

interface TechIconProps {
  techstack: string;
}

const DisplayTechIcons = ({ techstack }: TechIconProps) => {
  const [techIcons, setTechIcons] = useState<{ tech: string; url: string }[]>([]);

  useEffect(() => {
    const fetchTechIcons = async () => {
      const icons = await getTechLogos(techstack.split(","));
      setTechIcons(icons);
    };
    fetchTechIcons();
  }, [techstack]);

  return (
    <div className="flex flex-row gap-2">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={index}
        className={ cn("relative group bg-dark-300 rounded-full p-2 flex-center", index >= 1 && `-ml-3`)}>
            
        
          <span className="tech-tooltip">{tech}</span>
          <Image
            src={url}
            alt={tech}
            width={20}
            height={20}
            className="size-5"
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
