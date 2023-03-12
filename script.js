'use strict';

const nav = document.querySelector('.nav');
const scrollAnimation = document.getElementById('scroll-animation');
const section1 = document.getElementById('projects');
const navLinks = document.querySelector('.nav__links');

scrollAnimation.addEventListener('click', function () {
    section1.scrollIntoView({ behavior: 'smooth' });
});

const animation = bodymovin.loadAnimation({
    container: scrollAnimation,
    path: 'assets/arrow-down.json',
    render: 'svg',
    loop: true,
    autoplay: false,
});
setTimeout(function () {
    animation.play();
}, 2200);

navLinks.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');

        siblings.forEach((el) => {
            if (el !== link) {
                el.style.color = 'grey';
            } else {
                el.style.color = '#C99F6B';
                activeLink = el;
            }
        });

        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});

let activeLink = null;

const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');

        siblings.forEach((el) => {
            if (el !== link) {
                el.style.opacity = this;
                el.style.color = '#f6f6f6';
            } else {
                el.style.opacity = 1;
                el.style.color = '#C99F6B';
            }
        });
    } else if (e.target.closest('.nav__link') === null) {
        const siblings = document.querySelectorAll('.nav__link');
        siblings.forEach((el) => {
            if (el !== activeLink) {
                el.style.color = '#f6f6f6';
            } else {
                el.style.color = '#C99F6B';
            }
        });
    }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

const stickyNav = function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) {
        nav.classList.add('sticky');
        scrollAnimation.classList.add('hidden');
    } else {
        nav.classList.remove('sticky');
        scrollAnimation.classList.remove('hidden');
    }
};

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// contact tabbed
const tabs = document.querySelectorAll('.actions__button');
const tabsContainer = document.querySelector('.actions');
const tabsContents = document.querySelectorAll('.content-contact__container');

tabsContainer.addEventListener('click', function (e) {
    e.preventDefault();
    const clicked = e.target.closest('.actions__button');

    // Guard clause
    if (!clicked) return;

    // Remove active classes for tab and content (aka display none)
    tabs.forEach((tab) => tab.classList.remove('actions__button--active'));
    tabsContents.forEach((c) =>
        c.classList.remove('content-contact__container--active')
    );

    //Active tab
    clicked.classList.add('actions__button--active');

    //Activate content area
    document
        .querySelector(`.content-contact__container--${clicked.dataset.tab}`)
        .classList.add('content-contact__container--active');
});

// copy to clipboard

const buttonsToCopy = document.querySelectorAll('.link--to-copy');

// loop through each button and attach a click event listener to its img
buttonsToCopy.forEach((button) => {
    button.addEventListener('click', function () {
        navigator.clipboard.writeText(this.textContent.trim());
        console.log(`Copied to clipboard`);
        this.classList.add('copied');

        setTimeout(() => {
            this.classList.remove('copied');
        }, 1000);
    });
});
