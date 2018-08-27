import React from 'react'
import { i18n } from '../../../../config'
import {
  ValidationElement,
  Show,
  Field,
  RadioGroup,
  Radio,
  Textarea
} from '../../../Form'

export default class ClearanceLevel extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateLevel = this.updateLevel.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Level: this.props.Level,
      Explanation: this.props.Explanation,
      ...queue
    })
  }

  updateLevel(values) {
    this.update({
      Level: values
    })
  }

  updateExplanation(values) {
    this.update({
      Explanation: values
    })
  }

  render() {
    return (
      <div className={this.props.className}>
        <RadioGroup
          className="clearance-levels"
          selectedValue={(this.props.Level || {}).value}
          onError={this.props.onError}
          required={this.props.required}
          disabled={this.props.disabled}>
          <Radio
            label={i18n.m('legal.investigations.history.label.level.none')}
            value="None"
            className="clearance-level-none"
            onUpdate={this.updateLevel}
            onError={this.props.onError}
          />
          <Radio
            label={i18n.m(
              'legal.investigations.history.label.level.confidential'
            )}
            value="Confidential"
            className="clearance-level-confidential"
            onUpdate={this.updateLevel}
            onError={this.props.onError}
          />
          <Radio
            label={i18n.m('legal.investigations.history.label.level.secret')}
            value="Secret"
            className="clearance-level-secret"
            onUpdate={this.updateLevel}
            onError={this.props.onError}
          />
          <Radio
            label={i18n.m('legal.investigations.history.label.level.topsecret')}
            value="Top Secret"
            className="clearance-level-topsecret"
            onUpdate={this.updateLevel}
            onError={this.props.onError}
          />
          <Radio
            label={i18n.m('legal.investigations.history.label.level.sci')}
            value="Sensitive Compartmented Information"
            className="clearance-level-sci"
            onUpdate={this.updateLevel}
            onError={this.props.onError}
          />
          <Radio
            label={i18n.m('legal.investigations.history.label.level.q')}
            value="Q"
            className="clearance-level-q"
            onUpdate={this.updateLevel}
            onError={this.props.onError}
          />
          <Radio
            label={i18n.m('legal.investigations.history.label.level.l')}
            value="L"
            className="clearance-level-l"
            onUpdate={this.updateLevel}
            onError={this.props.onError}
          />
          <Radio
            label={i18n.m('legal.investigations.history.label.level.foreign')}
            value="Issued by foreign country"
            className="clearance-level-foreign"
            onUpdate={this.updateLevel}
            onError={this.props.onError}
          />
          <Radio
            label={i18n.m('legal.investigations.history.label.level.other')}
            value="Other"
            className="clearance-level-other"
            onUpdate={this.updateLevel}
            onError={this.props.onError}
          />
        </RadioGroup>

        <Show when={(this.props.Level || {}).value === 'Other'}>
          <p>
            {i18n.t(
              'legal.investigations.history.heading.clearanceExplanation'
            )}
          </p>
          <Textarea
            name="Explanation"
            {...this.props.Explanation}
            disabled={this.props.disabled}
            className="legal-investigations-history-clearance-explanation"
            onUpdate={this.updateExplanation}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Show>
      </div>
    )
  }
}

ClearanceLevel.defaultProps = {
  className: 'investigative-clearance-levels',
  Level: {},
  Explanation: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}

ClearanceLevel.errors = []
