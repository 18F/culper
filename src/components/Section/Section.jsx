import React from 'react'
import { withRouter } from 'react-router'
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
import { getComponentByName } from './generators'

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
    return getComponentByName(storeToComponentMap, name)
  }

  createSections() {
    return this.props.navigation.sections.map(section => {
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
    const sections = this.createSections()
    return <SectionViews current={this.props.section}>{sections}</SectionViews>
  }
}

export default withRouter(Section)
