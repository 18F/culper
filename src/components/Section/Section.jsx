import React from 'react'
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
import Substance from './SubstanceUse'
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
  Substance,
  Package
}

class Section extends React.Component {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
  }

  // TODO: See if this is necessary. Removing this makes the first section not expand in navigation ATM.
  componentDidMount() {
    this.update(this.props)
  }

  update(props) {
    const subsection = props.subsection || 'intro'
    const path = `/form/${props.section}/${subsection}`
    this.props.history.push(path)
  }

  getComponent(section) {
    // workaround for the fact that the Package section doesn't have an associated store
    const name = section.url === 'package' ? 'Package' : section.store
    if (storeToComponentMap[name]) {
      return storeToComponentMap[name]
    }

    console.log(`${name} component not found`)
  }

  createSections() {
    return navigation.map(section => {
      const SectionComponent = this.getComponent(section)
      return (
        <SectionView key={section.url} name={section.url}>
          <SectionComponent
            subsection={this.props.subsection}
            update={this.update}
          />
        </SectionView>
      )
    })
  }

  render() {
    return (
      <Switch>
        {/* REFACTORED - These sections are rendered via <Route>s */}
        <Route path="/form/identification" component={Identification} />

        {/* TBD */}
        <Route path="/form/:section/:subsection" render={() => (
          <SectionViews current={this.props.section}>{this.createSections()}</SectionViews>
        )} />

        {/* Sections to refactor */}
        {/*
          <Route path="/form/history" component={History} />
          <Route path="/form/relationships" component={Relationships} />
          <Route path="/form/citizenship" component={Citizenship} />
          <Route path="/form/military" component={Military} />
          <Route path="/form/foreign" component={Foreign} />
          <Route path="/form/financial" component={Financial} />
          <Route path="/form/substance" component={Substance} />
          <Route path="/form/legal" component={Legal} />
          <Route path="/form/psychological" component={Psychological} />
          <Route path="/form/package" component={Package} />
        */}
      </Switch>
    )
  }
}

export default withRouter(Section)
