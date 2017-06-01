import React from 'react'
import { i18n } from '../../../../config'
import { MilitaryForeignValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { BranchCollection } from '../../../Form'
import ForeignService from './ForeignService'

export default class Foreign extends SubsectionElement {
  constructor (props) {
    super(props)

    this.updateList = this.updateList.bind(this)
  }

  updateList (collection) {
    if (this.props.onUpdate) {
      this.props.onUpdate({ List: collection })
    }
  }

  render () {
    return (
      <div className="foreign">
        <BranchCollection items={this.props.List}
                          branchName="has_foreign"
                          appendLabel={i18n.t('military.foreign.collection.foreign.appendTitle')}
                          appendSize="h2"
                          onUpdate={this.updateList}
                          onError={this.handleError}>
          <ForeignService name="Item"
                          bind={true}
                          onError={this.handleError}
                          />
        </BranchCollection>
      </div>
    )
  }
}

Foreign.defaultProps = {
  onError: (value, arr) => { return arr },
  section: 'military',
  subsection: 'foreign',
  dispatch: () => {},
  validator: (state, props) => {
    return new MilitaryForeignValidator(state, props).isValid()
  }
}
