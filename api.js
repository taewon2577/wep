/**
 * Mock Backend & Database (CMS) using LocalStorage
 * This simulates a real database connection for the frontend.
 */

// Helper to generate dynamic itinerary
function generateItinerary(days, theme, title) {
  let itinerary = [];
  itinerary.push({ day: '1일차', title: '도착 및 환영 인사', desc: `공항 픽업 후 ${title} 숙소로 이동합니다. 웰컴 디너와 함께 첫날의 여독을 푸세요.` });
  
  if (days > 2) {
    let middleTitle = '';
    let middleDesc = '';
    
    if (theme === '휴양') {
      middleTitle = '자유 휴양 및 힐링';
      middleDesc = '최고급 리조트 시설을 이용하며 프라이빗 해변에서 자유 시간을 가집니다. 맞춤형 스파 및 휴식 프로그램이 진행됩니다.';
    } else if (theme === '가족여행') {
      middleTitle = '가족 어드벤처 & 관광';
      middleDesc = '남녀노소 누구나 즐길 수 있는 테마파크 및 주요 명소를 방문하며 가족들과 즐거운 추억을 쌓습니다.';
    } else if (theme === '액티비티') {
      middleTitle = '다이나믹 코스 체험';
      middleDesc = '안전장비 착용 후 전문 강사와 함께 짜릿한 익스트림 스포츠 및 아웃도어 체험을 진행합니다.';
    } else {
      middleTitle = '로맨틱 투어';
      middleDesc = '단 두 사람만을 위한 오붓하고 아름다운 코스 탐방 및 프라이빗 파인다이닝을 즐깁니다.';
    }
    
    itinerary.push({ day: `2 ~ ${days - 1}일차`, title: middleTitle, desc: middleDesc });
  }

  itinerary.push({ day: `${days}일차`, title: '아쉬운 작별 및 귀국', desc: '조식 후 체크아웃. 전용 차량을 타고 공항으로 이동하여 귀국행 비행기에 탑승합니다.' });
  return itinerary;
}

