/* == BurgerMenu == */
(function changeBurgerMenu (){
  let burgerBtn = document.querySelector("#burger-menu__toggle");
  let body = document.querySelector("body");
  burgerBtn.addEventListener("change", function () {
      if (this.checked) {
          body.classList.add("scroll-block");
          return;
      }
      body.classList.remove("scroll-block");
  })
})();

(function hideBurgerMenu () {
  let menu = document.querySelector(".burger-menu__list");
  let burgerBtn = document.querySelector("#burger-menu__toggle");
  let body = document.querySelector("body");
  menu.addEventListener("click", function () {
      burgerBtn.checked = false;
      body.classList.remove("scroll-block");
  })
})();

/* ==== */

/* == Vebinars == */
const vebinarsBlockElement = document.querySelector(".vebinars__blocks");
const recordsButton = document.querySelector("#more-records");
const recordsListElement = document.querySelector(".vebinars-recording__list");

const recordTemplate = (date, title, author, document, link) => {
  return (
    `<p class="vebinars-recording__data">${date}</p>
    <h4 class="vebinars-recording__title">${title}</h4>
    <p class="vebinars-recording__author">${author}</p>
    ${document ?
      `<a href="${document}" class="vebinars-recording__download" target="_blank">Скачать(PDF)</a>` :
      `<a class="vebinars-recording__download vebinars-recording__download--none" target="_blank"></a>`
    }
    <a href="${link}" class="vebinars-recording__button" target="_blank">Смотреть</a>`
  );
};

const vebinarTemplate = (date, title, author, img, link) => {
  return (`<div class="vebinars__head">
      <p class="vebinars__date">${date}</p>
      <h4 class="vebinars__title">${title}</h4>
    </div>
    <div class="vebinars__author">
      <img src="${img}" alt="" width="55" height="55">
      <p class="vebinars__role">${author}</p>
    </div>
    <a href="${link}" class="vebinars__link" target="_blank">Перейти</a>`
  );
};

const createElement = document.createElement.bind(document);

const renderRecordElements = (container, list, button) => {
  let items = 3;

  return () => {
    for (let i = items; i < items + 3; i++) {
      if (!list[i]) {
        continue;
      }
      let {title, date, author, link, document} = list[i];
      let newElement = createElement("div");
      newElement.classList.add("vebinars-recording__item");
      newElement.innerHTML = recordTemplate(date, title, author, document, link);
      container.append(newElement);
    }
    items += 3;
    if (list.length <= items) {
      button.classList.add("hidden");
      button.removeEventListener("click", renderRecordElements);
    }
  }
};

const renderVebinarsElements = (container, list) => {
    for (let i = 0; i < 3; i++) {
      let {title, date, author, link, image} = list[i];
      let newElement = createElement("div");
      newElement.classList.add("vebinars__block");
      newElement.innerHTML = vebinarTemplate(date, title, author, image, link);
      container.append(newElement);
    }
};

const renderRecords = renderRecordElements(recordsListElement, vebinarsData, recordsButton);
renderRecords();
recordsButton.addEventListener("click", renderRecords);

renderVebinarsElements(vebinarsBlockElement, vebinarsData);

/* ===== */


/* == Video == */
const videoContent = document.querySelector("#application__video");
var videoHideButton = document.querySelector(".close-btn");
var videoPlayer = document.querySelector("#video");

const VIDEO_PEOPLE = {
  MENSHIKOVA: "MENSHIKOVA",
  DEVOUS: "DEVOUS",
  VANANDEL: "VANANDEL",
};

const videoButtonsElements = {
  [VIDEO_PEOPLE.MENSHIKOVA]: document.querySelector(".button--menshikova"),
  [VIDEO_PEOPLE.DEVOUS]: document.querySelector(".button--devous"),
  [VIDEO_PEOPLE.VANANDEL]: document.querySelector(".button--vanandel"),
};

const videoURLs = {
  [VIDEO_PEOPLE.MENSHIKOVA]: "./video/Video.mp4",
  [VIDEO_PEOPLE.DEVOUS]: "./video/Video_DeVous.mp4",
  [VIDEO_PEOPLE.VANANDEL]: "./video/Video_Van_Andel.mp4",
};

const showVideo = (button, videoBlock, video, url) => {
  button.addEventListener("click", () => {
      video.setAttribute("src", url);
      videoBlock.classList.add("opened");
      video.play();
  });
};

const hideVideo = (button, videoBlock, video) => {
  videoBlock.addEventListener("click", () => {
      videoBlock.classList.remove('opened');
      video.pause();
  });

  button.addEventListener("click", () => {
      videoBlock.classList.remove('opened');
      video.pause();
  });
};

for (let key in videoButtonsElements) {
  showVideo(videoButtonsElements[key], videoContent, videoPlayer, videoURLs[key]);
}

hideVideo(videoHideButton, videoContent, videoPlayer);

/* ==== */


/* == Support == */
const form = document.querySelector(".support__form");
const supportBtn = form.querySelector("#support-btn");
const supportName = form.querySelector("#name");
const supportEmail = form.querySelector("#email");
const supportAmwayNumber = form.querySelector("#amwaynumber");
const supportPhone = form.querySelector("#phone");
const supportMessage = form.querySelector("#message");
const phoneMask = new Inputmask("+9-(999)-999-99-99");

supportName.addEventListener("focus", function () {
  supportName.classList.remove("support__field--error");
});
supportEmail.addEventListener("focus", function () {
  supportEmail.classList.remove("support__field--error");
});
supportAmwayNumber.addEventListener("focus", function () {
  supportAmwayNumber.classList.remove("support__field--error");
});
supportMessage.addEventListener("focus", function () {
  supportMessage.classList.remove("support__field--error");
});
phoneMask.mask(supportPhone);

supportBtn.addEventListener("click", function () {
  let hasErrors = false;
  let data = {
      "name": supportName.value,
      "email": supportEmail.value,
      "abo_number": supportAmwayNumber.value,
      "phone": supportPhone.value,
      "message": supportMessage.value,
      "country": "RU",
  };
  let request = new XMLHttpRequest();
  let body = new FormData();
  if (!supportName.value ) {
      supportName.classList.add("support__field--error");
      hasErrors = true;
  }
  if (!supportEmail.value || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(supportEmail.value))) {
      supportEmail.classList.add("support__field--error");
      hasErrors = true;
  }
  if (!supportAmwayNumber.value || !(/\d+/.test(supportAmwayNumber.value))) {
      supportAmwayNumber.classList.add("support__field--error");
      hasErrors = true;
  }
  if (!supportMessage.value) {
      supportMessage.classList.add("support__field--error");
      hasErrors = true;
  }
  if (hasErrors) {
      console.log('return');
      return;
  }
  Object.keys(data).forEach(k => {
      body.append(k, data[k]);
  });

  request.open("post", "/mail.php", false);
  request.send(body);

  if (request.status === 200) {
      alert("Сообщение отправлено");
      supportName.value = "";
      supportEmail.value = "";
      supportAmwayNumber.value = "";
      supportPhone.value = "";
      supportMessage.value = "";
  }
});

/* ==== */