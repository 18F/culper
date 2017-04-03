import React from 'react'
import { i18n } from '../../../../config'
import { Accordion, Address, ValidationElement, Help, HelpIcon, Text, Suggestions, Name, DateControl, Branch, BranchCollection, Comments, Radio, RadioGroup, Show } from '../../../Form'

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
          <h3>Provide the date this occurred</h3>
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

        <div className="eapp-field-wrap">
          <h3>Provide the name of the court or administrative agency that declared you mentally incompetent</h3>
          <Help id="psychological.competence.help.courtName">
            <Text name="CourtName"
              {...this.props.CourtName}
              label={i18n.t('psychological.competence.label.courtName')}
              onUpdate={this.updateCourtName}
              onValidate={this.props.onValidate}
            />
            <HelpIcon className="date-help-icon" />
          </Help>
        </div>

        <div className="eapp-field-wrap">
          <h3>Provide the address of the court or administrative agency</h3>
          <Help id="psychological.competence.help.courtName">
            <Address name="CourtAddress"
              {...this.props.CourtAddress}
              label={i18n.t('psychological.competence.label.courtAddress')}
              onUpdate={this.updateCourtAddress}
              onValidate={this.props.onValidate}
            />
            <HelpIcon className="date-help-icon" />
          </Help>
        </div>
        <div className="eapp-field-wrap">
          <h3>Provide the final disposition</h3>
          <Help id="psychological.competence.help.disposition">
            <Text name="Disposition"
              {...this.props.Disposition}
              label={i18n.t('psychological.competence.label.disposition')}
              onUpdate={this.updateDisposition}
              onValidate={this.props.onValidate}
            />
            <HelpIcon className="date-help-icon" />
          </Help>
        </div>

        <BranchCollection
          branchHelp="history.employment.default.reprimand.help"
          branch={<h2>Was this matter appealed to a higher  court or administrative agency</h2>}
          items={this.state.Appeals}
          onUpdate={this.updateAppeals}
        >

        <div className="eapp-field-wrap">
          <h3>Name of court or administrative agency</h3>
          <Help id="psychological.competence.help.disposition">
            <Text name="CourtName"
              label={i18n.t('psychological.competence.label.courtName')}
              onValidate={this.props.onValidate}
            />
            <HelpIcon className="date-help-icon" />
          </Help>

          <div className="eapp-field-wrap">
            <h3>Provide the address of the court or administrative agency</h3>
            <Help id="psychological.competence.help.courtAddress">
              <Address name="CourtAddress"
                label={i18n.t('psychological.competence.label.courtAddress')}
                onValidate={this.props.onValidate}
              />
              <HelpIcon className="date-help-icon" />
            </Help>
          </div>
        </div>
      </BranchCollection>
    </div>
    )
  }
}

CompetenceItem.defaultProps = {
  List: []
}
