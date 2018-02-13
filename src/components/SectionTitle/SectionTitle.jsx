import React from 'react'
import { connect } from 'react-redux'
import { navigation } from '../../config'

/**
 * Provides the section title.
 *
 * Want to update the section title?
 * Using `react-redux` and the `dispatch()` function use the following snippet:
 *
 * ```js
 * this.props.dispatch(updateSection('section', 'subsection', 'Chunky Monkey'))
 * ```
 *
 * `updateSection()` can be found in `SectionActions`
 */
class SectionTitle extends React.Component {
  render () {
    const splitSubsections = (this.props.section.subsection || '').split('/')

    let title = null
    navigation.forEach(s => {
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
  return (node.subsections || []).reduce((a, b) => {
    if (!urls.includes(b.url)) {
      return a
    }

    return a.concat(breadcrumbs(urls, b))
  }, [node.title || node.name])
}

/**
 * Takes an array of breadcrumbs and formats it in to a pretty trail
 */
const trail = (crumbs) => {
  return crumbs.map((crumb, i, arr) => {
    if (arr.length === i + 1) {
      return <span key={`crumb-${i}`} className="title-text">{crumb}</span>
    }

    return <span key={`crumb-${i}`} className="crumb">{crumb} &gt; </span>
  })
}

/**
 * Maps the relevant subtree state from the applications state tree.
 * In this case, we pull the authentication sub-state. This is mapped
 * to the authentication reducer. When actions are dispatched, this
 * method is executed which causes a re-render.
 */
function mapStateToProps (state) {
  const section = state.section || {}
  return {
    section: section
  }
}

// Wraps the the component with connect() which adds the dispatch()
// function to the props property for this component
export default connect(mapStateToProps)(SectionTitle)
