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
        var fullsize = p.previousElementSibling;
        var items = Array.from(p.querySelectorAll(".card__prev_item"));

        items.forEach((item) => {
          item.addEventListener("click", () => {
            var url = item.dataset.full;
            var newSourceSrcset = `${url}.webp, ${url}@2x.webp 2x`;
            var newImgSrc = `${url}.jpg`;
            var newImgSrcset = `${url}.jpg, ${url}@2x.jpg 2x`;

            var source = fullsize.children[0].children[0];
            var img = fullsize.children[0].children[1];

            source.setAttribute("srcset", newSourceSrcset);
            img.setAttribute("src", newImgSrc);
            img.setAttribute("srcset", newImgSrcset);

            items.forEach((i) => i.classList.remove("active"));
            item.classList.add("active");
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

document.addEventListener("DOMContentLoaded", (event) => {
  headerLogic();
  initMainSlider();
  initQSelection();
  initMaskedInputs();
  initCardLogic();
});
