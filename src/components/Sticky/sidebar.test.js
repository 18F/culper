import { canBeSticky,
         scrollDirection,
         boundaries,
         applyPositioning,
         scrollUp,
         offset,
         height,
         top,
         scrollTop,
         addClass,
         removeClass,
         hasClass } from './sidebar'

describe('The sidebar stickiness', () => {
  it('can be sticky', () => {
    let container = document.createElement('div')
    let content = document.createElement('div')
    let options = {}
    expect(canBeSticky(container, content, options)).toBe(false)

    container.style.height = '64px'
    content.style.height = '32px'
    window.innerHeight = 10
    expect(canBeSticky(container, content, options)).toBe(true)

    container.style.height = '64px'
    content.style.height = '32px'
    window.innerHeight = 200
    expect(canBeSticky(container, content, { ignoreWindowComparison: true })).toBe(true)
  })

  it('can determine scrolling direction', () => {
    let workspace = {scrollTop: 100}
    expect(scrollDirection(workspace, 0).direction).toBe('DOWN')
    expect(scrollDirection(workspace, 200).direction).toBe('UP')
  })

  it('can get boundaries', () => {
    window.innerHeight = 200
    let container = document.createElement('div')
    let content = { offsetHeight: 30 }
    const b = boundaries(container, content)
    expect(b.windowHeight).toBe(200)
    expect(b.containerTop).toBe(0)
    expect(b.containerBottom).toBe(0)
    expect(b.containerHeight).toBe(0)
    expect(b.contentHeight).toBe(30)
  })

  it('can apply positioning', () => {
    let container = document.createElement('div')
    let content = document.createElement('div')
    let options = {}
    let world = {
      direction: 'DOWN',
      lastScrollTop: 1,
      tolerance: 0,
      boundaries: {
        containerTop: 0,
        containerBottom: 2,
        contentHeight: 0
      }
    }

    content.classList.add('sidebar-scrolling-down')
    applyPositioning(container, content, world, options)
    expect(hasClass(content, 'sidebar-scrolling-down')).toBe(true)

    content.classList.remove('sidebar-scrolling-down')
    world.direction = 'UP'
    applyPositioning(container, content, world, options)
    expect(hasClass(content, 'sidebar-top-fixed')).toBe(true)

    world.lastScrollTop = 0
    world.boundaries.containerTop = 1
    applyPositioning(container, content, world, options)
    expect(hasClass(content, 'sidebar-top-fixed')).toBe(false)
  })

  it('can scroll down with nothing', () => {
    let container = document.createElement('div')
    let content = document.createElement('div')
    const world = {
      tolerance: 100,
      lastScrollTop: 0,
      boundaries: {
        containerTop: 0,
        containerBottom: 0,
        containerHeight: 0
      }
    }
    scrollUp(container, content, world)
    expect(hasClass(content, 'sidebar-top-fixed')).toBe(false)
    expect(hasClass(content, 'sidebar-scrolling-up')).toBe(false)
  })

  it('can scroll down with after scrolling down', () => {
    let container = document.createElement('div')
    let content = document.createElement('div')
    content.classList.add('sidebar-scrolling-down')
    const world = {
      tolerance: 100,
      lastScrollTop: 0,
      boundaries: {
        containerTop: 0,
        containerBottom: 0,
        containerHeight: 0
      }
    }
    scrollUp(container, content, world)
    expect(hasClass(content, 'sidebar-top-fixed')).toBe(false)
    expect(hasClass(content, 'sidebar-scrolling-down')).toBe(false)
    expect(hasClass(content, 'sidebar-scrolling-up')).toBe(true)
  })

  it('can scroll down with after bottomed out', () => {
    let container = document.createElement('div')
    let content = document.createElement('div')
    content.classList.add('sidebar-bottom-fixed')
    const world = {
      tolerance: 100,
      lastScrollTop: 0,
      boundaries: {
        containerTop: 0,
        containerBottom: 0,
        containerHeight: 0
      }
    }
    scrollUp(container, content, world)
    expect(hasClass(content, 'sidebar-bottom-fixed')).toBe(false)
    expect(hasClass(content, 'sidebar-top-fixed')).toBe(false)
    expect(hasClass(content, 'sidebar-scrolling-down')).toBe(false)
    expect(hasClass(content, 'sidebar-scrolling-up')).toBe(true)
  })

  it('can scroll up with nothing', () => {
    let container = document.createElement('div')
    let content = document.createElement('div')
    const world = {
      tolerance: 100,
      lastScrollTop: 0,
      boundaries: {
        containerTop: 0,
        containerBottom: 0,
        containerHeight: 0
      }
    }
    scrollUp(container, content, world)
    expect(hasClass(content, 'sidebar-top-fixed')).toBe(false)
    expect(hasClass(content, 'sidebar-scrolling-up')).toBe(false)
  })

  it('can scroll up with after scrolling down', () => {
    let container = document.createElement('div')
    let content = document.createElement('div')
    content.classList.add('sidebar-scrolling-down')
    const world = {
      tolerance: 100,
      lastScrollTop: 0,
      boundaries: {
        containerTop: 0,
        containerBottom: 0,
        containerHeight: 0
      }
    }
    scrollUp(container, content, world)
    expect(hasClass(content, 'sidebar-top-fixed')).toBe(false)
    expect(hasClass(content, 'sidebar-scrolling-down')).toBe(false)
    expect(hasClass(content, 'sidebar-scrolling-up')).toBe(true)
  })

  it('can scroll up with after bottomed out', () => {
    let container = document.createElement('div')
    let content = document.createElement('div')
    content.classList.add('sidebar-bottom-fixed')
    const world = {
      tolerance: 100,
      lastScrollTop: 0,
      boundaries: {
        containerTop: 0,
        containerBottom: 0,
        containerHeight: 0
      }
    }
    scrollUp(container, content, world)
    expect(hasClass(content, 'sidebar-bottom-fixed')).toBe(false)
    expect(hasClass(content, 'sidebar-top-fixed')).toBe(false)
    expect(hasClass(content, 'sidebar-scrolling-down')).toBe(false)
    expect(hasClass(content, 'sidebar-scrolling-up')).toBe(true)
  })

  it('can return the offset of the element', () => {
    let el = document.createElement('div')
    expect(offset(el).top).toBe(0)
    expect(offset(null).top).toBe(0)
  })

  it('can return the height of the element', () => {
    let el = document.createElement('div')
    expect(height(el)).toBe(0)
  })

  it('can return the top of the element', () => {
    let el = document.createElement('div')
    expect(top(el)).toBe(0)
  })

  it('can return the scroll top position', () => {
    let withScrollTop = {
      scrollTop: 42
    }
    expect(scrollTop(withScrollTop)).toBe(42)

    window.pageYOffset = 100
    expect(scrollTop({})).toBe(100)
    window.pageYOffset = null
  })

  it('can add a class', () => {
    let el = document.createElement('div')
    el.classList.add('existing-class')
    addClass(el, 'nonexisting-class')
    expect(hasClass(el, 'existing-class')).toBe(true)
    expect(hasClass(el, 'nonexisting-class')).toBe(true)
  })

  it('can remove a class', () => {
    let el = document.createElement('div')
    el.classList.add('existing-class')
    removeClass(el, 'existing-class')
    expect(hasClass(el, 'existing-class')).toBe(false)
  })

  it('can tell if class name exists on element', () => {
    let el = document.createElement('div')
    el.classList.add('existing-class')
    expect(hasClass(el, 'existing-class')).toBe(true)
    expect(hasClass(el, 'nonexisting-class')).toBe(false)
  })
})
