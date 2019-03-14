import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, withRouter } from 'react-router'
import Identification from './Identification'
import Financial from './Financial'
import Relationships from './Relationships'
import Citizenship from './Citizenship'
import Foreign from './Foreign'
import Military from './Military'
import History from './History'
import Legal from './Legal'
import Psychological from './Psychological'
import SubstanceUse from './SubstanceUse'
import Package from './Package'
import { SectionViews, SectionView } from './SectionView'
import navigation from '../../config/navigation'

const storeToComponentMap = {
  Identification,
  Financial,
  Relationships,
  Citizenship,
  Foreign,
  Military,
  History,
  Legal,
  Psychological,
  SubstanceUse,
  Package,
}

class Section extends React.Component {
  /**
   * TODO: See if this is necessary. Removing this makes the first section not
   * expand in  navigation ATM.
   */
  componentDidMount() {
    this.update(this.props)
  }

  getComponent = (section) => {
    // workaround for the fact that the Package section doesn't have an associated store
    const name = section.url === 'package' ? 'Package' : section.store
    if (storeToComponentMap[name]) {
      return storeToComponentMap[name]
    }

    console.log(`${name} component not found`)
    return null
  }

  update = (props) => {
    const { history } = this.props

    const subsection = props.subsection || 'intro'
    const path = `/form/${props.section}/${subsection}`
    history.push(path)
  }

  createSections = () => {
    const { subsection } = this.props

    return navigation.map((section) => {
      const SectionComponent = this.getComponent(section)
      return (
        <SectionView key={section.url} name={section.url}>
          <SectionComponent
            subsection={subsection}
            update={this.update}
          />
        </SectionView>
      )
    })
  }

  render() {
    const { section } = this.props

    return (
      <Switch>
        {/* REFACTORED - These sections are rendered via <Route>s */}
        <Route path="/form/identification" component={Identification} />
        <Route path="/form/history" component={History} />
        <Route path="/form/citizenship" component={Citizenship} />
        <Route path="/form/military" component={Military} />
        <Route path="/form/foreign" component={Foreign} />
        <Route path="/form/financial" component={Financial} />
        <Route path="/form/substance" component={SubstanceUse} />
        <Route path="/form/legal" component={Legal} />

        {/* TBD */}
        <Route
          path="/form/:section/:subsection"
          render={() => (
            <SectionViews current={section}>{this.createSections()}</SectionViews>
          )}
        />

        {/* Sections to refactor */}
        {/*
          <Route path="/form/relationships" component={Relationships} />
          <Route path="/form/substance" component={Substance} />
          <Route path="/form/legal" component={Legal} />
          <Route path="/form/psychological" component={Psychological} />
          <Route path="/form/package" component={Package} />
        */}
      </Switch>
    )
  }
}

/* eslint react/forbid-prop-types: 0 */
Section.propTypes = {
  section: PropTypes.string.isRequired,
  subsection: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(Section)
