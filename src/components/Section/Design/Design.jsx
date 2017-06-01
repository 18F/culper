import React from 'react'
import { connect } from 'react-redux'
import { push } from '../../../middleware/history'
import { i18n } from '../../../config'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { ValidationElement } from '../../Form'
import { SectionViews, SectionView } from '../SectionView'
import Headings from './Headings'

class Design extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection
    }
  }

  render () {
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="">
            <Headings />
          </SectionView>

          <SectionView name="headings">
            <Headings />
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let section = state.section || {}
  return {
    Section: section
  }
}

Design.defaultProps = {
  subsection: ''
}

export default connect(mapStateToProps)(AuthenticatedView(Design))
