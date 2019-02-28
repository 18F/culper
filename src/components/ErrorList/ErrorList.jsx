import React from 'react'
import { connect } from 'react-redux'
import { navigationWalker } from 'config'
import { closest } from 'components/Form/Generic'

/**
 * The error list component.
 * @extends React.Component
 */
export class ErrorList extends React.Component {
  /**
   * Errors in a structured format.
   * @returns {NodeList} Structured errors.
   */
  errors() {
    const messages = this.props.errorMessages()
    if (!messages || messages.length === 0) {
      return null
    }

    let issues = 0
    const sectionErrors = []

    // Loop through each `key` which is essentially the related title
    // of the field with an error.
    for (const key in messages) {
      const title = messages[key][0].title
      const uuid = messages[key][0].uuid
      const bullets = messages[key].map((msg, i, arr) => {
        issues++
        return (
          <li key={i}>
            <a href={`#${msg.id}`} title={msg.message}>
              {msg.message}
            </a>
          </li>
        )
      })
      sectionErrors.push(
        <span key={title}>
          <h4>{title}</h4>
          <ul>{bullets}</ul>
        </span>
      )
    }

    // If there were no issues counted then return nothing.
    if (issues === 0) {
      return null
    }

    // Wrap in a little bit more structure to provide a headline with
    // additional context of how many issues were found.
    return (
      <div className="error-list">
            <div className="usa-alert usa-alert-error" role="alert">
              <div className="usa-alert-body">
                <h3 className="usa-alert-heading">{`Here is a list of the ${issues} ${issues > 1 ? 'questions' : 'question'} with issues`}</h3>
                {sectionErrors}
              </div>
            </div>
      </div>
    )
  }

  /**
   * Renders the error list.
   * @returns {NodeList} The rendered component.
   */
  render() {
    return this.errors()
  }
}

ErrorList.defaultProps = {
  errorMessages: () => {
    return errorMessages()
  }
}

/**
 * Will map the current state of the application with the props of the component.
 * @param {object} state - The application's state.
 * @returns {object} An object with section, app, and errors returned.
 */
function mapStateToProps(state) {
  const section = state.section || {}
  const app = state.application || {}
  const errors = app.Errors || {}
  return {
    section: section,
    app: app,
    errors: errors
  }
}

export default connect(mapStateToProps)(ErrorList)

/**
 * Find the closest section title to the error.
 * @param {Node} el - The node to use as a reference point.
 * @returns {string} The section title.
 */
const sectionTitle = el => {
  const content = closest(el, '.section-content')
  if (!content) {
    return null
  }
  if (content.dataset.section && content.dataset.subsection) {
    const target = `${content.dataset.section}/${content.dataset.subsection}`
    let title = null
    navigationWalker((path, child) => {
      let url = ''
      for (const p of path) {
        url = url.length > 0 ? `/${p.url}` : p.url
      }
      url += `/${child.url}`
      if (url === target) {
        title = child.name
      }
    })

    if (title) {
      return title.trim()
    }
  }
  const header = content.querySelector('h1, h2, h3, h4, h5, h6')
  if (!header) {
    return null
  }
  return header.textContent.trim()
}

/**
 * Find the accordion summary.
 * @param {Node} el - The node to use as a reference point.
 * @returns {string} The accordion summary.
 */
const accordionSummary = el => {
  const accordionItem = closest(el, '.item')
  if (!accordionItem) {
    return null
  }
  const summary = accordionItem.querySelector('.summary-item-content')
  if (!summary) {
    return null
  }
  if (summary.classList.contains('has-content')) {
    return summary.textContent.replace(':', ': ').trim()
  }
  const summaryIndex = summary.querySelector('.index')
  if (!summaryIndex) {
    return null
  }
  return summaryIndex.textContent.replace(':', '').trim()
}

/**
 * Returns the field element by identifier.
 * @param {string} id - The unique identifier.
 * @returns {Node} The field element.
 */
const field = id => {
  return document.querySelector(`.field[data-uuid="${id}"]`)
}

/**
 * Find the field title.
 * @param {Node} el - The node to use as a reference point.
 * @returns {string} The field title.
 */
const fieldTitle = id => {
  const field = document.querySelector(`.field[data-uuid="${id}"]`)
  if (!field) {
    return null
  }
  const title = field.querySelector('.title')
  if (!title) {
    return null
  }
  return title.textContent.trim()
}

/**
 * Find the field unique identifier.
 * @param {Node} el - The node to use as a reference point.
 * @returns {string} The unique identifier.
 */
const fieldId = el => {
  const field = closest(el, '.field')
  if (!field) {
    return null
  }
  return field.dataset.uuid || null
}

/**
 * Determines if the element is within an accordion element.
 * @param {Node} el - The node to use as a reference point.
 * @returns {bool} True if found in an accordion, and false otherwise.
 */
export const inAccordion = el => {
  return closest(el, '.accordion') !== null
}

/**
 * Group an array by a specific property and return as a hash.
 * @param {array} arr - The original array.
 * @param {function} getter - A function to specify how to signify what is a key.
 * @returns {object} A hash grouped by the given getter.
 */
export const groupBy = (arr, getter) => {
  let map = {}

  if (!arr || arr.length === 0) {
    return map
  }

  for (const item of arr) {
    const key = getter(item)
    if (!map[key]) {
      map[key] = []
    }
    map[key].push(item)
  }

  return map
}

/**
 * Find all error messages in the document.
 * @returns {object} A hash grouped by title with a value of an array of errors.
 */
const errorMessages = () => {
  const elements = document.querySelectorAll(
    ':not(.error-list) .field .messages .message.error'
  )
  const messages = []

  for (const el of elements) {
    const id = fieldId(el)
    const message = fieldTitle(id)
    const title = inAccordion(el) ? accordionSummary(el) : sectionTitle(el)
    messages.push({ id, title, message })
  }

  return groupBy(messages.filter(m => m.title && m.message), msg => msg.title)
}
