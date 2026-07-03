'use strict';

/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const menuToggleBtn = document.querySelector("[data-menu-toggle-btn]");

if (menuToggleBtn) {
  menuToggleBtn.addEventListener("click", function () {
    navbar.classList.toggle("active");
    this.classList.toggle("active");
  });
}

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    if (menuToggleBtn) menuToggleBtn.classList.toggle("active");
  });
}

/**
 * header sticky & back to top
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

if (header) {
  window.addEventListener("scroll", function () {
    if (window.scrollY >= 100) {
      header.classList.add("active");
      if (backTopBtn) backTopBtn.classList.add("active");
    } else {
      header.classList.remove("active");
      if (backTopBtn) backTopBtn.classList.remove("active");
    }
  });
}

/**
 * search box toggle
 */

const searchBtn = document.querySelector("[data-search-btn]");
const searchContainer = document.querySelector("[data-search-container]");
const searchSubmitBtn = document.querySelector("[data-search-submit-btn]");
const searchCloseBtn = document.querySelector("[data-search-close-btn]");

if (searchBtn && searchContainer) {
  const searchBoxElems = [searchBtn, searchSubmitBtn, searchCloseBtn];
  for (let i = 0; i < searchBoxElems.length; i++) {
    if (searchBoxElems[i]) {
      searchBoxElems[i].addEventListener("click", function () {
        searchContainer.classList.toggle("active");
        document.body.classList.toggle("active");
      });
    }
  }
}

/**
 * move cycle on scroll
 */

const deliveryBoy = document.querySelector("[data-delivery-boy]");

if (deliveryBoy) {
  let deliveryBoyMove = -80;
  let lastScrollPos = 0;

  window.addEventListener("scroll", function () {
    let deliveryBoyTopPos = deliveryBoy.getBoundingClientRect().top;

    if (deliveryBoyTopPos < 500 && deliveryBoyTopPos > -250) {
      let activeScrollPos = window.scrollY;

      if (lastScrollPos < activeScrollPos) {
        deliveryBoyMove += 1;
      } else {
        deliveryBoyMove -= 1;
      }

      lastScrollPos = activeScrollPos;
      deliveryBoy.style.transform = `translateX(${deliveryBoyMove}px)`;
    }
  });
}

/**
 * food menu category filter (home page)
 */

const filterBtns = document.querySelectorAll("[data-filter-btn]");
const menuItems = document.querySelectorAll("[data-menu-item]");

if (filterBtns.length && menuItems.length) {
  for (let i = 0; i < filterBtns.length; i++) {
    filterBtns[i].addEventListener("click", function () {
      for (let j = 0; j < filterBtns.length; j++) {
        filterBtns[j].classList.remove("active");
      }
      this.classList.add("active");

      const filterValue = this.dataset.filterBtn;

      for (let k = 0; k < menuItems.length; k++) {
        const isMatch = filterValue === "all" || filterValue === menuItems[k].dataset.menuItem;
        menuItems[k].hidden = !isMatch;
      }
    });
  }
}

/**
 * menu page filter
 */

const menuFilterBtns = document.querySelectorAll("[data-menu-filter]");
const menuProductItems = document.querySelectorAll("[data-menu-item]");

if (menuFilterBtns.length) {
  for (let i = 0; i < menuFilterBtns.length; i++) {
    menuFilterBtns[i].addEventListener("click", function () {
      for (let j = 0; j < menuFilterBtns.length; j++) {
        menuFilterBtns[j].classList.remove("active");
      }
      this.classList.add("active");

      const filterValue = this.dataset.menuFilter;

      for (let k = 0; k < menuProductItems.length; k++) {
        const itemCat = menuProductItems[k].dataset.menuItem;
        if (filterValue === "all" || filterValue === itemCat) {
          menuProductItems[k].style.display = "";
        } else {
          menuProductItems[k].style.display = "none";
        }
      }
    });
  }
}

/**
 * hero carousel
 */

const heroCarousel = document.querySelector("[data-hero-carousel]");

