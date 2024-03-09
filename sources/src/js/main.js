// ========== HEADER LOGIC

var toggleCarBodyType = (carBodyTypeList, btn) => {
  btn.addEventListener("click", () => {
    var isFull = carBodyTypeList.classList.contains("full");

    if (isFull) {
      carBodyTypeList.classList.remove("full");
      btn.children[1].textContent = btn.dataset.rolled;
    } else {
      carBodyTypeList.classList.add("full");
      btn.children[1].textContent = btn.dataset.full;
    }
  });
};

var headerLogic = () => {
  // toggle car body type
  var car_body_type_list = document.querySelector(".cmenu__list_body");
  var car_body_type_btn = document.querySelector(".cmenu__body_toggle");

  toggleCarBodyType(car_body_type_list, car_body_type_btn);

  // toggle catalog menu

  var catalog_menu = document.querySelector(".cmenu");
  var cmenu_btn = document.querySelector(".cmenu__show");
  var burger = cmenu_btn.children[0];
  var overlay = document.querySelector(".overlay");
  var body = document.body;
  var cmenu_wrapper = document.querySelector(".cmenu__wrapper");

  var enableElements = () => {
    catalog_menu.classList.add("active");
    burger.classList.add("active");
    overlay.classList.add("active");
    body.classList.add("lock");
    window.addEventListener("click", handleWindow);
  };

  var disableElements = () => {
    catalog_menu.classList.remove("active");
    burger.classList.remove("active");
    overlay.classList.remove("active");
    body.classList.remove("lock");
    window.removeEventListener("click", handleWindow);
  };

  var handleWindow = (e) => !e.target.closest(".cmenu") && disableElements();

  var handleButton = () =>
    catalog_menu.classList.contains("active")
      ? disableElements()
      : enableElements();

  var addListenerToCatalogBtn = () =>
    cmenu_btn.addEventListener("click", handleButton);

  window.innerWidth >= 992 && addListenerToCatalogBtn();

  // toggle header handlers by resize
  var mqMin991 = window.matchMedia("(min-width: 992px)");

  var handleMQ = (e) => {
    if (e.matches) {
      // remove transition effect to '.cmenu_wrapper'
      cmenu_wrapper.style.transition = "none";
      cmenu_wrapper.style.display = "none";
      setTimeout(() => (cmenu_wrapper.style.display = ""), 1000);

      // add listener to '.cmenu__show'
      addListenerToCatalogBtn();
    } else {
      cmenu_btn.removeEventListener("click", handleButton);
      disableElements();
    }
  };

  mqMin991.addEventListener("change", handleMQ);

  // mobile menu toggle

  var burger_btn = document.querySelector(".header__burger");
  var mobile_menu = document.querySelector(".header__menu");
  var cmenu__names = document.querySelectorAll(".cmenu__name");

  var mobileMenuToggle = () => {
    burger_btn.addEventListener("click", () => {
      burger_btn.classList.toggle("active");
      mobile_menu.classList.toggle("active");
      body.classList.toggle("lock");
    });

    cmenu__names.forEach((name) => {
      var group = name.parentElement;

      name.addEventListener(
        "click",
        () => window.innerWidth < 992 && group.classList.toggle("active")
      );
    });
  };

  mobileMenuToggle();
};

// ========== MAIN SLIDER LOGIC

var initMainSlider = () => {
  var slides = Array.from(document.querySelectorAll(".main_intro__slide"));

  if (slides.length < 1) {
    return;
  } else {
    const TIME = 8500;

    var toggleActiveSlide = (newSlide, slides) => {
      slides.forEach((s) => s.classList.remove("active"));
      newSlide.classList.add("active");
    };

    var getCurrentSlide = () =>
      slides.find((s) => s.classList.contains("active"));

    var getNewSlide = (currentSlide) => {
      return currentSlide.nextElementSibling
        ? currentSlide.nextElementSibling
        : slides[0];
    };

    var changeSlide = () => {
      var currentSlide = getCurrentSlide();
      var newSlide = getNewSlide(currentSlide);
      toggleActiveSlide(newSlide, slides);
    };

    var autoChangeSlides = setInterval(changeSlide, TIME);

    // change slide by click
    slides.forEach((slide) => {
      slide.addEventListener("click", () => {
        var isActive = slide.classList.contains("active");

        if (!isActive) {
          toggleActiveSlide(slide, slides);

          clearInterval(autoChangeSlides);

          autoChangeSlides = setInterval(changeSlide, TIME);
        }
      });
    });
  }
};

// ========== Q_SELECTION LOGIC

