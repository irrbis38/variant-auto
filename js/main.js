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
      var current = e.target.parentElement;
      if (current.classList.contains("active")) {
        current.classList.remove("active");

        // clear winwow listeners
        window.removeEventListener("click", windowClickHandle);
        currentSelectBlock = null;

        return;
      }
      // remove class 'active' from all '.q_selection__select'
      select_blocks.forEach((sb) => sb.classList.remove("active"));

      var input = e.target;
      var select_block = input.parentElement;
      select_block.classList.add("active");

      // add listener to window and set current '.q_selection__select'
      window.addEventListener("click", windowClickHandle);
      currentSelectBlock = select_block;
    };

    inputs.forEach((i) => i.addEventListener("click", inputsHandle));

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
  var cards = Array.from(document.querySelectorAll(".card-elem"));

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
        card.classList.toggle("added-to-favorites");
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

      // // toggle slider draggable
      // var isDraggable = true;
      // var isAllowTouchMove = true;

      // if (slider.classList.contains("bought-out-block-slider")) {
      //   isDraggable = false;
      //   isAllowTouchMove = false;
      // }
      // end toggle slider draggable

      return new Swiper(slider, {
        spaceBetween: 24,
        slidesPerView: 1,
        draggable: false,
        allowTouchMove: false,
        navigation: {
          prevEl: prev_btn,
          nextEl: next_btn,
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
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

  // block slider logic
  if (blockSliders.length < 1) {
    return;
  } else {
    // init sliders if window width >= 992
    if (window.innerWidth >= 768) {
      aSliders = createActiveSliders(blockSliders);
    }

    // add listeners to resize
    mqMin768.addEventListener("change", (e) =>
      handleMQ(e, handleSmallWidth, handleWideWidth)
    );
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
        draggable: false,
        clickable: "true",
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

  if (cardMobileSliders < 1) {
    return;
  } else {
    // init sliders if window width < 992
    if (window.innerWidth < 768) {
      mSliders = createMobileSliders(cardMobileSliders);
    }

    // add listeners to resize
    mqMin768.addEventListener("change", (e) =>
      handleMQ(e, handleSmallWidth, handleWideWidth)
    );
  }
};

// ========== CARD MOBILE SLIDER

var initCardBoughtOutSlider = () => {
  var cardBoughtOutElements = Array.from(
    document.querySelectorAll(".card_bought_out__full")
  );

  var createMobileSliders = (sliderElements) => {
    var sliders = cardBoughtOutElements.map((s) => {
      return new Swiper(s, {
        spaceBetween: 0,
        slidesPerView: 1,
        draggable: true,

        pagination: {
          el: ".card_bought_out__full_paggination",
          clickable: "true",
          type: "bullets",
        },
      });
    });

    return sliders;
  };

  if (cardBoughtOutElements < 1) {
    return;
  } else {
    sliders = createMobileSliders(cardBoughtOutElements);
  }
};

// ========== CLONE TICKER BLOCKS

var cloneTickerBlocks = () => {
  var ticker_blocks = Array.from(document.querySelectorAll(".ticker__block"));

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

var initInfoBlock = () => {
  var cardInfoIcons = Array.from(document.querySelectorAll(".card__info_icon"));

  if (cardInfoIcons.length < 1) return;

  var windowHandle = (e) => {
    var target = e.target;

    if (!target.closest(".card__info.active")) {
      var activeInfo = document.querySelector(".card__info.active");
      activeInfo.classList.remove("active");
      window.removeEventListener("click", windowHandle);
    }
  };

  var iconHandler = (e) => {
    var icon = e.target;
    var parent = icon.parentElement;

    if (parent.classList.contains("active")) {
      parent.classList.remove("active");
      window.removeEventListener("click", windowHandle);
    } else {
      parent.classList.add("active");
      window.addEventListener("click", windowHandle);
    }
  };

  cardInfoIcons.forEach((icon) =>
    icon.addEventListener("click", (e) =>
      requestAnimationFrame(() => iconHandler(e))
    )
  );

  var info_close_buttons = Array.from(
    document.querySelectorAll(".card__info_close")
  );

  info_close_buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      var parent = btn.parentElement.parentElement;
      parent.classList.remove("active");
      window.removeEventListener("click", windowHandle);
    })
  );
};

// init sort menu logic

var initSortCatalogLogic = () => {
  const options_sort_toggle_btn = document.querySelector(
    ".options__sortToggleBtn"
  );

  if (!options_sort_toggle_btn) {
    return;
  } else {
    const body = document.body;
    const options_overlay = document.querySelector(".options__overlay");
    const options_buttons = Array.from(
      document.querySelectorAll(".options__sortList li button")
    );
    const elements = [].concat(options_overlay, ...options_buttons);
    const options_current = document.querySelector(".options__current");

    // init functions
    doOpenSortMenu();

    // show sort menu
    function doOpenSortMenu() {
      options_sort_toggle_btn.addEventListener("click", () => {
        body.classList.add("sort-list-open");
        elements.forEach((el) =>
          el.addEventListener("click", handleHideSortMenu)
        );
        doChangeCurrentSortOption();
      });
    }

    // hide sort menu
    function handleHideSortMenu() {
      body.classList.remove("sort-list-open");
      elements.forEach((el) =>
        el.removeEventListener("click", handleHideSortMenu)
      );
    }

    // change current sort option
    function doChangeCurrentSortOption() {
      options_buttons.forEach((btn) =>
        btn.addEventListener("click", handleSortButtons)
      );
    }

    function handleSortButtons(e) {
      let currentSortType = options_sort_toggle_btn.dataset.sortType;
      const clickedSortButton = e.target.closest(".options__sortList button");
      let newSortType = clickedSortButton.dataset.sortType;

      // img
      let currImgUrl = options_sort_toggle_btn.children[2].src;

      if (currentSortType !== newSortType) {
        // place to send a request when changing sort type

        let newImgUrl = clickedSortButton.children[1].src;

        options_current.textContent = clickedSortButton.children[0].textContent;
        options_sort_toggle_btn.dataset.sortType = newSortType;
        options_sort_toggle_btn.querySelector("input").value = newSortType;

        if (newImgUrl && currImgUrl) {
          options_sort_toggle_btn.children[2].src = newImgUrl;
        }
      }
    }
  }
};

// filters menu logic

var doFiltersMenuLogic = () => {
  const options_nav = document.querySelector(".options__nav");
  const options_filters_toggle_btn = document.querySelector(
    ".options__filtersToggleBtn"
  );
  const filters_buttons = Array.from(
    document.querySelectorAll(".filters__button")
  );
  const filters = document.querySelector(".filters");

  options_filters_toggle_btn.addEventListener("click", () => {
    options_nav.classList.toggle("filters-opened");
    filters.classList.toggle("filters-opened");
    document.body.classList.toggle("non-scroll");
  });

  var filder_hide_btn = document.querySelector(".filter__hide");

  filder_hide_btn.addEventListener("click", () => {
    options_nav.classList.remove("filters-opened");
    filters.classList.remove("filters-opened");
    document.body.classList.remove("non-scroll");
  });

  filters_buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      const filter_block = btn.closest(".filters__block");
      const filter_wrapper = filter_block.querySelector(".filters__wrapper");
      const filters_list = filter_block.querySelector(".filters__list");

      // toggle filters_list
      filter_block.classList.toggle("filters-block-opened");

      if (filters_list) {
        if (filter_block.classList.contains("filters-block-opened")) {
          if (filters_list.scrollHeight < 280) {
            filter_wrapper.style.maxHeight =
              filters_list.scrollHeight + 20 + "px";
          } else {
            filter_wrapper.style.maxHeight = filter_wrapper.scrollHeight + "px";
          }
        } else {
          filter_wrapper.style.maxHeight = null;
        }
      } else {
        if (filter_block.classList.contains("filters-block-opened")) {
          filter_wrapper.style.maxHeight = filter_wrapper.scrollHeight + "px";
        } else {
          filter_wrapper.style.maxHeight = null;
        }
      }
    })
  );
};

