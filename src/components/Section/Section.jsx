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
import SubstanceUse from './SubstanceUse'
import Package from './Package'
import { SectionViews, SectionView } from './SectionView'

class Section extends React.Component {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
  }

  // TODO: See if this is necessary. Removing this makes the first section not expand in navigation ATM.
  componentDidMount () {
    this.update(this.props)
  }

  update (props) {
    const subsection = props.subsection || 'intro'
    const path = `/form/${props.section}/${subsection}`
    this.props.history.push(path)
  }

  render () {
    return (
      <SectionViews current={this.props.section}>
        <SectionView name="identification">
          <Identification subsection={this.props.subsection} update={this.update} />
        </SectionView>
        <SectionView name="financial">
          <Financial subsection={this.props.subsection} update={this.update} />
        </SectionView>
        <SectionView name="relationships">
          <Relationships subsection={this.props.subsection} update={this.update} />
        </SectionView>
        <SectionView name="citizenship">
          <Citizenship subsection={this.props.subsection} update={this.update} />
        </SectionView>
        <SectionView name="military">
          <Military subsection={this.props.subsection} update={this.update} />
        </SectionView>
        <SectionView name="history">
          <History subsection={this.props.subsection} update={this.update} />
        </SectionView>
        <SectionView name="foreign">
          <Foreign subsection={this.props.subsection} update={this.update} />
        </SectionView>
        <SectionView name="legal">
          <Legal subsection={this.props.subsection} update={this.update} />
        </SectionView>
        <SectionView name="psychological">
          <Psychological subsection={this.props.subsection} update={this.update} />
        </SectionView>
        <SectionView name="substance">
          <SubstanceUse subsection={this.props.subsection} update={this.update} />
        </SectionView>
        <SectionView name="package">
          <Package subsection={this.props.subsection} update={this.update} />
        </SectionView>
      </SectionViews>
    )
  }
}

export default withRouter(Section)
