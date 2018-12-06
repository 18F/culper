import React from 'react'
import { i18n } from '../../../../config'
import { today, daysAgo, extractDate } from '../dateranges'
import {
  ValidationElement,
  Show,
  Field,
  Textarea,
  BranchCollection
} from '../../../Form'
import ReasonOptions from './ReasonOptions'

export default class ReasonLeft extends ValidationElement {
  constructor(props) {
    super(props)
    this.updateReasonDescription = this.updateReasonDescription.bind(this)
    this.updateComments = this.updateComments.bind(this)
    this.updateReasons = this.updateReasons.bind(this)
  }

  /**
   * Handle any updates and bubble them up.
   */
  update(queue) {
    const allowDescription = this.showDescription()
    const allowOptions = this.showOptions()
    this.props.onUpdate({
      name: this.props.name,
      Reasons: allowOptions ? this.props.Reasons : { items: [], branch: {} },
      ReasonDescription: allowDescription ? this.props.ReasonDescription : {},
      Comments: allowDescription ? this.props.Comments : {},
      ...queue
    })
  }

  updateReasonDescription(values) {
    this.update({ ReasonDescription: values })
  }

  updateComments(values) {
    this.update({ Comments: values })
  }

  updateReasons(values) {
    this.update({ Reasons: values })
  }

  /**
   * Only show the reasons for leaving if
   *  - not currently employed at position
   */
  showDescription() {
    const dates = this.props.Dates || {}

    return dates.present !== true
  }

  /**
   * Only show the reasons options if:
   *  - not currently employed at position AND
   *  - employed at position within the last 7 years
   */
  showOptions() {
    const sevenYearsAgo = daysAgo(today, 365 * 7)
    const now = new Date()
    const dates = this.props.Dates || {}
    const from = extractDate(dates.from)
    const to = dates.present === true ? now : extractDate(dates.to)

    return (
      dates.present !== true &&
      ((from && from >= sevenYearsAgo) || (to && to >= sevenYearsAgo))
    )
  }

  render() {
    return (
      <div className="reason-leaving">
        <Show when={this.showDescription()}>
          <Field
            title={i18n.t('history.employment.default.left.title')}
            titleSize="h3"
            comments={true}
            commentsName="comments"
            commentsValue={this.props.Comments}
            scrollIntoView={this.props.scrollIntoView}>
            <Textarea
              name="reason_description"
              {...this.props.ReasonDescription}
              className="reason-description"
              onUpdate={this.updateReasonDescription}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>

        <Show when={this.showOptions()}>
          <BranchCollection
            label={i18n.t('history.employment.default.left.branch')}
            appendLabel={i18n.t('history.employment.default.left.append')}
            content={i18n.m('history.employment.default.left.list')}
            {...this.props.Reasons || {}}
            className="reason-options"
            onUpdate={this.updateReasons}
            onError={this.props.onError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}>
            <ReasonOptions
              name="Item"
              bind={true}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </BranchCollection>
        </Show>
      </div>
    )
  }
}

ReasonLeft.defaultProps = {
  Comments: {},
  ReasonDescription: {},
  Reasons: {},
  Dates: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