var searchByBrandInput = () => {
  var brand_search_inputs = Array.from(
    document.querySelectorAll(".brand-search")
  );

  if (brand_search_inputs.lenght < 1) {
    return;
  } else {
    // var valueInputs = Array.from(document.querySelectorAll());
    var searchInputHandle = (e, items) => {
      var value = e.target.value.toLowerCase();

      items.forEach((item) => {
        var brand = item.children[0].children[2].textContent.toLowerCase();

        brand.includes(value)
          ? item.classList.remove("hidden")
          : item.classList.add("hidden");
      });
    };

    brand_search_inputs.forEach((i) =>
      i.addEventListener("input", (e) => {
        var items = Array.from(
          i.parentElement.nextElementSibling.children[0].children
        );

        searchInputHandle(e, items);
      })
    );
  }
};

var handleAllInputRange = () => {
  // handle all input range in filters

  const filters_range_inputs = document.querySelectorAll(".filters__range");

  filters_range_inputs.forEach((rangeInput) =>
    rangeInput.addEventListener("input", doHandleRangeInputs)
  );

  function doHandleRangeInputs(e) {
    // get current inputs - min and max
    let minInputRange, maxInputRange;
    const isMinInputRange = e.target.classList.contains("filters__inputMin");
    const isMaxInputRange = e.target.classList.contains("filters__inputMax");
    if (isMinInputRange) {
      minInputRange = e.target;
      maxInputRange = minInputRange.nextElementSibling;
    } else if (isMaxInputRange) {
      maxInputRange = e.target;
      minInputRange = maxInputRange.previousElementSibling;
    }

    // get elements
    const filter_wrapper = minInputRange.closest(".filters__wrapper");
    const track = filter_wrapper.querySelector(".filters__track");
    const min = filter_wrapper.querySelector(".filters__valueMin");
    const max = filter_wrapper.querySelector(".filters__valueMax");

    // convert values to number
    let minValue = parseInt(minInputRange.value);
    let maxValue = parseInt(maxInputRange.value);

    // minDifference is the minimum value by which min and max can converge
    let minDifference;

    if (parseInt(maxInputRange.max) - parseInt(minInputRange.min) <= 10) {
      minDifference = 1;
    } else if (
      parseInt(maxInputRange.max) - parseInt(minInputRange.min) <=
      100
    ) {
      minDifference = 10;
    } else {
      minDifference = 50;
    }

    // if the input cannot be moved further
    if (maxValue - minValue < minDifference) {
      if (isMinInputRange) {
        minInputRange.value = maxValue - minDifference;
      } else {
        maxInputRange.value = minValue + minDifference;
      }
    } else {
      // otherwise calculates the value of the  two curret inputs and displays their values
      min.value = `${minValue}`;
      max.value = `${maxValue}`;
      let left =
        ((minValue - minInputRange.min) * 100) /
          (minInputRange.max - minInputRange.min) +
        "%";
      let right =
        ((maxInputRange.max - maxValue) * 100) /
          (maxInputRange.max - maxInputRange.min) +
        "%";
      track.style.left = left;
      track.style.right = right;
    }
  }

  // handle all min and max value
  const filters_value_min = Array.from(
    document.querySelectorAll(".filters__valueMin")
  );

  const filters_value_max = Array.from(
    document.querySelectorAll(".filters__valueMax")
  );

  filters_value_min.forEach((input) =>
    input.addEventListener("change", handleInputMinMax)
  );

  filters_value_max.forEach((input) =>
    input.addEventListener("change", handleInputMinMax)
  );

  filters_value_min.forEach((input) =>
    input.addEventListener("blur", handleInputMinMax)
  );

  filters_value_max.forEach((input) =>
    input.addEventListener("blur", handleInputMinMax)
  );

  function handleInputMinMax(e) {
    const input = e.target;
    const filters_wrapper = input.closest(".filters__wrapper");
    const input_min_range = filters_wrapper.querySelector(".filters__inputMin");
    const input_max_range = filters_wrapper.querySelector(".filters__inputMax");
    let input_range = null;

    const isMinFiltersInput = input.classList.contains("filters__valueMin");
    const isMaxFiltersInput = input.classList.contains("filters__valueMax");

    const track = filters_wrapper.querySelector(".filters__track");

    // minDifference is the minimum value by which min and max can converge
    let minDifference;

    if (input_max_range.max - input_min_range.min <= 10) {
      minDifference = 1;
    } else if (input_max_range.max - input_min_range.min <= 100) {
      minDifference = 10;
    } else {
      minDifference = 50;
    }

    let value = parseInt(input.value);

    // for min
    if (isMinFiltersInput) {
      if (value < input.min || Number.isNaN(value)) {
        // input.value = parseInt(input.min);
        input.value = "";
        input_min_range.value = parseInt(input.min);
        track.style.left = 0;
      } else if (value > input_max_range.value - minDifference) {
        input.value = parseInt(input_max_range.value) - minDifference;
        input_min_range.value = parseInt(input_max_range.value) - minDifference;
        doSetTrackLeft();
      } else {
        input.value = value;
        input_min_range.value = value;
        doSetTrackLeft();
      }
    }

    function doSetTrackLeft() {
      let left =
        ((value - input_min_range.min) * 100) /
          (input_min_range.max - input_min_range.min) +
        "%";
      track.style.left = left;
    }

    // for max
    if (isMaxFiltersInput) {
      if (value > parseInt(input.max) || Number.isNaN(value)) {
        input.value = "";
        input_max_range.value = parseInt(input.max);
        track.style.right = "0";
      } else if (value < parseInt(input_min_range.value) + minDifference) {
        input.value = parseInt(input_min_range.value) + minDifference;
        input_max_range.value = parseInt(input_min_range.value) + minDifference;
        doSetTrackRight();
      } else {
        input.value = value;
        input_max_range.value = value;
        doSetTrackRight();
      }
    }

    function doSetTrackRight() {
      let right =
        ((input_max_range.max - value) * 100) /
          (input_max_range.max - input_max_range.min) +
        "%";
      track.style.right = right;
    }
  }
};
// ========== TOGGLE CATALOG ITEM TO FAVORITES
var toggleCatalogItemToFavorites = () => {
  var catalog_item_page = document.querySelector(".catalog-item-page");

  var addListenersToFavorites = () => {
    var btns = document.querySelectorAll(".add-to-favorites");
    btns.length > 0 &&
      btns.forEach((btn) =>
        btn.addEventListener("click", () => {
          catalog_item_page.classList.toggle("added-to-favorites");
        })
      );
  };

  catalog_item_page && addListenersToFavorites();
};

