import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, Textarea, DateControl } from '../../../Form'

export default class ReprimandItem extends ValidationElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateText = this.updateText.bind(this)
    this.updateDate = this.updateDate.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Text: this.props.Text,
      Date: this.props.Date,
      ...queue
    })
  }

  updateText (values) {
    this.update({
      Text: values
    })
  }

  updateDate (values) {
    this.update({
      Date: values
    })
  }

  render () {
    return (
      <div>
        <Field title={i18n.t('history.employment.default.reprimand.description.label')}
               titleSize="h4"
               className="explanation-left"
               required={this.props.required}
               scrollIntoView={this.props.scrollIntoView}>
          <Textarea name="Text"
                    {...this.props.Text}
                    onUpdate={this.updateText}
                    onError={this.props.onError}
                    maxlength="100"
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
                       {...this.props.Date}
                       onUpdate={this.updateDate}
                       onError={this.props.onError}
                       hideDay={true}
                       required={this.props.required}
                       />
        </Field>
      </div>
    )
  }
}

ReprimandItem.defaultProps = {
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
