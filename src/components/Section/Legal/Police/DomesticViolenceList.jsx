import React from 'react'
import { i18n } from '../../../../config'
import { DomesticViolenceValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { BranchCollection } from '../../../Form'
import DomesticViolence from './DomesticViolence'

export default class DomesticViolenceList extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ...queue
    })
  }

  updateList (values, event) {
    this.update({
      List: values
    })
  }

  render () {
    return (
      <div className="domestic-violence-list">
        <BranchCollection label={i18n.t('legal.police.label.domesticViolence')}
                          labelSize="h2"
                          className="has-order"
                          appendLabel={i18n.m('legal.police.label.domesticViolenceAppend')}
                          items={this.props.List}
                          onError={this.handleError}
                          required={true}
                          onUpdate={this.updateList}
                          scrollIntoView={this.props.scrollIntoView}>
          <DomesticViolence name="domestic"
                            addressBooks={this.props.addressBooks}
                            dispatch={this.props.dispatch}
                            bind={true}
                            onError={this.handleError}
                            required={true}
                            scrollIntoView={this.props.scrollIntoView}
                            />
        </BranchCollection>
      </div>
    )
  }
}

DomesticViolenceList.defaultProps = {
  List: [],
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'police/domesticviolence',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (state, props) => {
    return new DomesticViolenceValidator(props, props).isValid()
  }
}
