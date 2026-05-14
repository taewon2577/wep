import re

original_reviews_script = """  <script>
    const mockReviews = [
      { id: 1, img: 'https://loremflickr.com/600/800/paris,eiffel', src_ratio: 1.33, dest: '프랑스 파리', rating: '5.0', text: '방에서 에펠탑이 보이는 숙소 퀄리티 미쳤습니다 ㅠㅠ 인생 최고의 여행이었어요!', author: '@traveler_k' },
      { id: 2, img: 'https://loremflickr.com/600/500/bali,pool', src_ratio: 0.83, dest: '인도네시아 발리', rating: '4.8', text: '프라이빗 풀 안에서 찍는 사진마다 인생샷이네요. 가이드님도 엄청 친절하십니다.', author: '@bali_lover' },
      { id: 3, img: 'https://loremflickr.com/600/700/newyork,street', src_ratio: 1.16, dest: '미국 뉴욕', rating: '5.0', text: '컨시어지 추천으로 간 숨은 재즈바 분위기가 도랐습니다. 일정이 완벽했어요!', author: '@nyc_dreamer' },
      { id: 4, img: 'https://loremflickr.com/600/600/santorini', src_ratio: 1.0, dest: '그리스 산토리니', rating: '5.0', text: '석양 아래에서 와인, 말도 안되는 뷰... 여긴 정말 천국이 따로 없네요.', author: '@sun_seeker' },
      { id: 5, img: 'https://loremflickr.com/600/900/swiss,mountains', src_ratio: 1.5, dest: '스위스 인터라켄', rating: '4.9', text: '패러글라이딩 꼭 하세요 두번 하세요!! 대자연에 뛰어드는 최고의 경험👍', author: '@extreme_choi' },
      { id: 6, img: 'https://loremflickr.com/600/450/kyoto,temple', src_ratio: 0.75, dest: '일본 교토', rating: '4.7', text: '고즈넉한 료칸에서 즐기는 노천탕 코스가 부모님 모시고 가기 딱 좋았습니다.', author: '@family_first' },
      { id: 7, img: 'https://loremflickr.com/600/850/hawaii,beach', src_ratio: 1.41, dest: '미국 하와이', rating: '5.0', text: '바다 거북이랑 같이 수영을 하다니! 평생 잊지 못할 가족 여행 만들어주셔서 감사합니다!', author: '@turtle_swim' },
      { id: 8, img: 'https://loremflickr.com/600/550/maldives,sea', src_ratio: 0.91, dest: '몰디브', rating: '5.0', text: '바다 색깔 거짓말 안 하고 포카리스웨트입니다... 신혼여행은 무조건 몰디브로 가세요!!', author: '@honeymoon_luv' },
      { id: 9, img: 'https://loremflickr.com/600/750/norway,aurora', src_ratio: 1.25, dest: '노르웨이', rating: '4.9', text: '버킷리스트 달성! 오로라를 직접 제 눈으로 보게될 줄은 몰랐습니다. 가이드님의 스팟 선정이 소름...', author: '@aurora_hunter' }
    ];

    document.addEventListener('DOMContentLoaded', () => {
      const container = document.getElementById('masonry-container');
      
      const html = mockReviews.map((r, idx) => `
        <div class="review-card">
          <div class="review-img-wrap">
            <div class="review-badge">📍 ${r.dest}</div>
            <img src="${r.img}" alt="${r.dest}" loading="lazy">
          </div>
          <div class="review-content">
            <div class="review-rating">★ ${r.rating}</div>
            <div class="review-text">"${r.text}"</div>
            <div class="review-author">👤 ${r.author}</div>
          </div>
        </div>
      `).join('');

      container.innerHTML = html;
    });
  </script>"""

def replacer(m):
    keyword = m.group(1).replace(',', '_')
    return f"./assets/images/{keyword}.jpg"

modified_script = re.sub(r'https://loremflickr\.com/\d+/\d+/([^\'"]+)', replacer, original_reviews_script)

with open('reviews.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Replace the entire script block
html_content = re.sub(r'<script>\s*const mockReviews = \[.*?\];\s*const localPool = \[.*?\];\s*document\.addEventListener.*?</script>', modified_script, html_content, flags=re.DOTALL)
# Also cover if localPool is already gone
html_content = re.sub(r'<script>\s*const mockReviews = \[.*?\];\s*document\.addEventListener.*?</script>', modified_script, html_content, flags=re.DOTALL)


with open('reviews.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("reviews.html modified")
