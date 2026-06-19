/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Smile, Info, Mail, PhoneCall, HelpCircle, MapPin } from 'lucide-react';
import SponsorLogos from './SponsorLogos';

export default function Footer() {
  return (
    <footer className="bg-[#132a13] text-[#faf8f5]/80 py-16 mt-24 border-t border-[#31572c]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Logo Details */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#90a955] text-white">
                <Smile className="w-5 h-5" />
              </div>
              <span className="font-sans font-black text-lg tracking-tight text-white">
                재미난회사
              </span>
            </div>
            
            <p className="text-xs leading-relaxed text-[#eae6df]/70">
              재미난회사는 인천광역시의 지원으로 성·미가엘종합사회복지관이 주관하는 사업입니다. 
              최근 가쁜 사회 속에서 홀로 긴 휴식을 걷고 있는 청년들의 건강한 일상과 생활 활력을 북돋우며, 
              이웃 카페 및 수공예 공방 대표들과의 자상한 동반 활동을 통해 마음의 온기를 넓혀갑니다.
            </p>

            <div className="pt-3">
              <span className="text-[10px] font-mono font-bold tracking-wider text-[#90a955] uppercase block mb-2">
                지원 및 주관 기관 정보
              </span>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 inline-block pointer-events-none">
                <SponsorLogos className="scale-90 origin-top-left" />
              </div>
            </div>
          </div>

          {/* Quick links & contact details */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#90a955]" />
              사업 주관 및 대표 문의처
            </h4>
            
            <ul className="space-y-2.5 text-xs text-[#eae6df]/95">
              <li className="flex items-center gap-2.5">
                <PhoneCall className="w-3.5 h-3.5 text-[#90a955]" />
                <span>성.미가엘종합사회복지관: 032) 766-0981~2</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#90a955]" />
                <span>대표 이메일: migael@migael.net</span>
              </li>
              <li className="flex items-start gap-2.5">
                <HelpCircle className="w-3.5 h-3.5 text-[#90a955] mt-0.5 shrink-0" />
                <span>협약 거점: 느호카페, 나무디자인목공방, 재미난가죽공방</span>
              </li>
            </ul>
          </div>

          {/* Organizational notes */}
          <div className="md:col-span-3 space-y-4 text-xs">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#90a955]" />
              복지관 찾아오시는 길
            </h4>
            <p className="text-[#eae6df]/70 leading-relaxed text-[11px]">
              <strong>성.미가엘종합사회복지관</strong><br />
              지번: (22316) 인천광역시 중구 송학로 40 (내동 3-5) <br />
              Fax: 032) 777-7191
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/10 text-[#90a955]">
                ● 인천광역시 중구 청년 마음키움 지원사업
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[#eae6df]/50">
          <div>
            © 2026 성.미가엘종합사회복지관 & 인천광역시. All Rights Reserved. Empathy & Mind Care.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
