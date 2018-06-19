import React from 'react'
import App from './App'
import { Form } from './views'
import { env } from './config'
import store from './store'
import { api } from './services/api'
import { handleLoginSuccess, handleTwoFactorSuccess } from './actions/AuthActions'

// This polyfill gives us more control over smooth scrolling throughout the application
import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill()

export const tabology = () => {
  const tabable = !document.body.classList.contains('modal-open')
  const focusable = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '*[tabindex]',
    '*[contenteditable]'
  ]

  // Identify which elements are found within a modal
  const modalFocusable = [
    '.modal a[href]',
    '.modal area[href]',
    '.modal input:not([disabled])',
    '.modal select:not([disabled])',
    '.modal textarea:not([disabled])',
    '.modal button:not([disabled])',
    '.modal iframe',
    '.modal object',
    '.modal embed',
    '.modal *[tabindex]',
    '.modal *[contenteditable]'
  ]

  const modalElements = document.querySelectorAll(modalFocusable.join(', '))
  for (const mel of modalElements) {
    mel.dataset.modal = true
  }

  const elements = document.querySelectorAll(focusable.join(', '))
  if (tabable) {
    for (const tel of elements) {
      // Skip items found in the modal
      if (tel.dataset.modal) {
        continue
      }

      // Set the `tabindex` back to the original value or unset with `null`
      tel.setAttribute('tabindex', `${tel.dataset.tabindex || ''}` || null)

      // Remove the stored original value
      delete tel.dataset.tabindex
    }
  } else {
    for (const utel of elements) {
      // Skip items found in the modal
      if (utel.dataset.modal) {
        continue
      }

      // Store the origina `tabindex` value if
      //  - one was present
      //  - it has not been previously stored
      if (utel.hasAttribute('tabindex') && `${utel.dataset.tabindex || ''}`.length !== 0) {
        utel.dataset.tabindex = utel.getAttribute('tabindex') || ''
      }

      // Set the current `tabindex` to -1
      utel.setAttribute('tabindex', '-1')
    }
  }
}

var targetNode = document.getElementsByTagName('body')[0]
var config = { attributes: true }
var callback = function (mutationList) {
  tabology()
}
var observer = new MutationObserver(callback)
observer.observe(targetNode, config)

export const app = document.getElementById('app')

export class Main extends React.Component {
  render () {
    return this.props.children
  }
}

/**
 * Check if we have a token in our base Route so that it gets called once
 * when a page renders.
 */
export function onEnter () {
  const token = api.getToken()
  if (token && token.length) {
    store.dispatch(handleLoginSuccess())

    const mfa = env.MultipleFactorAuthentication()
    if (mfa.enabled) {
      store.dispatch(handleTwoFactorSuccess())
    }
  }
}
