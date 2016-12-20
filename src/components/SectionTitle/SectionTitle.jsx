import React from 'react'
import { connect } from 'react-redux'

/**
 * Provides the section title.
 *
 * Want to update the section title?
 * Using `react-redux` and the `dispatch()` function use the following snippet:
 *
 * ```js
 * this.props.dispatch(updateTitle('Chunky Monkey'))
 * ```
 *
 * `updateTitle()` can be found in `SectionActions`
 */
class SectionTitle extends React.Component {
  render () {
    return (
      <div className="title">
        {this.props.title}
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
    title: section.title
  }
}

// Wraps the the component with connect() which adds the dispatch()
// function to the props property for this component
export default connect(mapStateToProps)(SectionTitle)