// ========== INIT CATALOG ITEM SLIDERS

var initCatalogItemSliders = () => {
  // main
  var fullSizeSliser = new Swiper(".ci__slider_full", {
    spaceBetween: 0,
    slidesPerView: 1,
    draggable: true,
  });

  var previews = Array.from(
    document.querySelectorAll(".ci__slider_preview_slide")
  );

  previews.forEach((pr, idx) => {
    pr.addEventListener("click", () => {
      var isActive = pr.classList.contains("active");
      if (isActive) return;

      previews.forEach((i) => i.classList.remove("active"));
      pr.classList.add("active");
      fullSizeSliser.slideTo(idx);
    });
  });

  // miniature

  var miniatureFullSlider = new Swiper(".miniature__slider", {
    spaceBetween: 0,
    slidesPerView: 1,
    draggable: true,
  });

  var min_previews = Array.from(
    document.querySelectorAll(".miniature__preview_slide")
  );

  min_previews.forEach((pr, idx) => {
    pr.addEventListener("click", () => {
      var isActive = pr.classList.contains("active");
      if (isActive) return;

      min_previews.forEach((i) => i.classList.remove("active"));
      pr.classList.add("active");
      miniatureFullSlider.slideTo(idx);
    });
  });
};

var initRolledUpBlocks = () => {
  var rolled_up_blocks = Array.from(
    document.querySelectorAll(".ci__rolled_up")
  );

  var buttons = Array.from(document.querySelectorAll(".ci__toggle_rolled_up"));

  if (rolled_up_blocks.length < 1) return;

  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      container = btn.parentElement;
      container.classList.toggle("full-size");

      if (container.classList.contains("full-size")) {
        btn.textContent = "Свернуть";
      } else {
        btn.textContent = btn.dataset.full;
      }
    })
  );

  var windowResizeHandle = () => {
    rolled_up_blocks.forEach((block) => {
      if (block.scrollHeight < 340) {
        block.nextElementSibling.classList.add("hidden");
      } else {
        block.nextElementSibling.classList.remove("hidden");
      }
    });
  };

  if (window.innerWidth < 768) {
    window.addEventListener("resize", windowResizeHandle);
  }

  var mqMin768 = window.matchMedia("(min-width: 768px)");
  mqMin768.addEventListener("change", () => {
    if (mqMin768.matches) {
      window.removeEventListener("resize", windowResizeHandle);
    } else {
      window.addEventListener("resize", windowResizeHandle);
    }
  });
};

