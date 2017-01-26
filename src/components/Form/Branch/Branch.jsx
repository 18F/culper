import React from 'react'
import { Help, HelpIcon, Radio, RadioGroup } from '../../Form'

/**
 * Branch is a component that stores whether Yes/No options were selected. It contains a callback
 * function that can be used to be upated when a button is clicked. The button labels and values are
 * configurable by passing in the appropriate property which are defined in the Branch.defaultProps object.
 */
export default class Branch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value
    }
  }

  yesNoClicked (val) {
    this.setState({ value: val }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate(val)
      }
    })
  }

  render () {
    if (this.props.help) {
      return (
        <div className="branch">
          <div className="content">
            {this.props.children}
          </div>
          <div className="eapp-field-wrap">
              <Help id={this.props.help}>
                <RadioGroup className="option-list branch" selectedValue={this.state.value}>
                  <Radio name={this.props.name}
                    label={this.props.yesLabel}
                    value={this.props.yesValue}
                    onChange={this.yesNoClicked.bind(this, this.props.yesValue)}
                  />
                  <Radio name={this.props.name}
                    label={this.props.noLabel}
                    value={this.props.noValue}
                    onChange={this.yesNoClicked.bind(this, this.props.noValue)}
                  />
                </RadioGroup>
                <HelpIcon className="branch-help-icon" />
              </Help>
          </div>
        </div>
      )
    }

    return (
      <div className="branch">
        <div className="content">
          {this.props.children}
        </div>
        <RadioGroup className="option-list branch" selectedValue={this.state.value}>
          <Radio name={this.props.name}
            label={this.props.yesLabel}
            value={this.props.yesValue}
            onChange={this.yesNoClicked.bind(this, this.props.yesValue)}
          />
          <Radio name={this.props.name}
            label={this.props.noLabel}
            value={this.props.noValue}
            onChange={this.yesNoClicked.bind(this, this.props.noValue)}
          />
        </RadioGroup>
      </div>
    )
  }
}

// Default values for properties that are not specified
Branch.defaultProps = {
  yesLabel: 'Yes',
  yesValue: 'Yes',
  noLabel: 'No',
  noValue: 'No',
  value: null
}
