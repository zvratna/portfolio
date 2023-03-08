'use strict'

const nav = document.querySelector('.nav')
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.getElementById('projects')
const navLinksEl = document.querySelector('.nav__links')

btnScrollTo.addEventListener('click', function () {
    section1.scrollIntoView({ behavior: 'smooth' })
})

navLinksEl.addEventListener('click', (e) => {
    e.preventDefault()

    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href')
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
    }
})

const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target
        const siblings = link.closest('.nav').querySelectorAll('.nav__link')

        siblings.forEach((el) => {
            if (el !== link) el.style.opacity = this
        })
    }
}

nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1))

const stickyNav = function (entries) {
    const [entry] = entries

    if (!entry.isIntersecting) nav.classList.add('sticky')
    else nav.classList.remove('sticky')
}

const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
})
headerObserver.observe(header)

const tabs = document.querySelectorAll('.actions__button')
const tabsContainer = document.querySelector('.actions')
const tabsContents = document.querySelectorAll('.content-contact__link')

tabsContainer.addEventListener('click', function (e) {
    e.preventDefault()
    const clicked = e.target.closest('.actions__button')

    // Guard clause
    if (!clicked) return

    // Remove active classes for tab and content (aka display none)
    tabs.forEach((tab) => tab.classList.remove('actions__button--active'))
    tabsContents.forEach((c) =>
        c.classList.remove('content-contact__link--active')
    )

    //Active tab
    clicked.classList.add('actions__button--active')

    //Activate content area
    document
        .querySelector(`.content-contact__link--${clicked.dataset.tab}`)
        .classList.add('content-contact__link--active')
})

// copy to clipboard

const copyBtn = document.querySelector('.link__email')

copyBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(this.textContent.trim())
    // this.classList.add('jello-vertical')

    // setTimeout(() => {
    //     this.classList.remove('jello-vertical')
    // }, 1000)
})
