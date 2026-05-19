# AI 시대 신입 채용 감소와 고등학생 진로 — 연구 자료 정리

> 제8회 교육 공공데이터 AI활용대회 "AI 활용 아이디어 기획(학생)" 분야를 위한 사전 리서치 노트.
> 작성일: 2026-05-15

---

## 1. 문제 정의

LLM(대규모 언어모델) 상용화 이후 전 세계적으로 **신입(엔트리 레벨) 채용이 구조적으로 감소**하는 현상이 관측되고 있다. 핵심은 단순한 경기 변동이 아니라, AI가 신입이 담당하던 "학습 단계 업무(learning curve work)"를 대체하면서 **경력 시작점 자체가 사라지는 구조 변화**라는 점이다.

연구자들은 이를 **"진입 사다리의 소멸(disappearing entry ladder)"** 이라 부른다.

---

## 2. 주요 데이터 (2024–2026)

### 글로벌

| 출처 | 핵심 수치 |
|---|---|
| Stanford Digital Economy Lab (Brynjolfsson 등, 2025.11) | AI 노출도 최상위 직업의 **22~25세 청년 고용 16% 감소** (ChatGPT 출시 이후). 30대 이상은 거의 변화 없음 |
| Yale Budget Lab (2026.1) | "Disappearing Entry Ladder" 명명 — AI가 단순→복잡 업무 경로의 첫 칸을 제거 |
| Anthropic (2026) | AI 노출 직군에서 청년 채용 확률 **14% 하락** |
| 영국 테크 신입 채용 | 2024년 **46% 감소**, 2026년 **추가 53% 감소** 전망 |
| 미국 SW/데이터 신입 공고 | 일부 데이터 기준 주니어 테크 공고 **67% 감소** |
| 경력 인플레이션 | "신입" 공고의 **35%가 사전 경력 요구**, SW/IT는 **60% 이상이 3년+ 요구** |

### 한국

| 출처 | 핵심 수치 |
|---|---|
| 헤럴드경제 (2026) | IT·전문직 2030 취업자 **13만 명 감소** |
| 국회예산정책처 (2026.2) | 한국 AI 고노출 직업의 청년 고용 변화율 1.2%p 상승 — 다만 전문가는 "기존 숙련 인력으로 생산성을 높이고 신규 채용을 축소하는 대체 효과"로 해석 |
| 뉴스핌 청년 취업 대란 ⑦ | "이론형 대학 교육"과 채용 시장의 미스매치를 핵심 원인으로 지목 |

### 반대 신호 (성장 영역)

- 헬스케어/돌봄/공공/대면서비스가 2024–25 미국 신규 일자리의 **약 75%** 차지
- **MLOps, NLP, LLM 파인튜닝** 등 AI 인접 스킬은 채용 수요·연봉 모두 상위
- AI를 도구로 활용하는 신입(AI-augmented)은 오히려 시니어 업무에 빠르게 도달

---

## 3. 연구가 제시하는 극복 전략

| 전략 | 근거·맥락 |
|---|---|
| **AI 도구 활용 능력 내재화** | 동일 직무에서 AI를 잘 다루는 신입은 학습 곡선을 빠르게 단축 (IEEE Spectrum) |
| **AI 면역/보완 직군 진입** | 헬스케어·교육·공공·대면 서비스 등 AI 대체율이 낮은 영역 |
| **AI 인접 신규 직무 진입** | MLOps·프롬프트 엔지니어·AI QA·데이터 큐레이션 등 신생 엔트리 포지션 |
| **포트폴리오·실증 프로젝트 중심 학습** | 학위·이론 대신 "할 수 있음을 증명하는 결과물"이 채용 신호 |
| **국가 차원 재교육 인프라** | KDI·디지털사회연구원·SPRi 모두 정부 정책 변수로 강조 |

---

## 4. 한국 공공데이터 후보 (대회 요건 충족용)

대회 규정상 **교육 공공데이터 1개 이상 필수 활용**.

