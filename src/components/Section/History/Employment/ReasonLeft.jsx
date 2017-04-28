import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, Textarea, BranchCollection } from '../../../Form'
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
          Reasons: this.state.Reasons,
          ReasonDescription: this.state.ReasonDescription
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
    return (
      <div className="reason-leaving">
        <Field help="history.employment.default.reasonDescription"
               comments={true}
               commentsName="comments"
               commentsValue={this.state.Comments}>
          <Textarea name="reason_description"
                    {...this.state.ReasonDescription}
                    className="reason-description"
                    onUpdate={this.updateReasonDescription}
                    />
        </Field>

        <BranchCollection label={i18n.t('history.employment.default.left.branch')}
                          appendLabel={i18n.t('history.employment.default.left.append')}
                          help="history.employment.default.reasonOptions"
                          content={i18n.m('history.employment.default.left.list')}
                          items={this.state.Reasons}
                          onUpdate={this.updateReasons}
                          >
          <ReasonOptions name="Reason" bind={true} />
        </BranchCollection>
      </div>
    )
  }
}
