import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/Main/Main'
import tabology from './plugins/tabology'

// This polyfill gives us more control over smooth scrolling throughout the application
import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill()

var targetNode = document.getElementsByTagName('body')[0]
var config = { attributes: true }
var callback = function (mutationList) {
  tabology()
}
var observer = new MutationObserver(callback)
observer.observe(targetNode, config)

const app = document.getElementById('app')

ReactDOM.render(<Main/>, app, tabology)
