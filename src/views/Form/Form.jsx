import React from 'react'
import { withRouter } from 'react-router'
import AuthenticatedView from '../AuthenticatedView'
import { Section, SavedIndicator, TimeoutWarning } from '../../components'
import { env } from '../../config'

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
    const params = this.props.params || this.props.match.params
    if (!params.section) {
      this.props.history.push('form/identification/intro')
    }
  }

  render () {
    const params = this.props.params || this.props.match.params
    if (!params.section) {
      return null
    }

    // Splat is a react-router param added when wildcard (/**/) route paths are designated
    const splat = params.splat ? `/${params.splat}` : ''
    const subsection = `${params.subsection || ''}${splat}`.trim()
    return (
      <div id="eapp-form" className="eapp-form">
        <div id="info">
          <Section section={params.section} subsection={subsection} />
          <SavedIndicator interval="30000" />
          <TimeoutWarning timeout={env.SessionTimeout()} />
        </div>
      </div>
    )
  }
}

export default withRouter(AuthenticatedView(Form))
