import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, Textarea, DateControl, BranchCollection } from '../../../Form'

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
    return (
      <BranchCollection label={i18n.t('history.employment.default.reprimand.label')}
        appendLabel={i18n.t('history.employment.default.reprimand.append')}
        help="history.employment.default.reprimand.help"
        items={this.state.Reasons}
        className="reprimand-branch"
        onUpdate={this.updateReasons}
        onError={this.props.onError}
        required={this.props.required}
        scrollIntoView={this.props.scrollIntoView}>
        <div>
          <Field title={i18n.t('history.employment.default.reprimand.description.label')}
            titleSize="h4"
            className="explanation-left"
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}>
            <Textarea name="Text"
              bind={true}
              maxlength="100"
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
          <Field title={i18n.t('history.employment.default.reprimand.date.label')}
            titleSize="h4"
            className="date-left"
            adjustFor="labels"
            shrink={true}
            scrollIntoView={this.props.scrollIntoView}>
            <DateControl name="Date"
              bind={true}
              hideDay={true}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </div>
      </BranchCollection>
    )
  }
}

Reprimand.defaultProps = {
  onError: (value, arr) => { return arr }
}