var initQSelection = () => {
  var qs_groups = Array.from(document.querySelectorAll(".q_selection__group"));

  if (qs_groups.length < 1) {
    return;
  } else {
    var select_blocks = Array.from(
      document.querySelectorAll(".q_selection__select")
    );
    var inputs = Array.from(document.querySelectorAll(".q_selection__input"));
    var currentSelectBlock = null;

    var windowClickHandle = (e) => {
      var isCurrentSelectBlock =
        e.target.closest(".q_selection__select") === currentSelectBlock;

      if (!isCurrentSelectBlock) {
        currentSelectBlock.classList.remove("active");

        // clear winwow listeners
        window.removeEventListener("click", windowClickHandle);
        currentSelectBlock = null;
      }
    };

    var inputsHandle = (e) => {
      // remove class 'active' from all '.q_selection__select'
      select_blocks.forEach((sb) => sb.classList.remove("active"));

      var input = e.target;
      var select_block = input.parentElement;
      select_block.classList.add("active");

      // add listener to window and set current '.q_selection__select'
      window.addEventListener("click", windowClickHandle);
      currentSelectBlock = select_block;
    };

    inputs.forEach((i) => i.addEventListener("focus", inputsHandle));

    // add listener to all '.q_selection__btn'
    var i_btns = Array.from(document.querySelectorAll(".q_selection__btn"));

    i_btns.forEach((btn) =>
      btn.addEventListener("click", () => {
        var select_block = btn.closest(".q_selection__select");
        var input = select_block.children[0];
        // set value to input
        input.value = btn.value;
        // hide '.q_selection__select'
        select_block.classList.remove("active");

        // clear winwow listeners
        window.removeEventListener("click", windowClickHandle);
        currentSelectBlock = null;
      })
    );
  }
};

// ========== INIT MASKED INPUTS

var initMaskedInputs = () => {
  var initMaskaInput = () => {
    const { MaskInput } = Maska;
    const maskIinput = new MaskInput("[data-maska]");
  };

  var maskedInput = document.querySelectorAll("[data-maska]");

  maskedInput && initMaskaInput();
};

// ========== CARD LOGIC

var initCardLogic = () => {
  var cards = Array.from(document.querySelectorAll(".card"));

  if (cards.length < 1) {
    return;
  } else {
    var previews = Array.from(document.querySelectorAll(".card__previews"));

    // init all inner sliders in every card
    var innerSliders = previews.map(
      (el) =>
        new Swiper(el, {
          spaceBetween: 0,
          slidesPerView: 4,
          draggable: true,
        })
    );

    // init toggle active preview
    var toggleActivePreview = () => {
      previews.forEach((p) => {
        var fullsize = Array.from(
          p.previousElementSibling.querySelectorAll(".card__full_item")
        );
        var items = Array.from(p.querySelectorAll(".card__prev_item"));

        items.forEach((item) => {
          item.addEventListener("click", () => {
            items.forEach((i) => i.classList.remove("active"));
            item.classList.add("active");

            fullsize.forEach((f) => f.classList.remove("active"));
            var idx = items.indexOf(item);
            fullsize[idx].classList.add("active");
          });
        });
      });
    };

    toggleActivePreview();

    // init favorites for every card
    cards.forEach((card) => {
      var favorites = card.querySelector(".card__favorites");
      favorites.addEventListener("click", () => {
        card.classList.toggle("added-to-favoriter");
      });
    });
  }
};

// ========== BLOCK SLIDER LOGIC

var initBlockSlider = () => {
  var blockSliders = Array.from(document.querySelectorAll(".block-slider"));
  var aSliders = null;

  var createActiveSliders = (bSlider) => {
    var activeSliders = bSlider.map((slider) => {
      var parent = slider.closest(".section-with-slider");
      var prev_btn = parent.querySelector(".slider__prev_btn");
      var next_btn = parent.querySelector(".slider__next_btn");

      return new Swiper(slider, {
        spaceBetween: 24,
        slidesPerView: 2,
        draggable: true,
        navigation: {
          prevEl: prev_btn,
          nextEl: next_btn,
        },
        breakpoints: {
          992: {
            slidesPerView: 3,
          },
          1301: {
            slidesPerView: 4,
          },
        },
      });
    });

    return activeSliders;
  };

  var handleSmallWidth = () => {
    aSliders = createActiveSliders(blockSliders);
  };

  var handleWideWidth = () => {
    aSliders.forEach((s) => s.destroy(true, true));
    aSliders = null;
  };

  // create matchMedia
  var mqMin768 = window.matchMedia("(min-width: 768px)");

  // create handler
  var handleMQ = (e, cbMatches, cbNonMatches) =>
    e.matches ? cbMatches() : cbNonMatches();

  // add listeners to resize
  mqMin768.addEventListener("change", (e) =>
    handleMQ(e, handleSmallWidth, handleWideWidth)
  );

  // block slider logic
  if (blockSliders.length < 1) {
    return;
  } else {
    // init sliders if window width >= 992
    if (window.innerWidth >= 768) {
      aSliders = createActiveSliders(blockSliders);
    }
  }
};