const SEED_DESTINATIONS = [
  { id: 1, location: '프랑스 > 파리', title: '프랑스 파리 봄빛 여행', desc: '에펠탑의 마법과 만개한 꽃망울, 최고급 와인 테이스팅을 경험하세요.', originalPrice: 1590000, price: 1290000, rating: 4.9, reviews: 342, duration: 5, theme: '로맨스', isSpecialOffer: false, mainImage: 'https://loremflickr.com/800/600/paris,eiffel', gallery: ['https://loremflickr.com/800/600/louvre', 'https://loremflickr.com/800/600/seine'] },
  { id: 2, location: '인도네시아 > 발리', title: '인도네시아 발리 럭셔리 리조트', desc: '에메랄드빛 바다 위의 워터 방갈로에서 완벽한 휴식을 취하세요.', originalPrice: 3200000, price: 2490000, discount: '22%', rating: 5.0, reviews: 128, duration: 7, theme: '휴양', isSpecialOffer: true, mainImage: 'https://loremflickr.com/800/600/bali,resort', gallery: ['https://loremflickr.com/800/600/bali,beach', 'https://loremflickr.com/800/600/bali,villa'] },
  { id: 3, location: '일본 > 교토', title: '일본 교토 고즈넉한 투어', desc: '전통 목조 건물 사이를 거닐고, 유서 깊은 료칸에서 머무르세요.', originalPrice: null, price: 1850000, rating: 4.8, reviews: 412, duration: 6, theme: '가족여행', isSpecialOffer: false, mainImage: 'https://loremflickr.com/800/600/kyoto,temple', gallery: ['https://loremflickr.com/800/600/kyoto,street', 'https://loremflickr.com/800/600/kyoto,nature'] },
  { id: 4, location: '프랑스 > 센 강', title: '센 강 로맨틱 크루즈', desc: '파리의 아름다운 야경과 함께하는 5코스 디너 크루즈.', originalPrice: 1200000, price: 890000, discount: '25%', rating: 4.7, reviews: 88, duration: 3, theme: '로맨스', isSpecialOffer: true, mainImage: 'https://loremflickr.com/800/600/paris,cruise', gallery: ['https://loremflickr.com/800/600/paris,dinner', 'https://loremflickr.com/800/600/paris,night'] },
  { id: 5, location: '스위스 > 인터라켄', title: '스위스 인터라켄 스카이다이빙', desc: '설산의 절경 속에서 잊지 못할 짜릿한 점프를!', originalPrice: null, price: 950000, rating: 4.9, reviews: 50, duration: 2, theme: '액티비티', isSpecialOffer: false, mainImage: 'https://loremflickr.com/800/600/interlaken,skydiving', gallery: ['https://loremflickr.com/800/600/interlaken,mountains', 'https://loremflickr.com/800/600/interlaken,nature'] },
  { id: 6, location: '몰디브', title: '프라이빗 해변 파라다이스', desc: '아무도 없는 프라이빗 해변에서 즐기는 럭셔리 요트 투어와 파인 다이닝.', originalPrice: 4000000, price: 3200000, discount: '20%', rating: 5.0, reviews: 21, duration: 10, theme: '휴양', isSpecialOffer: true, mainImage: 'https://loremflickr.com/800/600/maldives,beach', gallery: ['https://loremflickr.com/800/600/maldives,yacht', 'https://loremflickr.com/800/600/maldives,dining'] },
  { id: 7, location: '미국 > 괌', title: '괌 가족 풀빌라 패키지', desc: '아이들이 즐길 수 있는 넓은 수영장과 다양한 키즈 프로그램이 포함된 패키지.', originalPrice: null, price: 2100000, rating: 4.6, reviews: 300, duration: 5, theme: '가족여행', isSpecialOffer: false, mainImage: 'https://loremflickr.com/800/600/guam,pool', gallery: ['https://loremflickr.com/800/600/guam,family', 'https://loremflickr.com/800/600/guam,beach'] },
  { id: 8, location: '미국 > 하와이', title: '하와이 오아후 서핑 캠프', desc: '초보자도 쉽게 배울 수 있는 체계적인 전문 서핑 클래스.', originalPrice: 1800000, price: 1450000, discount: '19%', rating: 4.7, reviews: 76, duration: 6, theme: '액티비티', isSpecialOffer: true, mainImage: 'https://loremflickr.com/800/600/hawaii,surfing', gallery: ['https://loremflickr.com/800/600/hawaii,waves', 'https://loremflickr.com/800/600/hawaii,beach'] },
  { id: 9, location: '이탈리아 > 베네치아', title: '이탈리아 베네치아 곤돌라 여정', desc: '운하를 따라 흐르는 물소리와 함께 로맨틱한 곤돌라 데이트를!', originalPrice: null, price: 1650000, rating: 4.8, reviews: 402, duration: 4, theme: '로맨스', isSpecialOffer: false, mainImage: 'https://loremflickr.com/800/600/venice,gondola', gallery: ['https://loremflickr.com/800/600/venice,canal', 'https://loremflickr.com/800/600/venice,city'] },
  { id: 10, location: '한국 > 제주도', title: '제주도 럭셔리 요트 낚시', desc: '가족 모두가 즐길 수 있는 프라이빗 요트에서의 특별한 하루.', originalPrice: 1000000, price: 800000, discount: '20%', rating: 4.5, reviews: 100, duration: 3, theme: '가족여행', isSpecialOffer: true, mainImage: 'https://loremflickr.com/800/600/jeju,yacht', gallery: ['https://loremflickr.com/800/600/jeju,sea', 'https://loremflickr.com/800/600/jeju,fishing'] },
  { id: 11, location: '노르웨이', title: '노르웨이 오로라 헌팅 투어', desc: '순백의 빙하와 밤하늘을 수놓는 환상적인 오로라 관측.', originalPrice: null, price: 3800000, rating: 4.9, reviews: 180, duration: 8, theme: '액티비티', isSpecialOffer: false, mainImage: 'https://loremflickr.com/800/600/norway,aurora', gallery: ['https://loremflickr.com/800/600/norway,glacier', 'https://loremflickr.com/800/600/norway,snow'] },
  { id: 12, location: '모리셔스', title: '모리셔스 신혼여행 특가팩', desc: '아프리카의 진주라 불리는 모리셔스에서의 완벽한 럭셔리 허니문.', originalPrice: 5500000, price: 4100000, discount: '25%', rating: 5.0, reviews: 10, duration: 9, theme: '로맨스', isSpecialOffer: true, mainImage: 'https://loremflickr.com/800/600/mauritius,honeymoon', gallery: ['https://loremflickr.com/800/600/mauritius,resort', 'https://loremflickr.com/800/600/mauritius,ocean'] },
  { id: 13, location: '태국 > 푸켓', title: '태국 푸켓 요가 리트릿', desc: '파도 소리를 들으면서 즐기는 명상과 하타 요가 인텐시브 코스.', originalPrice: null, price: 1100000, rating: 4.7, reviews: 290, duration: 5, theme: '휴양', isSpecialOffer: false, mainImage: 'https://loremflickr.com/800/600/phuket,yoga', gallery: ['https://loremflickr.com/800/600/phuket,beach', 'https://loremflickr.com/800/600/phuket,meditation'] },
  { id: 14, location: '미국 > 그랜드캐년', title: '미국 그랜드캐년 헬기 투어', desc: '경이로운 대자연의 스케일을 하늘 위에서 감상할 수 있는 액티비티.', originalPrice: null, price: 2800000, rating: 4.8, reviews: 540, duration: 7, theme: '액티비티', isSpecialOffer: false, mainImage: 'https://loremflickr.com/800/600/grandcanyon,helicopter', gallery: ['https://loremflickr.com/800/600/grandcanyon,nature', 'https://loremflickr.com/800/600/grandcanyon,rocks'] },
  { id: 15, location: '호주 > 바이런 베이', title: '호주 바이런 베이 해안 승마', desc: '오직 우리 커플만을 위한 황홀한 선셋 프라이빗 해변 승마.', originalPrice: 2200000, price: 1590000, discount: '28%', rating: 4.9, reviews: 199, duration: 5, theme: '로맨스', isSpecialOffer: true, mainImage: 'https://loremflickr.com/800/600/australia,horse', gallery: ['https://loremflickr.com/800/600/australia,sunset', 'https://loremflickr.com/800/600/australia,beach'] },
  { id: 16, location: '스페인 > 바르셀로나', title: '스페인 바르셀로나 가우디 투어', desc: '천재 건축가 가우디의 혼이 담긴 작품들을 전문가와 함께 돌아보세요.', originalPrice: null, price: 1450000, rating: 4.6, reviews: 820, duration: 6, theme: '가족여행', isSpecialOffer: false, mainImage: 'https://loremflickr.com/800/600/barcelona,gaudi', gallery: ['https://loremflickr.com/800/600/barcelona,city', 'https://loremflickr.com/800/600/barcelona,park'] },
  { id: 17, location: '베트남 > 냐짱', title: '베트남 냐짱 풀빌라 리조트', desc: '동양의 나폴리 냐짱에서 온 가족이 즐기는 단독 프라이빗 풀빌라.', originalPrice: 2000000, price: 1600000, discount: '20%', rating: 4.8, reviews: 310, duration: 5, theme: '휴양', isSpecialOffer: true, mainImage: 'https://loremflickr.com/800/600/nhatrang,villa', gallery: ['https://loremflickr.com/800/600/nhatrang,pool', 'https://loremflickr.com/800/600/nhatrang,beach'] },
  { id: 18, location: '몰디브', title: '몰디브 수중 레스토랑 디너', desc: '바다 깊은 곳, 화려한 열대어들과 함께하는 잊지 못할 로맨틱 디너.', originalPrice: null, price: 3500000, rating: 5.0, reviews: 60, duration: 7, theme: '로맨스', isSpecialOffer: false, mainImage: 'https://loremflickr.com/800/600/maldives,underwater', gallery: ['https://loremflickr.com/800/600/maldives,restaurant', 'https://loremflickr.com/800/600/maldives,fish'] },
  { id: 19, location: '탄자니아 > 세렝게티', title: '세렝게티 사파리 투어', desc: '야생동물이 숨쉬는 대초원 사파리 탐험. 잊지 못할 어드벤처!', originalPrice: 6000000, price: 4200000, discount: '30%', rating: 4.9, reviews: 45, duration: 12, theme: '액티비티', isSpecialOffer: true, mainImage: 'https://loremflickr.com/800/600/serengeti,safari', gallery: ['https://loremflickr.com/800/600/serengeti,lion', 'https://loremflickr.com/800/600/serengeti,nature'] },
  { id: 20, location: '베트남 > 하롱베이', title: '베트남 하롱베이 럭셔리 크루즈', desc: '에메랄드빛 바다와 기암괴석이 펼쳐진 절경 위에서 즐기는 효도 관광.', originalPrice: null, price: 1350000, rating: 4.7, reviews: 520, duration: 4, theme: '가족여행', isSpecialOffer: false, mainImage: 'https://loremflickr.com/800/600/halongbay,cruise', gallery: ['https://loremflickr.com/800/600/halongbay,ocean', 'https://loremflickr.com/800/600/halongbay,rock'] },
  { id: 21, location: '캐나다 > 록키 마운틴', title: '캐나다 록키 마운틴 트래킹', desc: '숨 막히게 맑은 공기와 빙하 호수를 따라 걷는 진정한 에코 투어.', originalPrice: 2800000, price: 2300000, discount: '18%', rating: 4.8, reviews: 115, duration: 9, theme: '액티비티', isSpecialOffer: true, mainImage: 'https://loremflickr.com/800/600/rockymountains,lake', gallery: ['https://loremflickr.com/800/600/rockymountains,hiking', 'https://loremflickr.com/800/600/rockymountains,forest'] },
  { id: 22, location: '프랑스 > 니스', title: '프랑스 니스 온천 테라피', desc: '지중해 해풍을 맞으며 피부 노폐물을 빼주는 니스 로열 온천 리조트.', originalPrice: null, price: 1900000, rating: 4.6, reviews: 298, duration: 6, theme: '휴양', isSpecialOffer: false, mainImage: 'https://loremflickr.com/800/600/nice,spa', gallery: ['https://loremflickr.com/800/600/nice,beach', 'https://loremflickr.com/800/600/nice,resort'] },
  { id: 23, location: '영국 > 런던', title: '영국 런던 템즈강 야경 투어', desc: '런던 아이와 빅벤을 배경으로 평생 잊지 못할 로맨틱한 인생샷을 남기세요.', originalPrice: null, price: 1750000, rating: 4.8, reviews: 320, duration: 5, theme: '로맨스', isSpecialOffer: false, mainImage: 'https://loremflickr.com/800/600/london,bigben', gallery: ['https://loremflickr.com/800/600/london,night', 'https://loremflickr.com/800/600/london,thames'] },
  { id: 24, location: '페루 > 쿠스코', title: '페루 마추픽추 잉카 트레일', desc: '안데스 산맥의 신비로운 잉카 제국 유적지를 직접 거닐어보는 대자연 탐험.', originalPrice: 3500000, price: 2980000, discount: '15%', rating: 4.9, reviews: 145, duration: 10, theme: '액티비티', isSpecialOffer: true, mainImage: 'https://loremflickr.com/800/600/machupicchu,inca', gallery: ['https://loremflickr.com/800/600/peru,andes', 'https://loremflickr.com/800/600/peru,llama'] },
  { id: 25, location: '이집트 > 카이로', title: '이집트 피라미드 어드벤처', desc: '고대 파라오의 숨결을 느끼고 낙타를 타며 광활한 사막을 건너는 가족 여행.', originalPrice: null, price: 2100000, rating: 4.7, reviews: 210, duration: 7, theme: '가족여행', isSpecialOffer: false, mainImage: 'https://loremflickr.com/800/600/egypt,pyramid', gallery: ['https://loremflickr.com/800/600/egypt,camel', 'https://loremflickr.com/800/600/cairo'] },
  { id: 26, location: '아이슬란드', title: '아이슬란드 빙하 트레킹 & 온천', desc: '크리스탈 얼음 동굴 탐험과 블루 라군에서의 환상적인 지열 온천욕.', originalPrice: 4200000, price: 3400000, discount: '19%', rating: 5.0, reviews: 88, duration: 8, theme: '액티비티', isSpecialOffer: true, mainImage: 'https://loremflickr.com/800/600/iceland,glacier', gallery: ['https://loremflickr.com/800/600/iceland,bluelagoon', 'https://loremflickr.com/800/600/iceland,cave'] },
  { id: 27, location: '멕시코 > 칸쿤', title: '카리브해 칸쿤 올인클루시브', desc: '멕시코 칸쿤의 에메랄드빛 카리브해를 100% 누리는 7성급 올인클루시브 리조트.', originalPrice: 3800000, price: 2900000, discount: '23%', rating: 4.9, reviews: 400, duration: 6, theme: '휴양', isSpecialOffer: true, mainImage: 'https://loremflickr.com/800/600/cancun,beach', gallery: ['https://loremflickr.com/800/600/cancun,resort', 'https://loremflickr.com/800/600/cancun,ocean'] },
  { id: 28, location: '싱가포르', title: '싱가포르 가든스 바이 더 베이', desc: '환상적인 슈퍼트리 쇼 감상과 유니버셜 스튜디오 방문이 포함된 오감 만족 가족 투어.', originalPrice: null, price: 1150000, rating: 4.8, reviews: 560, duration: 4, theme: '가족여행', isSpecialOffer: false, mainImage: 'https://loremflickr.com/800/600/singapore,gardens', gallery: ['https://loremflickr.com/800/600/singapore,city', 'https://loremflickr.com/800/600/singapore,marinabaysands'] },
  { id: 29, location: 'UAE > 두바이', title: '두바이 사막 사파리 & 요트', desc: '초호화 도심 요트 투어와 황금빛 사막을 질주하는 사파리 투어의 환상적인 콜라보.', originalPrice: 2400000, price: 1850000, discount: '22%', rating: 4.7, reviews: 175, duration: 5, theme: '액티비티', isSpecialOffer: true, mainImage: 'https://loremflickr.com/800/600/dubai,desert', gallery: ['https://loremflickr.com/800/600/dubai,city', 'https://loremflickr.com/800/600/dubai,yacht'] },
  { id: 30, location: '스페인 > 마요르카', title: '스페인 마요르카 프라이빗 요트', desc: '지중해의 낙원 마요르카에서 코발트블루 바다를 가르며 프라이빗 요트를 즐기세요.', originalPrice: null, price: 2600000, rating: 4.9, reviews: 92, duration: 6, theme: '휴양', isSpecialOffer: false, mainImage: 'https://loremflickr.com/800/600/mallorca,sea', gallery: ['https://loremflickr.com/800/600/mallorca,beach', 'https://loremflickr.com/800/600/spain,resort'] },
];