| 데이터 | 활용 포인트 |
|---|---|
| **한국교육고용패널 (krivet.re.kr)** ★ | 학생의 진로계획·직업의식·실제 취업 결과를 종단 추적 — 진로 추천 모델의 근거 |
| 워크넷 직업정보 | 직업별 직무 내용·요구 역량 — AI 노출도 매핑의 베이스 |
| 교육부 진로데이터 | 고교 진로교육 현황 |
| 학교알리미·교육통계서비스 | 학교·지역 단위 분석 |
| 나이스 교육정보 개방포털 | 시간표·학과 정보 등 |

---

## 5. 기획 컨셉 초안

### 제목 (가안)
**"AI 시대의 진로 사다리 재설계 — 고등학생용 AI-증강 커리어 시뮬레이터"**

### 문제
진입 사다리 소멸로 고등학생이 "AI에 대체되지 않으면서 + AI를 활용해 더 빨리 성장할 수 있는" 진로를 탐색할 도구가 부족하다. 현행 진로 추천 서비스는 적성→직업의 정적 매칭에 머물러 있다.

### 데이터 결합
- 한국교육고용패널: 학생 특성 → 실제 취업 결과
- 워크넷 직업정보: 직무 내용
- Stanford/Anthropic AI 노출도 지수: 직업별 위험도 매핑

### AI 활용
1. **진로 추천 LLM**: 학생의 관심사·과목 성적을 입력 → "AI 노출도(위험)"와 "AI 보완성(기회)" 두 축의 직업 후보 제시
2. **로드맵 생성**: 직업별로 "지금 고등학생이 쌓아야 할 5가지 실증 프로젝트"를 자동 생성
3. **시뮬레이터**: 5년·10년 후 해당 직업의 AI 영향 시나리오 제시

### 차별성
기존: 적성 → 직업
제안: 적성 → **AI 시대 생존 가능한 진로 경로 + 실행 로드맵**

### 기대효과
- 고등학생의 정보 비대칭 해소
- "AI 대체 가능 직군에 늦게 진입 → 첫 일자리 박탈" 위험 사전 차단
- 교사·학부모용 진로 상담 보조 자료

---

## 6. 참고 자료

### 영문 연구
- [The Crisis of Entry-Level Labor in the Age of AI (2024–2026) — Rezi](https://www.rezi.ai/posts/entry-level-jobs-and-ai-2026-report)
- [The Real Job Destruction from AI Is Hitting Before Careers Can Start — Yale Insights](https://insights.som.yale.edu/insights/the-real-job-destruction-from-ai-is-hitting-before-careers-can-start)
- [AI Shifts Expectations for Entry Level Jobs — IEEE Spectrum](https://spectrum.ieee.org/ai-effect-entry-level-jobs)
- [AI's Impact on Graduate Jobs: 2025 Data Analysis — IntuitionLabs](https://intuitionlabs.ai/articles/ai-impact-graduate-jobs-2025)
- [Top 10 Most In-Demand AI Engineering Skills 2026 — Second Talent](https://www.secondtalent.com/resources/most-in-demand-ai-engineering-skills-and-salary-ranges/)
- [Entry-Level AI Roles Hiring into 2026 — Interview Query](https://www.interviewquery.com/p/entry-level-ai-jobs-2026)

### 한국어 자료
- [인공지능으로 인한 노동시장의 변화와 정책방향 — KDI](https://www.kdi.re.kr/research/reportView?pub_no=18370)
- [AI 시대의 일자리 변화 및 정책 대응 전략 — 디지털사회연구원 (PDF)](https://digitalsociety.or.kr/)
- [주요국 AI 인재 양성 및 유치 정책 — SPRi](https://www.spri.kr/download/23794)
- [앤트로픽 "청년 채용 문턱 14% 낮아져" — AI타임스](https://www.aitimes.com/news/articleView.html?idxno=207700)
- [경력직은 웃는데 신입은 웁니다 — Econmingle](https://econmingle.com/economy/ai-youth-employment-paradox-hiring-cliff/)
- [청년 취업 대란 ⑦ AI가 바꾼 채용시장 — 뉴스핌](https://www.newspim.com/news/view/20260417000141)
- [IT·전문직 2030 취업자 13만 명 감소 — 헤럴드경제](https://biz.heraldcorp.com/article/10705521)
- [2026 대한민국 직업지도, AI가 주도한다 — 커리어온뉴스](https://www.careeronnews.kr/news/465929)
