/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_CHEERING_MESSAGES } from '../data/mockData';
import { CheeringMessage } from '../types';
import { MessageSquare, Heart, Sparkles, Send, Gift, ThumbsUp } from 'lucide-react';

export default function CampaignSection() {
  const [messages, setMessages] = useState<CheeringMessage[]>([]);
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [text, setText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🌱');
  const [likes, setLikes] = useState<{ [key: string]: number }>({});

  const emojis = ['🌱', '☕', '🧵', '🧡', '✨', '🌻', '🏡', '🚲', '🎈', '🍪', '🪵'];

  useEffect(() => {
    const saved = localStorage.getItem('funco_cheering_messages');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages(INITIAL_CHEERING_MESSAGES);
      localStorage.setItem('funco_cheering_messages', JSON.stringify(INITIAL_CHEERING_MESSAGES));
    }

    const savedLikes = localStorage.getItem('funco_message_likes');
    if (savedLikes) {
      setLikes(JSON.parse(savedLikes));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || !text.trim()) return;

    const newMessage: CheeringMessage = {
      id: `cheer-${Date.now()}`,
      nickname: nickname.trim(),
      message: text.trim(),
      emoji: selectedEmoji,
      createdAt: new Date().toISOString().split('T')[0],
      phone: phone.trim() ? phone.trim() : undefined
    };

    // Post to Formspree
    fetch('https://formspree.io/f/xlgkykvq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        formType: '따스한 연결 엽서',
        nickname: newMessage.nickname,
        message: newMessage.message,
        emoji: newMessage.emoji,
        phone: newMessage.phone || '입력 안 함',
        submittedAt: newMessage.createdAt
      })
    }).catch(err => console.error('Formspree submit error:', err));

    const updated = [newMessage, ...messages];
    setMessages(updated);
    localStorage.setItem('funco_cheering_messages', JSON.stringify(updated));

    // Reset input fields
    setNickname('');
    setPhone('');
    setText('');
    setSelectedEmoji('🌱');
  };

  const handleLike = (id: string) => {
    const newLikes = {
      ...likes,
      [id]: (likes[id] || 0) + 1
    };
    setLikes(newLikes);
    localStorage.setItem('funco_message_likes', JSON.stringify(newLikes));
  };

  // Participant Craft Products Showcase for the connection Campaign
  const crafts = [
    {
      name: '단풍나무 티우드 트레이',
      creator: '원목 팀 사포 작업작',
      desc: '품을 여러 번 들여 천연 동백오일로 은은하게 마감하여 향긋한 커피와 차를 품기 좋은 수공예 원목 트레이입니다.',
      priceExchange: '추첨 발송 🎁',
      image: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=400&auto=format&fit=crop'
    },
    {
      name: '베지터블 레더 에어팟 포켓',
      creator: '가죽 팀 바느질 작업작',
      desc: '친환경 베지터블 가죽에 한 땀 한 땀 튼튼하게 실을 엮고 스냅 단추를 달아 가죽의 멋이 살아나는 무선 이어폰 케이스입니다.',
      priceExchange: '추첨 발송 🎁',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=400&auto=format&fit=crop'
    },
    {
      name: '느호 원두 드립백 & 쿠키보틀',
      creator: '바리스타 및 베이킹 팀',
      desc: '느호카페 오븐에서 갓 구운 바삭한 수제 미니 쿠키들과 정성스레 분쇄해서 담아낸 드립백 커피 세트입니다.',
      priceExchange: '추첨 발송 🎁',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=400&auto=format&fit=crop'
    }
  ];

  return (
    <div className="space-y-24 py-12">
      {/* 1. 연결캠페인 취지 및 성과 슬라이드 */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-[#e9e4dc] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-6">
          <span className="text-[#e76f51] text-xs font-mono font-bold uppercase tracking-wider block">
            Co-Existence Initiative
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#132a13] font-sans">
            문턱을 낮추고 이웃과 마주서는 날
          </h2>
          <p className="text-sm font-sans text-[#4f5d75] leading-relaxed">
            고립과 은둔을 허물고 방문 밖을 나와 자기만의 안전한 삶을 구축하는 데에는 
            지역사회의 지지와 따스한 시선이 필수적입니다. <br />
            참여자분들의 마음 회복과 자립을 성원해 주시는 <strong>따스한 연결 엽서</strong>를 하단 엽서함에 남겨주세요. 엽서를 채워주신 분들 중 추첨을 통해 참여자들께서 한 땀 한 땀 정성을 듬뿍 담아 완성한 수공예품 선물을 보내 드립니다.
          </p>

          <div className="bg-[#fcfbf9] rounded-2xl p-5 border border-[#e9e4dc] flex items-start gap-3">
            <Gift className="w-5 h-5 text-[#90a955] shrink-0 mt-0.5" />
            <div className="text-xs text-[#4f5d75]">
              <strong className="text-[#132a13]">응원 엽서 & 추첨 선물 참여 안내</strong> <br/>
              이웃들이 무관심과 편견을 지우고 진심으로 건네준 따뜻한 엽서 한 장은 방문을 여는 가장 든든한 용기가 됩니다. 정성스레 엽서를 남겨 주신 이웃분들 중 정기 추첨을 진행해 참여자들의 고운 손길이 머문 수공예 일상 굿즈를 감사의 마음으로 배송해 드립니다.
            </div>
          </div>
        </div>

        {/* Crafts lists */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-base font-bold text-[#132a13] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#90a955]" />
            캠페인을 통해 제작되는 수공예품 (추첨 선물 예시)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {crafts.map((craft, i) => (
              <div key={i} className="bg-[#faf8f5] rounded-xl overflow-hidden border border-[#e9e4dc] flex flex-col justify-between group">
                <div className="aspect-video relative overflow-hidden bg-stone-100">
                  <img
                    src={craft.image}
                    alt={craft.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute right-2 bottom-2 bg-[#90a955] text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-md shadow">
                    {craft.priceExchange}
                  </div>
                </div>
                <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#132a13] line-clamp-1 group-hover:text-[#90a955]">
                      {craft.name}
                    </h4>
                    <span className="text-[10px] text-[#4f6d7a] font-semibold block">
                      {craft.creator}
                    </span>
                    <p className="text-[10px] leading-relaxed text-[#5c677d] mt-2 line-clamp-3">
                      {craft.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 응원 메시지 보드 (interactive widget) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left column: write message form */}
        <div className="lg:col-span-4 bg-[#faf8f5] rounded-3xl p-6 sm:p-8 border border-[#e9e4dc] shadow-sm">
          <h3 className="text-lg font-bold text-[#132a13] flex items-center gap-2 mb-4 font-sans">
            <MessageSquare className="w-5 h-5 text-[#90a955]" />
            따스한 연결 엽서 남기기
          </h3>
          <p className="text-[11px] leading-relaxed text-[#4f5d75] mb-6">
            방 밖으로 한 걸음 내딛는 일은 누구보다 끈기 있는 용기가 필요합니다. 마음을 여는 모든 참여자분들이 잔잔하게 미소 지을 수 있는 응원을 듬뿍 들려주세요.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-[#4f6d7a] uppercase mb-1">
                작성자 닉네임
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="예: 제물포이웃 / 미소이웃"
                required
                maxLength={15}
                className="w-full bg-white border border-[#e9e4dc] rounded-xl px-4 py-2.5 text-xs text-[#132a13] placeholder-[#4f5d75]/50 focus:outline-none focus:border-[#90a955] transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#4f6d7a] uppercase mb-1 flex items-center justify-between">
                <span>전화번호 (선택)</span>
                <span className="text-[9px] text-[#90a955] font-normal lowercase">🔒 관리자 비공개 보호</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="예: 010-1234-5678 (추첨 선물 연락용)"
                maxLength={20}
                className="w-full bg-white border border-[#e9e4dc] rounded-xl px-4 py-2.5 text-xs text-[#132a13] placeholder-[#4f5d75]/50 focus:outline-none focus:border-[#90a955] transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#4f6d7a] uppercase mb-1">
                아이콘 선택
              </label>
              <div className="flex flex-wrap gap-1 bg-white p-2 rounded-xl border border-[#e9e4dc]">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`w-7 h-7 text-xs rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                      selectedEmoji === emoji ? 'bg-[#90a955] text-white scale-110' : 'hover:bg-[#eae6df]'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#4f6d7a] uppercase mb-1">
                응원과 공감 한마디 (최대 100자)
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="어려운 순간 함께 이겨낼 수 있어요. 늘 기대하고 힘차게 박수를 보냅니다!"
                required
                maxLength={100}
                rows={3}
                className="w-full bg-white border border-[#e9e4dc] rounded-xl px-4 py-2.5 text-xs text-[#132a13] placeholder-[#4f5d75]/50 focus:outline-none focus:border-[#90a955] resize-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#132a13] hover:bg-[#31572c] text-white py-3 px-4 rounded-xl text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              엽서 보내기
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Right column: messages board flow */}
        <div className="lg:col-span-8 flex flex-col justify-between max-h-[500px]" style={{ contain: 'layout' }}>
          <div className="flex items-center justify-between pb-3 border-b border-[#e9e4dc] mb-4">
            <span className="text-xs font-bold text-[#132a13] flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-[#e76f51] animate-pulse" />
              참여자가 직접 읽는 이웃들의 엽서함 ({messages.length})
            </span>
            <span className="text-[10px] font-medium text-[#4f6d7a]">
              * 비방이나 무관한 글은 상시 가온나무 정밀하게 검토됩니다.
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 custom-scrollbar">
            <AnimatePresence initial={false}>
              {messages.length === 0 ? (
                <div className="text-center py-20 text-[#5c677d] text-xs">
                  엽서가 아직 비어 있습니다. 첫 번째 따듯한 손길을 건네주세요!
                </div>
              ) : (
                messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="p-4 bg-white rounded-2xl border border-[#e9e4dc] flex items-start gap-4 hover:border-[#4f6d7a]/50 transition-all shadow-sm relative group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#faf8f5] border border-[#e9e4dc] flex items-center justify-center text-lg shrink-0">
                      {msg.emoji}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <strong className="text-xs font-bold text-[#132a13]">
                          {msg.nickname}
                        </strong>
                        {msg.phone && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#90a955]/10 text-[#42613d] text-[8px] sm:text-[9px] font-medium" title="관리자용 연락처가 기록되었습니다. 일반 사용자에게는 노출되지 않습니다.">
                            🔒 연락처 안심 보호됨
                          </span>
                        )}
                        <span className="text-[9px] text-[#4f6d7a] font-mono font-medium ml-auto sm:ml-0">
                          {msg.createdAt}
                        </span>
                      </div>
                      <p className="text-xs text-[#4f5d75] leading-relaxed pr-10">
                        {msg.message}
                      </p>
                    </div>

                    {/* Like Action Widget */}
                    <button
                      onClick={() => handleLike(msg.id)}
                      className="absolute right-3 bottom-3 sm:top-1/2 sm:-translate-y-1/2 p-2 rounded-lg bg-[#faf8f5] hover:bg-[#eef4ec] text-[#4f5d75] hover:text-[#42613d] flex items-center gap-1 text-[11px] font-semibold border border-[#e9e4dc] cursor-pointer transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{likes[msg.id] || 0}</span>
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
