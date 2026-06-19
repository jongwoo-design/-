/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SPACES_DATA, DIARIES_DATA } from '../data/mockData';
import { MapPin, User, Calendar, BookOpen, Coffee, Hammer, Tag, Sparkles } from 'lucide-react';

export default function ActivitySection() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'cafe' | 'wood' | 'leather' | 'emotion' | 'campaign'>('all');
  const [activeSpaceTab, setActiveSpaceTab] = useState('cafe');

  const filteredDiaries = activeCategory === 'all'
    ? DIARIES_DATA
    : DIARIES_DATA.filter((diary) => diary.category === activeCategory);

  const filterTabs = [
    { id: 'all', label: '전체 보기' },
    { id: 'emotion', label: '정서 회복 및 상담' },
    { id: 'cafe', label: '느호 카페' },
    { id: 'wood', label: '나무디자인 목공' },
    { id: 'leather', label: '재미난 가죽' },
    { id: 'campaign', label: '연결 캠페인' }
  ];

  return (
    <div className="space-y-24 py-12" id="activity-board">
      
      {/* SECTION 1: 거점 공간 상세 탐방 */}
      <section className="space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-[#90a955] text-xs font-mono font-bold uppercase tracking-wider block">
            Base Spaces Introductions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#132a13] font-sans">
            지원을 함께 이끌어갈 3대 지역 거점
          </h2>
          <p className="text-xs text-[#4f5d75]">
            단순히 복지관 사무실에 머무는 것이 아니라, 인천 중구 원도심 골목 구비구비에 숨어 있는 진짜 상점과 전문가들의 공간으로 찾아갑니다.
          </p>
        </div>

        {/* Space Horizontal Toggle */}
        <div className="flex flex-wrap gap-2 border-b border-[#e9e4dc] pb-3">
          {SPACES_DATA.map((space) => (
            <button
              key={space.id}
              onClick={() => setActiveSpaceTab(space.id)}
              className={`px-4 sm:px-6 py-3 rounded-t-xl font-bold text-sm transition-all focus:outline-none ${
                activeSpaceTab === space.id
                  ? 'bg-white text-[#132a13] border-t-2 border-[#90a955] border-x border-[#e9e4dc] -mb-3.5 shadow-sm'
                  : 'text-[#4f5d75] hover:text-[#132a13] bg-transparent'
              }`}
            >
              {space.name}
            </button>
          ))}
        </div>

        {/* Space Showcase detail container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e9e4dc] shadow-sm">
          {SPACES_DATA.map((space) => {
            if (space.id !== activeSpaceTab) return null;
            return (
              <motion.div
                key={space.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Space Image & location badge */}
                <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-video lg:aspect-square group bg-stone-100">
                  <img
                    src={space.image}
                    alt={space.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-[#132a13]/90 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 backdrop-blur-sm">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{space.location}</span>
                  </div>
                </div>

                {/* Space text specs */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="text-xs font-semibold text-[#90a955] uppercase tracking-wider block mb-1">
                      {space.type}
                    </span>
                    <h3 className="text-2xl font-bold text-[#132a13] font-sans">
                      {space.name}
                    </h3>
                    <p className="text-xs text-[#4f5d75] mt-2.5 leading-relaxed">
                      {space.description}
                    </p>
                  </div>

                  {/* Mentor Intro Block */}
                  <div className="bg-[#faf8f5] rounded-xl p-5 border border-[#e9e4dc]">
                    <span className="text-[10px] font-mono tracking-wider text-[#4f6d7a] uppercase block font-semibold">
                      멘토 가이드(거점 대표) 소개
                    </span>
                    <strong className="text-[#132a13] font-bold text-sm block mt-1">
                      {space.mentor}
                    </strong>
                    <p className="text-xs italic text-[#5c677d] mt-2 font-sans font-medium">
                      {space.mentorIntro}
                    </p>
                  </div>

                  {/* Core Session activities list */}
                  <div>
                    <h4 className="text-xs font-bold text-[#132a13] mb-2">대표적인 거점 활동</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {space.activities.map((act, i) => (
                        <li key={i} className="bg-white p-3 rounded-lg border border-[#e9e4dc] text-[11px] leading-normal text-[#4f5d75] flex gap-2 items-start font-medium">
                          <span className="text-[#90a955] mt-0.5">•</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: 리얼 활동 다이어리 (참여자 일지) */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-xl space-y-2">
            <span className="text-[#4f6d7a] text-xs font-mono font-bold uppercase tracking-wider block">
              Participant Logs
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#132a13] font-sans">
              문 너머에서 들려온 온기 다이어리
            </h2>
            <p className="text-xs text-[#4f5d75]">
              재미난회사를 거쳐 간 청년들이 남겨 준 실제 활동 일지와 소감입니다. 그들의 문장 속에서 용기를 찾아 보셔요.
            </p>
          </div>

          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#eef4ec] text-[#42613d] border border-[#d8e6d2]">
            <Sparkles className="w-3.5 h-3.5 text-[#90a955] mr-1.5" />
            실제 매주 적어 올리는 실시간 일지
          </span>
        </div>

        {/* Filter Categories for diaries */}
        <div className="flex flex-wrap gap-1.5 bg-[#eae6df] p-1.5 rounded-xl border border-[#e2ddd5]">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                activeCategory === tab.id
                  ? 'bg-white text-[#132a13] shadow-sm'
                  : 'text-[#5c677d] hover:text-[#132a13]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid of Diaries card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredDiaries.length > 0 ? (
              filteredDiaries.map((diary) => (
                <motion.article
                  key={diary.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-6 border border-[#e9e4dc] hover:border-[#90a955] transition-all hover:shadow-md flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#90a955] bg-[#90a955]/10 px-2.5 py-1 rounded-full">
                        {diary.stage}
                      </span>
                      <span className="text-[11px] font-mono font-medium text-[#4f6d7a] flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {diary.date}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#132a13] font-sans tracking-tight">
                      {diary.title}
                    </h3>

                    <p className="text-xs leading-relaxed text-[#5c677d]">
                      {diary.content}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#faf8f5] flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-[#132a13] flex items-center gap-1.5">
                      <User className="w-4.5 h-4.5 text-[#4f6d7a] p-0.5 rounded-full bg-[#eae6df]" />
                      {diary.author}
                    </span>

                    <div className="flex flex-wrap gap-1">
                      {diary.tags.map((tag, i) => (
                        <span key={i} className="text-[9px] font-mono font-bold text-[#4f6d7a] bg-[#eae6df]/50 px-2 py-0.5 rounded flex items-center gap-0.5 border border-[#e9e4dc]/20">
                          <Tag className="w-2 h-2 text-[#4f6d7a]" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-1 md:col-span-2 bg-[#fcfbf9]/60 rounded-3xl p-12 sm:p-16 border border-dashed border-[#e9e4dc] text-center space-y-4"
              >
                <div className="inline-flex p-4 rounded-full bg-[#90a955]/10 text-[#42613d] text-2xl animate-bounce">
                  🌱
                </div>
                <h4 className="text-base font-extrabold text-[#132a13] font-sans">
                  등록된 활동 일지가 곧 공개될 예정입니다
                </h4>
                <p className="text-xs text-[#5c677d] max-w-md mx-auto leading-relaxed">
                  재미난회사 청년들이 3대 지역거점(느호카페, 나무디자인, 재미난가죽)에서 만들어갈 소박하고 이쁜 첫 일상 기록이 차곡차곡 여기에 담겨집니다. 따스하게 기대해 주세요!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
