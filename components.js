/**
 * Web Components for Modular UI
 */

class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-header">
        <div class="container d-flex justify-between align-center">
          <a href="index.html" class="logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L2.5 10l5.8 3.4L5 16.6l-2.4-.8L1.5 17l4.5 2 2 4.5 1.2-1.1-.8-2.4 3.2-3.3L15 22.5c.4.2.8-.2.7-.8z"/></svg>
            Voyage<span>Luxe</span>
          </a>
          <nav class="nav-links">
            <a href="explore.html">여행지 탐색</a>
            <a href="special.html">특가 상품</a>
            <a href="reviews.html">여행 후기</a>
            <a href="about.html">회사 소개</a>
            <a href="community.html">고객 센터</a>
          </nav>
          <div class="nav-actions">
            <button class="btn btn-primary" onclick="window.location.href='explore.html'">지금 예약하기</button>
          </div>
        </div>
      </header>
    `;

    // Header scroll effect
    window.addEventListener('scroll', () => {
      const header = this.querySelector('.site-header');
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-col">
              <h4>VoyageLuxe</h4>
              <p style="color: var(--color-text-muted); margin-bottom: 1rem; max-width: 250px;">
                궁극의 편안함 속에서 세상을 경험하세요. 우리는 안목 있는 여행자들을 위해 프리미엄 여행 경험과 맞춤형 일정을 제공합니다.
              </p>
            </div>
            <div class="footer-col">
              <h4>회사 소개</h4>
              <nav class="footer-links">
                <a href="#">회사 소개</a>
                <a href="#">채용 정보</a>
                <a href="#">언론 보도</a>
                <a href="#">블로그</a>
              </nav>
            </div>
            <div class="footer-col">
              <h4>고객 지원</h4>
              <nav class="footer-links">
                <a href="#">고객 센터</a>
                <a href="#">안전 정보</a>
                <a href="#">취소 규정</a>
                <a href="#">코로나19 안내</a>
              </nav>
            </div>
            <div class="footer-col">
              <h4>연락처</h4>
              <nav class="footer-links">
                <a href="#">contact@voyageluxe.com</a>
                <a href="#">1588-0000</a>
                <div class="d-flex gap-4" style="margin-top: 1rem; color: white;">
                  <!-- Social Icons -->
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </div>
              </nav>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} VoyageLuxe. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>
    `;
  }
}

class TourCard extends HTMLElement {
  connectedCallback() {
    const image = this.getAttribute('image') || '';
    const title = this.getAttribute('title') || 'Destination';
    const desc = this.getAttribute('desc') || 'A beautiful place to visit.';
    const price = this.getAttribute('price') || '₩0';
    const originalPrice = this.getAttribute('original-price') || '';
    const discount = this.getAttribute('discount') || '';
    const rating = this.getAttribute('rating') || '5.0';
    const duration = this.getAttribute('duration') || '3 Days';
    const link = this.getAttribute('link') || 'detail.html';

    let offerBadgeHTML = '';
    let priceHTML = `<span class="tour-card-price">${price}</span>`;

    if (discount) {
      offerBadgeHTML = `<div style="position: absolute; top: var(--spacing-4); left: var(--spacing-4); background: #ef4444; color: white; padding: 0.25rem 0.75rem; border-radius: var(--border-radius-full); font-size: 0.875rem; font-weight: 700; z-index: 2;">${discount} OFF</div>`;
      priceHTML = `
        <div class="d-flex align-center gap-2">
          <span style="text-decoration: line-through; color: var(--color-text-muted); font-size: 0.875rem;">${originalPrice}</span>
          <span class="tour-card-price" style="color: #ef4444;">${price}</span>
        </div>
      `;
    }

    this.innerHTML = `
      <a href="${link}" class="tour-card" style="display: block; text-decoration: none; color: inherit; height: 100%;">
        <div class="tour-card-img-wrap">
          ${offerBadgeHTML}
          <img src="${image}" alt="${title}" loading="lazy">
          <div class="tour-card-badge">${duration}</div>
        </div>
        <div class="tour-card-content">
          <div class="tour-card-meta">
            <span>🌍 ${title.split(' ')[0]}</span>
            <span class="rating">★ ${rating}</span>
          </div>
          <h3 class="tour-card-title">${title}</h3>
          <p class="tour-card-desc">${desc}</p>
          <div class="tour-card-footer">
            <span style="font-size: 0.875rem; color: var(--color-text-muted);">최저가</span>
            ${priceHTML}
          </div>
        </div>
      </a>
    `;
  }
}

// Register Components
customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
customElements.define('tour-card', TourCard);
