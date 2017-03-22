import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Help, HelpIcon, Radio, RadioGroup, Show, Comments, Textarea, DateControl, Branch, Text, BranchCollection } from '../../../Form'

export default class Reprimand extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      Reasons: props.Reasons
    }

    this.updateReasons = this.updateReasons.bind(this)
  }

  /**
   * Handle any updates and bubble them up.
   */
  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          Reasons: this.state.Reasons
        })
      }
    })
  }

  updateReasons (values) {
    this.onUpdate('Reasons', values)
  }

  render () {
    const branch = (
      <div>
        <h3>{i18n.t('history.employment.default.reprimand.para')}</h3>
      </div>
    )

    return (
      <BranchCollection
        branchHelp="history.employment.default.reprimand.help"
        branch={branch}
        items={this.state.Reasons}
        onUpdate={this.updateReasons}
      >
        <div className="eapp-field-wrap">
          <div className="explanation-left">
            <Textarea name="Text"
              bind={true}
              label={i18n.t('history.employment.default.reprimand.description.label')}
              maxlength="100"
              onValidate={this.props.onValidate}
            />
          </div>
          <div className="date-left">
            <label>{i18n.t('history.employment.default.reprimand.date.label')}</label>
            <DateControl name="Date"
              bind={true}
              hideDay={true}
              onValidate={this.props.onValidate}
            />
          </div>
        </div>
      </BranchCollection>
    )
  }
}
