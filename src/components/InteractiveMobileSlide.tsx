"use client";

import React from "react";
import Image from "next/image";
import { LinkIcon } from "lucide-react";

type BandMember = {
  id: number;
  name: string;
  title: string;
  description: string;
  img: string;
  imgDetail: string;
  instaUrl: string;
};

export default function InteractiveMobileSlide({ member }: { member: BandMember }) {
  return (
    <div className="mobile-slide-wrapper">
      {/* Background Image */}
      <div className="mobile-slide-background">
        <Image
          src={member.imgDetail}
          alt={member.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="mobile-slide-overlay" />
      </div>

      {/* Glassy Card */}
      <div className="mobile-slide-card fixed-card">
        {/* --- 1. The <a> tag now wraps the entire card --- */}
        <a
          href={member.instaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block" // The link itself is a block element
        >
          <div className="glassy-card">
            <div className="mobile-card-content">
              <div className="mobile-card-text">
                <h2 className="mobile-card-name">{member.name}</h2>
                <p className="mobile-card-title">{member.title}</p>
                <p className="mobile-card-description">{member.description}</p>
                
                {/* 2. This is now just text, not a separate link */}
                <div className="mobile-card-footer">
                  <LinkIcon className="h-3 w-3" />
                  Tap to see {member.name}'s Instagram profile
                </div>
              </div>

              <div className="mobile-card-image">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}