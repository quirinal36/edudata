import React from 'react';
import Link from 'next/link';
import { Compass, Database, MapPin, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Compass className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">EduBridge</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <Link href="#" className="hover:text-blue-600 transition">서비스 소개</Link>
          <Link href="#" className="hover:text-blue-600 transition">지역별 통계</Link>
          <Link href="#" className="hover:text-blue-600 transition">데이터 출처</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>AI 기반 맞춤형 진로 추천 서비스</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              우리 동네 <br/>
              <span className="text-blue-600 text-glow">진로활동 기회</span>를 <br/>
              데이터로 확인하세요.
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              교육 공공데이터를 기반으로 우리 지역의 교육 격차를 분석하고,<br/> 
              지금 당장 실행 가능한 맞춤형 활동을 추천해 드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnosis" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200 text-center">
                내 지역 진단하기
              </Link>
              <Link href="/docs" className="bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition text-center">
                탐구 배경 보기
              </Link>
            </div>
            <div className="mt-12 flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Database className="w-4 h-4" />
                <span>공공데이터 15,300+ 건 활용</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>전국 17개 시도 분석 완료</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-tr from-blue-100 to-white rounded-3xl p-8 shadow-2xl border border-blue-50">
              {/* Mock UI for Illustration */}
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-pulse">
                  <div className="w-20 h-4 bg-gray-100 rounded mb-2"></div>
                  <div className="w-full h-8 bg-blue-50 rounded"></div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold">전북 지역 IT 인프라</span>
                    <span className="text-blue-600 font-bold">82.5점</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-[82%]"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <span className="text-2xl font-bold text-gray-900">42개</span>
                    <span className="text-xs text-gray-400">체험 프로그램</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <span className="text-2xl font-bold text-gray-900">12곳</span>
                    <span className="text-xs text-gray-400">지원 센터</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Decoration */}
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-2xl shadow-xl hidden lg:block">
              <p className="font-bold text-2xl">A+</p>
              <p className="text-xs opacity-80">추천 경로 탄탄함</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100 text-center text-gray-400 text-sm">
        <p>© 2026 EduBridge Project. 함께 만드는 고등학생 진로 파트너.</p>
      </footer>
    </div>
  );
}