// Add itinerary internally
SEED_DESTINATIONS.forEach(d => {
  d.image = d.mainImage; // backwards compatibility
  d.link = 'detail.html'; // Fix double query string bug
  d.intro = `${d.title}의 아주 특별한 여정에 초대합니다. 이 여행은 주요 명소를 가장 완벽하게 담아낼 수 있는 유명한 사진 스팟들을 중심으로 구성되었습니다. 각 일정별로 전 세계 여행자들이 극찬한 뷰 포인트와 잊지 못할 분위기를 모두 경험하실 수 있습니다. ${d.theme} 테마에 맞춰 세심하게 기획된 이 코스를 통해 인생 최고의 인생샷과 추억을 남겨보세요.`;
  d.itinerary = generateItinerary(d.duration, d.theme, d.title);
  d.inclusions = [
    `${d.duration-1}박 숙박 제공`,
    '매일 조식 제공',
    'VIP 왕복 공항 샌딩/픽업 서비스',
    '가이드 투어 및 전용 차량',
  ];
  d.exclusions = [
    '국제선 왕복 항공권',
    '개인 경비 및 기념품',
    '여행자 보험',
  ];
});

const SEED_QA_POSTS = [];

class DBWrapper {
  constructor() {
    localStorage.setItem('voyage_destinations', JSON.stringify(SEED_DESTINATIONS));
    this.firebaseUrl = "https://poto-baf4c-default-rtdb.asia-southeast1.firebasedatabase.app/voyage_qa";
  }

