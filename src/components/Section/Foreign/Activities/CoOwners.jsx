import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, BranchCollection } from '../../../Form'
import CoOwner from './CoOwner'

export default class CoOwners extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      List: this.props.List,
      ...queue
    })
  }

  updateList(values) {
    this.update({
      List: values
    })
  }

  render() {
    const prefix = this.props.prefix
    return (
      <div className="co-owners">
        <BranchCollection
          label={i18n.t(`foreign.${prefix}.coOwners.heading.hasCoOwners`)}
          appendLabel={i18n.t(
            `foreign.${prefix}.coOwners.heading.hasCoOwnersAppend`
          )}
          {...this.props.List}
          onError={this.props.onError}
          required={this.props.required}
          onUpdate={this.updateList}
          scrollIntoView={this.props.scrollIntoView}>
          <CoOwner
            name="Item"
            bind={true}
            prefix={`${this.props.prefix}.coOwner`}
            addressBooks={this.props.addressBooks}
            dispatch={this.props.dispatch}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </BranchCollection>
      </div>
    )
  }
}

CoOwner.defaultProps = {
  addressBooks: {},
  dispatch: action => {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
