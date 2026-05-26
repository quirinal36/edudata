'use client';

import React, { useState, useEffect } from 'react';
import { Compass, Search, Map as MapIcon, BarChart3, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface InfraData {
  ATPT_OFCDC_SC_NM: string;
  ADMST_ZONE_NM: string;
  count: number;
}

export default function DiagnosisPage() {
  const [data, setData] = useState<InfraData[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [filteredData, setFilteredData] = useState<InfraData | null>(null);

  useEffect(() => {
    fetch('/data/it_infra.json')
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  const handleSearch = () => {
    const found = data.find(item => item.ADMST_ZONE_NM === selectedRegion);
    setFilteredData(found || null);
  };

  const calculateScore = (count: number) => {
    // 임시 지수 계산 (최대 50개 기준 100점 만점 설계)
    const score = Math.min((count / 30) * 100, 100).toFixed(1);
    return score;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Compass className="text-blue-600 w-6 h-6" />
            <span className="text-lg font-bold">EduBridge</span>
          </Link>
          <div className="text-sm font-medium text-slate-500">우리 동네 진단 도구</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 md:p-12">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">진로활동 인프라 진단</h2>
          <p className="text-slate-500">거주하는 시군구를 입력하여 현재 이용 가능한 IT 교육 자원을 탐색하세요.</p>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar: Search */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <label className="block text-sm font-bold text-slate-700 mb-2">지역 검색 (시군구)</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  placeholder="예: 강남구, 전주시, 목포시"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Search className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
              </div>
              <button 
                onClick={handleSearch}
                className="w-full mt-4 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition"
              >
                진단 시작
              </button>
            </div>

            <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-blue-200" />
                <span className="font-bold">분석 팁</span>
              </div>
              <p className="text-sm leading-relaxed opacity-90">
                현재 데이터는 코딩 학원 및 IT 교육 기관 정보를 기준으로 합니다. 체험 센터 및 학교 인프라 데이터는 업데이트 중입니다.
              </p>
            </div>
          </div>

          {/* Main Content: Results */}
          <div className="lg:col-span-2 space-y-8">
            {filteredData ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Score Card */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{filteredData.ADMST_ZONE_NM} 분석 결과</h3>
                      <p className="text-slate-500">{filteredData.ATPT_OFCDC_SC_NM} 관할</p>
                    </div>
                    <div className="bg-blue-50 px-6 py-3 rounded-2xl text-center">
                      <div className="text-sm font-bold text-blue-600">인프라 지수</div>
                      <div className="text-3xl font-black text-blue-700">{calculateScore(filteredData.count)}</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border border-slate-100 p-5 rounded-2xl bg-slate-50">
                      <div className="flex items-center gap-2 text-slate-500 mb-2">
                        <BarChart3 className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">IT 인프라 규모</span>
                      </div>
                      <div className="text-3xl font-bold">{filteredData.count} <span className="text-lg font-normal text-slate-400">기관</span></div>
                    </div>
                    <div className="border border-slate-100 p-5 rounded-2xl bg-slate-50">
                      <div className="flex items-center gap-2 text-slate-500 mb-2">
                        <MapIcon className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">지역 희소성</span>
                      </div>
                      <div className="text-lg font-bold">
                        {filteredData.count > 20 ? '인프라 집중 지역' : '보통 혹은 부족 지역'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Recommendation Placeholder */}
                <div className="bg-slate-900 p-8 rounded-3xl text-white">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="text-yellow-400 w-5 h-5" />
                    AI 맞춤형 전략 제안
                  </h4>
                  <div className="space-y-4 opacity-90 leading-relaxed">
                    <p>
                      {filteredData.ADMST_ZONE_NM} 지역은 현재 {filteredData.count}개의 교육 인프라가 확인됩니다. 
                      {filteredData.count > 10 
                        ? "지역 내 직접 체험 기회가 풍부하므로 오프라인 프로젝트 참여를 추천합니다." 
                        : "직접 체험보다는 온라인 기반의 오픈소스 프로젝트나 도서관 연계 학습 프로그램을 대안으로 활용하는 전략이 필요합니다."}
                    </p>
                    <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                      <div className="text-yellow-400 font-bold mb-1">추천 대체 활동</div>
                      <ul className="list-disc list-inside text-sm space-y-1 text-slate-300">
                        <li>온라인 코딩 부트캠프 주간 참여</li>
                        <li>공공데이터 활용 지역사회 문제해결 보고서 작성</li>
                        <li>근처 거점 국립대학교/대학 연구실 탐방 신청</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-20 text-center flex flex-col items-center">
                <div className="bg-slate-100 p-4 rounded-full mb-4">
                  <Search className="text-slate-400 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">진단할 지역을 선택해주세요</h3>
                <p className="text-slate-500 max-w-xs">
                  현재 전국 시군구 194곳의 데이터 분석이 완료되었습니다. 검색어를 입력해 분석 결과를 확인하세요.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

const Sparkles = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" strokeWidth="2" 
    strokeLinecap="round" strokeLinejoin="round" 
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);