  // --- Destinations API ---
  async getDestinations(filters = {}) {
    await new Promise(r => setTimeout(r, 50)); 
    let data = JSON.parse(localStorage.getItem('voyage_destinations')) || [];
    
    if (filters.query) {
      data = data.filter(d => d.title.toLowerCase().includes(filters.query.toLowerCase()) || d.desc.toLowerCase().includes(filters.query.toLowerCase()) || d.location.includes(filters.query));
    }
    if (filters.theme) {
      data = data.filter(d => d.theme === filters.theme);
    }
    if (filters.isSpecialOffer === true) {
      data = data.filter(d => d.isSpecialOffer === true);
    } else if (filters.isSpecialOffer === false) {
      data = data.filter(d => d.isSpecialOffer === false);
    }
    if (filters.sort) {
      if (filters.sort === 'price_asc') data.sort((a,b) => a.price - b.price);
      if (filters.sort === 'price_desc') data.sort((a,b) => b.price - a.price);
      if (filters.sort === 'rating') data.sort((a,b) => b.rating - a.rating);
    } else {
      data.sort((a, b) => b.rating - a.rating);
    }
    return data;
  }

  async getDestinationById(id) {
    let data = JSON.parse(localStorage.getItem('voyage_destinations')) || [];
    return data.find(d => d.id === Number(id)) || null;
  }

