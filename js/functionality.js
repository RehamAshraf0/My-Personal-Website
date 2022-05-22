/* Typing Effect */

class Typing {
  constructor(textElement, words, wait = 3000) {
    this.textElement = textElement;
    this.words = words;
    this.text = "";
    this.wordIndex = 0;
    this.wait = wait;
    this.type();
    this.isDeleting = false;
  }
  type() {
    const current = this.wordIndex % this.words.length;
    const fullText = this.words[current];

    if (this.isDeleting) {
      this.text = fullText.substring(0, this.text.length - 1);
    } else {
      this.text = fullText.substring(0, this.text.length + 1);
    }

    this.textElement.textContent = this.text;

    let typeSpeed = 110;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.text === fullText) {
      typeSpeed = 1500;
      this.isDeleting = true;
    } else if (this.isDeleting && this.text === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

document.addEventListener("DOMContentLoaded", init);

function init() {
  const textElement = document.querySelector(".typing");
  const words = JSON.parse(textElement.getAttribute("data-words"));
  const wait = textElement.getAttribute("data-wait");

  new Typing(textElement, words, wait);
}

/* Animation on scroll */

const animateProjects = function (entries) {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    document.querySelector(".card--1").classList.add("animateToRight");
    document.querySelector(".card--3").classList.add("animateToLeft");
    document.querySelector(".card--2").classList.add("animateUp");
  });
};

const observerProjects = new IntersectionObserver(animateProjects, {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
});

observerProjects.observe(document.querySelector(".cards-container"));

//

const animateSkills = function (entries) {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    document
      .querySelectorAll(".skills__img-box:nth-child(3n-2)")
      .forEach((el) => {
        el.classList.add("animateToRight");
      });
    document
      .querySelectorAll(".skills__img-box:nth-child(3n)")
      .forEach((el) => {
        el.classList.add("animateToLeft");
      });
    document
      .querySelectorAll(".skills__img-box:nth-child(3n-1)")
      .forEach((el) => {
        el.classList.add("animateUp");
      });
  });
};

const observerSkills = new IntersectionObserver(animateSkills, {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
});

observerSkills.observe(document.querySelector(".skills"));

//

const animateContact = function (entries) {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    document.querySelector(".contact__btn").classList.add("animateUp");
  });
};

const observerContact = new IntersectionObserver(animateContact, {
  root: null,
  rootMargin: "0px",
  threshold: 1,
});

observerContact.observe(document.querySelector(".contact"));

//

/* Toggle Menu */

const navbarBtn = document.querySelector(".navbar__toggle-btn");
const navbarList = document.querySelector(".navbar__list");
const navbarItems = document.querySelectorAll(".navbar__item");

const toggleMenu = function () {
  navbarBtn.classList.toggle("opened");
  navbarList.classList.toggle("navbar__list--opened");
};

navbarBtn.addEventListener("click", toggleMenu);
navbarItems.forEach((item) => {
  item.addEventListener("click", function () {
    if (navbarList.classList.contains("navbar__list--opened")) toggleMenu();
  });
});
