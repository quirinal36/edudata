'use client';

import React, { useState, useEffect } from 'react';
import { Compass, Search, Map as MapIcon, BarChart3, AlertCircle, Cpu, Stethoscope, Palette, Settings, School, FlaskConical, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface InfraData {
  ATPT_OFCDC_SC_NM: string;
  ADMST_ZONE_NM: string;
  count: number;
}

const CAREER_CATEGORIES = [
  { id: 'it', name: 'AI/SW', icon: Cpu, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'medical', name: '의료/보건', icon: Stethoscope, color: 'text-rose-500', bg: 'bg-rose-50' },
  { id: 'art', name: '문화/예술', icon: Palette, color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: 'eng', name: '공학/제조', icon: Settings, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'edu', name: '교육/사회', icon: School, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 'science', name: '자연과학', icon: FlaskConical, color: 'text-indigo-500', bg: 'bg-indigo-50' },
];

// 분야별/상황별 대체 활동 데이터베이스 (기획안 기반)
const RECOMMENDATION_ENGINE: Record<string, { high: string[], low: string[] }> = {
  it: {
    high: ['지역 IT 센터 인턴십 참여', '인근 대학 소프트웨어 중심 대학 특강 신청', '로컬 해커톤 대회 참여'],
    low: ['온라인 코딩 부트캠프(CS50 등) 수강', '공공데이터 포털 오픈 API 활용 프로젝트', '오픈소스 커뮤니티 기여 활동']
  },
  medical: {
    high: ['거점 국립대 병원 견학 프로그램', '지역 보건소 금연/건강 캠페인 자원봉사', '의료기기 제조기업 탐방'],
    low: ['Coursera 등 글로벌 의료 통계 강의 수강', '의학 논문 리뷰 블로그 운영', '공중보건 데이터 분석 리포트 작성']
  },
  art: {
    high: ['지역 미술관 큐레이터 보조 활동', '문화예술교육사 연계 워크숍 참여', '동네 예술가 인터뷰 프로젝트'],
    low: ['Behance 개인 포트폴리오 구축', '비대면 전시 기획 및 디지털 드로잉', '온라인 예술 공모전 도전']
  },
  eng: {
    high: ['테크노파크 메이커스페이스 장비 교육', '산업단지 내 공학 멘토링 프로그램', '드론 조종 및 정비 자격증 과정'],
    low: ['Arduino/ESP32 활용 자가 프로젝트', '공학 유튜브 채널 번역 및 학습', '3D 모델링 독학 및 디자인 공유']
  },
  science: {
    high: ['과학관 에듀케이터 보조 활동', '인근 대학 기초과학연구소 탐방', '천문대 야간 관측 프로그램'],
    low: ['국립중앙과학관 온라인 교육 수강', '과학 유튜브 채널 운영', '공공 대기질 분석 프로젝트']
  }
};

export default function DiagnosisPage() {
  const [data, setData] = useState<InfraData[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('it');
  const [filteredData, setFilteredData] = useState<InfraData | null>(null);

  useEffect(() => {
    fetch('/data/it_infra.json')
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  const handleSearch = () => {
    const found = data.find(item => item.ADMST_ZONE_NM.includes(selectedRegion) || selectedRegion.includes(item.ADMST_ZONE_NM));
    setFilteredData(found || null);
  };

  const calculateScore = (count: number) => {
    const score = Math.min((count / 25) * 100, 100).toFixed(1);
    return score;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Compass className="text-blue-600 w-6 h-6" />
            <span className="text-lg font-bold">EduBridge</span>
          </Link>
          <div className="text-sm font-medium text-slate-500">지능형 진로활동 추천 시스템</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        <section className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-black text-slate-900 mb-2">진로활동 맞춤형 진단</h2>
          <p className="text-slate-500">당신의 꿈이 어디서든 실현될 수 있도록, 지역 데이터와 선호 진로를 결합합니다.</p>
        </section>

        {/* Career Selection Bar */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
          {CAREER_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex flex-col items-center p-4 rounded-2xl border transition-all ${
                selectedCategory === cat.id 
                  ? `border-slate-900 bg-slate-900 text-white shadow-xl scale-105 z-10` 
                  : `border-slate-200 bg-white hover:border-slate-300 text-slate-600`
              }`}
            >
              <cat.icon className={`w-6 h-6 mb-2 ${selectedCategory === cat.id ? 'text-white' : cat.color}`} />
              <span className="text-sm font-bold">{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Search Box */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <label className="block text-sm font-bold text-slate-700 mb-2 underline decoration-blue-200 underline-offset-4 decoration-4">거주 동네 검색 (구 단위)</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  placeholder="예: 강남구, 덕진구, 달서구"
                  className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Search className="absolute left-3 top-4.5 text-slate-400 w-5 h-5" />
              </div>
              <button 
                onClick={handleSearch}
                className="w-full mt-4 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
              >
                지역 및 진로 분석
              </button>
            </div>
            
            <div className="bg-slate-900 p-6 rounded-3xl text-white">
              <h4 className="font-bold flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-blue-400" />
                분야별 데이터 안내
              </h4>
              <p className="text-xs opacity-70 leading-relaxed">
                선택하신 <b>{CAREER_CATEGORIES.find(c => c.id === selectedCategory)?.name}</b> 분야는 현재 공공 데이터 연동 중입니다. 인프라 지수는 지역의 종합 교육 자원과 가용 인력을 바탕으로 산출됩니다.
              </p>
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-2">
            {filteredData ? (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
                {/* Result Card */}
                <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-200">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-2xl font-bold">{filteredData.ADMST_ZONE_NM} <span className="text-slate-400 font-normal">진단</span></h3>
                      <div className="mt-1 flex gap-2">
                        <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">전공: {selectedCategory.toUpperCase()}</span>
                        <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono">CODE: {filteredData.ATPT_OFCDC_SC_NM.substring(0,3)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Career Opportunity Index</div>
                      <div className="text-4xl font-black text-blue-600">{calculateScore(filteredData.count)}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <div className="text-[10px] font-bold text-slate-400 mb-1">인프라 밀도</div>
                      <div className="text-xl font-bold">{filteredData.count} <span className="text-sm font-normal text-slate-400">자원</span></div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <div className="text-[10px] font-bold text-slate-400 mb-1">활동 기회</div>
                      <div className="text-xl font-bold">{filteredData.count > 15 ? '풍부함' : '개척 필요'}</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl col-span-2 md:col-span-1">
                      <div className="text-[10px] font-bold text-slate-400 mb-1">인접 교육청</div>
                      <div className="text-sm font-bold truncate">{filteredData.ATPT_OFCDC_SC_NM}</div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
                      💡 데이터 기반 {CAREER_CATEGORIES.find(c => c.id === selectedCategory)?.name} 진로 활동 추천
                    </h4>
                    <div className="grid gap-3">
                      {(filteredData.count > 15 
                        ? (RECOMMENDATION_ENGINE[selectedCategory]?.high || RECOMMENDATION_ENGINE['it'].high)
                        : (RECOMMENDATION_ENGINE[selectedCategory]?.low || RECOMMENDATION_ENGINE['it'].low)
                      ).map((task, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white hover:border-blue-200 hover:shadow-md transition cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">{idx + 1}</div>
                            <span className="text-sm font-medium group-hover:text-blue-600 transition">{task}</span>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-600" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-16 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                  <MapIcon className="text-slate-300 w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">우리 동네 진단 대기 중</h3>
                  <p className="text-sm text-slate-400 max-w-[280px] mx-auto mt-2">
                    좌측 검색창에서 거주하는 구(예: 덕진구)를 입력하고, 관심 있는 진로 분야를 상단에서 선택하세요.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
