import React from 'react'
import { push } from '../../middleware/history'
import AuthenticatedView from '../AuthenticatedView'
import { Section, SavedIndicator } from '../../components'
import { Introduction } from '../../components/Form'

// The concept is that we have three different inputs:
//  1. The index which just brings up the first entry of the form.
//  2. The section is known so we bring up that section and let
//     it handle what to display.
//  3. The section and subsection are known so the section will
//     display the subsection only.
class Form extends React.Component {

  componentWillMount () {
    this.defaultRedirect()
  }

  componentDidUpdate () {
    this.defaultRedirect()
  }

  defaultRedirect () {
    if (!this.props.params.section) {
      this.props.dispatch(push('form/identification'))
    }
  }

  render () {
    if (!this.props.params.section) {
      return null
    }
    // Splat is a react-router param added when wildcard (/**/) route paths are designated
    const splat = this.props.params.splat ? `/${this.props.params.splat}` : ''
    const subsection = `${this.props.params.subsection || ''}${splat}`.trim()
    return (
      <div id="eapp-form" className="eapp-form">
        <div id="info">
          <Introduction dispatch={this.props.dispatch} />
          <Section section={this.props.params.section} subsection={subsection} />
          <SavedIndicator interval="30000" />
        </div>
      </div>
    )
  }
}

export default AuthenticatedView(Form)
