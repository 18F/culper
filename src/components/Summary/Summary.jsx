import React from 'react' // eslint-disable-line no-unused-vars
import { Show } from '../Form'

/**
 * Summary provides a consistent structure to accordion summaries.
 *
 * @param type
 * @param index
 * @param left
 * @param right
 * @param placeholder
 *
 */
export const Summary = (props = {}) => {
  props = {
    type: 'Item',
    index: -1,
    left: '',
    right: '',
    placeholder: '',
    ...props
  }

  const title = props.index < 0 ? props.type : `${props.type} ${props.index + 1}`
  const left = !props.left && props.right ? '' : !props.left && !props.right ? props.placeholder : props.left
  const klass = `summary-item-content ${left === props.placeholder ? 'default' : 'has-content'}`

  let tlen = letters(title) + 2
  let rlen = letters(props.right)
  let llen = letters(left)
  let mlen = 50 - tlen - rlen
  if (llen > mlen) {
    llen = mlen - 1
  }

  return (
    <span className={klass}>
      {props.icon}
      <span className="index">{title}:</span>
      <span className="context"><strong className={`at-${llen} ${!props.left && !props.right ? 'italic' : ''}`}>{left}</strong></span>
      <Show when={props.right}>
        <span className="dates"><strong className={`at-${rlen}`}>{props.right}</strong></span>
      </Show>
    </span>
  )
}

/**
 * Counts the number of letters in a string.
 * @param {object} obj - The react object
 * @returns {integer} The number of letters.
 */
const letters = (obj) => {
  if (!obj) {
    return 0
  }

  const objectType = Object.prototype.toString.call(obj)
  if (objectType === '[object Object]' && obj.props) {
    if (obj.props.children) {
      const childrenType = Object.prototype.toString.call(obj.props.children)
      if (childrenType === '[object Array]') {
        return obj.props.children.join(' ').length
      }
      return obj.props.children.length
    }
    if (obj.props.source) {
      return obj.props.source.length
    }
  }

  return obj.length || 0
}