if (heroCarousel) {
  const heroSlides = document.querySelectorAll("[data-hero-slide]");
  const heroPrevBtn = document.querySelector("[data-hero-prev]");
  const heroNextBtn = document.querySelector("[data-hero-next]");
  const heroDots = document.querySelectorAll("[data-hero-dot]");

  let heroCurrent = 0;
  let heroAutoplayId;

  const goToHeroSlide = function (index) {
    heroSlides[heroCurrent].classList.remove("active");
    heroDots[heroCurrent].classList.remove("active");

    heroCurrent = (index + heroSlides.length) % heroSlides.length;

    heroSlides[heroCurrent].classList.add("active");
    heroDots[heroCurrent].classList.add("active");
  };

  const startHeroAutoplay = function () {
    heroAutoplayId = setInterval(function () {
      goToHeroSlide(heroCurrent + 1);
    }, 6000);
  };

  const resetHeroAutoplay = function () {
    clearInterval(heroAutoplayId);
    startHeroAutoplay();
  };

  if (heroNextBtn) {
    heroNextBtn.addEventListener("click", function () {
      goToHeroSlide(heroCurrent + 1);
      resetHeroAutoplay();
    });
  }

  if (heroPrevBtn) {
    heroPrevBtn.addEventListener("click", function () {
      goToHeroSlide(heroCurrent - 1);
      resetHeroAutoplay();
    });
  }

  for (let i = 0; i < heroDots.length; i++) {
    heroDots[i].addEventListener("click", function () {
      goToHeroSlide(i);
      resetHeroAutoplay();
    });
  }

  startHeroAutoplay();
}

/**
 * branches — single source of truth
 */

const YARB_BRANCHES = [
  { slug: "medavakkam", name: "Medavakkam", hq: true, region: "Southern Hubs", landmark: "1A, Jeyachandran Nagar, Mambakkam Main Road", phone: "+91 97908 57802", note: "Our flagship kitchen and head office — where the first Ya Rahman handi went on the dum flame." },
  { slug: "madipakkam", name: "Madipakkam", region: "Southern Hubs", landmark: "High-volume Residential Cluster", phone: "+91 97908 57802", note: "Serving one of Chennai's busiest residential belts with fresh dum biriyani all day." },
  { slug: "pallikaranai", name: "Pallikaranai", region: "Southern Hubs", landmark: "Main Road Junction Hub", phone: "+91 97908 57802", note: "Right on the main road junction — easy pickup for commuters heading home." },
  { slug: "kovilambakkam", name: "Kovilambakkam", region: "Southern Hubs", landmark: "Inside Avenue Food Mall Station", phone: "+91 97908 57802", note: "Find us inside Avenue Food Mall — perfect for a quick biriyani stop while you shop." },
  { slug: "pallavaram", name: "Pallavaram", region: "GST Corridor", landmark: "101, GST Road (Near HDFC Bank)", phone: "+91 95004 22806", note: "On the GST Road artery near HDFC Bank — handy for airport-side cravings." },
  { slug: "tambaram", name: "Tambaram", region: "GST Corridor", landmark: "43, Muthu Linga Reddy Street, GST Road", phone: "+91 95004 22806", note: "A Tambaram favourite for family dinners and weekend bucket biriyani orders." },
  { slug: "chrompet", name: "Chrompet", region: "GST Corridor", landmark: "GST Traffic Belt Core", phone: "+91 95004 22806", note: "In the heart of the GST traffic belt — hot handis ready through the evening rush." },
  { slug: "egattur", name: "Egattur (OMR)", region: "OMR IT Corridor", landmark: "Rajiv Gandhi IT Expressway (Near SIPCOT Arch)", phone: "+91 97908 57802", note: "Near the SIPCOT arch on OMR — fuelling the IT crowd's lunch and late-night orders." },
  { slug: "karapakkam", name: "Karapakkam", region: "OMR IT Corridor", landmark: "OMR IT Corridor Belt", phone: "+91 97908 57802", note: "Mid-OMR pit stop for tech park teams — bulk office orders are our speciality here." },
  { slug: "siruseri", name: "Siruseri", region: "OMR IT Corridor", landmark: "Tech Park Entry Hub Zone", phone: "+91 97908 57802", note: "At the Siruseri tech park entry — quick pickups before and after shifts." },
  { slug: "kelambakkam", name: "Kelambakkam", region: "OMR IT Corridor", landmark: "Southern Suburban Link Road", phone: "+91 97908 57802", note: "Serving the fast-growing Kelambakkam suburb on the southern link road." },
  { slug: "velachery", name: "Velachery", region: "City Centre & Western", landmark: "Main Commercial Bypass Corridor", phone: "+91 95004 22806", note: "On Velachery's commercial bypass — a city-centre staple for dine-in and delivery." },
  { slug: "ekkaduthangal", name: "Ekkaduthangal", region: "City Centre & Western", landmark: "TS 138/2 & 138/3, Block 1, Poonamallee Road", phone: "+91 95004 22806", note: "Poonamallee Road outlet covering the Guindy industrial belt." },
  { slug: "jafferkhanpet", name: "Jafferkhanpet", region: "City Centre & Western", landmark: "No. 298/1, Jawaharlal Nehru Salai, Ashok Nagar", phone: "+91 95004 22806", note: "On Jawaharlal Nehru Salai by Ashok Nagar — biriyani for the city's west side." },
  { slug: "saligramam", name: "Saligramam", region: "City Centre & Western", landmark: "Vibrant Central Hub Area", phone: "+91 95004 22806", note: "Our vibrant central hub outlet — celebrations, cravings and everything between." }
];

