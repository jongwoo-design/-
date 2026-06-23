/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

interface HeroSectionProps {
  onJoinClick: () => void;
  onExploreClick: () => void;
}

export default function HeroSection({ onJoinClick, onExploreClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f3efe8] to-[#faf8f5] py-16 sm:py-24 border-b border-[#e9e4dc]">
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-12 left-10 w-96 h-96 rounded-full bg-[#90a955] blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#4f6d7a] blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#eae6df] text-[#132a13] border border-[#e2ddd5] mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#90a955]" />
          <span>재미를 통해 우리를 연결하는 따스한 커뮤니티</span>
        </motion.div>

        {/* Captivating Typographic Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans font-extrabold text-[#132a13] text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight max-w-4xl mx-auto"
        >
          마음을 열어줄 <span className="text-[#90a955]">재미</span>와 <br className="sm:hidden" />
          당신을 이끌어줄 <span className="text-[#4f6d7a]">거점</span>을 만나다
        </motion.h1>

        {/* Short, empathetic paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-[#556b2f] max-w-3xl mx-auto font-sans leading-relaxed"
        >
          오랫동안 고립되거나 은둔의 시간을 보내 마음의 관계 성장이 잠시 멈춘 분들을 위해, <br className="hidden sm:inline" />
          조용하되 안전하게 일상의 건강한 리듬과 온기 가득한 인간관계를 되찾아 가는 <br className="hidden sm:inline" />
          공동 경험 기반 도심 속 아지트, <strong className="text-[#132a13]">재미난회사</strong>입니다.
        </motion.p>

        {/* Quick CTA button array */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <button
            onClick={onJoinClick}
            className="w-full sm:w-auto px-8 py-4 bg-[#132a13] text-[#faf8f5] rounded-xl font-medium shadow-md hover:bg-[#31572c] transition-all transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 group"
          >
            참여 신청하기 (상시 모집)
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 bg-white/70 hover:bg-white text-[#132a13] rounded-xl font-medium border border-[#e9e4dc] transition-all transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
          >
            동네 거점 둘러보기
          </button>
        </motion.div>

        {/* Security / Safe Space assurances */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 pt-8 border-t border-[#e9e4dc] max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-6 text-[#5c677d] text-xs font-medium"
        >
          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#90a955]" />
            <span>비공개 안심 신청제</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-[#4f6d7a]" />
            <span>100% 무상 전액 지원</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 border-t sm:border-t-0 border-[#e9e4dc] pt-3 sm:pt-0">
            <span className="w-2 h-2 rounded-full bg-[#e76f51] animate-ping" />
            <span>관심 있는 누구나 참여 대상</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
