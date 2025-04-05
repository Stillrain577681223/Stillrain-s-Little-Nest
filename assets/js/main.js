/**
* Template Name: MyResume - v4.3.0
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

// 修改平滑滚动逻辑
document.querySelectorAll('.custom-nav .item').forEach(item => {
  item.addEventListener('click', function() {
    const target = document.querySelector(this.dataset.target);
    if(target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// 滚动时显示动画
window.addEventListener('scroll', function() {
  const elements = document.querySelectorAll('.aos-init');
  elements.forEach(el => {
    const elTop = el.getBoundingClientRect().top;
    if(elTop < window.innerHeight - 100) {
      el.classList.add('aos-animate');
    }
  });

  // 新增：模块渐显效果
  const sections = document.querySelectorAll('section:not(#hero)');
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if(sectionTop < window.innerHeight - 100) {
      section.classList.add('show');
    }
  });
});

// 新增：初始化设置
document.addEventListener('DOMContentLoaded', function() {
  // 设置背景图片
  document.body.style.backgroundImage = "url('assets/img/background.png')";
  document.body.style.backgroundAttachment = 'fixed';
  document.body.style.backgroundSize = 'cover';
  
  // 初始显示可视区域内的模块
  const visibleSections = document.querySelectorAll('section:not(#hero)');
  visibleSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if(rect.top < window.innerHeight) {
      section.classList.add('show');
    }
  });
});

// 新增：图片懒加载
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      imageObserver.unobserve(img);
    }
  });
});
lazyImages.forEach(img => imageObserver.observe(img));

// 在DOM加载完成后添加
document.addEventListener('DOMContentLoaded', function() {
  const footer = document.getElementById('footer');
  
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.clientHeight;
    
    if (scrollPosition + windowHeight > documentHeight - 100) {
      footer.classList.add('show');
    }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('year').textContent = new Date().getFullYear();
});

// 统一初始化音乐播放器
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.custom-music-player').forEach(container => {
    try {
      new MusicPlayer(container);
    } catch (error) {
      console.error('播放器初始化失败:', error);
      const errorElem = document.createElement('div');
      errorElem.style.color = 'red';
      errorElem.textContent = '播放器加载失败，请刷新页面或检查网络连接';
      container.prepend(errorElem);
    }
  });
});
  
  // 原有时间线初始化代码
  const timelineSwiper = new Swiper('.timelineSwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    watchOverflow: true,
    initialSlide: document.querySelectorAll('.swiper-slide').length - 1, // 默认显示最后一张
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      disabledClass: 'swiper-button-disabled'
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      }
    }
  });
// 添加DOM加载监听
document.addEventListener('DOMContentLoaded', function() {
  // 修复audio元素选择器作用域
  const audio = document.querySelector('.main-audio');
  const playBtn = document.querySelector('.audio-container .play-btn');
  const currentTime = document.querySelector('.current-time');
  const duration = document.querySelector('.duration');
  const progressBar = document.querySelector('.progress-bar');

  // 时间格式化函数
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // 错误处理
  audio.addEventListener('error', () => {
    console.error('音频加载失败');
    playBtn.innerHTML = '<i class="bx bx-error"></i>';
    playBtn.disabled = true;
  });

  // 播放/暂停控制
  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playBtn.innerHTML = '<i class="bx bx-pause"></i>';
    } else {
      audio.pause();
      playBtn.innerHTML = '<i class="bx bx-play"></i>';
    }
  });

  // 时间同步
  audio.addEventListener('timeupdate', () => {
    if(isNaN(audio.duration)) return;
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
    if (currentTime) {
      currentTime.textContent = formatTime(audio.currentTime);
    }
    if (duration) {
      duration.textContent = formatTime(audio.duration);
    }
  });

  // 进度条点击控制
  progressBar.parentElement.addEventListener('click', (e) => {
    const rect = e.target.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pos * audio.duration;
  });

  // 音频结束自动重置
  audio.addEventListener('ended', () => {
    playBtn.innerHTML = '<i class="bx bx-play"></i>';
    progressBar.style.width = '0%';
  });
});

// 头部添加模块导入


// 音乐播放器类定义
class MusicPlayer {
  constructor(container) {
    this.container = container;
    this.audio = this.container.querySelector('audio');
    this.playBtn = this.container.querySelector('.play-btn');
    this.progressBar = this.container.querySelector('.progress-bar');
    this.initEventListeners();
  }

  initEventListeners() {
    // 播放/暂停控制
    this.playBtn.addEventListener('click', () => this.togglePlay());
    
    // 进度条控制
    this.container.querySelector('.progress-container').addEventListener('click', (e) => {
      const rect = e.target.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      this.audio.currentTime = pos * this.audio.duration;
    });

    // 音频时间更新
    this.audio.addEventListener('timeupdate', () => this.updateProgress());

    // 音频结束处理
    this.audio.addEventListener('ended', () => {
      this.playBtn.innerHTML = '<i class="bx bx-play"></i>';
      this.progressBar.style.width = '0%';
    });

    // 错误处理
    this.audio.addEventListener('error', (e) => {
      console.error('音频加载失败:', e);
      this.playBtn.innerHTML = '<i class="bx bx-error"></i>';
      this.playBtn.disabled = true;
    });
  }

  togglePlay() {
    if (this.audio.paused) {
      this.audio.play();
      this.playBtn.innerHTML = '<i class="bx bx-pause"></i>';
    } else {
      this.audio.pause();
      this.playBtn.innerHTML = '<i class="bx bx-play"></i>';
    }
  }

  updateProgress() {
    const progress = (this.audio.currentTime / this.audio.duration) * 100;
    this.progressBar.style.width = `${progress}%`;
    this.container.querySelector('.remaining-time').textContent = 
      this.formatTime(this.audio.duration - this.audio.currentTime);
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `-${mins}:${secs.toString().padStart(2, '0')}`;
  }
}

// 合并重复的初始化逻辑
document.addEventListener('DOMContentLoaded', () => {
  // 统一初始化方式
  document.querySelectorAll('.audio-container').forEach(container => {
    new MusicPlayer(container);
  });

  // 移除旧的初始化代码
});
