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
  navbarMenu.classList.remove('open')
  const scrollTo = document.querySelector(link)
  const top = scrollTo.offsetTop - navbarHeight < 0 ? 0 : scrollTo.offsetTop - navbarHeight
  window.scrollTo({
    top,
    left: 0,
    behavior: 'smooth'
  })
  selectNavItem(target)
})

// navbar toggle 버튼을 클릭하면 nav 메뉴가 표시되게끔 하기
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn')

navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open')
})

window.addEventListener('scroll', () => {
  navbarMenu.classList.remove('open')
})

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
  homeContainer.style.opacity = res
})


// 스크롤을 내리면 'arrow up' 버튼 보이기
const arrowUp = document.querySelector('.arrow-up')
document.addEventListener('scroll', () => {
  if ( window.scrollY > homeHeight/2 ) {
    arrowUp.classList.add('visible')
  } else {
    arrowUp.classList.remove('visible')
  }
})

// 'arrow up' 버튼을 클릭하면 위로 올라가도록 하기
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home')
})

// My Work 에 애니메이션 추가
const workBtnContainer = document.querySelector('.work__categories')
const projectContainer = document.querySelector('.work__projects')
const projects = document.querySelectorAll('.project')

workBtnContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter
  if (filter == null) {
    return
  }

  // Remove selection from the previous item and select the new one
  const active = document.querySelector('.category__btn.selected')
  active.classList.remove('selected')
  const target = 
    e.target.nodeName === 'BUTTON' 
      ? e.target 
      : e.target.parentNode
  target.classList.add('selected')

  projectContainer.classList.add('anim-out')
  setTimeout(() => {
    projects.forEach(project => {
      if ( filter === '*' || filter === project.dataset.type ) {
        project.classList.remove('invisible')
      } else {
        project.classList.add('invisible')
      }
    })
    projectContainer.classList.remove('anim-out')
  }, 300)
})



// 스크롤을 내리면 해당 영역에 해당하는 navbar 가 활성화되기
// 1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다.
const sectionIds = [
  '#home', 
  '#about', 
  '#skills', 
  '#work', 
  '#testimonials', 
  '#contact'
]
const sections = sectionIds.map(id => document.querySelector(id))
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`))

// 2. IntersectionObserver 를 이용해서 모든 섹션들을 관찰한다.
let selectedNavIndex = 0
let selectedNavItem = navItems[0]
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active')
  selectedNavItem = selected
  selectedNavItem.classList.add('active')
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector)
  scrollTo.scrollIntoView({behavior: "smooth"})
  selectNavItem(navItems[sectionIds.indexOf(selector)])
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
}
const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    // 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화시킨다.
    if (!entry.isIntersecting && entry.intersectionRatio > 0) { 
      // entry 가 빠져나갈 때, 즉 스크롤이 내려갈 때
      // && 화면상에 보여지고 있을 때 (entry.intersectionRation > 0)
      const index = sectionIds.indexOf(`#${entry.target.id}`)

      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1
      } else { // 페이지가 내려가는 경우
        selectedNavIndex = index - 1
      }
      

    }
  })
}

const observer = new IntersectionObserver(observerCallback, observerOptions)
sections.forEach(section => observer.observe(section))

window.addEventListener('wheel', () => {
  if (scrollY === 0 ) {
    // 현재 스크롤이 제일 위에 있다면
    selectedNavIndex = 0
  } else if (scrollY + window.innerHeight === document.body.clientHeight) {
    // 제일 밑으로 도달했다면
    selectedNavIndex = navItems.length - 1
  }
  selectNavItem(navItems[selectedNavIndex])
})