
window.onload = function () {
  addHamburgerHandler();
  addScrollHandler();
  addScreenAnimation();
  addSliderAnimation();
  addMessageSendHandler();
  addPortfolioButtonHandler();
  addImageSelectionHandler();
}



// header

const addHamburgerHandler = () => {
  let hamburger = document.querySelector('.hamburger');
  let menu = document.querySelector('.mobile-menu');
  menu.addEventListener('click', (event) => {
    if(event.target.tagName === 'A' ) {
      hamburger.classList.toggle('hamburger_activated')
      menu.classList.toggle('mobile-menu_hidden');
    }
  });
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger_activated')
    menu.classList.toggle('mobile-menu_hidden');
  });
}



function changeSelection(event, tag, itemsArr, className) {
  if (event.target.tagName === tag) {
    for (let item of itemsArr) {
      item.classList.remove(className);
    }
    event.target.classList.add(className);
  }
}

const addScrollHandler = () => {
  let headerMenuLinks = document.querySelectorAll('.header-menu__link');
  document.addEventListener('scroll', () => {
    let curPos = window.scrollY + 96; // header height
    document.querySelectorAll('section').forEach((el) => {
      if (el.offsetTop <= curPos && (el.offsetTop + el.offsetHeight) > curPos) {

        for (let item of headerMenuLinks) {
          item.classList.remove('header-menu__link_selected');
          if (item.getAttribute('href').substr(1) === el.id) {
            item.classList.add('header-menu__link_selected');
          }
        }
      }
    });
  });
}

// slider
const addScreenAnimation = () => {
  let iButtonVertical = document.getElementById('i-button-vertical');
  let iButtonHorizontal = document.getElementById('i-button-horizontal');
  let iButtonVerticalGreen = document.getElementById('i-button-vertical-green');
  let iPhoneVertical = document.querySelector('.iphone-vertical__screen');
  let iPhoneHorizontal = document.querySelector('.iphone-horizontal__screen');
  let iPhoneVerticalGreen = document.querySelector('.iphone-vertical-green__screen');

  iButtonVertical.addEventListener('click', () => {
    iPhoneVertical.classList.toggle('iphone-vertical__screen_off');
  });
  iButtonVertical.addEventListener('touchstart', () => {
    iPhoneVertical.classList.toggle('iphone-vertical__screen_off');
  });

  iButtonHorizontal.addEventListener('click', () => {
    iPhoneHorizontal.classList.toggle('iphone-horizontal__screen_off');
  });
  iButtonHorizontal.addEventListener('touchstart', () => {
    iPhoneHorizontal.classList.toggle('iphone-horizontal__screen_off');
  });

  iButtonVerticalGreen.addEventListener('click', () => {
    iPhoneVerticalGreen.classList.toggle('iphone-vertical-green__screen_off');
  });
  iButtonVerticalGreen.addEventListener('touchstart', () => {
    iPhoneVerticalGreen.classList.toggle('iphone-vertical-green__screen_off');
  });

};
// slider animation carousel

let slides = document.querySelectorAll('.slide-carousel');
let currentSlide = 0;
let isEnabled = true;

const addSliderAnimation = () => {

  let buttonPrev = document.querySelector('.slider__button_prev');
  let buttonNext = document.querySelector('.slider__button_next');

  buttonPrev.addEventListener('click', function () {
    if (isEnabled) {
      previousSlide(currentSlide);
    }
  });
  buttonNext.addEventListener('click', function () {
    if (isEnabled) {
      nextSlide(currentSlide);
    }
  });
};
function previousSlide(n) {
  hideSlide('to-right');
  changeCurrentSlide(n - 1);
  showSlide('from-left');
}
function nextSlide(n) {
  hideSlide('to-left');
  changeCurrentSlide(n + 1);
  showSlide('from-right');
}
function hideSlide(direction) {
  isEnabled = false;
  slides[currentSlide].classList.add(direction);
  slides[currentSlide].addEventListener('animationend', function () {
    this.classList.remove('active', direction);
  });
}
function showSlide(direction) {
  slides[currentSlide].classList.add('next', direction);
  slides[currentSlide].addEventListener('animationend', function () {
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled = true;
  });
}
function changeCurrentSlide(n) {
  currentSlide = (n + slides.length) % slides.length;
}

