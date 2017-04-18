import React from 'react'
import { i18n } from '../../../../config'
import { Accordion, Address, Branch, Field, DateControl, ValidationElement, Show, RadioGroup, Radio, Email, Telephone, Name, BirthPlace, ForeignBornDocuments, SSN, MaidenName, DateRange } from '../../../Form'
import { dateRangeFormat } from '../../Psychological/summaryHelper'
import Cohabitant from './Cohabitant'
import CivilUnion from './CivilUnion'

export default class RelationshipStatus extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      Status: props.Status,
      CivilUnion: props.CivilUnion,
      HasCohabitant: props.HasCohabitant,
      CohabitantList: props.CohabitantList,
      errorCodes: []
    }

    this.update = this.update.bind(this)
    this.updateStatus = this.updateStatus.bind(this)
    this.updateCivilUnion = this.updateCivilUnion.bind(this)
    this.updateHasCohabitant = this.updateHasCohabitant.bind(this)
    this.updateCohabitantList = this.updateCohabitantList.bind(this)
  }

  update (field, values) {
    this.setState({[field]: values}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          Status: this.state.Status,
          HasCohabitant: this.state.HasCohabitant,
          CohabitantList: this.state.CohabitantList,
          CivilUnion: this.state.CivilUnion
        })
      }
    })
  }

  isValid () {
    return true
  }

  updateStatus (values) {
    this.update('Status', values.target.value)
  }

  updateHasCohabitant (values) {
    this.update('HasCohabitant', values)
  }

  updateCivilUnion (values) {
    this.update('CivilUnion', values)
  }

  updateCohabitantList (values) {
    this.update('CohabitantList', values)
  }

  cohabitantSummary (item, index) {
    const itemType = i18n.t('relationships.status.cohabitant.collection.appendLabel')
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

  handleValidation (event, status, error) {
    if (!event) {
      return
    }

    let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      const errorObject = { [this.props.name]: codes }
      const statusObject = { [this.props.name]: { status: complexStatus } }
      super.handleValidation(event, statusObject, errorObject)
    })
  }

  render () {
    return (
      <div className="relationship-status">
        <Field title={i18n.t('relationships.status.heading.title')}>
          <RadioGroup name="status" className="status-options" selectedValue={this.state.Status}>
            <Radio
              label={i18n.m('relationships.status.label.status.never')}
              value="Never"
              onChange={this.updateStatus}
            />
            <Radio
              label={i18n.m('relationships.status.label.status.inCivilUnion')}
              value="InCivilUnion"
              onChange={this.updateStatus}
            />
            <Radio
              label={i18n.m('relationships.status.label.status.separated')}
              value="Separated"
              onChange={this.updateStatus}
            />
            <Radio
              label={i18n.m('relationships.status.label.status.annulled')}
              value="Annulled"
              onChange={this.updateStatus}
            />
            <Radio
              label={i18n.m('relationships.status.label.status.divorced')}
              value="Divorced"
              onChange={this.updateStatus}
            />
            <Radio
              label={i18n.m('relationships.status.label.status.widowed')}
              value="Widowed"
              onChange={this.updateStatus}
            />
          </RadioGroup>
        </Field>

        <Show when={['InCivilUnion', 'Separated'].includes(this.state.Status)}>
          <CivilUnion name="civilUnion"
            {...this.state.CivilUnion}
            onUpdate={this.updateCivilUnion}
          />
        </Show>

        <Field title={i18n.t('relationships.status.heading.hasCohabitant')}>
          <Branch name="hasCohabitant"
            className="has-cohabitant"
            value={this.state.HasCohabitant}
            help="relationships.status.help.hasCohabitant"
            onUpdate={this.updateHasCohabitant}
            onValidate={this.props.onValidate}>
          </Branch>
        </Field>

        <Show when={this.state.HasCohabitant === 'Yes'}>
          <Accordion minimum="1"
            items={this.state.CohabitantList}
            onUpdate={this.updateCohabitantList}
            summary={this.cohabitantSummary}
            onValidate={this.handleValidation}
            description={i18n.t('relationships.status.cohabitant.collection.description')}
            appendTitle={i18n.t('relationships.status.cohabitant.collection.appendTitle')}
            appendMessage={i18n.m('relationships.status.cohabitant.collection.appendMessage')}
            appendLabel={i18n.t('relationships.status.cohabitant.collection.appendLabel')}>
            <Cohabitant name="Cohabitant" bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

RelationshipStatus.defaultProps = {
  List: []
}

