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
    const branch = (
      <div>
        <h3>{i18n.t('history.employment.default.left.para')}</h3>
        {i18n.m('history.employment.default.left.list')}
      </div>
    )

    return (
      <div className="reason-leaving">
        <Comments name="comments"
                  value={this.state.Comments}
                  title={i18n.t('history.employment.default.left.comments')}
                  className="eapp-field-wrap"
                  onUpdate={this.updateComments}
                  onValidate={this.props.onValidate}>

          <div className="eapp-field-wrap no-label">
            <Help id="history.employment.default.reasonDescription">
              <Textarea name="reason_description"
                        {...this.state.ReasonDescription}
                        className="reason-description"
                        onUpdate={this.updateReasonDescription}
                        />
              <HelpIcon />
            </Help>
          </div>

          <BranchCollection branchHelp="history.employment.default.reasonOptions"
                            branch={branch}
                            items={this.state.Reasons}
                            onUpdate={this.updateReasons}
                            >
            <ReasonOptions name="Reason"
                           className="eapp-field-wrap"
                           bind={true} />
          </BranchCollection>
        </Comments>
      </div>
    )
  }
}
