import React from 'react'
import { i18n } from '../../../../config'
import { Accordion, Branch, ValidationElement, Show } from '../../../Form'
import Cohabitant from './Cohabitant'
import { CohabitantsValidator } from '../../../../validators'

export default class Cohabitants extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      HasCohabitant: props.HasCohabitant,
      CohabitantList: props.CohabitantList,
      CohabitantListBranch: props.CohabitantListBranch
    }

    this.update = this.update.bind(this)
    this.updateHasCohabitant = this.updateHasCohabitant.bind(this)
    this.updateCohabitantList = this.updateCohabitantList.bind(this)
  }

  update (field, values) {
    this.setState({[field]: values}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          HasCohabitant: this.state.HasCohabitant,
          CohabitantList: this.state.CohabitantList,
          CohabitantListBranch: this.state.CohabitantListBranch
        })
      }
    })
  }

  // isValid () {
  //   return new CohabitantsValidator(this.state).isValid()
  // }

  updateHasCohabitant (values) {
    this.update('HasCohabitant', values)
  }

  updateCohabitantList (values) {
    this.update('CohabitantList', values.items)
    this.update('CohabitantListBranch', values.branch)
  }

  summary (item, index) {
    const itemType = i18n.t('relationships.cohabitant.collection.itemType')
    const o = (item || {}).Cohabitant || {}
    const date = (o.CohabitationBegan || {}).date ? `${o.CohabitationBegan.month}/${o.CohabitationBegan.year}` : ''
    const name = o.Name
          ? `${o.Name.first || ''} ${o.Name.middle || ''} ${o.Name.last || ''}`.trim()
          : i18n.t('relationships.relatives.collection.summary.unknown')
    return (
      <span>
        <span className="index">{itemType}</span>
        <span className="info"><strong>{name} {date}</strong></span>
      </span>
    )
  }

  // handleValidation (event, status, error) {
  //   let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
  //   let complexStatus = null
  //   if (codes.length > 0) {
  //     complexStatus = false
  //   } else if (this.isValid()) {
  //     complexStatus = true
  //   }

  //   this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
  //     const errorObject = { [this.props.name]: codes }
  //     const statusObject = { [this.props.name]: { status: complexStatus } }
  //     super.handleValidation(event, statusObject, errorObject)
  //   })
  // }

  render () {
    return (
      <div className="cohabitants">
        <Branch name="hasCohabitant"
                label={i18n.t('relationships.cohabitant.heading.hasCohabitant')}
                labelSize="h3"
                className="has-cohabitant"
                value={this.state.HasCohabitant}
                help="relationships.cohabitant.help.hasCohabitant"
                onUpdate={this.updateHasCohabitant}
                onError={this.props.onError}>
        </Branch>

        <Show when={this.state.HasCohabitant === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.CohabitantList}
                     branch={this.state.CohabitantListBranch}
                     summary={this.summary}
                     onUpdate={this.updateCohabitantList}
                     onError={this.props.onError}
                     description={i18n.t('relationships.cohabitant.collection.description')}
                     appendTitle={i18n.t('relationships.cohabitant.collection.appendTitle')}
                     appendLabel={i18n.t('relationships.cohabitant.collection.appendLabel')}>
            <Cohabitant name="Cohabitant" spouse={this.props.spouse} bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Cohabitants.defaultProps = {
  HasCohabitant: '',
  CohabitantList: [],
  CohabitantListBranch: '',
  onError: (value, arr) => { return arr }
}
