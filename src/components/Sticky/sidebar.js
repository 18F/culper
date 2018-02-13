/**
 * Create a sidebar which is always in view no matter the positioning within
 * the viewport nor the height of the content.
 */
export class sidebar {
  constructor (containerSelector, contentSelector, options = {}) {
    this.self = this
    this.containerSelector = containerSelector
    this.contentSelector = contentSelector
    this.options = options
    this.last = 0
    this.ticking = false
    this.world = {
      forced: options.forced || true,
      tearing: options.tearing || false,
      tolerance: options.tolerance || 110,
      lastScrollTop: 0,
      direction: 'DOWN',
      boundaries: {}
    }
  }

  init () {
    if (!this.workspace) {
      this.workspace = this.options.workspace ? document.querySelector(this.options.workspace) : window
    }
    if (!this.container) {
      this.container = document.querySelector(this.containerSelector)
    }
    if (!this.content) {
      this.content = document.querySelector(this.contentSelector)
    }
  }

  on () {
    this.init()
    this.workspace.addEventListener('scroll', this.onScroll.bind(this))
  }

  off () {
    this.init()
    this.workspace.removeEventListener('scroll', this.onScroll.bind(this))
  }

  onScroll () {
    this.init()
    if (canBeSticky(this.container, this.content, this.options)) {
      this.last = window.scrollY
      if (!this.ticking) {
        this.ticking = true

        // Direction
        let sd = scrollDirection(this.workspace, this.world.lastScrollTop)
        this.world.lastScrollTop = sd.scrollTop
        this.world.direction = sd.direction

        // Boundaries
        this.world.boundaries = boundaries(this.container, this.content)

        // Positioning
        applyPositioning(this.container, this.content, this.world, this.options)
        this.ticking = false
      }
    } else {
      unstick(this.content)
    }

    if (this.options.callback) {
      this.options.callback(this.content, this.world)
    }

    debug(this.options.log,
          'world lastScrollTop: ' + this.world.lastScrollTop + '<br/>' +
          'world direction: ' + this.world.direction + '<br/>' +
          'world boundaries containerTop: ' + this.world.boundaries.containerTop + '<br/>' +
          'world boundaries containerHeight: ' + this.world.boundaries.containerHeight + '<br/>' +
          'world boundaries containerBottom: ' + this.world.boundaries.containerBottom + '<br/>' +
          'world boundaries contentHeight: ' + this.world.boundaries.contentHeight + '<br/>' +
          'world boundaries windowHeight: ' + this.world.boundaries.windowHeight + '<br/>' +
          'positioning applied' + '<br/>' +
          'content position: ' + this.content.style.position + '<br/>' +
          'content top: ' + this.content.style.top + '<br/>' +
          'content class: ' + this.content.className)
  }
}

/**
 * Simple debugging function.
 */
const debug = (selector, str) => {
  let c = document.querySelector(selector)
  if (c) {
    c.innerHTML = str
  }
}

/**
 * Basic test to see if the content qualifies for
 * sticky application.
 */
export const canBeSticky = (container, content, options) => {
  const outer = height(container)
  const inner = height(content)
  const win = window.innerHeight
  if (options.ignoreWindowComparison) {
    return inner < outer
  }
  return inner < outer && inner >= win
}

/**
 * Determine scroll direction and current top.
 */
export const scrollDirection = (workspace, previous) => {
  const workspaceScrollTop = scrollTop(workspace)
  const direction = workspaceScrollTop > previous ? 'DOWN' : 'UP'
  return {
    scrollTop: workspaceScrollTop,
    direction: direction
  }
}

/**
 * Computes world boundaries.
 */
export const boundaries = (container, content) => {
  const containerTop = top(container)
  const containerHeight = container.offsetHeight
  const contentHeight = content.offsetHeight
  const windowHeight = window.innerHeight
  return {
    containerTop: containerTop,
    containerBottom: containerTop + containerHeight,
    containerHeight: containerHeight,
    contentHeight: contentHeight,
    windowHeight: windowHeight
  }
}

/**
 * Apply positioning to the content based on
 * the current world view.
 */
export const applyPositioning = (container, content, world, options) => {
  if (world.lastScrollTop > world.boundaries.containerTop &&
      world.lastScrollTop < world.boundaries.containerBottom) {
    if (world.direction === 'DOWN') {
      scrollDown(container, content, world, options)
    } else {
      scrollUp(container, content, world, options)
    }
  } else if (world.lastScrollTop < world.boundaries.containerTop) {
    content.style.top = ''
    removeClass(content, 'sidebar-top-fixed')
  }
}

/**
 * Handles when scrolling down
 */
