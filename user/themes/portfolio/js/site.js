class PortfolioSite {
  init() {
    this.themeAttr = 'data-theme';
    this.themeStorageKey = 'portfolio-theme';
    this.mobileMenuOpen = false;
    this.activeViewId = '';

    this.initialiseTheme();
    this.initialiseSpaRouter();
    this.initialiseScrollReveal();
    this.initialiseTypingAnimation();
    this.initialisePortfolioFilter();
    this.initialiseBackToTop();
    this.setEventHandlers();
  }

  setEventHandlers() {
    const themeBtn = document.getElementById('theme-toggle');
    const themeBtnMobile = document.getElementById('theme-toggle-mobile');
    const mobileTrigger = document.getElementById('mobile-menu-toggle');
    const backToTopBtn = document.getElementById('back-to-top');

    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }
    if (themeBtnMobile) {
      themeBtnMobile.addEventListener('click', () => this.toggleTheme());
    }
    if (mobileTrigger) {
      mobileTrigger.addEventListener('click', () => this.toggleMobileMenu());
    }

    // SPA View switching click listeners
    document.querySelectorAll('a[href^="#"], [data-spa-target]').forEach(anchor => {
      anchor.addEventListener('click', (e) => this.handleNavClick(e));
    });

    // Handle Browser Back / Forward buttons
    window.addEventListener('popstate', () => {
      this.handleHashChange();
    });

    const mainWrapper = document.getElementById('main-content-wrapper');
    if (mainWrapper) {
      mainWrapper.addEventListener('scroll', () => this.updateBackToTopProgress(), { passive: true });
    }
    window.addEventListener('scroll', () => this.updateBackToTopProgress(), { passive: true });

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => this.scrollToTop());
    }

    document.querySelectorAll('.portfolio-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleFilterClick(e));
    });

    // Close mobile menu on clicking any link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        if (this.mobileMenuOpen) {
          this.toggleMobileMenu();
        }
      });
    });
  }

  initialiseTheme() {
    const stored = localStorage.getItem(this.themeStorageKey);
    const mode = stored || 'dark';
    document.documentElement.setAttribute(this.themeAttr, mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute(this.themeAttr);
    const target = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute(this.themeAttr, target);
    document.documentElement.classList.toggle('dark', target === 'dark');
    localStorage.setItem(this.themeStorageKey, target);
  }

  toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.querySelector('#mobile-menu-toggle i');
    if (menu) {
      if (this.mobileMenuOpen) {
        menu.classList.add('hidden');
        if (icon) {
          icon.classList.replace('fa-xmark', 'fa-bars');
        }
      } else {
        menu.classList.remove('hidden');
        if (icon) {
          icon.classList.replace('fa-bars', 'fa-xmark');
        }
      }
      this.mobileMenuOpen = !this.mobileMenuOpen;
    }
  }

  initialiseSpaRouter() {
    this.handleHashChange(false);
  }

  handleHashChange(pushState = true) {
    const hash = window.location.hash.replace('#', '').trim();
    const views = document.querySelectorAll('.spa-view');
    if (views.length === 0) return;

    let targetView = null;
    if (hash) {
      targetView = document.getElementById(hash) || document.querySelector(`[data-view-id="${hash}"]`);
    }

    // Default to first view if hash is invalid or empty
    if (!targetView) {
      targetView = views[0];
    }

    const targetId = targetView.id || targetView.getAttribute('data-view-id');
    this.switchView(targetId, pushState);
  }

  switchView(viewId, updateHistory = true) {
    if (!viewId) return;
    const cleanId = viewId.replace('#', '');
    const targetView = document.getElementById(cleanId) || document.querySelector(`[data-view-id="${cleanId}"]`);
    if (!targetView) return;

    // Hide all views
    document.querySelectorAll('.spa-view').forEach(view => {
      view.classList.remove('active');
      view.classList.add('hidden');
    });

    // Activate target view
    targetView.classList.remove('hidden');
    targetView.classList.add('active');
    this.activeViewId = cleanId;

    // Update nav active states
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      const linkId = href.replace('#', '');
      link.classList.toggle('active', linkId === cleanId);
    });

    // Reset scroll positions
    const mainWrapper = document.getElementById('main-content-wrapper');
    if (mainWrapper) {
      mainWrapper.scrollTop = 0;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Update URL Hash
    if (updateHistory) {
      const newHash = `#${cleanId}`;
      if (window.location.hash !== newHash) {
        history.pushState(null, '', newHash);
      }
    }

    // Trigger scroll reveal for elements inside the active view
    this.triggerViewScrollReveal(targetView);
  }

  handleNavClick(e) {
    const link = e.currentTarget;
    const href = link.getAttribute('href') || '';
    const spaTarget = link.getAttribute('data-spa-target');
    const targetId = spaTarget || (href.startsWith('#') ? href.replace('#', '') : '');

    if (targetId) {
      e.preventDefault();
      if (targetId === 'top') {
        const firstView = document.querySelector('.spa-view');
        if (firstView) {
          this.switchView(firstView.id);
        }
      } else {
        this.switchView(targetId);
      }
    }
  }

  triggerViewScrollReveal(viewEl) {
    if (!viewEl) return;
    viewEl.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.classList.add('revealed');
    });
  }

  initialiseScrollReveal() {
    const options = {
      root: null,
      threshold: 0.15,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  initialiseTypingAnimation() {
    const el = document.getElementById('typing-text');
    if (!el) return;

    const dataAttr = el.getAttribute('data-titles');
    const titles = dataAttr ? dataAttr.split('|') : ['E-commerce Plugin Specialist', 'Web Developer'];
    
    let titleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let speed = 100;

    const type = () => {
      const currentTitle = titles[titleIdx];
      if (isDeleting) {
        el.textContent = currentTitle.substring(0, charIdx - 1);
        charIdx--;
        speed = 50;
      } else {
        el.textContent = currentTitle.substring(0, charIdx + 1);
        charIdx++;
        speed = 100;
      }

      if (!isDeleting && charIdx === currentTitle.length) {
        isDeleting = true;
        speed = 2000;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        titleIdx = (titleIdx + 1) % titles.length;
        speed = 500;
      }

      setTimeout(type, speed);
    };

    setTimeout(type, 1000);
  }

  initialisePortfolioFilter() {
    const defaultBtn = document.querySelector('.portfolio-filter-btn[data-filter="all"]');
    if (defaultBtn) {
      defaultBtn.classList.add('active', 'border-[var(--theme-accent)]', 'text-[var(--theme-accent)]');
    }
  }

  handleFilterClick(e) {
    const btn = e.currentTarget;
    const filterValue = btn.getAttribute('data-filter');

    document.querySelectorAll('.portfolio-filter-btn').forEach(b => {
      b.classList.remove('active', 'border-[var(--theme-accent)]', 'text-[var(--theme-accent)]');
    });
    btn.classList.add('active', 'border-[var(--theme-accent)]', 'text-[var(--theme-accent)]');

    document.querySelectorAll('.portfolio-item').forEach(item => {
      if (item.classList.contains(filterValue)) {
        item.style.display = 'flex';
        item.classList.add('revealed');
      } else {
        item.style.display = 'none';
      }
    });
  }

  initialiseBackToTop() {
    this.updateBackToTopProgress();
  }

  updateBackToTopProgress() {
    const btn = document.getElementById('back-to-top');
    const circle = document.getElementById('back-to-top-progress');
    if (!btn || !circle) return;

    const mainWrapper = document.getElementById('main-content-wrapper');
    const scrollTop = mainWrapper ? mainWrapper.scrollTop : window.scrollY;
    const docHeight = mainWrapper ? (mainWrapper.scrollHeight - mainWrapper.clientHeight) : (document.documentElement.scrollHeight - window.innerHeight);
    
    if (scrollTop > 200) {
      btn.classList.remove('opacity-0', 'invisible');
    } else {
      btn.classList.add('opacity-0', 'invisible');
    }

    if (docHeight > 0) {
      const scrollPercent = scrollTop / docHeight;
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (scrollPercent * circumference);
      circle.style.strokeDashoffset = offset;
    }
  }

  scrollToTop() {
    const mainWrapper = document.getElementById('main-content-wrapper');
    if (mainWrapper) {
      mainWrapper.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Initialise when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const site = new PortfolioSite();
  site.init();
});

