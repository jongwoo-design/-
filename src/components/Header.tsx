/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Smile, Calendar, MessageSquare, ClipboardEdit, Compass } from 'lucide-react';
import SponsorLogos from './SponsorLogos';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const navItems = [
    { id: 'about', label: '회사 소개 및 안내', shortLabel: '회사 소개', icon: Compass },
    { id: 'activity', label: '활동 다이어리', shortLabel: '활동 다이어리', icon: Calendar },
    { id: 'campaign', label: '연결 캠페인', shortLabel: '연결 캠페인', icon: MessageSquare },
    { id: 'apply', label: '지원 신청', shortLabel: '지원 신청', icon: ClipboardEdit },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#faf8f5]/80 backdrop-blur-md border-b border-[#e9e4dc] transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo & Sponsors for wide screens */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('about')}
              className="flex items-center gap-2 text-left hover:opacity-90 md:py-2 group shrink-0"
            >
              <div className="p-2 rounded-xl bg-gradient-to-tr from-[#90a955] to-[#4f6d7a] text-white transition-transform group-hover:scale-105">
                <Smile className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="whitespace-nowrap">
                <span className="font-sans font-extrabold text-base sm:text-lg lg:text-xl tracking-tight text-[#132a13] block">
                  재미난회사
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-[#4f6d7a] block uppercase -mt-1">
                  A Safe Space to Recover
                </span>
              </div>
            </button>
            
            {/* Sponsor logos on large screens only to free up menu bar space */}
            <div className="hidden xl:block h-6 w-px bg-[#e9e4dc]" />
            <SponsorLogos className="hidden xl:flex gap-3 scale-90 origin-left" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-0.5 lg:space-x-1 shrink-1 min-w-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#132a13] text-white shadow-sm font-bold'
                      : 'text-[#4f5d75] hover:text-[#132a13] hover:bg-[#eae6df]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Status badge */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold bg-[#eae6df] text-[#132a13] whitespace-nowrap">
              <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-[#90a955] animate-pulse"></span>
              모집중
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="lg:hidden border-t border-[#e9e4dc] bg-[#faf8f5]/95">
        <div className="grid grid-cols-4 text-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-2.5 text-[10.5px] font-bold transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-[#132a13] bg-[#eae6df]'
                    : 'text-[#4f5d75] hover:text-[#132a13]'
                }`}
              >
                <Icon className="w-5 h-5 mb-0.5 text-inherit" />
                <span>{item.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
