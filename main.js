'use strict'

const navbar = document.querySelector('#navbar')
const navbarHeight = navbar.getBoundingClientRect().height
const home = document.querySelector('#home')
const homeHeight = home.getBoundingClientRect().height

// scrollY 의 높이가 navbarHeight 보다 크면 특정 class 를 추가
document.addEventListener('scroll', () => {
  if ( (window.scrollY > navbarHeight) && (window.scrollY < homeHeight) ) {
    navbar.classList.remove('navbar--dark')
    navbar.classList.add('navbar--semidark')
  } else if ( window.scrollY > homeHeight) {
    navbar.classList.remove('navbar--semidark')
    navbar.classList.add('navbar--dark')
  } else {
    navbar.classList.remove('navbar--semidark', 'navbar--dark')
  }
})


// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu')
navbarMenu.addEventListener('click', (event) => {
  const target = event.target
  const link = target.dataset.link
  if ( link == null ) {
    return
  }
  const scrollTo = document.querySelector(link)
  const top = scrollTo.offsetTop - navbarHeight < 0 ? 0 : scrollTo.offsetTop - navbarHeight
  window.scrollTo({
    top,
    left: 0,
    behavior: 'smooth'
  })
})

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector)
  scrollTo.scrollIntoView({behavior: "smooth"})
}

// Handle click on 'contact me' button on home
const contactBtn = document.querySelector('.home__contact')
contactBtn.addEventListener('click', () => {
  scrollIntoView('#contact')
})



