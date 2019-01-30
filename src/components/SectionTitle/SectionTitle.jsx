import React from 'react'
import { connect } from 'react-redux'

class SectionTitle extends React.Component {
  render() {
    if (this.props.hidden) {
      return null
    }

    const splitSubsections = (this.props.section.subsection || '').split('/')

    let title = null
    this.props.sections.forEach(s => {
      if (s.url === this.props.section.section) {
        title = trail(breadcrumbs(splitSubsections, s))
      }
    })

    return <h1 className="title">{title}</h1>
  }
}

/**
 * Creates an array of breadcrumbs
 */
const breadcrumbs = (urls, node) => {
  return (node.subsections || []).reduce(
    (a, b) => {
      if (!urls.includes(b.url)) {
        return a
      }

      return a.concat(breadcrumbs(urls, b))
    },
    [node.title || node.name]
  )
}

/**
 * Takes an array of breadcrumbs and formats it in to a pretty trail
 */
const trail = crumbs => {
  return crumbs.map((crumb, i, arr) => {
    if (arr.length === i + 1) {
      return (
        <span key={`crumb-${i}`} className="title-text">
          {crumb}
        </span>
      )
    }

    return (
      <span key={`crumb-${i}`} className="crumb">
        {crumb} &gt;{' '}
      </span>
    )
  })
}

/**
 * Maps the relevant subtree state from the applications state tree.
 * In this case, we pull the authentication sub-state. This is mapped
 * to the authentication reducer. When actions are dispatched, this
 * method is executed which causes a re-render.
 */
function mapStateToProps(state) {
  const section = state.section || {}
  return {
    section: section
  }
}

SectionTitle.defaultProps = {
  hidden: false
}

// Wraps the the component with connect() which adds the dispatch()
// function to the props property for this component
export default connect(mapStateToProps)(SectionTitle)