// ========== FLY BUTTON

var initFlyButton = () => {
  var fly_btn = document.querySelector(".fly__btn");
  if (!fly_btn) return;

  var header = document.querySelector(".header");
  var first_block = document.querySelector(".ci__first_container");

  var startHeight = header.offsetHeight + first_block.offsetHeight;

  window.addEventListener("scroll", function () {
    if (this.scrollY > startHeight) {
      fly_btn.classList.add("show");
    } else {
      fly_btn.classList.remove("show");
    }
  });
};

// ========== INIT CATALOG ITEM MINIATURE

var initMiniature = () => {
  var miniature = document.querySelector(".ci__miniature");
  var catalog_item_info = document.querySelector(".ci__info");

  if (!miniature) return;
  window.addEventListener("scroll", () => {
    if (catalog_item_info.getBoundingClientRect().top <= 0) {
      miniature.classList.add("show");
    } else {
      miniature.classList.remove("show");
    }
  });
};

var formSubmit = () => {
  var forms = Array.from(document.forms);
  var msg_modal = document.querySelector(".msg__modal");
  var calculate_modal = document.querySelector(".calculate__modal");

  if (!msg_modal) return;

  var overlay = document.querySelector(".overlay");
  var body = document.body;
  var modal_close = msg_modal.querySelector(".modal__close");

  if (forms.length < 1) return;

  forms.forEach((f) =>
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      if (e.target === calculate_modal) {
        calculate_modal.classList.remove("active");
        msg_modal.classList.add("active");
      } else {
        msg_modal.classList.add("active");
        overlay.classList.add("active");
        body.classList.add("lock");
      }
    })
  );

  [overlay, modal_close].forEach((el) =>
    el.addEventListener("click", () => {
      if (msg_modal) {
        msg_modal.classList.remove("active");
        overlay.classList.remove("active");
        body.classList.remove("lock");
      }
    })
  );
};

