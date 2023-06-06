//CHECK ON LOCAL STORAGE FOR COLORS
let mainColor = localStorage.getItem("color-option");

//RANDOM BACKGROUND OPTION
let backgroundOption = true;

//VARIABLE TO CONTROL THE BACKGROUND INTERVAL
let bgInterval;

//CHECK FOR RANDOM BACKGROUND OPTION IN THE LOCAL STORAGE
let bgLocalItem = localStorage.getItem("background-option");
// console.log(bgLocalItem);//TESTING

//CHECK IF THE RANDOM BACKGROUND OPTION IN LOCAL STORAGE ISN'T EMPTY
if (bgLocalItem !== null) {
  // console.log("random background option exists");//TESTING
  // console.log(bgLocalItem); //TESTING
  // console.log(typeof bgLocalItem); //TESTING

  if (bgLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  // document.documentElement.style.setProperty("background-image", bgLocalItem);

  //REMOVE ACTIVE CLASS FROM ALL SPANS
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });

  if (bgLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

if (mainColor !== null) {
  // console.log("local storage isn't empty");
  // console.log(localStorage.getItem("color-option")); //FOR REFERENCE
  document.documentElement.style.setProperty("--main--color", mainColor);
  //REMOVE ACTIVE CLASS FROM ALL COLORS LIST ITEMS
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    //ADD ACTIVE CLASS TO THE CURRENT MAIN COLOR (DATA COLOR === LOCAL STORAGE ITEM)
    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}

//START SETTINGS BOX
let gear = document.querySelector(".toggle-settings .fa-gear");
gear.onclick = function () {
  //toggle clase open on the element
  this.classList.toggle("fa-spin");

  //toggle class open on the element
  let box = document.querySelector(".settings-box");
  box.classList.toggle("open");
};
//switch colors
const colorsLi = document.querySelectorAll(".colors-list li");
//loop on colors li
colorsLi.forEach((li) => {
  //add click event on every color li
  li.addEventListener("click", (e) => {
    // console.log(e.target.dataset.color);//FOR REFERENCE
    //set color on ROOT
    document.documentElement.style.setProperty(
      "--main--color",
      e.target.dataset.color
    );
    //SET COLOR IN LOCAL STORAGE
    localStorage.setItem("color-option", e.target.dataset.color);
    //هعمل لوب على كل العناصر اللي واخدة كلاس جوا العنصر الاب للعنصر اللي عليه ايفنت
    //وبعد مدخل اعمل عليهم لوب هشيل منهم الكلاس ده خالص
    //عملت
    //FUNCTION
    //مخصوص عشان تعمل كل السطور لأني هستخدم
    //ACTIVE
    //كتير ومينفعش اكررها اكتر من مرة هتبقا سطور ع الفاضي

    handleActive(e);
  });
});

//toggle random background on and off
const background = document.querySelectorAll(".random-backgrounds span");
//loop on spans
background.forEach((span) => {
  //add click event on every span
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImg();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(bgInterval);
      localStorage.setItem("background-option", false);
    }
  });
});

//END SETTINGS BOX

//SELECT LANDING PAGE ELEMENT
let landingPage = document.querySelector(".landing-page");
//GET ARRAY OF IMAGES
let imgArray = ["6.jpg", "7.jpg", "2.jpg", "4.jpg", "5.jpg"];
//CHANGE BACKGROUND USING THE ARRAY OF IMAGES
//FUNCTION TO RANDOMIZE THE RANDOM BACKGROUNDS
function randomizeImg() {
  if (backgroundOption === true) {
    bgInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgArray.length);
      //GET RANDOM NUMBER
      //   console.log(randomNumber);
      landingPage.style.backgroundImage =
        'url("images/' + imgArray[randomNumber] + '")';
    }, 10000);
  }
}
randomizeImg();

//SELECT SKILLS SELECTOR
let skills = document.querySelector(".skills");
window.onscroll = function () {
  //SKILLS OFFSET TOP

  let skillsOffsetTop = skills.offsetTop;
  // console.log(skillsOffsetTop);//TESTING
  //SKILLS OUTER HEIGHT
  let skillsOuterHeight = skills.offsetHeight;
  // console.log(skillsOuterHeight);//TESTING
  //WINDOW HEIGHT
  let windowIHeight = window.innerHeight;
  // console.log(windowIHeight);//TESTING
  //WINDOW SCROLL TOP
  let windowScrollTop = window.scrollY;
  // console.log(windowScrollTop);//TESTING
  if (
    windowScrollTop >
    skillsOffsetTop + skillsOuterHeight - windowIHeight - 100
  ) {
    // console.log("u made it"); //TESTING
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skills) => {
      skills.style.width = skills.dataset.progress;
    });
  }
};

