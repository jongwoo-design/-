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
  UserCheck,
  Award,
  HelpCircle,
  Gift
} from 'lucide-react';

export default function ApplySection() {
  const [activeSubTab, setActiveSubTab] = useState<'form' | 'status'>('form');

  // Cozy Daily Checklist (Downplayed, relaxed terminology)
  const lsnsQuestions = [
    { id: 'q1', text: '일주일 동안 편하게 안부를 나누고 조소한 소통을 한 지인/친구가 있나요?', options: ['거의 만나거나 통화하지 못함', '1~2명과 수줍게 주고받음', '대화할 이웃이 든든히 있어 편안함'] },
    { id: 'q2', text: '마음속 무거운 생각이나 가벼운 안부를 속 깊게 들려줄 소울메이트가 존재하나요?', options: ['아쉽게도 거의 없다', '가끔 대화하는 대상이 있다', '언제든 나를 응원하는 이웃이 있다'] },
    { id: 'q3', text: '최근 보름 동안 밖으로 나서서 새로운 풍경이나 모임에 참여해 본 적이 있나요?', options: ['집 밖 나들이가 드물었다', '필수 볼일로 가끔 다녀왔다', '산책과 참여를 고르게 누렸다'] }
  ];

  const hqQuestions = [
    { id: 'q4', text: '평소 내 주거 공간(방/거실) 밖으로 나서는 발걸음의 주기가 어떠한가요?', options: ['거의 실내에서 쉼', '용기 내어 필요할 때 외출함', '자유롭게 동네를 누빔'] },
    { id: 'q5', text: '가끔 내가 가야 할 길을 잃은 채 세상에서 홀로 우두커니 쉬고 있다는 느낌을 받나요?', options: ['자주 머릿속이 복잡해옴', '가끔 쓸쓸함이 찾아옴', '거의 평온하게 지냄'] },
    { id: 'q6', text: '낯선 사람을 조우하거나 전화를 받는 행동이 지쳐서 잠시 연결을 끊어두고 싶나요?', options: ['대체로 연결이 무겁고 조심스러움', '컨디션에 따라 조금 회피함', '자연스럽게 마주함'] }
  ];

  // Mind-state check answers
  const [assessmentAnswers, setAssessmentAnswers] = useState<{ [key: string]: number }>({});
  const [diagnosticResult, setDiagnosticResult] = useState<{ isolationText: string; seclusionText: string; totalPower: number } | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('female');
  const [residence, setResidence] = useState('yes');
  const [motivation, setMotivation] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  
  const [applications, setApplications] = useState<Application[]>([]);
  const [lastSubmittedId, setLastSubmittedId] = useState<string | null>(null);

  const interestOptions = [
    { id: 'cafe', label: '느호카페 바리스타 & 온기 베이킹' },
    { id: 'wood', label: '나무디자인 원목 소 가구 공예 및 사포 이완' },
    { id: 'leather', label: '재미난가죽 전 가죽공예 한 땀 한 코 아지트' },
    { id: 'emotion', label: '1:1 편안한 마음 채움 안부 상담 및 다도(茶)' },
    { id: 'project', label: '연결 캠페인 골목 팝업 축제 및 이웃 나눔' }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('funco_applications');
    if (saved) {
      setApplications(JSON.parse(saved));
    }
  }, []);

  const handleDiagnosticAnswer = (qId: string, optionIndex: number) => {
    setAssessmentAnswers((prev) => ({
      ...prev,
      [qId]: optionIndex
    }));
  };

  const handleRunDiagnosis = () => {
    // Collect raw scores (0 to 2 for each question)
    let relationScore = 0;
    let activityScore = 0;

    lsnsQuestions.forEach((q) => {
      relationScore += (assessmentAnswers[q.id] !== undefined ? assessmentAnswers[q.id] : 1);
    });

    hqQuestions.forEach((q) => {
      activityScore += (assessmentAnswers[q.id] !== undefined ? assessmentAnswers[q.id] : 1);
    });

    // 0 is low activity/connection (needs warm invitation), 6 is high
    const totalPower = relationScore + activityScore;

    let isolationText = '';
    let seclusionText = '';

    if (relationScore <= 2) {
      isolationText = '가까이서 따뜻한 이야기를 나눌 다정한 대면 친구가 그리운 시기';
    } else if (relationScore <= 4) {
      isolationText = '차근차근 가벼운 안부를 나누며 관계의 싹을 틔우기 좋은 시기';
    } else {
      isolationText = '든든한 이웃들과 조화로운 나눔꽃을 활짝 꽃피울 수 있는 상태';
    }

    if (activityScore <= 2) {
      seclusionText = '가벼운 바깥바람을 쐬고 사포질을 하며 마음을 환기하기 딱 좋은 계절';
    } else if (activityScore <= 4) {
      seclusionText = '생활 주기를 규칙적인 출퇴근으로 살며시 조율하기 좋은 안정된 상태';
    } else {
      seclusionText = '나의 재능을 마켓에 뽐내고 당당하게 교류할 수 있는 풍요로운 단계';
    }

    setDiagnosticResult({
      isolationText,
      seclusionText,
      totalPower
    });
  };

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

    // Use default values if checklist wasn't run
    const diagScore = diagnosticResult ? {
      isolation: Math.ceil(diagnosticResult.totalPower / 2),
      seclusion: 6 - Math.ceil(diagnosticResult.totalPower / 2)
    } : { isolation: 3, seclusion: 3 };

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
        diagnosticScore: `관계 소통 상태: ${diagScore.isolation}단계 / 주거 생활 상태: ${diagScore.seclusion}단계`,
        submittedAt: newApp.submittedAt
      })
    }).catch(err => console.error('Formspree submit error:', err));

    const updated = [newApp, ...applications];
    setApplications(updated);
    localStorage.setItem('funco_applications', JSON.stringify(updated));
    setLastSubmittedId(newApp.id);

    // Reset Form
    setName('');
    setPhone('');
    setBirthDate('');
    setMotivation('');
    setInterests([]);
    setDiagnosticResult(null);
    setAssessmentAnswers({});
    
    // Auto switch to status tab
    setActiveSubTab('status');
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
          {applications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#e76f51] text-white font-mono font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center animate-bounce">
              {applications.length}
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
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
          >
            {/* LEFT SIDE: COZY CHECKLIST (7 Columns) */}
            <div className="lg:col-span-7 space-y-8">
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
                  작성해 주시는 모든 내용 및 마음 안부 일지는 오로지 성·미가엘종합사회복지관 전문 자문위원과의 다정다감한 1:1 맞춤 소그룹 세팅을 위해서만 활용됩니다. 편안히 기재하셔도 좋습니다.
                </p>
              </div>

              {/* Casual Mind Diagnostic */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e9e4dc] shadow-sm space-y-6">
                <div>
                  <span className="text-[#90a955] text-xs font-mono font-bold uppercase tracking-wider block">
                    Daily Mind & Life Rhythm Check
                  </span>
                  <h3 className="text-lg font-bold text-[#132a13] font-sans">
                    🌱 마음 건강 & 일상 생활 속도 체크 (나의 안심 일지)
                  </h3>
                  <p className="text-[11px] text-[#4f5d75] mt-1">
                    현재 나의 가볍고 소박한 일상 주기를 파악해 보고 나에게 어떤 공방과 티타임이 가장 평온함을 선사할지 살펴보는 과정입니다.
                  </p>
                </div>

                {/* Section 1: Connection 안심 질문 */}
                <div className="space-y-4">
                  <span className="text-xs font-bold text-[#4f6d7a] block pb-1.5 border-b border-[#faf8f5]">
                    💬 마음 소통 및 안부 체크리스트
                  </span>
                  {lsnsQuestions.map((q) => (
                    <div key={q.id} className="space-y-2">
                      <p className="text-xs font-semibold text-[#132a13]">{q.text}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = assessmentAnswers[q.id] === oIdx;
                          return (
                            <button
                              key={oIdx}
                              type="button"
                              onClick={() => handleDiagnosticAnswer(q.id, oIdx)}
                              className={`p-2.5 rounded-lg text-xs text-left cursor-pointer transition-all border ${
                                isSelected
                                  ? 'bg-[#90a955] text-white border-[#90a955] font-semibold shadow-sm'
                                  : 'bg-[#faf8f5] text-[#5c677d] border-[#e9e4dc] hover:bg-[#eae6df]/50'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Section 2: Activity 안심 질문 */}
                <div className="space-y-4 pt-4">
                  <span className="text-xs font-bold text-[#4f6d7a] block pb-1.5 border-b border-[#faf8f5]">
                    🏡 일상 한걸음 & 공간 나들이 체크리스트
                  </span>
                  {hqQuestions.map((q) => (
                    <div key={q.id} className="space-y-2">
                      <p className="text-xs font-semibold text-[#132a13]">{q.text}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = assessmentAnswers[q.id] === oIdx;
                          return (
                            <button
                              key={oIdx}
                              type="button"
                              onClick={() => handleDiagnosticAnswer(q.id, oIdx)}
                              className={`p-2.5 rounded-lg text-xs text-left cursor-pointer transition-all border ${
                                isSelected
                                  ? 'bg-[#4f6d7a] text-white border-[#4f6d7a] font-semibold shadow-sm'
                                  : 'bg-[#faf8f5] text-[#5c677d] border-[#e9e4dc] hover:bg-[#eae6df]/50'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculate Actions */}
                <div className="pt-4 border-t border-[#e9e4dc] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#faf8f5]/50 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6">
                  <button
                    type="button"
                    onClick={handleRunDiagnosis}
                    className="w-full sm:w-auto bg-[#e76f51] hover:bg-[#d65f42] text-white px-5 py-3 rounded-xl text-xs font-semibold cursor-pointer transition-colors shrink-0"
                  >
                    📊 안심 체크 마스코트 소견 보기
                  </button>

                  <div className="flex-1 text-left sm:text-right">
                    {diagnosticResult ? (
                      <div className="bg-white p-3 rounded-xl border border-[#e9e4dc] text-[11px] leading-relaxed text-[#132a13] space-y-1">
                        <div>🌱 <span className="font-bold">소통 여울:</span> {diagnosticResult.isolationText}</div>
                        <div>🏡 <span className="font-bold">나들이 무드:</span> {diagnosticResult.seclusionText}</div>
                      </div>
                    ) : (
                      <span className="text-[11px] text-[#4f5d75]">
                        일상 속 마중물 소견은, 내가 바랐던 조그만 마음 쉼표와 거점을 다정히 버무려 줍니다.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: CORE REGISTRY FORM (5 Columns) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#e9e4dc] shadow-sm">
              <h3 className="text-lg font-bold text-[#132a13] font-sans flex items-center gap-2 mb-6">
                <ClipboardList className="w-5 h-5 text-[#90a955]" />
                재미난회사 참여 신청서 작성
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-[#4f6d7a] uppercase mb-1">
                    신청 청년 성함(혹은 닉네임)
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
                    <label className="block text-[10px] font-bold text-[#4f6d7a] uppercase mb-1">
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
                    <label className="block text-[10px] font-bold text-[#4f6d7a] uppercase mb-1">
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
                  <label className="block text-[10px] font-bold text-[#4f6d7a] uppercase mb-1">
                    휴대폰 연락처 (안심 보증)
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
                  <label className="block text-[10px] font-bold text-[#4f6d7a] uppercase mb-1">
                    인천광역시 제물포구 거주 혹은 주요 활동지 여부
                  </label>
                  <select
                    value={residence}
                    onChange={(e) => setResidence(e.target.value)}
                    className="w-full bg-[#faf8f5] border border-[#e9e4dc] rounded-xl px-3 py-3 text-xs text-[#132a13] focus:outline-none focus:border-[#90a955] transition-all h-[42px]"
                  >
                    <option value="yes">예, 인천 제물포구에 거주하거나 주된 연고가 있습니다.</option>
                    <option value="yes_work">예, 인천에 살고 있으며 인천 제물포구 거점 이동이 수월합니다.</option>
                    <option value="no">아니오, 타 지역에 연고를 두고 있습니다.</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#4f6d7a] uppercase mb-1">
                    관심 있는 안부 거점 공간 (중복 선택 가능)
                  </label>
                  <div className="grid grid-cols-1 gap-1.5 mt-1">
                    {interestOptions.map((opt) => {
                      const isChecked = interests.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleInterestToggle(opt.id)}
                          className={`p-2 rounded-xl text-left text-xs transition-colors border flex items-center justify-between cursor-pointer ${
                            isChecked
                              ? 'bg-[#132a13]/10 text-[#132a13] border-[#132a13] font-semibold'
                              : 'bg-[#faf8f5] text-[#5c677d] border-[#e9e4dc] hover:bg-[#eae6df]/30'
                          }`}
                        >
                          <span>{opt.label}</span>
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white ${
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
                  <label className="block text-[10px] font-bold text-[#4f6d7a] uppercase mb-1">
                    소중한 내 마음 이야기 & 참여 동기 (자유 서술)
                  </label>
                  <textarea
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    placeholder="예: 집 밖을 무언가 목적으로 나서는 일이 오랫동안 두렵고 어색했습니다. 이번 기회에 인천 제물포구의 편안한 느호카페와 가죽, 목공 공방들이 있다는 얘길 듣고 자상한 분들과 함께 사포를 만지작거리며 굳어있던 일상의 결을 부드럽게 쓰다듬고 싶어 조심스레 노크합니다."
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
                  재미난회사 참여 희망 서류 접수하기
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          /* STATUS TIMELINE LOOKUP */
          <motion.div
            key="status"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            {applications.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#e9e4dc] shadow-sm text-stone-500 space-y-4">
                <ClipboardList className="w-12 h-14 mx-auto text-[#4f6d7a]/50" />
                <p className="text-sm font-semibold text-[#132a13] font-sans">제출 완료된 동행 신청서 목록이 비어있습니다.</p>
                <p className="text-xs text-[#5c677d] leading-relaxed max-w-md mx-auto">
                  왼쪽의 <strong>[재미난회사 참여 신청서 작성]</strong> 탭을 클릭하여 신청을 진행해 주세요.
                </p>
                <button
                  onClick={() => setActiveSubTab('form')}
                  className="px-4 py-2 bg-[#90a955] hover:bg-[#7a9244] text-white text-xs rounded-lg font-medium cursor-pointer transition-colors"
                >
                  지금 첫걸음 시작하기
                </button>
              </div>
            ) : (
              applications.map((app) => (
                <div key={app.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e9e4dc] shadow-sm space-y-6">
                  {/* Card top */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#faf8f5]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold tracking-wider text-white bg-[#132a13] px-2 py-0.5 rounded">
                          {app.id}
                        </span>
                        <h4 className="text-sm font-bold text-[#132a13] font-sans">
                          {app.name} 님의 마음 회복 안심 신청
                        </h4>
                      </div>
                      <span className="text-[10px] text-[#4f6d7a] block">
                        제출시간: {app.submittedAt} | 안심연락처: {app.phone}
                      </span>
                    </div>

                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#eef4ec] text-[#42613d] border border-[#d8e6d2]">
                      <Sparkles className="w-3.5 h-3.5 text-[#90a955] mr-1.5" />
                      성·미가엘복지관 안심 접수 완료
                    </span>
                  </div>

                  {/* Submission details review */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-[#faf8f5] rounded-xl p-4 border border-[#e2ddd5] space-y-1.5">
                      <strong className="text-[#132a13] flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5 text-[#90a955]" />
                        함께 조율해 나갈 지표
                      </strong>
                      <div className="text-[10px] text-[#5c677d] pt-1 leading-relaxed">
                        자가진단 체크에 성실하게 응답해 주셨습니다. 작성해 주신 안부 속 무드를 기반으로, 억압 없는 조화로운 1:1 안내 멘토와 최상의 쉼정 소그룹 매칭을 수립하겠습니다.
                      </div>
                    </div>

                    <div className="bg-[#faf8f5] rounded-xl p-4 border border-[#e2ddd5] space-y-1.5">
                      <strong className="text-[#132a13] flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-[#e76f51]" />
                        눈도장 찍은 관심 거점 공간
                      </strong>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {app.interests.length === 0 ? (
                          <span className="text-[10px] text-[#5c677d]">선택없음 (티룸 소통 및 상담 우수 매칭)</span>
                        ) : (
                          app.interests.map((it) => (
                            <span key={it} className="text-[9px] font-bold text-white bg-[#4f6d7a] px-1.5 py-0.5 rounded">
                              {interestOptions.find((x) => x.id === it)?.label.split(' ')[0]}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Motivations preview */}
                  <div className="bg-[#faf8f5]/55 p-4 rounded-xl border border-[#e9e4dc] space-y-1 text-xs">
                    <strong className="text-[#132a13] block">나만의 마음 나눔 이야기</strong>
                    <p className="text-[11px] text-[#5c677d] leading-relaxed italic">
                      “ {app.motivation} ”
                    </p>
                  </div>

                  {/* Interactive Status Timeline Progress */}
                  <div className="pt-4 border-t border-[#faf8f5]">
                    <strong className="text-xs font-bold text-[#132a13] block mb-4">
                      📋 지원 후 동행 정전 처리 4단계 마중길
                    </strong>

                    <div className="grid grid-cols-4 gap-1 relative pt-2">
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#eae6df] -translate-y-1/2 z-0" />
                      
                      {/* STEP 1: PENDING */}
                      <div className="relative z-10 flex flex-col items-center text-center space-y-1.5">
                        <div className="w-7 h-7 rounded-full bg-[#90a955] text-white flex items-center justify-center font-bold text-xs ring-4 ring-[#eef4ec]">
                          1
                        </div>
                        <span className="text-[10px] sm:text-xs font-black text-[#132a13]">안심 접수</span>
                        <span className="text-[9px] text-[#5c677d] hidden sm:block">신속한 서류 확인</span>
                      </div>

                      {/* STEP 2: PHONE CALL */}
                      <div className="relative z-10 flex flex-col items-center text-center space-y-1.5">
                        <div className="w-7 h-7 rounded-full bg-[#eae6df] text-[#4f5d75] flex items-center justify-center font-bold text-xs">
                          2
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold text-[#4f5d75]">상냥한 전화상담</span>
                        <span className="text-[9px] text-[#5c677d] hidden sm:block">조심스러운 안부 조율</span>
                      </div>

                      {/* STEP 3: INTERVIEW */}
                      <div className="relative z-10 flex flex-col items-center text-center space-y-1.5">
                        <div className="w-7 h-7 rounded-full bg-[#eae6df] text-[#4f5d75] flex items-center justify-center font-bold text-xs">
                          3
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold text-[#4f5d75]">거점 첫 나들이</span>
                        <span className="text-[9px] text-[#5c677d] hidden sm:block">자상한 동네 차 마시기</span>
                      </div>

                      {/* STEP 4: ACCESS */}
                      <div className="relative z-10 flex flex-col items-center text-center space-y-1.5">
                        <div className="w-7 h-7 rounded-full bg-[#eae6df] text-[#4f5d75] flex items-center justify-center font-bold text-xs">
                          4
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold text-[#4f5d75]">동행 출근 시작</span>
                        <span className="text-[9px] text-[#5c677d] hidden sm:block">25주 회복길 시작</span>
                      </div>
                    </div>
                  </div>

                  {/* Gentle guidance notice block */}
                  <div className="bg-[#eef4ec] p-4 rounded-xl border border-[#d8e6d2] text-[11px] leading-relaxed text-[#42613d] flex gap-2 items-start font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#90a955] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#132a13] block mb-0.5">다음 매칭 절차 안내</strong>
                      안심 신청이 성공적으로 복지관 접수처에 도달했습니다! 기재해 주신 연락처로 2~3 영업일 이내에 성·미가엘종합사회복지관 조율 기획자(담당 팀장)가 사랑을 실어 상냥하고 걱정 없는 목소리로 전화를 드립니다. 낯선 번호라도 편안히 응답해 주셔요.
                    </div>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
