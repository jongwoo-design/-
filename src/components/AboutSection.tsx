/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_DATA } from '../data/mockData';
import {
  Heart,
  Smile,
  Users,
  Compass,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  Target,
  FileCheck,
  CheckCircle2,
  ChevronDown,
  Gift,
  Plus
} from 'lucide-react';

export default function AboutSection() {
  const [activeStage, setActiveStage] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("https://ais-pre-rvtn64mhfp3vnbqaxkfono-569753364661.asia-northeast1.run.app");
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const stages = [
    {
      title: '정서회복',
      sub: '1단계',
      color: '#4f6d7a',
      desc: '참여자 1:1 상담 및 자기 이해, 감정 표출 기회 제공',
      detail: '무리하지 않고 안전하다고 느끼는 관계에서부터 시작합니다. 나를 열어보고 솔직한 내 마음의 모습을 공감받는 치유의 첫 단추입니다.'
    },
    {
      title: '재미탐색',
      sub: '2단계',
      color: '#90a955',
      desc: '커피, 가죽, 목공 등 다양한 초급 연계 체험',
      detail: '평소에 경험해 보지 못했던 창작 활동에서 자연스러운 흥미를 느끼며, 방 안의 정적인 상태에서 동적인 상태로 가벼운 움직임을 꺼냅니다.'
    },
    {
      title: '거점활동',
      sub: '3단계',
      color: '#e76f51',
      desc: '개인 관심사 기반 소그룹 반복 참여 및 멘토 활동',
      detail: '한 번의 맛보기를 넘어, 나와 잘 맞는 지역 내 카페나 공방 등 안전한 거점 공간을 오가며 매주 자연스러운 규칙적인 루틴을 구축합니다.'
    },
    {
      title: '결과경험',
      sub: '4단계',
      color: '#132a13',
      desc: '공동 프로젝트 및 최종 결과물 제작',
      detail: '자라난 집중력과 솜씨를 녹여 나만의 가죽 지갑, 정비한 목공 선반, 로스팅한 커피 보틀 등을 동료 단원들과 힘을 합쳐 직접 만들어 냅니다.'
    },
    {
      title: '지역참여',
      sub: '5단계',
      color: '#f4a261',
      desc: '마켓, 체험 부스 운영 등 지역사회 연계 나눔',
      detail: '‘연결 캠페인’을 빌어 내 제작물을 이웃들과 기부, 교환, 판매하면서 한 고립되었던 시민에서 나아가 소중한 가치를 공유하는 당당한 구성원으로 회복합니다.'
    }
  ];

  const objectives = [
    {
      icon: Clock,
      title: '일상생활 리듬 회복',
      text: '가상의 ‘출퇴근’ 개념과 정기 참여 루틴을 적용하여 낮밤이 뒤바뀌거나 무너진 생활 주기를 안정적인 궤도로 되돌려 놓습니다.'
    },
    {
      icon: Users,
      title: '관계 연결망 및 소속감',
      text: '안전한 경계를 보장하는 거점 멘토대표 및 동료 참여자들과의 신뢰 형성으로 부정적인 인간관계 경험을 따스한 지지로 전환합니다.'
    },
    {
      icon: Target,
      title: '자기효능감 향상',
      text: '손으로 구체적인 창작물을 만들고 이를 지역사회에 연결하는 일련의 자아 확장 활동을 통해 스스로의 실천적 성취감을 획득합니다.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-24 py-12">
      {/* 1. 사업 기본 정보 */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-[#e9e4dc] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-6">
          <span className="text-[#90a955] text-sm uppercase tracking-wider font-mono font-bold block">
            Project Overview Ⅰ
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#132a13] font-sans">
            재미로 소통하고, 거점에서 복귀하며, 따스하게 살아나다
          </h2>
          <p className="text-sm font-sans text-[#4f5d75] leading-relaxed">
            ‘재미난회사’는 가상의 회사 콘셉트를 기반으로, 새로운 사람들과의 만남이나 활동을 통해 일상의 변화를 만들어가고 싶은 모든 분들이 편안하게 흥미를 발견하고 안심하며 참여할 수 있는 25주 지원 프로그램입니다. 단순 상담에 그치지 않고, 인천 제물포구의 정겨운 동네 거점(카페, 가죽/목공방) 대표님들과 연대하여 생활 속에서 건강한 일상의 리듬과 관계의 온기를 차곡차곡 되찾습니다.
          </p>
          <div className="pt-4 border-t border-[#eae6df] space-y-3">
            <div className="flex items-center gap-3 text-xs text-[#132a13] font-bold">
              <span className="w-20 inline-block text-[#4f6d7a] uppercase font-semibold">사업기간</span>
              <span>2026년 7월 ~ 12월 (총 25주 과정)</span>
            </div>
            <div className="flex items-start gap-3 text-xs text-[#132a13] font-bold">
              <span className="w-20 inline-block text-[#4f6d7a] uppercase font-semibold shrink-0">지원대상</span>
              <span>인천광역시 제물포구에 연고(주거, 직장 등)를 두고 있으며, 새로운 관심체험과 만남을 통해 일상의 따스한 도전을 시작해보고 싶은 누구나 (10명 내외)</span>
            </div>
            <div className="flex items-start gap-3 text-xs text-[#132a13] font-bold">
              <span className="w-20 inline-block text-[#4f6d7a] uppercase font-semibold shrink-0">참가혜택</span>
              <div className="space-y-1">
                <p>카페 실습, 원목 가구DIY, 가죽 공예 재료비 전체 무상 지원 및 이수 이수증 증여</p>
                <p className="text-[#90a955] font-bold flex items-center gap-1">
                  <span>⭐️</span> 전용 어플 활동 포인트 지급 (인천 제물포구 내 등록된 연계 가게 - 식당, 카페, 문화공간 등에서 유용하게 사용 가능)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-[#faf8f5] rounded-2xl p-6 sm:p-8 border border-[#e9e4dc] flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#132a13] mb-6 flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#90a955] text-white">
                <TrendingUp className="w-4 h-4" />
              </span>
              재미난회사가 추구하는 주요 사업목표
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {objectives.map((obj, idx) => {
                const Icon = obj.icon;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-[#e9e4dc]">
                      <Icon className="w-5 h-5 text-[#90a955]" />
                    </div>
                    <h4 className="text-sm font-bold text-[#132a13]">{obj.title}</h4>
                    <p className="text-[11px] leading-relaxed text-[#4f5d75]">{obj.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#e9e4dc] bg-white/50 p-4 rounded-xl flex items-start gap-3">
            <Gift className="w-5 h-5 text-[#e76f51] shrink-0 mt-0.5" />
            <div className="text-xs text-[#4f5d75] leading-relaxed">
              <strong className="text-[#132a13] block mb-0.5">망설이는 분들과 주변 이웃들에게</strong>
              "혹시 나도 참여할 수 있을까?", "주변에 홀로 힘든 계절을 지나고 있는 친한 동생이나 친구가 있는데 권해볼까?" 하는 가벼운 관심에서 출발합니다. 어색하고 서툰 어떤 걸음이라도 환영받을 준비가 되어 있습니다.
            </div>
          </div>
        </div>
      </section>

      {/* 2. 5단계 성장의 흐름 (운영구조) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[#4f6d7a] text-xs font-mono font-bold uppercase tracking-wider block">
            5 Stages Roadmap
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#132a13] font-sans">
            세상으로 발돋움하는 5단계 마음 루틴
          </h2>
          <p className="text-xs text-[#4f5d75]">
            단숨에 방문을 박차고 뛰어나가는 대신, 물을 주듯 단계적으로 천천히 안전을 보장하며 세상 밖 온도를 넓혀갑니다.
          </p>
        </div>

        {/* Stages Timeline Selector */}
        <div className="grid grid-cols-5 border border-[#e9e4dc] bg-white rounded-2xl overflow-hidden shadow-sm">
          {stages.map((stg, idx) => {
            const isSelected = activeStage === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStage(idx)}
                style={{
                  backgroundColor: isSelected ? stg.color : '',
                  color: isSelected ? '#ffffff' : '#132a13',
                  borderBottomColor: isSelected ? stg.color : 'transparent'
                }}
                className={`p-3 sm:py-5 flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                  !isSelected ? 'hover:bg-[#faf8f5] border-r border-[#e9e4dc]' : ''
                }`}
              >
                <span className="text-[9px] font-mono font-bold tracking-wider opacity-80 uppercase block">
                  {stg.sub}
                </span>
                <span className="text-xs sm:text-sm font-extrabold block mt-0.5 tracking-tight text-center">
                  {stg.title}
                </span>
                {isSelected && (
                  <div
                    className="absolute -bottom-2 top-auto left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 z-10"
                    style={{ backgroundColor: stg.color }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Stage Explanation Box */}
        <div className="bg-[#faf8f5] rounded-3xl p-6 sm:p-10 border border-[#e9e4dc] min-h-[160px] relative overflow-hidden flex items-start gap-6">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-white font-extrabold text-[#faf8f5]"
            style={{ backgroundColor: stages[activeStage].color }}
          >
            {activeStage + 1}
          </div>
          <div className="space-y-3">
            <span
              className="text-xs tracking-wider uppercase font-semibold text-left font-mono"
              style={{ color: stages[activeStage].color }}
            >
              {stages[activeStage].title} 상호 연계 프로세스
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#132a13]">
              {stages[activeStage].desc}
            </h3>
            <p className="text-sm text-[#4f5d75] leading-relaxed max-w-4xl">
              {stages[activeStage].detail}
            </p>
          </div>
        </div>
      </section>

      {/* 3. 연결캠페인과 마켓 시너지 */}
      <section className="bg-[#132a13] text-[#faf8f5] rounded-3xl p-8 sm:p-12 overflow-hidden relative">
        <div className="absolute right-0 bottom-0 opacity-10">
          <Smile className="w-96 h-96 -mr-16 -mb-16 text-white" />
        </div>
        <div className="relative max-w-3xl space-y-6">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#4f6d7a] text-white">
            Connection Campaign
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans text-white">
            지평선을 넓혀 세상과 인사하는 ‘연결캠페인’
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#eae6df]">
            2026년 8월부터 12월까지 집중 운영되는 연결캠페인은, 단원들이 거점 공간에서
            함께 만든 구체적인 활동 성과물(수공예 원목 스툴, 가죽 바느질 키트, 수제 드립 포션 등)과
            진솔한 자아 성찰의 일기를 지역사회와 소박하게 나누는 온정 교환 캠페인입니다.
            홀로 깊어가는 생각의 고리는 누구에게나 찾아올 수 있는 작고 긴 겨울과 같습니다. 우리 성·미가엘종합사회복지관과 인천광역시 이웃들이 따뜻한 봄바람이 되어 아름다운 동행을 시작합니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-xs font-medium text-[#eae6df]">
            <div className="bg-white/10 p-5 rounded-xl border border-white/20 space-y-2">
              <strong className="text-white text-sm block">🎨 참여자 제작 콘텐츠 전시</strong>
              <p className="text-[#d8d3c9]">
                활동 시간 틈틈이 직접 인쇄·디자인한 사진, 인터뷰 구절, 힐링 일러스트를 통해 비슷한 시기에 홀로 숨을 고르고 있는 이웃들에게 기운을 돋우는 마중물의 안부를 전합니다.
              </p>
            </div>
            <div className="bg-white/10 p-5 rounded-xl border border-white/20 space-y-2">
              <strong className="text-white text-sm block">🌸 미니 팝업 마켓 & 엽서 교환</strong>
              <p className="text-[#d8d3c9]">
                카페와 공방에서 다듬은 제품들을 기획 마켓으로 가져와 이웃들과 손글씨 엽서로 교환하며 온도를 생생하게 공유합니다.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* 4. 사업 FAQ */}
      <section className="space-y-6 max-w-4xl mx-auto" id="spaces-overview">
        <div className="text-center space-y-2">
          <span className="text-[#90a955] text-xs font-mono font-bold tracking-wider block">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl font-extrabold text-[#132a13] font-sans">
            궁금한 점을 먼저 확인해 보셔요
          </h2>
          <p className="text-xs text-[#4f5d75]">
            참여 전 망설여지는 부분들을 솔직담백하게 모아 정리했습니다.
          </p>
        </div>

        <div className="space-y-3 bg-white rounded-2xl p-4 sm:p-6 border border-[#e9e4dc] shadow-sm">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border-b border-[#faf8f5] last:border-0 pb-3 last:pb-0 pt-3 first:pt-0"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left py-2 font-bold text-sm tracking-tight text-[#132a13] hover:text-[#90a955] focus:outline-none focus:text-[#90a955] transition-colors"
                >
                  <span className="flex items-start gap-2.5">
                    <span className="text-red-500 font-mono text-base font-extrabold transition-transform duration-300">Q.</span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#4f6d7a] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-6 py-3 text-xs leading-relaxed text-[#4f5d75] bg-[#faf8f5] rounded-xl flex gap-2.5 items-start mt-2 border border-[#e2ddd5]">
                        <span className="text-[#90a955] font-bold text-base font-mono shrink-0">A.</span>
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