//CREATE POP-UP WITH THE IMAGE
let gallery = document.querySelectorAll(".gallery img");
gallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    //CEATE OVERLAY ELEMENT
    let overlay = document.createElement("div");

    //ADD CLASS TO OVERLAY
    overlay.className = "popup-overlay";

    //APPEND OVERLAY TO BODY
    document.body.appendChild(overlay);

    //CREATE THE POPUP
    let popup = document.createElement("div");

    //ADD CLASS TO THE POPUP
    popup.className = "popup-box";

    //CREATE A SPAN FOR CLOSING
    let closingButton = document.createElement("span");
    closingButton.className = "close";

    //CREATE THE CLOSING TEXT AND APPEND IT TO THE POPUP

    //MY APPROACH
    let closingBtn = document.createElement("i");
    closingBtn.className = "fa-solid fa-xmark";
    // closingButton.appendChild(closingBtn);
    //----------------------------------------------//
    //ELZERO APPROACH
    let close = document.createTextNode("X");
    closingButton.appendChild(close);

    popup.appendChild(closingButton);
    //--------------------------------------------//

    //CREATE THE CLICK EVENT TO THE CLOSING BUTTON

    //MY APPROACH
    closingButton.addEventListener("click", (e) => {
      popup.style.display = "none";
      overlay.style.display = "none";
    });

    //------------------------------------------//
    //TOTALY DIFFERENT APPROACH //ELZERO APPROACH

    //DIFFERENT APPROACH //ALSO WORKS
    // document.addEventListener("click", (e) => {
    //   if (e.target.className == "close") {
    //     e.target.parentNode.remove();
    //     document.querySelector(".popup-overlay").remove();
    //   }
    // });

    //ADD ALTERNATE TEXT AS A HEADING
    if (img.alt !== null) {
      //CREATE HEADING
      let imgHeading = document.createElement("h3");

      //CREATE TEXT NODE
      let imgAlt = document.createTextNode(img.alt);

      //APPEND TEXT TO HEADING
      imgHeading.appendChild(imgAlt);

      //APPEND HEADING TO POPUP
      popup.appendChild(imgHeading);
    }

    //CREATE THE IMAGE
    let popupImg = document.createElement("img");

    //CHANGE POPUPIMG SRC
    popupImg.src = img.src;

    //ADD THE IMG POPUP TO THE BODY
    popup.appendChild(popupImg);
    // overlay.appendChild(popup);//DIFFERENT APPROCH
    document.body.appendChild(popup);
  });
});

//SELECT ALL BULLETS
const bullets = document.querySelectorAll(".nav-bullets .bullet");

//SELECT ALL LINKS
const links = document.querySelectorAll(".links a");

// ONE FUNCTION TO SCROLL TO DISTINATION FROM TWO DIFFERENT WAY
// ONE IS NAVIGATION BAR LINKS
// THE OTHER IS THE NAVIGATION BULLETS

function scrollToDistination(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToDistination(links);
scrollToDistination(bullets);

//FUNCTION TO HANDLE ACTIVE CLASS
function handleActive(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  //ADD ACTIVE CLASS TO THE TARGETED ELEMENT
  e.target.classList.add("active");
}

let bulletSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletOption = localStorage.getItem("display_bullets");

if (bulletOption !== null) {
  // console.log("not empty"); //TESTING
  bulletSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletOption === "ON") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.dataset.bullets === "yes") {
      bulletsContainer.style.display = "block";

      localStorage.setItem("display_bullets", "ON");
    } else {
      bulletsContainer.style.display = "none";

      localStorage.setItem("display_bullets", "OFF");
    }
    handleActive(e);
  });
});

//RESET OPTION TO RESET ALL SETTINGS
document.querySelector(".reset").onclick = function () {
  //CLEAR LOCAL STORAGE
  localStorage.clear();

  // localStorage.removeItem("background-option");
  // localStorage.removeItem("display_bullets");
  // localStorage.removeItem("color-option");

  //RELOAD THE PAGE
  window.location.reload();
};

//TOGGLE MENU
let menuBtn = document.querySelector(".toggle-menu");
let menuLinks = document.querySelector(".links");

menuBtn.onclick = function (e) {
  //STOP PROPAGATION
  e.stopPropagation();

  //TOGGLE CLASE menu-active ON THE BUTTON
  this.classList.toggle("menu-active");

  //TOGGLE CALSS open ON THE MENU LINKS
  menuLinks.classList.toggle("open");
};

//CLICK ANYWHERE TO CLOSE THE MENU
document.addEventListener("click", (e) => {
  // console.log(e.target);//TESTING
  if (e.target !== menuBtn && e.target !== menuLinks) {
    // console.log("NOT THE BUTTON");//TESTING
    //CHECK IF THE MENU IS OPEN
    if (menuLinks.classList.contains("open")) {
      // console.log("MENU OPEN"); //TESTING

      //TOGGLE CLASE menu-active ON THE BUTTON
      menuBtn.classList.toggle("menu-active");

      //TOGGLE CALSS open ON THE MENU LINKS
      menuLinks.classList.toggle("open");
    }
  }
});

//STOP PROPAGATION ON MENU

menuLinks.onclick = function (e) {
  e.stopPropagation();
};