/**
 * branch marquee (rendered into [data-branch-marquee])
 */

const branchMarquees = document.querySelectorAll("[data-branch-marquee]");

if (branchMarquees.length) {
  const marqueeItems = YARB_BRANCHES.map(function (b) {
    return '<li><ion-icon name="location" aria-hidden="true"></ion-icon>' + b.name + '</li>';
  }).join("");

  branchMarquees.forEach(function (marquee) {
    marquee.innerHTML =
      '<div class="ticker-track">' +
      '<ul class="ticker-list">' + marqueeItems + '</ul>' +
      '<ul class="ticker-list" aria-hidden="true">' + marqueeItems + '</ul>' +
      '</div>';
  });
}

/**
 * branch carousel (rendered into [data-branch-carousel])
 */

const branchCarousels = document.querySelectorAll("[data-branch-carousel]");

if (branchCarousels.length) {

  const branchCardsHTML = YARB_BRANCHES.map(function (b) {
    return (
      '<div class="branch-card">' +
      '<span class="branch-region-chip">' + b.region + '</span>' +
      '<div class="branch-name">' + b.name + (b.hq ? '<span class="hq-badge">HQ</span>' : '') + '</div>' +
      '<div class="branch-landmark"><ion-icon name="location-outline" aria-hidden="true"></ion-icon><span>' + b.landmark + '</span></div>' +
      '<div class="branch-phone"><ion-icon name="call-outline" aria-hidden="true"></ion-icon><a href="tel:' + b.phone.replace(/\s/g, "") + '">' + b.phone + '</a></div>' +
      '<a href="./branch.html?b=' + b.slug + '" class="branch-link"><span>View Branch</span><ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon></a>' +
      '</div>'
    );
  }).join("");

  branchCarousels.forEach(function (carousel) {

    carousel.innerHTML =
      '<div class="branch-track" data-branch-track>' + branchCardsHTML + '</div>' +
      '<button class="branch-nav-btn prev" data-branch-prev aria-label="Previous branches"><ion-icon name="chevron-back-outline"></ion-icon></button>' +
      '<button class="branch-nav-btn next" data-branch-next aria-label="Next branches"><ion-icon name="chevron-forward-outline"></ion-icon></button>';

    const track = carousel.querySelector("[data-branch-track]");
    const prevBtn = carousel.querySelector("[data-branch-prev]");
    const nextBtn = carousel.querySelector("[data-branch-next]");

    const cardStep = function () {
      const card = track.querySelector(".branch-card");
      return card ? card.offsetWidth + 20 : 300;
    };

    const scrollNext = function () {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - 10) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: cardStep(), behavior: "smooth" });
      }
    };

    const scrollPrev = function () {
      if (track.scrollLeft <= 10) {
        track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
      } else {
        track.scrollBy({ left: -cardStep(), behavior: "smooth" });
      }
    };

    let autoplayId;

    const startAutoplay = function () {
      autoplayId = setInterval(scrollNext, 3000);
    };

    const resetAutoplay = function () {
      clearInterval(autoplayId);
      startAutoplay();
    };

    nextBtn.addEventListener("click", function () {
      scrollNext();
      resetAutoplay();
    });

    prevBtn.addEventListener("click", function () {
      scrollPrev();
      resetAutoplay();
    });

    carousel.addEventListener("mouseenter", function () { clearInterval(autoplayId); });
    carousel.addEventListener("mouseleave", startAutoplay);
    track.addEventListener("touchstart", function () { clearInterval(autoplayId); }, { passive: true });
    track.addEventListener("touchend", startAutoplay);

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      startAutoplay();
    }

  });
}

/**
 * branch detail page (rendered into [data-branch-page])
 */

const branchPage = document.querySelector("[data-branch-page]");

