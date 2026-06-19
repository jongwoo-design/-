/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// SVG Logo Component for Incheon Metropolitan City (High-fidelity vector tracing)
export function IncheonLogo({ className = 'h-8' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="h-full w-auto shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left deep blue swirl/circular dynamic shape */}
        <path
          d="M 50 90 C 27.91 90 10 72.09 10 50 C 10 27.91 27.91 10 50 10 C 62.5 10 73.6 15.7 81 24.7 C 68.5 17.5 52 20 42 30 C 31 41 31 59 42 70 C 52 80 68.5 82.5 81 75.3 C 73.6 84.3 62.5 90 50 90 Z"
          fill="#0072BC"
        />
        {/* Three dynamic turquoise/cyan wings on the right */}
        <path
          d="M 62 25 C 69 32 73 40 73 50 C 73 60 69 68 62 75 C 72 68 77 59 77 50 C 77 41 72 32 62 25 Z"
          fill="#00A79D"
        />
        <path
          d="M 70 20 C 78 28 82 38 82 50 C 82 62 78 72 70 80 C 80 72 85 62 85 50 C 85 38 80 28 70 20 Z"
          fill="#00B2A9"
        />
        <path
          d="M 78 15 C 87 24 91 36 91 50 C 91 64 87 76 78 85 C 89 76 94 64 94 50 C 94 36 89 24 78 15 Z"
          fill="#00C1B8"
        />
      </svg>
      <div className="flex flex-col select-none leading-none pt-0.5 whitespace-nowrap">
        <span className="text-[11px] sm:text-[12px] font-extrabold text-[#333333] tracking-tight font-sans whitespace-nowrap">
          인천광역시
        </span>
        <span className="text-[7px] sm:text-[7.5px] font-medium text-[#666666] tracking-tight font-sans mt-1 whitespace-nowrap">
          Incheon Metropolitan City
        </span>
      </div>
    </div>
  );
}

// SVG Logo Component for Saint Miguel Community Welfare Center (High-fidelity vector tracing of fish/heart loop)
export function MigaelWelfareLogo({ className = 'h-8' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="h-full w-auto shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Yellow fill representing the top fish/loop */}
        <path
          d="M 45 15 C 68 15, 85 30, 85 50 C 85 62, 75 75, 58 83 C 45 75, 23 58, 23 45 C 23 25, 41 15, 45 15 Z"
          fill="#F1A80A"
        />
        {/* Green fill representing the bottom fish/loop */}
        <path
          d="M 23 45 C 23 68, 41 85, 58 83 C 70 75, 85 58, 85 50 C 85 35, 70 23, 58 23 C 43 23, 23 35, 23 45 Z"
          fill="#5D9F36"
        />
        {/* Dynamic blue ribbon overlapping/outlining */}
        <path
          d="M 46 20 C 32 20, 23 32, 23 46 C 23 60, 32 72, 46 72 C 58 72, 76 56, 83 49 C 85 47, 85 45, 83 43 C 76 36, 58 20, 46 20 Z"
          stroke="#1D308F"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 54 26 C 66 26, 75 35, 75 46 C 75 57, 66 66, 54 66 C 44 66, 30 52, 25 47 C 24 46, 24 45, 25 44 C 30 39, 44 26, 54 26 Z"
          stroke="#1D308F"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Inner white dots (eyes of the fish) */}
        <circle cx="43" cy="38" r="3.5" fill="white" />
        <circle cx="55" cy="54" r="3.5" fill="white" />
      </svg>
      <div className="flex flex-col select-none leading-none pt-0.5 whitespace-nowrap">
        <div className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
          <span className="text-[7px] sm:text-[7.5px] font-bold text-[#1D308F] font-sans tracking-tight leading-none whitespace-nowrap">
            대한성공회유지재단
          </span>
          <span className="text-[5.5px] sm:text-[6px] text-[#1D308F] font-mono leading-none tracking-tighter shrink-0 whitespace-nowrap">
            St. Michael Community Welfare Center
          </span>
        </div>
        <span className="text-[11px] sm:text-[12px] font-extrabold text-[#333333] tracking-tight font-sans mt-1 whitespace-nowrap">
          성·미가엘종합사회복지관
        </span>
      </div>
    </div>
  );
}

// Combined Sponsor Bar
export default function SponsorLogos({ className = 'flex gap-4' }: { className?: string }) {
  return (
    <div className={`flex items-center flex-wrap ${className}`}>
      <IncheonLogo className="h-7 sm:h-8" />
      <div className="h-4 w-px bg-gray-300" />
      <MigaelWelfareLogo className="h-7 sm:h-8" />
    </div>
  );
}
