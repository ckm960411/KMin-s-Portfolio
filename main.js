'use strict'

const navbar = document.querySelector('#navbar')
const navbarHeight = navbar.getBoundingClientRect().height
const home = document.querySelector('#home')
const homeHeight = home.getBoundingClientRect().height -60

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