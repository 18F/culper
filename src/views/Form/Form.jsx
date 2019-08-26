/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { saveSection } from 'components/SavedIndicator/persistence-helpers'
import {
  clearErrors,
  updateApplication,
} from 'actions/ApplicationActions'
import { Section, SavedIndicator, TimeoutWarning } from 'components'
import { env } from 'config'
import {
  didRouteChange,
  findPosition,
  parseFormUrl,
} from 'components/Navigation/navigation-helpers'
import { renewSession } from 'actions/AuthActions'
import { updateSection } from 'actions/SectionActions'

// The concept is that we have three different inputs:
//  1. The index which just brings up the first entry of the form.
//  2. The section is known so we bring up that section and let
//     it handle what to display.
//  3. The section and subsection are known so the section will
//     display the subsection only.
class Form extends React.Component {
  componentWillMount() {
    this.defaultRedirect()
  }

  componentDidUpdate(prevProps) {
    this.defaultRedirect()

    const { location } = this.props

    if (didRouteChange(location, prevProps.location)) {
      this.onRouteChanged(prevProps.location)
    }
  }

  onRouteChanged(prevLocation) {
    const { dispatch } = this.props

    // update the Redux store with the React Router state
    const params = this.getParams()
    dispatch(updateSection(params.section, params.subsection))

    this.clearErrors()
    this.updateSettings()

    const prevLoc = parseFormUrl(prevLocation.pathname)
    this.save(prevLoc.section, prevLoc.subsection)
  }

  getParams() {
    const { params, match } = this.props
    return params || match.params
  }

  getLocation() {
    const { location } = this.props
    return parseFormUrl(location.pathname)
  }

  defaultRedirect() {
    const params = this.getParams()
    if (!params.section) {
      const { history } = this.props
      history.push('form/identification/intro')
    }
  }

  clearErrors() {
    const { dispatch } = this.props
    const loc = this.getLocation()
    dispatch(clearErrors(loc.section, loc.subsection))
  }

  updateSettings() {
    const { dispatch } = this.props
    dispatch(updateApplication('Settings', 'mobileNavigation', false))
  }

  save(section, subsection) {
    const { application, dispatch } = this.props

    window.scroll(0, findPosition(document.getElementById('scrollTo')))
    saveSection(
      application,
      section,
      subsection,
      dispatch
    ).catch((error) => {
      alert(error)
    })
  }

  render() {
    const { showSessionWarning } = this.props

    const params = this.getParams()
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
          <SavedIndicator interval={30000} />
          {showSessionWarning && <TimeoutWarning timeout={env.SessionTimeout()} />}
        </div>
      </div>
    )
  }
}

// TODO for some reason adding these is breaking this page (:
/*
Form.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  params: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  application: PropTypes.object,
  showSessionWarning: PropTypes.bool,
}

Form.defaultProps = {
  location: {},
  dispatch: () => {},
  params: {},
  match: {},
  history: {},
  application: {},
  showSessionWarning: false,
}
*/

export default withRouter(Form)
