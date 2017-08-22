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
    this.props.onUpdate({ List: collection })
  }

  render () {
    return (
      <div className="foreign">
        <BranchCollection items={this.props.List}
                          branchName="has_foreign"
                          appendLabel={i18n.t('military.foreign.collection.foreign.appendTitle')}
                          appendSize="h2"
                          onUpdate={this.updateList}
                          required={this.props.required}
                          onError={this.handleError}
                          scrollIntoView={this.props.scrollIntoView}>
          <ForeignService name="Item"
                          bind={true}
                          addressBooks={this.props.addressBooks}
                          dispatch={this.props.dispatch}
                          defaultState={this.props.defaultState}
                          onError={this.handleError}
                          required={this.props.required}
                          scrollIntoView={this.props.scrollIntoView}
                          />
        </BranchCollection>
      </div>
    )
  }
}

Foreign.defaultProps = {
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'military',
  subsection: 'foreign',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (state, props) => {
    return new MilitaryForeignValidator(state, props).isValid()
  },
  defaultState: true
}