if (branchPage) {

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("b");
  let branchIndex = YARB_BRANCHES.findIndex(function (b) { return b.slug === slug; });
  if (branchIndex === -1) branchIndex = 0;

  const branch = YARB_BRANCHES[branchIndex];
  const prevBranch = YARB_BRANCHES[(branchIndex - 1 + YARB_BRANCHES.length) % YARB_BRANCHES.length];
  const nextBranch = YARB_BRANCHES[(branchIndex + 1) % YARB_BRANCHES.length];
  const mapsQuery = encodeURIComponent("Ya Rahman Biriyani " + branch.name + " Chennai");

  document.title = branch.name + " Branch — Ya Rahman Biriyani Restaurant";

  const regionEl = document.querySelector("[data-branch-region]");
  const titleEl = document.querySelector("[data-branch-title]");
  if (regionEl) regionEl.textContent = branch.region;
  if (titleEl) titleEl.innerHTML = branch.name + ' <span class="span">Branch</span>';

  branchPage.innerHTML =
    '<div class="branch-detail">' +

    '<div class="branch-detail-card">' +
    '<h3><ion-icon name="storefront-outline" aria-hidden="true"></ion-icon>Branch Details' + (branch.hq ? ' <span style="background-color: hsl(15, 92%, 52%); color: #fff; font-size: 1.1rem; padding: 2px 10px; border-radius: 4px;">HQ</span>' : '') + '</h3>' +
    '<ul class="branch-meta-list">' +
    '<li><ion-icon name="location-outline" aria-hidden="true"></ion-icon><span>' + branch.landmark + ', ' + branch.name + ', Chennai</span></li>' +
    '<li><ion-icon name="call-outline" aria-hidden="true"></ion-icon><a href="tel:' + branch.phone.replace(/\s/g, "") + '">' + branch.phone + '</a></li>' +
    '<li><ion-icon name="time-outline" aria-hidden="true"></ion-icon><span>Open daily: 11:00 AM – 11:00 PM</span></li>' +
    '<li><ion-icon name="bicycle-outline" aria-hidden="true"></ion-icon><span>30-minute hyper-local delivery via Swiggy &amp; Zomato</span></li>' +
    '</ul>' +
    '<a href="https://www.google.com/maps/search/?api=1&query=' + mapsQuery + '" target="_blank" rel="noopener" class="btn btn-hover"><ion-icon name="navigate-outline" aria-hidden="true"></ion-icon><span>Get Directions</span></a>' +
    '</div>' +

    '<div class="branch-detail-card">' +
    '<h3><ion-icon name="flame-outline" aria-hidden="true"></ion-icon>About This Branch</h3>' +
    '<p style="font-size: 1.5rem; line-height: 1.7;">' + branch.note + '</p>' +
    '<a href="./menu.html" class="btn btn-hover" style="margin-block-start: 25px;"><span>Explore Menu</span><ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon></a>' +
    '</div>' +

    '</div>' +

    '<div class="branch-pagenav">' +
    '<a href="./branch.html?b=' + prevBranch.slug + '"><ion-icon name="chevron-back-outline" aria-hidden="true"></ion-icon><span>' + prevBranch.name + '</span></a>' +
    '<a href="./branch.html?b=' + nextBranch.slug + '"><span>' + nextBranch.name + '</span><ion-icon name="chevron-forward-outline" aria-hidden="true"></ion-icon></a>' +
    '</div>';
}

/**
 * fullscreen overlay menu (replaces the inline navbar)
 */

const YARB_NAV = [
  { label: "Home", href: "./index.html" },
  { label: "About Us", href: "./about.html" },
  { label: "Menu", href: "./menu.html" },
  { label: "Blog", href: "./blog.html" },
  { label: "Contact Us", href: "./contact.html" }
];

const siteMenuToggleBtn = document.querySelector("[data-menu-toggle-btn]");

if (siteMenuToggleBtn) {

  const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

  const navItemsHTML = YARB_NAV.map(function (item, i) {
    const isActive = item.href.replace("./", "") === currentPage;
    return (
      '<li><a href="' + item.href + '" class="menu-item"' +
      (isActive ? ' data-active' : '') +
      ' style="--i: ' + i + '">' + item.label + '</a></li>'
    );
  }).join("");

  const siteMenu = document.createElement("nav");
  siteMenu.className = "site-menu";
  siteMenu.setAttribute("aria-label", "Main menu");
  siteMenu.innerHTML =
    '<div class="menu-title" aria-hidden="true">' +
    '<span>YA</span><span>RAH</span><span>MAN</span>' +
    '</div>' +
    '<ul class="menu-items" style="--total: ' + YARB_NAV.length + '">' + navItemsHTML + '</ul>';

  document.body.appendChild(siteMenu);

  siteMenuToggleBtn.addEventListener("click", function () {
    if (document.body.dataset.menu) {
      delete document.body.dataset.menu;
    } else {
      document.body.dataset.menu = "true";
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && document.body.dataset.menu) {
      delete document.body.dataset.menu;
      siteMenuToggleBtn.classList.remove("active");
    }
  });
}

/**
 * page transition — logo pop overlay between internal pages
 */

