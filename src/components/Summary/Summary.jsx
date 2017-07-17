import React from 'react'
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

  const t = props.index < 0 ? props.type : `${props.type} ${props.index + 1}`
  const l = !props.left && props.right ? '' : !props.left && !props.right ? props.placeholder : props.left
  const klass = `summary-item-content ${l === props.placeholder ? 'default' : 'has-content'}`
  return (
    <span className={klass}>
      <span className="index">{t}:</span>
      <span className="context"><strong>{l}</strong></span>
      <Show when={props.right}>
        <span className="dates"><strong>{props.right}</strong></span>
      </Show>
    </span>
  )
}