// ========== CARD MOBILE SLIDER

var initCardMobileSlider = () => {
  var cardMobileSliders = Array.from(document.querySelectorAll(".card__full"));
  var mSliders = null;

  var createMobileSliders = (sliderElements) => {
    var mobileSliders = cardMobileSliders.map((s) => {
      return new Swiper(s, {
        spaceBetween: 0,
        slidesPerView: 1,
        draggable: true,
        pagination: {
          el: ".card__full_paggination",
          type: "bullets",
        },
      });
    });

    return mobileSliders;
  };

  var handleSmallWidth = () => {
    mSliders.forEach((s) => s.destroy(true, true));
    mSliders = null;
  };

  var handleWideWidth = () => {
    mSliders = createMobileSliders(cardMobileSliders);
  };

  // create matchMedia
  var mqMin768 = window.matchMedia("(min-width: 768px)");

  // create handler
  var handleMQ = (e, cbMatches, cbNonMatches) =>
    e.matches ? cbMatches() : cbNonMatches();

  // add listeners to resize
  mqMin768.addEventListener("change", (e) =>
    handleMQ(e, handleSmallWidth, handleWideWidth)
  );

  if (cardMobileSliders < 1) {
    return;
  } else {
    // init sliders if window width < 992
    if (window.innerWidth < 768) {
      mSliders = createMobileSliders(cardMobileSliders);
    }
  }
};

// ========== CLONE TICKER BLOCKS

var cloneTickerBlocks = () => {
  var ticker_blocks = Array.from(
    document.querySelectorAll(".autocredit__ticker_block")
  );

  if (ticker_blocks.length < 1) {
    return;
  } else {
    var parent = ticker_blocks[0].parentElement;
    var fragment = document.createDocumentFragment();

    fragment.append(ticker_blocks[0].cloneNode(true));
    fragment.append(ticker_blocks[0].cloneNode(true));
    // fragment.append(ticker_blocks[0].cloneNode(true));

    // if (window.innerWidth > 2000) {
    //   fragment.append(ticker_blocks[0].cloneNode(true));
    //   fragment.append(ticker_blocks[0].cloneNode(true));
    //   fragment.append(ticker_blocks[0].cloneNode(true));
    // } else {
    //   fragment.append(ticker_blocks[0].cloneNode(true));
    //   fragment.append(ticker_blocks[0].cloneNode(true));
    // }

    parent.append(fragment);
  }
};

// ========== INIT MAP

var doCreateMapScript = (cb) => {
  setTimeout(function () {
    var script = document.createElement("script");
    script.async = false;
    script.src = "https://api-maps.yandex.ru/2.1/?apikey=key&lang=ru_RU";
    document.body.appendChild(script);
    script.onload = () => cb();
  }, 2000);
};

var initMap = () => {
  var map = document.getElementById("contacts-map");
  if (map) {
    var init = () => {
      var coords = [45.085422, 38.990786];
      var mark_link = "images/mark.svg";

      if (ymaps) {
        var map = new ymaps.Map("contacts-map", {
          center: coords,
          zoom: 17,
        });

        var placemark = new ymaps.Placemark(
          coords,
          {},
          {
            iconLayout: "default#image",
            iconImageHref: mark_link,
            iconImageSize: [100, 100],
            iconImageOffset: [-60, -80],
          }
        );

        map.controls.remove("geolocationControl");
        map.controls.remove("searchControl");
        map.controls.remove("trafficControl");
        map.controls.remove("typeSelector");
        map.controls.remove("fullscreenControl");
        // map.controls.remove("zoomControl"); // удаляем контрол зуммирования
        map.controls.remove("rulerControl");
        // map.behaviors.disable(["scrollZoom"]); // отключаем скролл карты (опционально)

        map.geoObjects.add(placemark);
      }
    };

    ymaps.ready(init);
  }
};

document.addEventListener("DOMContentLoaded", (event) => {
  headerLogic();
  initMainSlider();
  initQSelection();
  initMaskedInputs();
  initCardLogic();
  initBlockSlider();
  initCardMobileSlider();
  cloneTickerBlocks();

  var map = document.getElementById("contacts-map");
  map && doCreateMapScript(initMap);
});
