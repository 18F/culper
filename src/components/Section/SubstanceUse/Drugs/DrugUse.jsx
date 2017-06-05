import React from 'react'
import { i18n } from '../../../../config'
import { Field, Branch, ValidationElement, Textarea, DateControl } from '../../../Form'
import DrugType from './DrugType'

export default class DrugUse extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateDrugType = this.updateDrugType.bind(this)
    this.updateFirstUse = this.updateFirstUse.bind(this)
    this.updateRecentUse = this.updateRecentUse.bind(this)
    this.updateNatureOfUse = this.updateNatureOfUse.bind(this)
    this.updateUseWhileEmployed = this.updateUseWhileEmployed.bind(this)
    this.updateUseWithClearance = this.updateUseWithClearance.bind(this)
    this.updateUseInFuture = this.updateUseInFuture.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        DrugType: this.props.DrugType,
        FirstUse: this.props.FirstUse,
        RecentUse: this.props.RecentUse,
        NatureOfUse: this.props.NatureOfUse,
        UseWhileEmployed: this.props.UseWhileEmployed,
        UseWithClearance: this.props.UseWithClearance,
        UseInFuture: this.props.UseInFuture,
        Explanation: this.props.Explanation,
        ...updateValues
      })
    }
  }

  updateDrugType (values) {
    this.update({ DrugType: values })
  }

  updateFirstUse (values) {
    this.update({ FirstUse: values })
  }

  updateRecentUse (values) {
    this.update({ RecentUse: values })
  }

  updateNatureOfUse (values) {
    this.update({ NatureOfUse: values })
  }

  updateUseWhileEmployed (values) {
    this.update({ UseWhileEmployed: values })
  }

  updateUseWithClearance (values) {
    this.update({ UseWithClearance: values })
  }

  updateUseInFuture (values) {
    this.update({ UseInFuture: values })
  }

  updateExplanation (values) {
    this.update({ Explanation: values })
  }

  render () {
    return (
      <div className="drug-use">
        <Field title={i18n.t('substance.drugs.use.heading.drugType')}
          className="drug-type-use"
          help={'substance.drugs.use.help.drugType'}
          adjustFor="labels">
          <DrugType name="DrugType"
            {...this.props.DrugType}
            onUpdate={this.updateDrugType}
            onError={this.props.onError}
          />
        </Field>

        <Field title={i18n.t('substance.drugs.use.heading.firstUse')}
          adjustFor="datecontrol"
          help={'substance.drugs.use.help.firstUse'}>
          <DateControl name="FirstUse"
            className="first-use"
            {...this.props.FirstUse}
            hideDay={true}
            onUpdate={this.updateFirstUse}
            onError={this.props.onError}
          />
        </Field>

        <Field title={i18n.t('substance.drugs.use.heading.recentUse')}
          adjustFor="datecontrol"
          help={'substance.drugs.use.help.recentUse'}>
          <DateControl name="RecentUse"
            className="recent-use"
            {...this.props.RecentUse}
            hideDay={true}
            onUpdate={this.updateRecentUse}
            onError={this.props.onError}
          />
        </Field>

        <Field title={i18n.t('substance.drugs.use.heading.natureOfUse')}
          help={'substance.drugs.use.help.natureOfUse'}>
          <Textarea name="NatureOfUse"
            className="nature-of-use"
            {...this.props.NatureOfUse}
            onUpdate={this.updateNatureOfUse}
            onError={this.props.onError}
          />
        </Field>

        <h3>{i18n.t('substance.drugs.use.heading.useWhileEmployed')}</h3>
        <Branch name="UseWhileEmployed"
          className="use-while-employed"
          help={'substance.drugs.use.help.useWhileEmployed'}
          value={this.props.UseWhileEmployed}
          onError={this.props.onError}
          onUpdate={this.updateUseWhileEmployed}>
        </Branch>

        <h3>{i18n.t('substance.drugs.use.heading.useWithClearance')}</h3>
        <Branch name="UseWithClearance"
          className="use-with-clearance"
          help={'substance.drugs.use.help.useWithClearance'}
          value={this.props.UseWithClearance}
          onError={this.props.onError}
          onUpdate={this.updateUseWithClearance}>
        </Branch>

        <h3>{i18n.t('substance.drugs.use.heading.useInFuture')}</h3>
        <Branch name="UseInFuture"
          className="use-in-future"
          help={'substance.drugs.use.help.useInFuture'}
          value={this.props.UseInFuture}
          onError={this.props.onError}
          onUpdate={this.updateUseInFuture}>
        </Branch>

        <Field title={i18n.t('substance.drugs.use.heading.explanation')}
          help={'substance.drugs.use.help.explanation'}>
          <Textarea name="Explanation"
            className="explanation"
            {...this.props.Explanation}
            onUpdate={this.updateExplanation}
            onError={this.props.onError}
          />
        </Field>
      </div>
    )
  }
}

DrugUse.defaultProps = {
  onError: (value, arr) => { return arr }
}
