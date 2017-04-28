import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Show, BranchCollection, DateRange, Text, Field } from '../../../Form'

export default class AdditionalActivity extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      List: props.List
    }

    this.myDispatch = this.myDispatch.bind(this)
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status) {
    this.setState({error: status === false, valid: status === true}, () => {
      super.handleValidation(event, status)
    })
  }

  myDispatch (collection) {
    this.setState({ List: collection }, () => {
      if (this.props.onUpdate) {
        let update = {
          name: this.props.name,
          List: this.state.List
        }
        this.props.onUpdate(update)
      }
    })
  }

  render () {
    const klass = `activity ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <BranchCollection label={i18n.t('history.employment.default.additionalActivity.label')}
                          labelSize="h4"
                          appendLabel={i18n.t('history.employment.default.additionalActivity.collection.append')}
                          appendSize="h4"
                          help="history.employment.default.additionalActivity.help"
                          items={this.state.List}
                          onUpdate={this.myDispatch}
                          onValidate={this.handleValidation}>
          <Field title={i18n.t('history.employment.default.additionalActivity.heading.position')}
                 titleSize="h4"
                 help="history.employment.default.additionalActivity.position.help"
                 adjustFor="labels">
            <Text name="Position"
                  className="text"
                  label={i18n.t('history.employment.default.additionalActivity.position.label')}
                  bind={true}
                  />
          </Field>

          <Field title={i18n.t('history.employment.default.additionalActivity.heading.supervisor')}
                 titleSize="h4"
                 help="history.employment.default.additionalActivity.supervisor.help"
                 adjustFor="labels">
            <Text name="Supervisor"
                  className="text"
                  label={i18n.t('history.employment.default.additionalActivity.supervisor.label')}
                  bind={true}
                  />
          </Field>

          <Field title={i18n.t('history.employment.default.additionalActivity.heading.datesEmployed')}
                 titleSize="h4"
                 help="history.employment.default.additionalActivity.datesEmployed.help"
                 adjustFor="daterange"
                 shrink={true}>
            <DateRange name="DatesEmployed"
                       bind={true}
                       />
          </Field>
        </BranchCollection>
      </div>
    )
  }
}

AdditionalActivity.defaultProps = {
  List: []
}
