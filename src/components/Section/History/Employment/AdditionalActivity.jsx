import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Show, Accordion, DateRange, Text, Field, Branch } from '../../../Form'

export default class AdditionalActivity extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      List: props.List || [],
      HasAdditionalActivity: props.HasAdditionalActivity
    }

    this.onBranchUpdate = this.onBranchUpdate.bind(this)
    this.myDispatch = this.myDispatch.bind(this)
  }

  doUpdate () {
    if (this.props.onUpdate) {
      let update = {
        name: this.props.name,
        List: this.state.List,
        HasAdditionalActivity: this.state.HasAdditionalActivity || ''
      }
      this.props.onUpdate(update)
    }
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
      this.doUpdate()
    })
  }

  onBranchUpdate (val) {
    let list = [...this.state.List]
    if (val === 'No') {
      list = []
    }
    this.setState({ HasAdditionalActivity: val, List: list }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          List: this.state.List,
          HasAdditionalActivity: this.state.HasAdditionalActivity
        })
      }
    })
  }

  render () {
    const klass = `activity ${this.props.className || ''}`.trim()

    return (
      <div>
        <h4>{i18n.t('history.employment.default.additionalActivity.label')}</h4>
        <div className={klass}>
          <Branch name="additionalActivity"
                  className="no-label"
                  value={this.state.HasAdditionalActivity}
                  help="history.employment.default.additionalActivity.help"
                  onUpdate={this.onBranchUpdate}>
          </Branch>
        </div>
        <Show when={this.state.HasAdditionalActivity === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     onUpdate={this.myDispatch}
                     onValidate={this.handleValidation}
                     appendLabel={i18n.t('history.employment.default.additionalActivity.collection.append')}>

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
                   adjustFor="labels"
                   shrink={true}>
              <DateRange name="DatesEmployed"
                         bind={true}
                         />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}