var calculateCredit = () => {
  var forms = Array.from(document.forms);
  var calculate_modal = document.querySelector(".calculate__modal");

  if (!calculate_modal) return;

  var overlay = document.querySelector(".overlay");
  var body = document.body;
  var modal_close = calculate_modal.querySelector(".modal__close");
  var btns = Array.from(document.querySelectorAll(".calculate-credit"));

  if (btns.length < 1) return;

  btns.forEach((b) =>
    b.addEventListener("click", (e) => {
      if (calculate_modal) {
        calculate_modal.classList.add("active");
        overlay.classList.add("active");
        body.classList.add("lock");
      }
    })
  );

  [overlay, modal_close].forEach((el) =>
    el.addEventListener("click", () => {
      if (calculate_modal) {
        calculate_modal.classList.remove("active");
        overlay.classList.remove("active");
        body.classList.remove("lock");
      }
    })
  );
};

// init video

var initYoutubeVideo = (videos) => {
  // generate video url
  var generateUrl = (id) => {
    var query = "?rel=0&showinfo=0&autoplay=1";
    // var query = "?ps=docs&controls=1";
    return "https://www.youtube.com/embed/" + id + query;
  };

  // create iframe element
  var createIframe = (id) => {
    var iframe = document.createElement("iframe");
    iframe.classList.add("video-iframe");
    iframe.setAttribute("src", generateUrl(id));
    iframe.setAttribute("title", "YouTube video player");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
    );

    return iframe;
  };

  // handling each video element
  videos.forEach((el) => {
    var videoHref = el.dataset.video;
    var deletedLength = "https://youtu.be/".length;

    var videoId = videoHref.substring(deletedLength, videoHref.length);

    // var parent = el.parentElement;

    // var videoPlayBtn = parent.querySelector(".video-play-btn");

    el.addEventListener("click", () => {
      if (el.classList.contains("preview-removed")) return;

      var iframe = createIframe(videoId);
      el.querySelector(".video_preview__blur").remove();
      el.querySelector("picture").remove();
      el.append(iframe);
      el.classList.add("preview-removed");
    });
  });
};

