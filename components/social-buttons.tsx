"use client";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { FaDiscord } from "react-icons/fa";

const socialLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=100091749645717",
    icon: Facebook,
    color: "#1877F2"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/pokearkusoficial/",
    icon: Instagram,
    color: "#E4405F"
  },
  {
    name: "Discord",
    url: "https://discord.gg/ADFQG6VVGb",
    icon: FaDiscord,
    color: "#5865F2"
  }
];

export function SocialButtons() {
  return (
    <div className="w-full max-w-[1600px] mx-auto py-12 px-4 mt-20">
      <div className="flex justify-center gap-8">
        {socialLinks.map((social) => (
          <Link
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-button group"
            style={{ "--button-color": social.color } as React.CSSProperties}
          >
            <div className="relative w-20 h-20 rounded-lg flex items-center justify-center bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg border-2"
                 style={{ borderColor: social.color }}>
              <social.icon className="w-12 h-12 transition-colors duration-300" style={{ color: social.color }} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
