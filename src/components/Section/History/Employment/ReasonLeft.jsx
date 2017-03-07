import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Help, HelpIcon, Radio, RadioGroup, Show, Comments, Textarea, DateControl, Branch, Text, BranchCollection } from '../../../Form'
import ReasonOptions from './ReasonOptions'

export default class ReasonLeft extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      ReasonDescription: props.ReasonDescription,
      Comments: props.Comments,
      Reasons: props.Reasons
    }

    this.updateReasonDescription = this.updateReasonDescription.bind(this)
    this.updateComments = this.updateComments.bind(this)
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
          Comments: this.state.Comments,
          Reasons: this.state.Reasons
        })
      }
    })
  }

  updateReasonDescription (values) {
    this.onUpdate('ReasonDescription', values)
  }

  updateComments (values) {
    this.onUpdate('Comments', values)
  }

  updateReasons (values) {
    this.onUpdate('Reasons', values)
  }

  render () {
    const branch = (
      <div>
        <h3>{i18n.t('history.employment.default.left.para')}</h3>
        <p>{i18n.m('history.employment.default.left.list')}</p>
      </div>
    )
    return (
      <div>
        <Comments name="comments"
          value={this.state.Comments}
          title={i18n.t('history.employment.default.left.comments')}
          className={this.props.className}
          onUpdate={this.updateComments}
          onValidate={this.props.onValidate}
        >

        <Help id="history.employment.default.reasonDescription">
          <div className={this.props.className}>
            <Textarea
              name="reason_description"
              value={this.state.ReasonDescription}
              onUpdate={this.updateReasonDescription}
            />
          </div>
          <HelpIcon />
        </Help>

        <BranchCollection
          className="eapp-field-wrap"
          branchHelp="history.employment.default.reasonOptions"
          branch={branch}
          items={this.state.Reasons}
          onUpdate={this.updateReasons}
        >
          <ReasonOptions name="Reason" bind={true} />
        </BranchCollection>
      </Comments>
    </div>
    )
  }
}