// ========== INIT FILES READ

// check request label width

var label = document.querySelector(".request__add_img");
var filedsetImages = document.querySelector(".request__fieldset_images");

var checkLabelWidth = () => {
  if (!label) return;
  if (filedsetImages.children.length > 1) {
    label.classList.add("small-version");
  } else {
    label.classList.remove("small-version");
  }
};

// init files read

var handleFiles = (files, add_label) => {
  if (!files.length) return;

  var queuedImagesArray = Array.from(files).filter((f) =>
    f.type.startsWith("image/")
  );

  queuedImagesArray.forEach((image) => {
    // create image item and add className
    var img_item = document.createElement("DIV");
    img_item.classList.add("request__added_img");

    // add innerHTML to image item
    img_item.innerHTML = `<img src="${URL.createObjectURL(
      image
    )}" alt="фото отзыва"><button class="request__remove" type="button" aria-label="Удалить фото отзыва"></button>`;

    // add image item to the DOM
    add_label.before(img_item);

    // add listener to remove_btn
    img_item
      .querySelector(".request__remove")
      .addEventListener("click", handleRemoveImage);

    checkLabelWidth();
  });
};

// add images by click

var initFileRead = () => {
  var add_label = document.querySelector(".request__add_img");
  var file_input = document.querySelector("#images_input");

  if (!add_label || !file_input) return;

  file_input.addEventListener("change", () =>
    handleFiles(file_input.files, add_label)
  );
};

// add images by drag and drop
var initFileReadByDrop = () => {
  var drop_container = document.querySelector(".request__fieldset_images");

  if (!drop_container) return;

  var file_input = document.querySelector("#images_input");
  var add_label = document.querySelector(".request__add_img");

  drop_container.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  drop_container.addEventListener("dragenter", (e) => {
    e.preventDefault();
  });

  // when file is inside drag area
  drop_container.addEventListener("dragover", (event) => {
    event.preventDefault();
    drop_container.classList.add("active");
  });
  // when file leave the drag area
  drop_container.addEventListener("dragleave", () => {
    drop_container.classList.remove("active");
  });

  var handleDrop = (e) => {
    e.preventDefault();

    file_input.files = e.dataTransfer.files;

    drop_container.classList.remove("active");

    handleFiles(file_input.files, add_label);
  };

  drop_container.addEventListener("drop", handleDrop);
};

