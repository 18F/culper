import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { BranchCollection } from '../../../Form'
import ForeignService from './ForeignService'

export default class Foreign extends SubsectionElement {
  constructor(props) {
    super(props)

    this.updateList = this.updateList.bind(this)
  }

  updateList(collection) {
    this.props.onUpdate({ List: collection })
  }

  render() {
    const { formType } = this.props
    return (
      <div
        className="section-content foreign"
        {...super.dataAttributes(this.props)}>
        <BranchCollection
          {...this.props.List}
          branchName="has_foreign"
          label={i18n.t('military.foreign.para.served')}
          labelSize="h4"
          appendLabel={i18n.t(
            'military.foreign.collection.foreign.appendTitle'
          )}
          appendSize="h4"
          onUpdate={this.updateList}
          scrollToBottom={this.props.scrollToBottom}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}>
          <ForeignService
            name="Item"
            bind={true}
            addressBooks={this.props.addressBooks}
            dispatch={this.props.dispatch}
            defaultState={this.props.defaultState}
            onError={this.handleError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
            formType={formType}
          />
        </BranchCollection>
      </div>
    )
  }
}

Foreign.defaultProps = {
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'military',
  subsection: 'foreign',
  addressBooks: {},
  dispatch: action => {},
  validator: data => {
    return validate(schema('military.foreign', data))
  },
  defaultState: true
}
