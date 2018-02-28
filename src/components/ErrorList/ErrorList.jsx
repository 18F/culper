import React from 'react'
import { connect } from 'react-redux'
import { i18n, navigationWalker } from '../../config'
import { closest } from '../Form/Generic'

export class ErrorList extends React.Component {
  errors () {
    const messages = errorMessages()
    if (!messages || messages.length === 0) {
      return null
    }

    let issues = 0
    const sectionErrors = []
    for (const key in messages) {
      const title = messages[key][0].title
      const uuid = messages[key][0].uuid
      const bullets = messages[key].map((msg, i, arr) => {
        issues++
        return <li key={i}><a href={`#${msg.id}`}>{msg.message}</a></li>
      })
      sectionErrors.push(
        <span key={title}>
          <h3>{title}</h3>
          <ul>{bullets}</ul>
        </span>
      )
    }

    if (issues === 0) {
      return null
    }

    return (
      <div className="field">
        <h2 class="title h2">{`Here is a list of the ${issues} ${issues > 1 ? 'questions' : 'question'} with issues`}</h2>
        <div className="table expand">
          <span className="messages error-messages">
            <div className="message error">
              <i className="fa fa-exclamation"></i>
              {sectionErrors}
            </div>
          </span>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className="error-list">
        {this.errors()}
      </div>
    )
  }
}

function mapStateToProps (state) {
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

const sectionTitle = (el) => {
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

const accordionSummary = (el) => {
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

const fieldTitle = (id) => {
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

const fieldId = (el) => {
  const field = closest(el, '.field')
  if (!field) {
    return null
  }
  return field.dataset.uuid || null
}

const inAccordion = (el) => {
  return closest(el, '.accordion') !== null
}

const groupBy = (arr, getter) => {
  let map = {}
  arr.forEach(item => {
    const key = getter(item)
    if (!map[key]) {
      map[key] = []
    }
    map[key].push(item)
  })
  return map
}

const errorMessages = () => {
  const elements = document.querySelectorAll(':not(.error-list) .field .messages .message.error')
  const messages = []
  elements.forEach(el => {
    const id = fieldId(el)
    const message = fieldTitle(id)
    const title = inAccordion(el) ? accordionSummary(el) : sectionTitle(el)
    messages.push({ id, title, message })
  })
  return groupBy(messages.filter(m => m.title && m.message), msg => msg.title)
}