export const scrollDown = (container, content, world, options) => {
  const windowScroll = world.lastScrollTop + world.boundaries.windowHeight
  let contentOffsetTop = 0

  if (hasClass(content, 'sidebar-scrolling-up')) {
    removeClass(content, 'sidebar-scrolling-up')
    addClass(content, 'sidebar-scrolling-down')
  } else if (hasClass(content, 'sidebar-top-fixed')) {
    contentOffsetTop = top(content) + world.boundaries.containerTop
    removeClass(content, 'sidebar-top-fixed')
    if (world.tearing) {
      content.style.position = 'absolute'
      content.style.top = '' + contentOffsetTop + 'px'
    }
    addClass(content, 'sidebar-scrolling-down')
  }

  if (hasClass(content, 'sidebar-scrolling-down')) {
    if (windowScroll > world.tolerance + top(content) + world.boundaries.contentHeight) {
      content.style.position = ''
      content.style.top = ''

      if (options.ignoreWindowComparison && world.boundaries.contentHeight < world.boundaries.windowHeight) {
        addClass(content, 'sidebar-top-fixed')
      } else {
        addClass(content, 'sidebar-bottom-fixed')
      }

      removeClass(content, 'sidebar-scrolling-down')
    }
  } else {
    if (world.tearing && windowScroll > world.boundaries.containerBottom) {
      removeClass(content, 'sidebar-bottom-fixed')
      if (world.tearing) {
        content.style.position = 'absolute'
        contentOffsetTop = world.boundaries.containerHeight - world.boundaries.contentHeight
        content.style.top = '' + contentOffsetTop + 'px'
      }
    } else if (windowScroll > world.tolerance + world.boundaries.contentHeight + world.boundaries.containerTop) {
      content.style.position = ''
      content.style.top = ''
      if (options.ignoreWindowComparison && world.boundaries.contentHeight < world.boundaries.windowHeight) {
        if (!hasClass(content, 'sidebar-top-fixed')) {
          addClass(content, 'sidebar-top-fixed')
          removeClass(content, 'sidebar-bottom-fixed')
        }
      } else {
        removeClass(content, 'sidebar-top-fixed')
        addClass(content, 'sidebar-bottom-fixed')
      }
    }
  }
}

/**
 * Handles when scrolling up
 */
export const scrollUp = (container, content, world) => {
  if (hasClass(content, 'sidebar-scrolling-down')) {
    removeClass(content, 'sidebar-scrolling-down')
    addClass(content, 'sidebar-scrolling-up')
  } else if (hasClass(content, 'sidebar-bottom-fixed')) {
    var contentOffsetTop = top(content) - world.boundaries.containerTop
    content.style.position = 'absolute'
    content.style.top = '' + contentOffsetTop + 'px'
    removeClass(content, 'sidebar-bottom-fixed')
    addClass(content, 'sidebar-scrolling-up')
  }

  if (hasClass(content, 'sidebar-scrolling-up')) {
    if (top(content) > 0) {
      content.style.position = ''
      content.style.top = ''
      addClass(content, 'sidebar-top-fixed')
      removeClass(content, 'sidebar-scrolling-up')
    }
  } else {
    if (world.tearing && world.lastScrollTop > world.boundaries.containerTop) {
      content.style.position = ''
      removeClass(content, 'sidebar-top-fixed')
    } else if (world.lastScrollTop - world.tolerance < world.boundaries.containerBottom - world.boundaries.contentHeight) {
      content.style.position = ''
      content.style.top = ''
      addClass(content, 'sidebar-top-fixed')
      removeClass(content, 'sidebar-scrolling-up')
    }
  }
}

/**
 * Return element offset.
 */
export const offset = (element) => {
  if (element) {
    const rect = element.getBoundingClientRect()
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    }
  }
  return { top: 0, bottom: 0 }
}

/**
 * Return element computed height.
 */
export const height = (element) => {
  let h = 0
  if (element) {
    const style = window.getComputedStyle(element, null)
    h = parseInt(style.height)
    if (isNaN(h)) {
      h = parseInt(style['min-height'])
    }
  }
  return isNaN(h) ? 0 : h
}

/**
 * Return element top position.
 */
export const top = (element) => {
  return offset(element).top
}

/**
 * Return the scroll top position.
 */
export const scrollTop = (element) => {
  if (element.scrollTop) {
    return element.scrollTop
  }

  if (window.pageYOffset !== undefined) {
    return window.pageYOffset
  }

  return (document.documentElement || document.body.parentNode || document.body).scrollTop
}

/**
 * Add a class to the element.
 */
export const addClass = (element, className) => {
  if (element.classList) {
    element.classList.add(className)
  } else {
    element.className += ' ' + className
  }
}

/**
 * Remove a class from the element.
 */
export const removeClass = (element, className) => {
  if (element.classList) {
    element.classList.remove(className)
  } else {
    element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
  }
}

/**
 * Determine if element has a class name applied.
 */
export const hasClass = (element, className) => {
  if (element.classList) {
    return element.classList.contains(className)
  }
  return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className)
}

export const unstick = (element) => {
  if (!element) {
    return
  }
  element.style.position = ''
  element.style.top = ''
  removeClass(element, 'sidebar-scrolling-down')
  removeClass(element, 'sidebar-bottom-fixed')
  removeClass(element, 'sidebar-scrolling-up')
  removeClass(element, 'sidebar-top-fixed')
  removeClass(element, 'sidebar-scrolling-up')
}

export const unstickAll = () => {
  const elements = document.querySelectorAll('.sticky > .contents')
  for (const el of elements) {
    unstick(el)
  }
}
