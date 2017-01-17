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
    let title = ''
    navigation.forEach(s => {
      if (s.url === this.props.section.section) {
        title = s.title
      }
    })

    return (
      <div className="title">
        <span className="title-text">
          {title}
        </span>
      </div>
    )
  }
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
