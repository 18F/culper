import React from 'react'
import { withRouter } from 'react-router'
import { api } from '../../services'
import { saveSection } from '../../components/SavedIndicator/persistence-helpers'
import {
  clearErrors,
  updateApplication
} from '../../actions/ApplicationActions'
import AuthenticatedView from '../AuthenticatedView'
import { Section, SavedIndicator, TimeoutWarning } from '../../components'
import { env } from '../../config'
import {
  didRouteChange,
  findPosition,
  parseFormUrl
} from '../../components/Navigation/navigation-helpers'
import { tokenError } from '../../actions/AuthActions'
import { updateSection } from '../../actions/SectionActions'

// The concept is that we have three different inputs:
//  1. The index which just brings up the first entry of the form.
//  2. The section is known so we bring up that section and let
//     it handle what to display.
//  3. The section and subsection are known so the section will
//     display the subsection only.
class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = { refreshPending: false }
  }

  componentWillMount() {
    this.defaultRedirect()
  }

  componentDidUpdate(prevProps) {
    this.defaultRedirect()

    if (didRouteChange(this.props.location, prevProps.location)) {
      this.onRouteChanged(prevProps.location)
    }
  }

  componentDidMount() {
    this.refreshToken()
  }

  getParams() {
    return this.props.params || this.props.match.params
  }

  defaultRedirect() {
    const params = this.getParams()
    if (!params.section) {
      this.props.history.push('form/identification/intro')
    }
  }

  getLocation() {
    return parseFormUrl(this.props.location.pathname)
  }

  clearErrors() {
    const loc = this.getLocation()
    this.props.dispatch(clearErrors(loc.section, loc.subsection))
  }

  updateSettings() {
    this.props.dispatch(
      updateApplication('Settings', 'mobileNavigation', false)
    )
  }

  save(section, subsection) {
    window.scroll(0, findPosition(document.getElementById('scrollTo')))
    saveSection(
      this.props.application,
      section,
      subsection,
      this.props.dispatch
    ).catch(error => {
      alert(error)
    })
  }

  refreshToken() {
    if (env.IsTest()) {
      return
    }

    const token = api.getToken()
    if (!token) {
      return
    }

    // If a refresh is currently pending then wait for it
    if (this.state.refreshPending) {
      return
    }

    this.setState({ refreshPending: true })
    api
      .refresh()
      .then(r => {
        this.setState({ refreshPending: false })
        api.setToken(r.data)
        if (r.data === '') {
          this.props.dispatch(tokenError())
        } else {
          this.props.dispatch(
            updateApplication('Settings', 'lastRefresh', new Date().getTime())
          )
        }
      })
      .catch(() => {
        this.setState({ refreshPending: false })
        api.setToken('')
        this.props.dispatch(tokenError())
      })
  }

  onRouteChanged(prevLocation) {
    // update the Redux store with the React Router state
    const params = this.getParams()
    this.props.dispatch(updateSection(params.section, params.subsection))

    this.clearErrors()
    this.updateSettings()
    this.refreshToken()

    const prevLoc = parseFormUrl(prevLocation.pathname)
    this.save(prevLoc.section, prevLoc.subsection)
  }

  render() {
    const params = this.getParams()
    if (!params.section) {
      return null
    }

    // Splat is a react-router param added when wildcard (/**/) route paths are designated
    const splat = params.splat ? `/${params.splat}` : ''
    const subsection = `${params.subsection || ''}${splat}`.trim()
    const { formType, navigation } = this.props
    return (
      <div id="eapp-form" className="eapp-form">
        <div id="info">
          <Section
            section={params.section}
            subsection={subsection}
            formType={formType}
            navigation={navigation}
          />
          <SavedIndicator interval="30000" />
          <TimeoutWarning timeout={env.SessionTimeout()} />
        </div>
      </div>
    )
  }
}

export default withRouter(AuthenticatedView(Form))
