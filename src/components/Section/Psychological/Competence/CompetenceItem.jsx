import React from 'react'
import { i18n } from '../../../../config'
import { Address, ValidationElement, Help, HelpIcon, Text, DateControl, BranchCollection, Svg } from '../../../Form'

export default class CompetenceItem extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {

    }

    this.update = this.update.bind(this)
    this.updateOccurred = this.updateOccurred.bind(this)
    this.updateCourtName = this.updateCourtName.bind(this)
    this.updateCourtAddress = this.updateCourtAddress.bind(this)
    this.updateDisposition = this.updateDisposition.bind(this)
    this.updateAppeals = this.updateAppeals.bind(this)
  }

  update (field, values) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        Occurred: this.props.Occurred,
        CourtName: this.props.CourtName,
        CourtAddress: this.props.CourtAddress,
        Disposition: this.props.Disposition,
        Appeals: this.props.Appeals,
        [field]: values
      })
    }
  }

  updateOccurred (values) {
    this.update('Occurred', values)
  }

  updateCourtName (values) {
    this.update('CourtName', values)
  }

  updateCourtAddress (values) {
    this.update('CourtAddress', values)
  }

  updateAppeals (values) {
    this.update('Appeals', values)
  }

  updateDisposition (values) {
    this.update('Disposition', values)
  }

  render () {
    return (
      <div className="competence-item">
        <div className="eapp-field-wrap">
          <h3>{i18n.t('psychological.competence.heading.occurred')}</h3>
          <Help id="psychological.competence.help.occurred">
            <DateControl name="Occurred"
              {...this.props.Occurred}
              label={i18n.t('psychological.competence.label.occurred')}
              hideDay={true}
              onUpdate={this.updateOccurred}
              onValidate={this.props.onValidate}
            />
            <HelpIcon className="date-help-icon" />
          </Help>
        </div>

        <div className="eapp-field-wrap no-label">
          <h3>{i18n.t('psychological.competence.heading.courtName')}</h3>
          <Help id="psychological.competence.help.courtName">
            <Text name="CourtName"
              className="courtname"
              {...this.props.CourtName}
              onUpdate={this.updateCourtName}
              onValidate={this.props.onValidate}
            />
            <HelpIcon className="date-help-icon" />
          </Help>
        </div>

        <div className="eapp-field-wrap">
          <h3>{i18n.t('psychological.competence.heading.courtAddress')}</h3>
          <Help id="psychological.competence.help.courtAddress">
            <Address name="CourtAddress"
              {...this.props.CourtAddress}
              label={i18n.t('psychological.competence.label.courtAddress')}
              onUpdate={this.updateCourtAddress}
              onValidate={this.props.onValidate}
            />
            <HelpIcon className="date-help-icon" />
          </Help>
        </div>
        <div className="eapp-field-wrap no-label">
          <h3>{i18n.t('psychological.competence.heading.disposition')}</h3>
          <Help id="psychological.competence.help.disposition">
            <Text name="Disposition"
              className="disposition"
              {...this.props.Disposition}
              onUpdate={this.updateDisposition}
              onValidate={this.props.onValidate}
            />
            <HelpIcon className="date-help-icon" />
          </Help>
        </div>

        <BranchCollection
          className="appeals"
          branchHelp="psychological.competence.help.appealed"
          branch={<h3>{ i18n.t('psychological.competence.heading.appealed') }</h3>}
          items={this.props.Appeals}
          onUpdate={this.updateAppeals}
        >

        <h3 className="more title">{i18n.t('psychological.competence.heading.needMore')}</h3>
        <Svg src="img/date-down-arrow.svg" className="more arrow" />

        <div className="eapp-field-wrap no-label">
          <h3>{i18n.t('psychological.competence.heading.appealCourtName')}</h3>
          <Help id="psychological.competence.help.disposition">
            <Text name="CourtName"
              className="courtname"
              bind={true}
              onValidate={this.props.onValidate}
            />
            <HelpIcon className="date-help-icon" />
          </Help>
        </div>

        <div className="eapp-field-wrap">
          <h3>{i18n.t('psychological.competence.heading.appealCourtName')}</h3>
          <Help id="psychological.competence.help.courtAddress">
            <Address name="CourtAddress"
              bind={true}
              label={i18n.t('psychological.competence.label.courtAddress')}
              onValidate={this.props.onValidate}
            />
            <HelpIcon className="date-help-icon" />
          </Help>
        </div>
      </BranchCollection>
    </div>
    )
  }
}

CompetenceItem.defaultProps = {
  List: []
}
