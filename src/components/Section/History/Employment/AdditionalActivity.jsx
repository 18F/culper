import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Show, BranchCollection, DateRange, Text, Field } from '../../../Form'

export default class AdditionalActivity extends ValidationElement {
  constructor (props) {
    super(props)
    this.updateBranch = this.updateBranch.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ...queue
    })
  }

  updateBranch (values) {
    this.props.onUpdate({ List: values })
  }

  render () {
    const klass = `activity ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <BranchCollection label={i18n.t('history.employment.default.additionalActivity.label')}
                          labelSize="h4"
                          appendLabel={i18n.t('history.employment.default.additionalActivity.collection.append')}
                          appendSize="h4"
                          {...(this.props.List || {})}
                          onUpdate={this.updateBranch}
                          onError={this.props.onError}
                          scrollIntoView={this.props.scrollIntoView}>
          <Field title={i18n.t('history.employment.default.additionalActivity.heading.position')}
                 titleSize="h4"
                 adjustFor="labels"
                 scrollIntoView={this.props.scrollIntoView}>
            <Text name="Position"
                  className="text"
                  label={i18n.t('history.employment.default.additionalActivity.position.label')}
                  bind={true}
                  required={this.props.required}
                  />
          </Field>

          <Field title={i18n.t('history.employment.default.additionalActivity.heading.supervisor')}
                 titleSize="h4"
                 adjustFor="labels"
                 scrollIntoView={this.props.scrollIntoView}>
            <Text name="Supervisor"
                  className="text"
                  label={i18n.t('history.employment.default.additionalActivity.supervisor.label')}
                  bind={true}
                  required={this.props.required}
                  />
          </Field>

          <Field title={i18n.t('history.employment.default.additionalActivity.heading.datesEmployed')}
                 titleSize="h4"
                 help="history.employment.default.additionalActivity.datesEmployed.help"
                 adjustFor="daterange"
                 shrink={true}
                 scrollIntoView={this.props.scrollIntoView}>
            <DateRange name="DatesEmployed"
                       bind={true}
                       required={this.props.required}
                       />
          </Field>
        </BranchCollection>
      </div>
    )
  }
}

AdditionalActivity.defaultProps = {
  List: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
