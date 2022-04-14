document.addEventListener('DOMContentLoaded', () => {
  const bodyPage = document.querySelector('body');

  window.addEventListener('load', () => {
    document.querySelector('.main').classList.remove('hidden');
    document.querySelector('.home').classList.add('active');
  
    document.querySelector('.page-loader').classList.add('fade-out');
    setTimeout(() => {
      document.querySelector('.page-loader').style.display = 'none';
    },800)
  });
  
  const navToggle = document.querySelector('.nav-toggle');
  navToggle.addEventListener('click', () => {
    hideSection();
    toggleNavbar();
    document.body.classList.toggle('hide-scrolling');
  });
  function hideSection() {
    document.querySelector('section.active').classList.toggle('fade-out');
  };
  function toggleNavbar() {
    document.querySelector('.header').classList.toggle('active');
  };
  
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('link') && e.target.hash !== '') {
      navToggle.classList.add('hide');
      if (e.target.classList.contains('nav__link')) {
        toggleNavbar();
      }
      else {
        hideSection();
        document.body.classList.add('hide-scrolling');
      }
      setTimeout(() => {
        document.querySelector('section.active').classList.remove('active', 'fade-out');
        document.querySelector(e.target.hash).classList.add('active');
        window.scrollTo(0,0);
        document.body.classList.remove('hide-scrolling');
        navToggle.classList.remove('hide');
      },300);
    };
  });
  
  const tabsContainer = document.querySelector(".about__tabs"),
  aboutSection = document.querySelector(".about");
  
  tabsContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains("tab__btn") && !e.target.classList.contains("active")) {
      tabsContainer.querySelector(".active").classList.remove("active");
      e.target.classList.add("active");
      const target = e.target.getAttribute("data-target");
      aboutSection.querySelector(".about__tab.active").classList.remove("active");
      aboutSection.querySelector(target).classList.add("active", "tab_anim");
    }
  });
  
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-project-btn") || e.target.classList.contains("portfolio__img")) {
      togglePortfolioPopup();
      document.querySelector('.portfolio-popup').scrollTo(0,0);
      portfolioItemDetails(e.target.closest('.portfolio__item'));
    }
  });
  
  function togglePortfolioPopup() {
    document.querySelector(".portfolio-popup").classList.toggle("open");
    document.body.classList.toggle("hide-scrolling");
    document.querySelector('.main').classList.toggle('fade-out');
  };
  
  document.querySelector(".pp__btn--close").addEventListener('click', togglePortfolioPopup);
  
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('pp__inner')) {
      togglePortfolioPopup();
    }
  });
  
  function portfolioItemDetails(portfolioItem) {
		document.querySelector('.pp-thumbnail img').src = `${portfolioItem.dataset.modal}.jpg`;
		document.querySelector('.pp-thumbnail source').srcset = `${portfolioItem.dataset.modal}.webp`;
  
    document.querySelector('.pp__header h3').innerHTML = portfolioItem.querySelector('.portfolio-item-title').innerHTML;
  
    document.querySelector('.pp-body').innerHTML = portfolioItem.querySelector('.portfolio-item-details').innerHTML;
  };
  
  // dark theme
  function toggleTheme(){
    if (localStorage.getItem('toggle-theme__btn') !== null) {
      if (localStorage.getItem('toggle-theme__btn') === 'dark') {
        bodyPage.classList.add('dark');
      } else {
        bodyPage.classList.remove('dark');
      }
    }
    updateIcon();
  };
  toggleTheme();
  
  document.querySelector('.toggle-theme__btn').addEventListener('click', function() {
    bodyPage.classList.toggle('dark');
    if (bodyPage.classList.contains('dark')) {
      localStorage.setItem('toggle-theme__btn', 'dark');
    } else {
      localStorage.setItem('toggle-theme__btn', 'light');
    };
    updateIcon();
  });
  
  function updateIcon(){
    if (bodyPage.classList.contains('dark')) {
      document.querySelector('.sun').classList.remove('icon-hide');
      document.querySelector('.moon').classList.add('icon-hide');
    } else {
      document.querySelector('.moon').classList.remove('icon-hide');
      document.querySelector('.sun').classList.add('icon-hide');
    };
  };
  
  if (!/(Mac)/i.test(navigator.userAgent)) {
    particlesJS.load('particles-js', 'particles.json', function() {});
  }
})