function handleRemoveImage(e) {
  // delete "request__added_img" item
  var deleted_item = e.target.closest(".request__added_img");
  deleted_item.remove();
  checkLabelWidth();
}

// ========== GALLERY SLIDER LOGIC

var initGallerySlider = () => {
  var gallerySlider = document.querySelectorAll(".team__slider");
  var slider = null;

  if (!gallerySlider) return;

  var createSlider = () => {
    return new Swiper(".gallery__slider", {
      spaceBetween: 24,
      slidesPerView: "auto",
      // loop: true,
    });
  };

  var handleWideWidth = () => {
    slider = createSlider();
  };

  var handleSmallWidth = () => {
    slider.destroy(true, true);
    slider = null;
  };

  // create matchMedia
  var mqMin768 = window.matchMedia("(min-width: 768px)");

  // create handler
  var handleMQ = (e, cbMatches, cbNonMatches) =>
    e.matches ? cbMatches() : cbNonMatches();

  // init sliders if window width >= 992
  if (window.innerWidth >= 768) {
    slider = createSlider(gallerySlider);
  }

  // add listeners to resize
  mqMin768.addEventListener("change", (e) =>
    handleMQ(e, handleWideWidth, handleSmallWidth)
  );
};

// ========== TEAM SLIDER LOGIC

var initTeamSlider = () => {
  var teamSlider = document.querySelectorAll(".team__slider");
  var slider = null;

  if (!teamSlider) return;

  var createSlider = () => {
    return new Swiper(".team__slider", {
      spaceBetween: 24,
      slidesPerView: 1,
      navigation: {
        prevEl: ".team__prev",
        nextEl: ".team__next",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
        1301: {
          slidesPerView: 4,
        },
      },
    });
  };

  var handleWideWidth = () => {
    slider = createSlider();
  };

  var handleSmallWidth = () => {
    slider.destroy(true, true);
    slider = null;
  };

  // create matchMedia
  var mqMin768 = window.matchMedia("(min-width: 768px)");

  // create handler
  var handleMQ = (e, cbMatches, cbNonMatches) =>
    e.matches ? cbMatches() : cbNonMatches();

  // init sliders if window width >= 992
  if (window.innerWidth >= 768) {
    slider = createSlider(teamSlider);
  }

  // add listeners to resize
  mqMin768.addEventListener("change", (e) =>
    handleMQ(e, handleWideWidth, handleSmallWidth)
  );
};

// ========== START LOGIC

document.addEventListener("DOMContentLoaded", (event) => {
  headerLogic();
  initMainSlider();
  initQSelection();
  initMaskedInputs();
  initCardLogic();
  initBlockSlider();
  initCardMobileSlider();
  cloneTickerBlocks();
  initInfoBlock();
  initSortCatalogLogic();
  toggleCatalogItemToFavorites();
  initFlyButton();
  formSubmit();
  calculateCredit();
  initCardBoughtOutSlider();
  initFileRead();
  initFileReadByDrop();

  var catalog_page = document.querySelector(".catalog-page");

  if (catalog_page) {
    doFiltersMenuLogic();
    handleAllInputRange();
    searchByBrandInput();
  }

  var catalog_item_page = document.querySelector(".catalog-item-page");

  if (catalog_item_page) {
    initCatalogItemSliders();
    initRolledUpBlocks();
    initMiniature();
  }

  var map = document.getElementById("contacts-map");
  map && doCreateMapScript(initMap);

  // get all video elements on the page
  var videos = Array.from(document.querySelectorAll(".video_preview__full"));
  videos.length > 0 && initYoutubeVideo(videos);

  var company_page = document.querySelector(".company-page");
  company_page && initTeamSlider();
  company_page && initGallerySlider();
});
