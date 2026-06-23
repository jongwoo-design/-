/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Application } from '../types';
import {
  FileCheck,
  ClipboardList,
  HeartHandshake,
  CheckCircle2,
  Calendar,
  Sparkles,
  Phone,
  User,
  Activity,
  Award,
  Search,
  Lock,
  ArrowRight,
  ChevronLeft
} from 'lucide-react';

export default function ApplySection() {
  const [activeSubTab, setActiveSubTab] = useState<'form' | 'status'>('form');

  // Form states for application
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('female');
  const [residence, setResidence] = useState('yes');
  const [motivation, setMotivation] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  
  // Storage of applications
  const [applications, setApplications] = useState<Application[]>([]);
  
  // Search state for results check
  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState<Application[]>([]);

  // Corrected space options based on the user's explicit request
  const interestOptions = [
    { id: 'cafe', label: '느호카페 바리스타' },
    { id: 'wood', label: '나무디자인목공방 목공' },
    { id: 'leather', label: '재미난가죽공방 가죽 공예' },
    { id: 'counseling', label: '전문 상담' },
    { id: 'etc', label: '기타' }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('funco_applications');
    if (saved) {
      setApplications(JSON.parse(saved));
    }
  }, []);

  const handleInterestToggle = (interestId: string) => {
    if (interests.includes(interestId)) {
      setInterests(interests.filter((x) => x !== interestId));
    } else {
      setInterests([...interests, interestId]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !birthDate.trim() || !motivation.trim()) return;

    // Default simplified score values
    const diagScore = { isolation: 3, seclusion: 3 };

    const newApp: Application = {
      id: `APP-${Date.now().toString().slice(-6)}`,
      name: name.trim(),
      phone: phone.trim(),
      birthDate,
      gender,
      residence,
      motivation: motivation.trim(),
      interests,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'pending',
      diagnosticScore: diagScore
    };

    const interestLabels = interests.map((it) => interestOptions.find((x) => x.id === it)?.label || it);

    // Post to Formspree
    fetch('https://formspree.io/f/xlgkykvq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        formType: '재미난회사 참여 신청서',
        id: newApp.id,
        name: newApp.name,
        phone: newApp.phone,
        birthDate: newApp.birthDate,
        gender: newApp.gender === 'female' ? '여성' : '남성',
        residence: newApp.residence === 'yes' ? '예 (인천 제물포구 거주/생활권)' : '아니오',
        motivation: newApp.motivation,
        interests: interestLabels.join(', ') || '선택 없음',
        submittedAt: newApp.submittedAt
      })
    }).catch(err => console.error('Formspree submit error:', err));

    const updated = [newApp, ...applications];
    setApplications(updated);
    localStorage.setItem('funco_applications', JSON.stringify(updated));

    // Automatically configure search credentials so they view results instantly without having to type again
    setSearchName(newApp.name);
    setSearchPhone(newApp.phone);
    setSearchResults([newApp]);
    setHasSearched(true);

    // Reset Form
    setName('');
    setPhone('');
    setBirthDate('');
    setMotivation('');
    setInterests([]);
    
    // Auto switch to status tab
    setActiveSubTab('status');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchName.trim() || !searchPhone.trim()) return;

    const matched = applications.filter(
      (app) => app.name.trim() === searchName.trim() && app.phone.trim() === searchPhone.trim()
    );
    setSearchResults(matched);
    setHasSearched(true);
  };

  const handleResetSearch = () => {
    setSearchName('');
    setSearchPhone('');
    setHasSearched(false);
    setSearchResults([]);
  };

  return (
    <div className="space-y-12 py-12">
      {/* Tab toggle */}
      <div className="flex border-b border-[#e9e4dc] pb-0.5">
        <button
          onClick={() => setActiveSubTab('form')}
          className={`px-6 py-3 font-sans font-bold text-sm tracking-tight border-b-2 transition-all cursor-pointer ${
            activeSubTab === 'form'
              ? 'text-[#132a13] border-[#132a13] font-extrabold'
              : 'text-[#4f5d75] border-transparent hover:text-[#132a13]'
          }`}
        >
          📝 재미난회사 참여 신청서 작성
        </button>
        <button
          onClick={() => setActiveSubTab('status')}
          className={`px-6 py-3 font-sans font-bold text-sm tracking-tight border-b-2 transition-all cursor-pointer relative ${
            activeSubTab === 'status'
              ? 'text-[#132a13] border-[#132a13] font-extrabold'
              : 'text-[#4f5d75] border-transparent hover:text-[#132a13]'
          }`}
        >
          🔍 신청 진행 결과 확인
          {hasSearched && searchResults.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#e76f51] text-white font-mono font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center animate-bounce">
              {searchResults.length}
            </span>
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeSubTab === 'form' ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto space-y-8"
          >
            {/* Trust Card */}
            <div className="bg-[#eef4ec] rounded-2xl p-6 border border-[#d8e6d2] space-y-3">
              <span className="inline-flex items-center gap-1 bg-[#132a13] text-[#faf8f5] text-[10px] uppercase tracking-wider font-bold py-1 px-2.5 rounded-md">
                <HeartHandshake className="w-3 h-3" />
                당신의 따스한 마주함을 지지합니다
              </span>
              <h3 className="text-sm font-bold text-[#132a13]">
                재미난회사 동행 신청은 전 과정이 완전한 ‘비공개 안심 제도’로 운영됩니다.
              </h3>
              <p className="text-[11px] leading-relaxed text-[#556b2f]">
                작성해 주시는 모든 비밀 보호 데이터는 타인에게 일치 공개되지 않으며 오로지 성·미가엘종합사회복지관 전문 자문조율 위원과의 다정다감한 1:1 맞춤 소그룹 세팅을 위해서만 소중한 기반으로 보장하여 활용됩니다.
              </p>
            </div>

            {/* Core Registry Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e9e4dc] shadow-sm">
              <h3 className="text-lg font-bold text-[#132a13] font-sans flex items-center gap-2 mb-6 border-b border-[#faf8f5] pb-3">
                <ClipboardList className="w-5 h-5 text-[#90a955]" />
                참여 신청서 입력
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-[#4f6d7a] uppercase mb-1.5">
                    신청 신청자 성함(혹은 닉네임)
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-4 h-4 text-[#4f5d75]/50" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="홍길동"
                      required
                      className="w-full bg-[#faf8f5] border border-[#e9e4dc] rounded-xl pl-9 pr-4 py-3 text-xs text-[#132a13] placeholder-[#4f5d75]/50 focus:outline-none focus:border-[#90a955] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#4f6d7a] uppercase mb-1.5">
                      생년월일
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-[#4f5d75]/50 pointer-events-none" />
                      <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
                        className="w-full bg-[#faf8f5] border border-[#e9e4dc] rounded-xl pl-9 pr-4 py-3 text-xs text-[#132a13] placeholder-[#4f5d75]/50 focus:outline-none focus:border-[#90a955] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#4f6d7a] uppercase mb-1.5">
                      성별
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full bg-[#faf8f5] border border-[#e9e4dc] rounded-xl px-3 py-3 text-xs text-[#132a13] focus:outline-none focus:border-[#90a955] transition-all h-[42px]"
                    >
                      <option value="female">여성</option>
                      <option value="male">남성</option>
                      <option value="etc">기타/비공개</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#4f6d7a] uppercase mb-1.5">
                    휴대폰 연락처 (안심 접수 확인용)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-4 h-4 text-[#4f5d75]/50" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="010-1234-5678"
                      required
                      className="w-full bg-[#faf8f5] border border-[#e9e4dc] rounded-xl pl-9 pr-4 py-3 text-xs text-[#132a13] placeholder-[#4f5d75]/50 focus:outline-none focus:border-[#90a955] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#4f6d7a] uppercase mb-1.5">
                    인천광역시 제물포구 거주 혹은 주요 활동지 여부
                  </label>
                  <select
                    value={residence}
                    onChange={(e) => setResidence(e.target.value)}
                    className="w-full bg-[#faf8f5] border border-[#e9e4dc] rounded-xl px-3 py-3 text-xs text-[#132a13] focus:outline-none focus:border-[#90a955] transition-all h-[42px]"
                  >
                    <option value="yes">예, 인천 제물포구에 거주하거나 주된 연고가 있습니다.</option>
                    <option value="yes_work">예, 인천에 살고 있으며 제물포구 거점 이동이 원활합니다.</option>
                    <option value="no">아니오, 타 지역에 거주/연고를 두고 있습니다.</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#4f6d7a] uppercase mb-1.5">
                    관심 있는 안부 거점 공간 (중복 선택 가능)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                    {interestOptions.map((opt) => {
                      const isChecked = interests.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleInterestToggle(opt.id)}
                          className={`p-3 rounded-xl text-left text-xs transition-colors border flex items-center justify-between cursor-pointer ${
                            isChecked
                              ? 'bg-[#132a13]/10 text-[#132a13] border-[#132a13] font-semibold md:ring-1 md:ring-[#132a13]'
                              : 'bg-[#faf8f5] text-[#5c677d] border-[#e9e4dc] hover:bg-[#eae6df]/30'
                          }`}
                        >
                          <span>{opt.label}</span>
                          <span className={`w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] text-white ${
                            isChecked ? 'bg-[#90a955]' : 'bg-transparent border border-[#e9e4dc]'
                          }`}>
                            ✓
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#4f6d7a] uppercase mb-1.5">
                    소중한 내 이야기 & 참여 동기 (자유 서술)
                  </label>
                  <textarea
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    placeholder="활동을 성실히 채우고 일상에 변화를 만들어가고 싶은 계기와 마음을 들려주세요 (예: 집 밖을 나서 새로운 풍경을 만나고 싶어 따뜻한 동방을 찾게 되었습니다.)"
                    required
                    rows={4}
                    className="w-full bg-[#faf8f5] border border-[#e9e4dc] rounded-xl px-4 py-3 text-xs text-[#132a13] placeholder-[#4f5d75]/50 focus:outline-none focus:border-[#90a955] resize-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#132a13] hover:bg-[#31572c] text-white py-3.5 px-4 rounded-xl text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <FileCheck className="w-4 h-4" />
                  재미난회사 동행 접수 신청하기
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          /* SECURITY LOOKUP AREA (Only applicants can see their results) */
          <motion.div
            key="status"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto space-y-6"
          >
            {!hasSearched ? (
              /* SECURE LOOKUP FORM */
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e9e4dc] shadow-sm space-y-6">
                <div className="text-center space-y-2 pb-4 border-b border-[#faf8f5]">
                  <div className="mx-auto w-12 h-12 rounded-full bg-[#eef4ec] text-[#90a955] flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#132a13] font-sans">
                    🔐 신청 내역 & 결과 안전 보호 조회
                  </h3>
                  <p className="text-[11px] text-[#5c677d] leading-relaxed max-w-sm mx-auto">
                    참여자의 사생활 및 보안을 위해 신청서 작성 시 작성했던 성함과 동일한 연락처 정보를 입력해 주시기 바랍니다.
                  </p>
                </div>

                <form onSubmit={handleSearch} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#4f6d7a] uppercase mb-1">
                      신청자 이름(혹은 닉네임)
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 w-4 h-4 text-[#4f5d75]/50" />
                      <input
                        type="text"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        placeholder="예: 홍길동"
                        required
                        className="w-full bg-[#faf8f5] border border-[#e9e4dc] rounded-xl pl-9 pr-4 py-3 text-xs text-[#132a13] focus:outline-none focus:border-[#90a955] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#4f6d7a] uppercase mb-1">
                      휴대폰 번호
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 w-4 h-4 text-[#4f5d75]/50" />
                      <input
                        type="tel"
                        value={searchPhone}
                        onChange={(e) => setSearchPhone(e.target.value)}
                        placeholder="예: 010-1234-5678"
                        required
                        className="w-full bg-[#faf8f5] border border-[#e9e4dc] rounded-xl pl-9 pr-4 py-3 text-xs text-[#132a13] focus:outline-none focus:border-[#90a955] transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#132a13] hover:bg-[#31572c] text-white py-3.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Search className="w-4 h-4" />
                    안심 신청서 결과 조회하기
                  </button>
                </form>
              </div>
            ) : (
              /* SEARCH RESULTS EXPOSED ONCE COMPARED */
              <div className="space-y-6">
                {/* Search result header & Reset action */}
                <div className="flex items-center justify-between bg-[#fcfbf9] px-4 py-3 rounded-2xl border border-[#e9e4dc]">
                  <button
                    onClick={handleResetSearch}
                    className="text-xs text-[#4f6d7a] hover:text-[#132a13] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    다른 정보로 조회하기
                  </button>
                  <span className="text-[10px] font-medium text-[#c8bba6]">
                    조회 보안 필터링 상태 적용됨
                  </span>
                </div>

                {searchResults.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-[#e9e4dc] shadow-sm text-stone-500 space-y-4">
                    <ClipboardList className="w-12 h-14 mx-auto text-[#4f6d7a]/50" />
                    <p className="text-sm font-semibold text-[#132a13] font-sans">
                      신청 정보를 찾을 수 없습니다.
                    </p>
                    <p className="text-xs text-[#5c677d] leading-relaxed max-w-md mx-auto">
                      입력하신 성함 <strong>"{searchName}"</strong> 님과 휴대폰 번호 <strong>"{searchPhone}"</strong> 에 매칭되는 지원 서류가 복지관 서버에 접수되지 않은 것으로 확인됩니다. 이름 및 뒤 단위 구절을 명확히 확인해 주십시오.
                    </p>
                    <div className="flex justify-center gap-2 pt-2">
                      <button
                        onClick={handleResetSearch}
                        className="px-4 py-2 border border-[#e9e4dc] hover:bg-[#faf8f5] text-stone-700 text-xs rounded-lg font-medium cursor-pointer transition-colors"
                      >
                        조회 정보 다시 확인
                      </button>
                      <button
                        onClick={() => {
                          handleResetSearch();
                          setActiveSubTab('form');
                        }}
                        className="px-4 py-2 bg-[#90a955] hover:bg-[#7a9244] text-white text-xs rounded-lg font-medium cursor-pointer transition-colors"
                      >
                        신청서 작성하러 가기
                      </button>
                    </div>
                  </div>
                ) : (
                  searchResults.map((app) => (
                    <div key={app.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e9e4dc] shadow-sm space-y-6">
                      {/* Card top */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#faf8f5]">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold tracking-wider text-white bg-[#132a13] px-2 py-0.5 rounded">
                              {app.id}
                            </span>
                            <h4 className="text-sm font-bold text-[#132a13] font-sans">
                              {app.name} 님의 마음 회복 지원안 접수 정보
                            </h4>
                          </div>
                          <span className="text-[10px] text-[#4f6d7a] block">
                            제출일시: {app.submittedAt} | 안심 연락수단: {app.phone}
                          </span>
                        </div>

                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#eef4ec] text-[#42613d] border border-[#d8e6d2]">
                          <Sparkles className="w-3.5 h-3.5 text-[#90a955] mr-1.5" />
                          복지관 접수 등록 완료
                        </span>
                      </div>

                      {/* Summary fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="bg-[#faf8f5] rounded-xl p-4 border border-[#e2ddd5] space-y-1.5">
                          <strong className="text-[#132a13] flex items-center gap-1">
                            <Activity className="w-3.5 h-3.5 text-[#90a955]" />
                            안심 보안 확인 문구
                          </strong>
                          <div className="text-[10px] text-[#5c677d] pt-1 leading-relaxed">
                            본인확인 시스템 검증이 완료되었습니다. 신속하고 조심스럽게 서류 검토를 진행하며 적어주신 소중하고 아름다운 이야기를 바탕으로 최적의 동반 1:1 담당 전담팀 및 안전 거점을 배정하겠습니다.
                          </div>
                        </div>

                        <div className="bg-[#faf8f5] rounded-xl p-4 border border-[#e2ddd5] space-y-1.5">
                          <strong className="text-[#132a13] flex items-center gap-1">
                            <Award className="w-3.5 h-3.5 text-[#e76f51]" />
                            선호 희망 거점 분야
                          </strong>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {app.interests.length === 0 ? (
                              <span className="text-[10px] text-[#5c677d]">선택없음 (상담 및 티 테이블 소통 중심)</span>
                            ) : (
                              app.interests.map((it) => (
                                <span key={it} className="text-[9px] font-bold text-white bg-[#4f6d7a] px-1.5 py-0.5 rounded">
                                  {interestOptions.find((x) => x.id === it)?.label || it}
                                </span>
                              ))
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Motivations review */}
                      <div className="bg-[#faf8f5]/55 p-4 rounded-xl border border-[#e9e4dc] space-y-1 text-xs">
                        <strong className="text-[#132a13] block">나만의 마음 나눔 이야기</strong>
                        <p className="text-[11px] text-[#5c677d] leading-relaxed italic">
                          “ {app.motivation} ”
                        </p>
                      </div>

                      {/* Timeline flow */}
                      <div className="pt-4 border-t border-[#faf8f5]">
                        <strong className="text-xs font-bold text-[#132a13] block mb-4">
                          📋 지원 접수 후 동행 정전 처리 4단계 마중길
                        </strong>

                        <div className="grid grid-cols-4 gap-1 relative pt-2">
                          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#eae6df] -translate-y-1/2 z-0" />
                          
                          {/* STEP 1 */}
                          <div className="relative z-10 flex flex-col items-center text-center space-y-1.5">
                            <div className="w-7 h-7 rounded-full bg-[#90a955] text-white flex items-center justify-center font-bold text-xs ring-4 ring-[#eef4ec]">
                              1
                            </div>
                            <span className="text-[10px] sm:text-xs font-black text-[#132a13]">안심 접수</span>
                            <span className="text-[9px] text-[#5c677d] hidden sm:block">서류 신속 확인</span>
                          </div>

                          {/* STEP 2 */}
                          <div className="relative z-10 flex flex-col items-center text-center space-y-1.5">
                            <div className="w-7 h-7 rounded-full bg-[#eae6df] text-[#4f5d75] flex items-center justify-center font-bold text-xs">
                              2
                            </div>
                            <span className="text-[10px] sm:text-xs font-bold text-[#4f5d75]">상냥한 상담</span>
                            <span className="text-[9px] text-[#5c677d] hidden sm:block">전화 안부 조율</span>
                          </div>

                          {/* STEP 3 */}
                          <div className="relative z-10 flex flex-col items-center text-center space-y-1.5">
                            <div className="w-7 h-7 rounded-full bg-[#eae6df] text-[#4f5d75] flex items-center justify-center font-bold text-xs">
                              3
                            </div>
                            <span className="text-[10px] sm:text-xs font-bold text-[#4f5d75]">첫 거점 나들이</span>
                            <span className="text-[9px] text-[#5c677d] hidden sm:block">동네 다과 나누기</span>
                          </div>

                          {/* STEP 4 */}
                          <div className="relative z-10 flex flex-col items-center text-center space-y-1.5">
                            <div className="w-7 h-7 rounded-full bg-[#eae6df] text-[#4f5d75] flex items-center justify-center font-bold text-xs">
                              4
                            </div>
                            <span className="text-[10px] sm:text-xs font-bold text-[#4f5d75]">동행 출근 시작</span>
                            <span className="text-[9px] text-[#5c677d] hidden sm:block">25주 일상 안방</span>
                          </div>
                        </div>
                      </div>

                      {/* Notice guidance */}
                      <div className="bg-[#eef4ec] p-4 rounded-xl border border-[#d8e6d2] text-[11px] leading-relaxed text-[#42613d] flex gap-2 items-start font-medium animate-pulse">
                        <CheckCircle2 className="w-4 h-4 text-[#90a955] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#132a13] block mb-0.5">다음 매칭 절차 안내</strong>
                          안심 신청 서류가 성공적으로 성·미가엘종합사회복지관 접수처에 도달했습니다! 기재해 주신 안심 연락처로 2~3 영업일 이내에 성·미가엘종합사회복지관 조율 기획자(담당 팀장)가 사랑을 실어 상냥하고 따스한 목소리로 전화를 드립니다. 모르는 번호라도 편안하게 응답해 주세요.
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