(function () {

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const overlay = document.createElement("div");
  overlay.className = "page-trans-overlay";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML =
    '<div class="page-trans-bg"></div>' +
    '<div class="page-trans-logo">' +
    '<img src="./assets/images/yarb-logo.png" width="110" height="110" alt="">' +
    '</div>';
  document.body.appendChild(overlay);

  const TRANS_FLAG = "yarbPageTransition";

  /* arriving: if the previous page set the flag, fade the overlay away */
  const onHomePage = /(?:^|\/)(?:index\.html)?$/i.test(window.location.pathname);

  let entering = false;
  try {
    entering = sessionStorage.getItem(TRANS_FLAG) === "1";
    if (entering) sessionStorage.removeItem(TRANS_FLAG);
  } catch (err) { /* sessionStorage unavailable — skip */ }

  if (onHomePage) entering = false;

  if (entering) {
    overlay.classList.add("is-active", "is-entering");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.classList.add("is-done");
      });
    });
    overlay.addEventListener("transitionend", function () {
      overlay.classList.remove("is-active", "is-entering", "is-done");
    }, { once: true });
  }

  /* leaving: intercept internal .html navigation, pop the logo, then go */
  let navigating = false;

  document.addEventListener("click", function (event) {
    if (navigating) { event.preventDefault(); return; }
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest("a[href]");
    if (!link) return;
    if (link.target && link.target !== "_self") return;
    if (link.hasAttribute("download")) return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

    let url;
    try { url = new URL(link.href, window.location.href); } catch (err) { return; }
    if (url.origin !== window.location.origin) return;
    if (!/\.html?$/i.test(url.pathname) && url.pathname !== "/") return;

    /* home has its own video loader — no logo transition on the way there */
    if (/(?:^|\/)index\.html$/i.test(url.pathname) || url.pathname === "/") return;

    /* same page + only the hash changed — let the browser scroll */
    if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) return;

    event.preventDefault();
    navigating = true;

    try { sessionStorage.setItem(TRANS_FLAG, "1"); } catch (err) { /* ignore */ }

    overlay.classList.add("is-active", "is-leaving");

    setTimeout(function () {
      window.location.href = url.href;
    }, 550);
  });

  /* restore state if the page is served from the back/forward cache */
  window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
      navigating = false;
      overlay.classList.remove("is-active", "is-leaving", "is-entering", "is-done");
    }
  });

})();

/**
 * home page master loader — plays the flame logo video (with sound) on every home load
 */

(function () {

  const isHomePage = /(?:^|\/)(?:index\.html)?$/i.test(window.location.pathname);
  if (!isHomePage) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const loader = document.createElement("div");
  loader.className = "home-loader";
  loader.setAttribute("aria-label", "Ya Rahman intro");
  loader.innerHTML =
    '<div class="home-loader-frame">' +
    '<video class="home-loader-video" src="./assets/videos/home-loader.mp4" playsinline preload="auto"></video>' +
    '</div>' +
    '<button class="home-loader-sound" type="button">' +
    '<ion-icon name="volume-high-outline" aria-hidden="true"></ion-icon><span>Tap for sound</span>' +
    '</button>' +
    '<button class="home-loader-skip" type="button">' +
    '<span>Skip Intro</span><ion-icon name="play-skip-forward-outline" aria-hidden="true"></ion-icon>' +
    '</button>';
  document.body.appendChild(loader);
  document.body.classList.add("home-loading");

  const loaderVideo = loader.querySelector(".home-loader-video");
  const soundBtn = loader.querySelector(".home-loader-sound");
  const skipBtn = loader.querySelector(".home-loader-skip");

  let loaderClosed = false;

  const closeLoader = function () {
    if (loaderClosed) return;
    loaderClosed = true;
    try { loaderVideo.pause(); } catch (err) { /* already gone */ }
    loader.classList.add("is-hidden");
    document.body.classList.remove("home-loading");
    setTimeout(function () {
      if (loader.parentNode) loader.parentNode.removeChild(loader);
    }, 700);
  };

  loaderVideo.addEventListener("ended", closeLoader);
  loaderVideo.addEventListener("error", closeLoader);
  skipBtn.addEventListener("click", closeLoader);

  /* failsafe: the site must never stay stuck behind the loader */
  setTimeout(closeLoader, 15000);

  soundBtn.addEventListener("click", function () {
    loaderVideo.muted = false;
    loaderVideo.volume = 1;
    soundBtn.classList.add("is-hidden");
    const replay = loaderVideo.play();
    if (replay && replay.catch) replay.catch(function () { /* keep playing muted */ });
  });

  /* try with sound first; if the browser blocks it, fall back to muted + a sound button */
  loaderVideo.muted = false;
  loaderVideo.volume = 1;
  const attempt = loaderVideo.play();

  if (attempt && attempt.then) {
    attempt.then(function () {
      soundBtn.classList.add("is-hidden");
    }).catch(function () {
      loaderVideo.muted = true;
      const retry = loaderVideo.play();
      if (retry && retry.catch) retry.catch(closeLoader);
    });
  }

})();

/**
 * blog — single source of truth
 */

