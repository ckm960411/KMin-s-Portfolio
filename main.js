'use strict'

const navbar = document.querySelector('#navbar')
const navbarHeight = navbar.getBoundingClientRect().height

// scrollY 의 높이가 navbarHeight 보다 크면 특정 class 를 추가
document.addEventListener('scroll', () => {
  if ( window.scrollY > navbarHeight ) {
    navbar.classList.add('navbar--dark')
  } else {
    navbar.classList.remove('navbar--dark')
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

// 'contact me' 버튼을 클릭하면 'contact' 섹션으로 이동
const contactBtn = document.querySelector('.home__contact')
contactBtn.addEventListener('click', () => {
  scrollIntoView('#contact')
})



// 스크롤 내릴 때 '홈'섹션이 투명해지게 하기
const home = document.querySelector('#home')
const homeHeight = home.getBoundingClientRect().height
const homeContainer = document.querySelector('.home__container')

document.addEventListener('scroll', () => {
  let res = 1 - Math.round((window.scrollY / homeHeight) * 100)/100
  if ( res < 0 ) return
  homeContainer.style.opacity = `${res}`
})