  // --- Q&A API (Firebase Realtime Database) ---
  async getPosts() {
    try {
      const res = await fetch(`${this.firebaseUrl}.json`);
      const data = await res.json();
      if (!data) return [];
      
      let posts = Object.keys(data).map(key => ({ id: key, ...data[key] }));
      
      // Sort by newest date
      return posts.sort((a,b) => new Date(b.date) - new Date(a.date)).map(p => ({
        id: p.id, category: p.category, title: p.title, author: p.author, 
        date: p.date, views: p.views || 0, status: p.status, isSecret: p.isSecret
      }));
    } catch (e) {
      console.error("Firebase getPosts Error:", e);
      return [];
    }
  }

  async getPostById(id, inputPassword, isAdmin = false) {
    try {
      const res = await fetch(`${this.firebaseUrl}/${id}.json`);
      const post = await res.json();
      if(!post) return null;
      post.id = id;

      if(post.isSecret && !isAdmin && post.password !== inputPassword) {
        throw new Error('UNAUTHORIZED');
      }

      if (!isAdmin && inputPassword !== "ADMIN_PEEK") {
        post.views = (post.views || 0) + 1;
        await fetch(`${this.firebaseUrl}/${id}.json`, {
          method: 'PATCH',
          body: JSON.stringify({ views: post.views })
        });
      }
      return post;
    } catch (e) {
      if (e.message === 'UNAUTHORIZED') throw e;
      console.error("Firebase getPostById Error:", e);
      return null;
    }
  }

  async createPost(postProps) {
    const date = new Date();
    const formattedDate = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    
    const newPost = { 
      ...postProps, 
      date: formattedDate, 
      views: 0, 
      status: '답변 대기', 
      reply: '' 
    };

    try {
      const res = await fetch(`${this.firebaseUrl}.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
      });
      const data = await res.json();
      return data.name; // Firebase unique key
    } catch (e) {
      console.error("Firebase createPost Error:", e);
      throw e;
    }
  }

  async addReply(id, replyContent) {
    try {
      const res = await fetch(`${this.firebaseUrl}/${id}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reply: replyContent, status: '답변 완료' })
      });
      return res.ok;
    } catch (e) {
      console.error("Firebase addReply Error:", e);
      return false;
    }
  }
}

window.API = new DBWrapper();