const YARB_BLOGS = [
  {
    slug: "royal-history-dum-biriyani",
    title: "The Royal History Behind Hyderabadi Dum Biriyani",
    badge: "Heritage",
    date: "Jul 01 2026",
    datetime: "2026-07-01",
    author: "Ya Rahman Kitchen",
    image: "./assets/images/biryani/blog-1-history.jpg",
    excerpt: "From the kitchens of the Nizams to your dinner table — how this timeless dish came to be.",
    body: [
      "Every plate of dum biriyani carries four hundred years of history. The dish took shape in the royal kitchens of the Deccan, where cooks discovered that sealing rice and meat together in a heavy pot — and trusting the steam to do the work — produced something greater than either alone.",
      "The word 'dum' comes from the Persian 'dam', meaning breath. That is exactly what the technique is: the pot breathes. Sealed with a rope of dough, the handi traps every bit of aroma, letting the saffron, the meat juices and the ghee soak into each grain of basmati.",
      "When our founder started Ya Rahman in Medavakkam in 2003, this was the method he refused to compromise on. No pressure cookers, no shortcuts — a sealed handi, a low flame, and patience.",
      "Twenty-three years later, every branch still opens its first handi at 11 AM sharp. The recipe has never been written down in full. It lives in the hands of the cooks who learned it side by side, one dum at a time."
    ]
  },
  {
    slug: "what-makes-dum-cooking-special",
    title: "What Makes \"Dum\" Cooking So Special?",
    badge: "Cooking",
    date: "Jun 20 2026",
    datetime: "2026-06-20",
    author: "Ya Rahman Kitchen",
    image: "./assets/images/biryani/blog-2-dum.jpg",
    excerpt: "The slow, sealed-pot technique that locks in every ounce of flavour — here's how we do it.",
    body: [
      "Watch a Ya Rahman kitchen at 9 AM and you'll see the same ritual in every branch: rice par-boiled to exactly seventy percent, marinated meat layered underneath, fried onions and mint scattered between, and then — the important part — the lid sealed shut with a rope of atta dough.",
      "Once sealed, nobody touches the pot. The flame stays low. Steam builds inside and has nowhere to go, so it circulates, basting the rice in the meat's own juices from below and the saffron milk from above.",
      "This is why dum biriyani cannot be rushed. Open the pot five minutes early and the bottom layer is underdone. The dough seal isn't decoration — it's a timer, a lock and a promise.",
      "The first time a new cook is allowed to break a seal on their own is a small ceremony in our kitchens. If the aroma hits the back wall of the shop, they've done it right.",
      "Come at opening time to any branch and ask for biriyani from the first handi. You'll taste the difference the seal makes."
    ]
  },
  {
    slug: "five-spices-every-biriyani-needs",
    title: "5 Whole Spices Every Great Biriyani Needs",
    badge: "Spices",
    date: "Jun 10 2026",
    datetime: "2026-06-10",
    author: "Ya Rahman Kitchen",
    image: "./assets/images/biryani/blog-3-spices.jpg",
    excerpt: "From star anise to mace, these aromatics are the soul of a truly authentic biriyani.",
    body: [
      "Our spice blend uses twenty-three aromatics, and no, we won't list them all. But five of them do the heavy lifting, and knowing them will change how you taste biriyani forever.",
      "Star anise gives the base sweetness you can't quite place. Green cardamom lifts the rice — it's the difference between fragrant and flat. Cloves bring warmth that lingers at the back of the throat. Cinnamon bark, never powder, melts slowly through the dum. And mace — javitri — is the quiet one, rounding everything together.",
      "The rule in our kitchen: whole spices only, ground fresh every single morning, in-house. Pre-ground spice loses half its oil — and all of its soul — within days.",
      "Next time you eat our biriyani, fish out a piece of cinnamon bark from the rice. That's not carelessness. That's proof it was made the right way."
    ]
  },
  {
    slug: "chennai-biriyani-trail",
    title: "Chennai's Biriyani Trail: How Our City Eats",
    badge: "Chennai",
    date: "Jun 02 2026",
    datetime: "2026-06-02",
    author: "Ya Rahman Kitchen",
    image: "./assets/images/biryani/banner-4-overhead.jpg",
    excerpt: "From Triplicane's old lanes to the OMR tech corridor — a love letter to the city that eats biriyani like nowhere else.",
    body: [
      "Chennai doesn't just eat biriyani. Chennai has opinions about biriyani — loud ones, at family functions, in office lunch rooms, in auto stands at midnight.",
      "The city's biriyani story runs through Triplicane and Royapettah's old Muslim quarters, where seeraga samba rice met Mughlai dum technique and became something distinctly Tamil. Then it spread — GST Road, Velachery, and now the OMR corridor, where a techie's Friday lunch is practically a civic institution.",
      "We've watched this city's taste evolve from fifteen counters. Medavakkam families order mutton on Sundays, no exceptions. The OMR crowd wants chicken 65 biriyani at 11 PM. Tambaram takes the bucket — always the bucket — for birthdays.",
      "What never changes: Chennai knows when rice has been rushed. This city can taste a shortcut from across the street. It keeps us honest, and honestly? We wouldn't want to cook for anyone else."
    ]
  },
  {
    slug: "chicken-65-chennai-legend",
    title: "Chicken 65: The Legend Chennai Gave the World",
    badge: "Chennai",
    date: "May 24 2026",
    datetime: "2026-05-24",
    author: "Ya Rahman Kitchen",
    image: "./assets/images/biryani/promo-1-chicken.jpg",
    excerpt: "Born in a Chennai hotel kitchen in 1965, this fiery red classic is our city's proudest export.",
    body: [
      "Every menu in South India has it. Few know it was born right here — Chicken 65 first appeared at Chennai's Buhari Hotel in 1965, and the city has argued about the name ever since. Sixty-five chillies? A 65-day-old bird? Item number 65 on the menu? Buhari's own story is the simplest: the year it was invented.",
      "Whatever the truth, Chennai perfected it: boneless chicken marinated in ginger-garlic, red chilli and a whisper of curry leaf, fried hard so the outside crackles while the inside stays juicy.",
      "Ours leans classic — yogurt in the marinade for tenderness, curry leaves flash-fried at the end, and a heat level that makes a point without ending the conversation.",
      "Order it the Chennai way: as a side with your biriyani, one plate for the table, and watch it disappear before the biriyani is even served. Our mini plate exists precisely because of how these fights end."
    ]
  },
  {
    slug: "porotta-midnight-ritual",
    title: "Porotta at Midnight: Chennai's Late-Night Ritual",
    badge: "Street Food",
    date: "May 12 2026",
    datetime: "2026-05-12",
    author: "Ya Rahman Kitchen",
    image: "./assets/images/biryani/promo-6-porotta.jpg",
    excerpt: "Flaky, buttery, beaten by hand and eaten after dark — why the porotta owns this city's nights.",
    body: [
      "Some cities have midnight pizza. Chennai has the porotta bench — that plastic stool near a hot iron griddle, sometime after 10 PM, where the day finally makes sense.",
      "A proper porotta is a small act of violence and a large act of love. The dough is stretched until it's thin enough to read through, coiled, rested, then flattened and griddled. And then — the part that matters — it's clapped between two hands until the layers shatter and separate.",
      "Serve it with salna and it drinks the gravy like it was born thirsty. Serve it kothu-style — chopped and stir-fried with egg, chicken and spices on a clattering griddle — and you have the loudest, best-smelling dish in Tamil Nadu.",
      "Our porotta masters at every branch beat them fresh through the evening. The clatter you hear from the kitchen after 7 PM? That's not noise. That's rhythm."
    ]
  },
  {
    slug: "bucket-biriyani-feeds-everyone",
    title: "Bucket Biriyani: How to Feed a Full House",
    badge: "Our Menu",
    date: "Apr 28 2026",
    datetime: "2026-04-28",
    author: "Ya Rahman Kitchen",
    image: "./assets/images/biryani/banner-1-feast.jpg",
    excerpt: "Birthdays, cricket finals, office parties — the story behind our most-ordered format.",
    body: [
      "Somewhere along the way, Chennai decided that celebrations are measured in buckets. We fully support this.",
      "The bucket biriyani began as a practical answer to a repeated question: 'Anna, enough for eight people?' Boxes were messy math. A bucket is a straight answer — layered like a proper handi, sealed hot, with the raita, brinjal curry and bread halwa packed alongside.",
      "It's now the single most-ordered format across our fifteen branches. Cricket finals cause measurable spikes. IPL season, we add staff.",
      "The trick to ordering: one bucket feeds four generously or six politely. For office orders above twenty boxes, call the HQ line a day ahead — your lunch arrives on the dot, still breathing steam.",
      "Fair warning from experience: the bread halwa goes first. Order extra."
    ]
  },
  {
    slug: "what-makes-great-shawarma",
    title: "The Slow Turn: What Makes a Great Shawarma",
    badge: "Arabic",
    date: "Apr 10 2026",
    datetime: "2026-04-10",
    author: "Ya Rahman Kitchen",
    image: "./assets/images/biryani/promo-8-shawarma.jpg",
    excerpt: "Hours on the vertical spit, garlic sauce made daily — the Arabic street classic, done properly.",
    body: [
      "The shawarma arrived in Chennai sometime in the 2000s and never left. But there's a canyon of difference between meat warmed on a stick and shawarma done properly.",
      "Real shawarma is patience, vertically arranged. Chicken thighs — never breast — are stacked and marinated overnight in toum, paprika and Arabic seven-spice, then turned slowly for hours so each layer bastes the one below it. You shave only the outside, only when it's crisp.",
      "The garlic sauce matters as much as the meat. Ours is made fresh daily — garlic, lemon and oil whipped to a cloud. No mayonnaise shortcuts; you can taste the difference in one bite.",
      "Order it as a roll after work or as a plate with fries and extra toum for dinner. Either way, look for the crisp edges. That's where the whole craft lives."
    ]
  }
];

