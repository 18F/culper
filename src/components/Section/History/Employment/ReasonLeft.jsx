import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, Textarea, BranchCollection } from '../../../Form'
import ReasonOptions from './ReasonOptions'

export default class ReasonLeft extends ValidationElement {
  constructor (props) {
    super(props)
    this.updateReasonDescription = this.updateReasonDescription.bind(this)
    this.updateComments = this.updateComments.bind(this)
    this.updateReasons = this.updateReasons.bind(this)
  }

  /**
   * Handle any updates and bubble them up.
   */
  update (queue) {
    this.props.onUpdate({
      name: this.props.name,
      Comments: this.props.Comments,
      Reasons: this.props.Reasons,
      ReasonDescription: this.props.ReasonDescription,
      ...queue
    })
  }

  updateReasonDescription (values) {
    this.update({ ReasonDescription: values })
  }

  updateComments (values) {
    this.update({ Comments: values })
  }

  updateReasons (values) {
    this.update({ Reasons: values })
  }

  render () {
    return (
      <div className="reason-leaving">
        <Field title={i18n.t('history.employment.default.left.title')}
               titleSize="h3"
               comments={true}
               commentsName="comments"
               commentsValue={this.props.Comments}
               scrollIntoView={this.props.scrollIntoView}>
          <Textarea name="reason_description"
                    {...this.props.ReasonDescription}
                    className="reason-description"
                    onUpdate={this.updateReasonDescription}
                    onError={this.props.onError}
                    required={this.props.required}
                    />
        </Field>

        <BranchCollection label={i18n.t('history.employment.default.left.branch')}
                          appendLabel={i18n.t('history.employment.default.left.append')}
                          content={i18n.m('history.employment.default.left.list')}
                          {...(this.props.Reasons || {})}
                          onUpdate={this.updateReasons}
                          onError={this.props.onError}
                          required={this.props.required}
                          scrollIntoView={this.props.scrollIntoView}
                          >
          <ReasonOptions name="Item"
                         bind={true}
                         required={this.props.required}
                         scrollIntoView={this.props.scrollIntoView} />
        </BranchCollection>
      </div>
    )
  }
}

ReasonLeft.defaultProps = {
  Comments: {},
  ReasonDescription: {},
  Reasons: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