const swiper = (el) => {
  let surface = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;

  let threshold = 150;
  let restraint = 100;
  let allowedTime = 500;

  let startTime = 0;
  let elapsedTime = 0;

  surface.addEventListener('mousedown', function (e) {
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  });

  surface.addEventListener('mouseup', function (e) {
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
          if (isEnabled) {
            previousSlide(currentSlide);
          }
        } else {
          if (isEnabled) {
            nextSlide(currentSlide);
          }
        }
      }
    }
    e.preventDefault();
  });


  surface.addEventListener('touchmove', function (e) {

    e.preventDefault();
  });
  surface.addEventListener('touchstart', function (e) {
    if (e.target.classList.contains('slider__button')) {
      if (e.target.classList.contains('slider__button_next')) {
        if (isEnabled) {
          nextSlide(currentSlide);
        }
      } else if (e.target.classList.contains('slider__button_prev')) {
        if (isEnabled) {
          previousSlide(currentSlide);
        }
      }
    }

    let touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  });
  surface.addEventListener('touchend', function (e) {
    let touchObj = e.changedTouches[0];
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
          if (isEnabled) {
            previousSlide(currentSlide);
          }
        } else {
          if (isEnabled) {
            nextSlide(currentSlide);
          }
        }
      }
    }
    e.preventDefault();
  });

};
let el = document.querySelector('.slider-content');
swiper(el);



// portfolio
let images = document.querySelectorAll('.art-album__image');
let artAlbum = document.querySelector('.art-album');

const addPortfolioButtonHandler = () => {
  let buttonPanel = document.querySelector('.button-panel');
  let portfolioTags = document.querySelectorAll('.button-panel__button');
  buttonPanel.addEventListener('click', (event) => {

    if (event.target.tagName === 'BUTTON') {
      if (!event.target.classList.contains('button-panel__button_selected')) {
        for (let btn of portfolioTags) { btn.disabled = true; }

        for (let img of images) {
          img.classList.remove('art-album__image_selected');
        }

        let animation = artAlbum.animate([{ opacity: 1 }, { opacity: 0 }],
          {
            duration: 500,
            fill: "forwards"
          });
        animation.onfinish = () => {
          let indexes = getRandomOrderedIndexes(images.length);
          let imgContainers = artAlbum.querySelectorAll('.art-album__image-container');
          for(let i=0;i<images.length;i++){            
            imgContainers[i].append(images[indexes[i]]);            
          }          
          
          artAlbum.animate([{ opacity: 1 }, { opacity: 0 }],
            {
              duration: 500,
              direction: "reverse",
              fill: "forwards",
              delay: 200
            });
          for (let btn of portfolioTags) { btn.disabled = false; }

        };
      }
      changeSelection(event, 'BUTTON', portfolioTags, 'button-panel__button_selected');
    }
  });
};
const addImageSelectionHandler = () => {

  artAlbum.addEventListener('click', (event) => {
    changeSelection(event, 'IMG', images, 'art-album__image_selected');
  });
};

function getRandomOrderedIndexes(arrLength) {
  let arr = Array.from({ length: arrLength }, (v, i) => i);
  let tmp, current, top = arrLength;
  if (top) while (--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = arr[current];
    arr[current] = arr[top];
    arr[top] = tmp;
  }
  return arr;
}

// get a quote
const addMessageSendHandler = () => {
  let form = document.querySelector('.form');
  let buttonSend = document.querySelector('.form__submit');
  let buttonCloseMessage = document.querySelector('.submit-message__button');
  let modal = document.querySelector('.submit-message');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    //document.querySelector('.body-content').style.overflow = "hidden";
    buttonCloseMessage.focus();
    modal.classList.remove('submit-message_hidden');
    let subj = document.getElementById('subject').value.toString();
    let subject = (subj !== '') ?
      'Тема:  ' + subj : 'Без темы';
    let descr = document.getElementById('description').value.toString();
    let description = (descr !== '') ?
      'Описание:  ' + descr : 'Без описания';

    document.getElementById('message-subject').innerText = subject;
    document.getElementById('message-description').innerText = description;

    buttonCloseMessage.addEventListener('click', () => {
      //document.querySelector('.body-content').style.overflow = "scroll";
      modal.classList.add('submit-message_hidden');
      form.reset();
    });
  });
}