/**
 * blog card grids (rendered into [data-blog-grid])
 */

const blogGrids = document.querySelectorAll("[data-blog-grid]");

if (blogGrids.length) {

  const buildBlogCard = function (post) {
    return (
      '<div class="blog-card">' +
      '<div class="card-banner">' +
      '<a href="./blog-post.html?post=' + post.slug + '">' +
      '<img src="' + post.image + '" width="600" height="390" loading="lazy" alt="' + post.title.replace(/"/g, "&quot;") + '" class="w-100">' +
      '</a>' +
      '<div class="badge">' + post.badge + '</div>' +
      '</div>' +
      '<div class="card-content">' +
      '<div class="card-meta-wrapper">' +
      '<span class="card-meta-link"><ion-icon name="calendar-outline"></ion-icon>' +
      '<time class="meta-info" datetime="' + post.datetime + '">' + post.date + '</time></span>' +
      '<span class="card-meta-link"><ion-icon name="person-outline"></ion-icon>' +
      '<p class="meta-info">' + post.author + '</p></span>' +
      '</div>' +
      '<h3 class="h3"><a href="./blog-post.html?post=' + post.slug + '" class="card-title">' + post.title + '</a></h3>' +
      '<p class="card-text">' + post.excerpt + '</p>' +
      '<a href="./blog-post.html?post=' + post.slug + '" class="btn-link">' +
      '<span>Read More</span><ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>' +
      '</a>' +
      '</div>' +
      '</div>'
    );
  };

  blogGrids.forEach(function (grid) {
    const limitAttr = grid.dataset.blogGrid;
    const posts = (limitAttr && limitAttr !== "all")
      ? YARB_BLOGS.slice(0, parseInt(limitAttr, 10) || YARB_BLOGS.length)
      : YARB_BLOGS;
    grid.innerHTML = posts.map(buildBlogCard).join("");
  });
}

/**
 * individual blog post page (rendered into [data-blog-page])
 */

const blogPage = document.querySelector("[data-blog-page]");

if (blogPage) {

  const blogParams = new URLSearchParams(window.location.search);
  const blogSlug = blogParams.get("post");
  let blogIndex = YARB_BLOGS.findIndex(function (p) { return p.slug === blogSlug; });
  if (blogIndex === -1) blogIndex = 0;

  const post = YARB_BLOGS[blogIndex];
  const prevPost = YARB_BLOGS[(blogIndex - 1 + YARB_BLOGS.length) % YARB_BLOGS.length];
  const nextPost = YARB_BLOGS[(blogIndex + 1) % YARB_BLOGS.length];

  document.title = post.title + " — Ya Rahman Biriyani";

  const badgeEl = document.querySelector("[data-blog-badge]");
  const titleEl = document.querySelector("[data-blog-title]");
  const metaEl = document.querySelector("[data-blog-meta]");
  if (badgeEl) badgeEl.textContent = post.badge;
  if (titleEl) titleEl.textContent = post.title;
  if (metaEl) metaEl.innerHTML =
    '<span><ion-icon name="calendar-outline" aria-hidden="true"></ion-icon> ' + post.date + '</span>' +
    '<span><ion-icon name="person-outline" aria-hidden="true"></ion-icon> ' + post.author + '</span>';

  blogPage.innerHTML =
    '<figure class="post-figure">' +
    '<img src="' + post.image + '" width="900" height="500" alt="' + post.title.replace(/"/g, "&quot;") + '" class="w-100">' +
    '</figure>' +
    '<div class="post-body">' +
    post.body.map(function (para) { return '<p>' + para + '</p>'; }).join("") +
    '</div>' +
    '<div class="branch-pagenav post-pagenav">' +
    '<a href="./blog-post.html?post=' + prevPost.slug + '"><ion-icon name="chevron-back-outline" aria-hidden="true"></ion-icon><span>Previous</span></a>' +
    '<a href="./blog.html"><ion-icon name="grid-outline" aria-hidden="true"></ion-icon><span>All Posts</span></a>' +
    '<a href="./blog-post.html?post=' + nextPost.slug + '"><span>Next</span><ion-icon name="chevron-forward-outline" aria-hidden="true"></ion-icon></a>' +
    '</div>';
}
