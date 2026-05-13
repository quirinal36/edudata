import { MessageSquare, Target, Compass, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Compass className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">CareerBuddy</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
          <a href="#" className="hover:text-blue-600">서비스 소개</a>
          <a href="#" className="hover:text-blue-600">진로 테스트</a>
          <a href="#" className="hover:text-blue-600">상담 기록</a>
        </nav>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
          시작하기
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
          너만의 <span className="text-blue-600">진로</span>, <br />
          CareerBuddy와 함께 찾아봐.
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          교육 데이터 분석과 공감하는 AI가 너의 꿈을 함께 고민할게. <br />
          간단한 대화만으로 너의 강점과 가능성을 발견해봐!
        </p>

        <div className="flex justify-center gap-4 mb-20">
          <button className="px-8 py-4 bg-blue-600 text-white rounded-xl text-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1">
            AI 상담 시작하기
          </button>
          <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl text-lg font-bold hover:bg-gray-50 transition">
            진로 유형 테스트
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-blue-50 text-left border border-blue-100 italic">
            <MessageSquare className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">공감 상담</h3>
            <p className="text-gray-600">단순한 정보 전달이 아닌, 따뜻한 조언과 격려를 아끼지 않는 상담가.</p>
          </div>
          <div className="p-8 rounded-2xl bg-green-50 text-left border border-green-100 italic">
            <Target className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">데이터 기반 추천</h3>
            <p className="text-gray-600">수만 개의 진로 데이터를 바탕으로 너에게 꼭 맞는 길을 매칭해줘.</p>
          </div>
          <div className="p-8 rounded-2xl bg-orange-50 text-left border border-orange-100 italic">
            <BookOpen className="w-10 h-10 text-orange-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">성장 리포트</h3>
            <p className="text-gray-600">상담이 끝날 때마다 너의 성장 포인트와 추천 활동을 정리해줄게.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-gray-100 text-center text-gray-400 text-sm">
        <p>© 2026 edudata Project Team - 류승엽, 김우진, 이형구 & Buddy</p>
      </footer>
    </div>
  );
}
