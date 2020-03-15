// header
let headerMenuLinks = document.querySelectorAll('.header-menu__link');
let headerMenu = document.querySelector('.header-menu');
headerMenu.addEventListener('click', (event) => {
  changeSelection(event, 'A', headerMenuLinks, 'header-menu__link_selected');
});

function changeSelection(event, tag, itemsArr, className) {
  if (event.target.tagName === tag) {
    for (let item of itemsArr) {
      item.classList.remove(className);
    }
    event.target.classList.add(className);
  }
}

// slider
let iButtonVertical = document.getElementById('i-button-vertical');
let iButtonHorizontal = document.getElementById('i-button-horizontal');
let iButtonVerticalGreen = document.getElementById('i-button-vertical-green');
let iPhoneVertical = document.querySelector('.iphone-vertical__screen');
let iPhoneHorizontal = document.querySelector('.iphone-horizontal__screen');
let iPhoneVerticalGreen = document.querySelector('.iphone-vertical-green__screen');
iButtonVertical.addEventListener('click', () => {
  iPhoneVertical.classList.toggle('iphone-vertical__screen_off');
});
iButtonHorizontal.addEventListener('click', () => {
  iPhoneHorizontal.classList.toggle('iphone-horizontal__screen_off');
});
iButtonVerticalGreen.addEventListener('click', () => {
  iPhoneVerticalGreen.classList.toggle('iphone-vertical-green__screen_off');
});

// portfolio
let portfolioTags = document.querySelectorAll('.button-panel__button');
let buttonPanel = document.querySelector('.button-panel');
let images = document.querySelectorAll('.art-album__image');
let imgContainer = document.querySelector('.art-album');

buttonPanel.addEventListener('click', (event) => {
  changeSelection(event, 'BUTTON', portfolioTags, 'button-panel__button_selected');

  if (event.target.tagName === 'BUTTON') {
    for (let btn of portfolioTags) { btn.disabled = true; }

    for (let img of images) {
      img.classList.remove('art-album__image_selected');
    }

    let animation = imgContainer.animate([{ opacity: 1 }, { opacity: 0 }],
      {
        duration: 700,
        fill: "forwards"
      });
    animation.onfinish = () => {
      let indexes = getRandomOrderedIndexes(images.length);
      for (let i = 0; i < images.length; i++) {
        images[i].style.order = indexes[i];
      }
      imgContainer.animate([{ opacity: 1 }, { opacity: 0 }],
        {
          duration: 700,
          direction: "reverse",
          fill: "forwards",
          delay: 300
        });
      for (let btn of portfolioTags) { btn.disabled = false; }
    }
  }
});

imgContainer.addEventListener('click', (event) => {
  changeSelection(event, 'IMG', images, 'art-album__image_selected');
});

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

let form = document.querySelector('.form');
let buttonSend = document.querySelector('.form__submit');
let buttonCloseMessage = document.querySelector('.submit-message__button');
let modal = document.querySelector('.submit-message');
form.addEventListener('submit',(event) => {
  event.preventDefault();  
  document.querySelector('.body-content').style.overflow = "hidden";
  buttonCloseMessage.focus();
  modal.classList.remove('submit-message_hidden');
  let subj = document.getElementById('subject').value.toString();
  let subject = (subj !=='')?
                'Тема: ' + subj : 'Без темы';
  let descr = document.getElementById('description').value.toString();
  let description = (descr !=='')?
                    'Описание: ' + descr : 'Без описания';
    
  document.getElementById('message-subject').innerText = subject; 
  document.getElementById('message-description').innerText = description; 
  
  buttonCloseMessage.addEventListener('click', () => {
    document.querySelector('.body-content').style.overflow = "scroll";
    modal.classList.add('submit-message_hidden');
    form.reset();    
  });
});
