import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'

export default class EyeColor extends ValidationElement {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      value: props.value
    }
  }

  handleChange (event) {
    this.setState({value: event.target.value}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate(this.state.value)
      }
    })
  }

  divClass () {
    return (this.props.className || '') + ' eye-colors'
  }

  render () {
    return (
      <div className={this.divClass()}>
        <label>{this.props.label}</label>
        <RadioGroup className="option-list eapp-extend-labels" selectedValue={this.state.value}>
          <Radio name={this.props.name}
                 label={i18n.t('identification.traits.eye.black')}
                 value="Black"
                 help={this.props.help}
                 disabled={this.props.disabled}
                 onChange={this.handleChange}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 >
            <div className="eye-icon">
              <svg viewBox="0 0 36 36.84" enable-background="new 0 0 36 36.84">
                <path id="eye-color-black" d="M35.61,21.49c-3.7,6.09-10.47,10.19-17.6,10.19S4.1,27.56,0.4,21.49C0.16,21.07,0,20.61,0,20.11
                                              c0-0.5,0.16-0.96,0.4-1.39c3.7-6.07,10.47-10.19,17.6-10.19s13.91,4.12,17.6,10.19c0.24,0.42,0.4,0.88,0.4,1.39
                                              C36.01,20.61,35.85,21.07,35.61,21.49z M25.78,13.01c0.8,1.37,1.23,2.93,1.23,4.52c0,4.96-4.04,9-9,9s-9-4.04-9-9
                                              c0-1.59,0.42-3.16,1.23-4.52c-3.13,1.61-5.75,4.14-7.66,7.09c3.44,5.3,8.98,9,15.43,9s12-3.7,15.43-9
                                              C31.53,17.15,28.92,14.62,25.78,13.01z M18.01,11.42c-3.36,0-6.11,2.75-6.11,6.11c0,0.52,0.44,0.96,0.96,0.96s0.96-0.44,0.96-0.96
                                              c0-2.29,1.89-4.18,4.18-4.18c0.52,0,0.96-0.44,0.96-0.96C18.97,11.87,18.53,11.42,18.01,11.42z"/>
              </svg>
            </div>
          </Radio>
          <Radio name={this.props.name}
                 label={i18n.t('identification.traits.eye.blue')}
                 value="Blue"
                 help={this.props.help}
                 disabled={this.props.disabled}
                 onChange={this.handleChange}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 >
            <div className="eye-icon">
              <svg viewBox="0 0 36 36.84" enable-background="new 0 0 36 36.84">
                <path id="eye-color-blue" d="M35.61,21.49c-3.7,6.09-10.47,10.19-17.6,10.19S4.1,27.56,0.4,21.49C0.16,21.07,0,20.61,0,20.11
                                             c0-0.5,0.16-0.96,0.4-1.39c3.7-6.07,10.47-10.19,17.6-10.19s13.91,4.12,17.6,10.19c0.24,0.42,0.4,0.88,0.4,1.39
                                             C36.01,20.61,35.85,21.07,35.61,21.49z M25.78,13.01c0.8,1.37,1.23,2.93,1.23,4.52c0,4.96-4.04,9-9,9s-9-4.04-9-9
                                             c0-1.59,0.42-3.16,1.23-4.52c-3.13,1.61-5.75,4.14-7.66,7.09c3.44,5.3,8.98,9,15.43,9s12-3.7,15.43-9
                                             C31.53,17.15,28.92,14.62,25.78,13.01z M18.01,11.42c-3.36,0-6.11,2.75-6.11,6.11c0,0.52,0.44,0.96,0.96,0.96s0.96-0.44,0.96-0.96
                                             c0-2.29,1.89-4.18,4.18-4.18c0.52,0,0.96-0.44,0.96-0.96C18.97,11.87,18.53,11.42,18.01,11.42z"/>
              </svg>
            </div>
          </Radio>
          <Radio name={this.props.name}
                 label={i18n.t('identification.traits.eye.brown')}
                 value="Brown"
                 help={this.props.help}
                 disabled={this.props.disabled}
                 onChange={this.handleChange}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 >
            <div className="eye-icon">
              <svg viewBox="0 0 36 36.84" enable-background="new 0 0 36 36.84">
                <path id="eye-color-brown" d="M35.61,21.49c-3.7,6.09-10.47,10.19-17.6,10.19S4.1,27.56,0.4,21.49C0.16,21.07,0,20.61,0,20.11
                                              c0-0.5,0.16-0.96,0.4-1.39c3.7-6.07,10.47-10.19,17.6-10.19s13.91,4.12,17.6,10.19c0.24,0.42,0.4,0.88,0.4,1.39
                                              C36.01,20.61,35.85,21.07,35.61,21.49z M25.78,13.01c0.8,1.37,1.23,2.93,1.23,4.52c0,4.96-4.04,9-9,9s-9-4.04-9-9
                                              c0-1.59,0.42-3.16,1.23-4.52c-3.13,1.61-5.75,4.14-7.66,7.09c3.44,5.3,8.98,9,15.43,9s12-3.7,15.43-9
                                              C31.53,17.15,28.92,14.62,25.78,13.01z M18.01,11.42c-3.36,0-6.11,2.75-6.11,6.11c0,0.52,0.44,0.96,0.96,0.96s0.96-0.44,0.96-0.96
                                              c0-2.29,1.89-4.18,4.18-4.18c0.52,0,0.96-0.44,0.96-0.96C18.97,11.87,18.53,11.42,18.01,11.42z"/>
              </svg>
            </div>
          </Radio>
          <Radio name={this.props.name}
                 label={i18n.t('identification.traits.eye.gray')}
                 value="Gray"
                 help={this.props.help}
                 disabled={this.props.disabled}
                 onChange={this.handleChange}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 >
            <div className="eye-icon">
              <svg viewBox="0 0 36 36.84" enable-background="new 0 0 36 36.84">
                <path id="eye-color-gray" d="M35.61,21.49c-3.7,6.09-10.47,10.19-17.6,10.19S4.1,27.56,0.4,21.49C0.16,21.07,0,20.61,0,20.11
                                             c0-0.5,0.16-0.96,0.4-1.39c3.7-6.07,10.47-10.19,17.6-10.19s13.91,4.12,17.6,10.19c0.24,0.42,0.4,0.88,0.4,1.39
                                             C36.01,20.61,35.85,21.07,35.61,21.49z M25.78,13.01c0.8,1.37,1.23,2.93,1.23,4.52c0,4.96-4.04,9-9,9s-9-4.04-9-9
                                             c0-1.59,0.42-3.16,1.23-4.52c-3.13,1.61-5.75,4.14-7.66,7.09c3.44,5.3,8.98,9,15.43,9s12-3.7,15.43-9
                                             C31.53,17.15,28.92,14.62,25.78,13.01z M18.01,11.42c-3.36,0-6.11,2.75-6.11,6.11c0,0.52,0.44,0.96,0.96,0.96s0.96-0.44,0.96-0.96
                                             c0-2.29,1.89-4.18,4.18-4.18c0.52,0,0.96-0.44,0.96-0.96C18.97,11.87,18.53,11.42,18.01,11.42z"/>
              </svg>
            </div>
          </Radio>
          <Radio name={this.props.name}
                 label={i18n.t('identification.traits.eye.green')}
                 value="Green"
                 help={this.props.help}
                 disabled={this.props.disabled}
                 onChange={this.handleChange}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 >
            <div className="eye-icon">
              <svg viewBox="0 0 36 36.84" enable-background="new 0 0 36 36.84">
                <path id="eye-color-green" d="M35.61,21.49c-3.7,6.09-10.47,10.19-17.6,10.19S4.1,27.56,0.4,21.49C0.16,21.07,0,20.61,0,20.11
                                              c0-0.5,0.16-0.96,0.4-1.39c3.7-6.07,10.47-10.19,17.6-10.19s13.91,4.12,17.6,10.19c0.24,0.42,0.4,0.88,0.4,1.39
                                              C36.01,20.61,35.85,21.07,35.61,21.49z M25.78,13.01c0.8,1.37,1.23,2.93,1.23,4.52c0,4.96-4.04,9-9,9s-9-4.04-9-9
                                              c0-1.59,0.42-3.16,1.23-4.52c-3.13,1.61-5.75,4.14-7.66,7.09c3.44,5.3,8.98,9,15.43,9s12-3.7,15.43-9
                                              C31.53,17.15,28.92,14.62,25.78,13.01z M18.01,11.42c-3.36,0-6.11,2.75-6.11,6.11c0,0.52,0.44,0.96,0.96,0.96s0.96-0.44,0.96-0.96
                                              c0-2.29,1.89-4.18,4.18-4.18c0.52,0,0.96-0.44,0.96-0.96C18.97,11.87,18.53,11.42,18.01,11.42z"/>
              </svg>
            </div>
          </Radio>
          <Radio name={this.props.name}
                 label={i18n.t('identification.traits.eye.hazel')}
                 value="Hazel"
                 help={this.props.help}
                 disabled={this.props.disabled}
                 onChange={this.handleChange}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 >
            <div className="eye-icon">
              <svg viewBox="0 0 36 36.84" enable-background="new 0 0 36 36.84">
                <path id="eye-color-hazel" d="M35.61,21.49c-3.7,6.09-10.47,10.19-17.6,10.19S4.1,27.56,0.4,21.49C0.16,21.07,0,20.61,0,20.11
                                              c0-0.5,0.16-0.96,0.4-1.39c3.7-6.07,10.47-10.19,17.6-10.19s13.91,4.12,17.6,10.19c0.24,0.42,0.4,0.88,0.4,1.39
                                              C36.01,20.61,35.85,21.07,35.61,21.49z M25.78,13.01c0.8,1.37,1.23,2.93,1.23,4.52c0,4.96-4.04,9-9,9s-9-4.04-9-9
                                              c0-1.59,0.42-3.16,1.23-4.52c-3.13,1.61-5.75,4.14-7.66,7.09c3.44,5.3,8.98,9,15.43,9s12-3.7,15.43-9
                                              C31.53,17.15,28.92,14.62,25.78,13.01z M18.01,11.42c-3.36,0-6.11,2.75-6.11,6.11c0,0.52,0.44,0.96,0.96,0.96s0.96-0.44,0.96-0.96
                                              c0-2.29,1.89-4.18,4.18-4.18c0.52,0,0.96-0.44,0.96-0.96C18.97,11.87,18.53,11.42,18.01,11.42z"/>
              </svg>
            </div>
          </Radio>
          <Radio name={this.props.name}
                 label={i18n.t('identification.traits.eye.maroon')}
                 value="Maroon"
                 help={this.props.help}
                 disabled={this.props.disabled}
                 onChange={this.handleChange}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 >
            <div className="eye-icon">
              <svg viewBox="0 0 36 36.84" enable-background="new 0 0 36 36.84">
                <path id="eye-color-maroon" d="M35.61,21.49c-3.7,6.09-10.47,10.19-17.6,10.19S4.1,27.56,0.4,21.49C0.16,21.07,0,20.61,0,20.11
                                               c0-0.5,0.16-0.96,0.4-1.39c3.7-6.07,10.47-10.19,17.6-10.19s13.91,4.12,17.6,10.19c0.24,0.42,0.4,0.88,0.4,1.39
                                               C36.01,20.61,35.85,21.07,35.61,21.49z M25.78,13.01c0.8,1.37,1.23,2.93,1.23,4.52c0,4.96-4.04,9-9,9s-9-4.04-9-9
                                               c0-1.59,0.42-3.16,1.23-4.52c-3.13,1.61-5.75,4.14-7.66,7.09c3.44,5.3,8.98,9,15.43,9s12-3.7,15.43-9
                                               C31.53,17.15,28.92,14.62,25.78,13.01z M18.01,11.42c-3.36,0-6.11,2.75-6.11,6.11c0,0.52,0.44,0.96,0.96,0.96s0.96-0.44,0.96-0.96
                                               c0-2.29,1.89-4.18,4.18-4.18c0.52,0,0.96-0.44,0.96-0.96C18.97,11.87,18.53,11.42,18.01,11.42z"/>
              </svg>
            </div>
          </Radio>
          <Radio name={this.props.name}
                 label={i18n.t('identification.traits.eye.multi')}
                 value="Multicolored"
                 help={this.props.help}
                 disabled={this.props.disabled}
                 onChange={this.handleChange}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 >
            <div className="eye-icon">
              <img src="../img/eye-multicolor.svg" id="eye-color-multi"/>
            </div>
          </Radio>
          <Radio name={this.props.name}
                 label={i18n.t('identification.traits.eye.pink')}
                 value="Pink"
                 help={this.props.help}
                 disabled={this.props.disabled}
                 onChange={this.handleChange}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 >
            <div className="eye-icon">
              <svg viewBox="0 0 36 36.84" enable-background="new 0 0 36 36.84">
                <path id="eye-color-pink" d="M35.61,21.49c-3.7,6.09-10.47,10.19-17.6,10.19S4.1,27.56,0.4,21.49C0.16,21.07,0,20.61,0,20.11
                                             c0-0.5,0.16-0.96,0.4-1.39c3.7-6.07,10.47-10.19,17.6-10.19s13.91,4.12,17.6,10.19c0.24,0.42,0.4,0.88,0.4,1.39
                                             C36.01,20.61,35.85,21.07,35.61,21.49z M25.78,13.01c0.8,1.37,1.23,2.93,1.23,4.52c0,4.96-4.04,9-9,9s-9-4.04-9-9
                                             c0-1.59,0.42-3.16,1.23-4.52c-3.13,1.61-5.75,4.14-7.66,7.09c3.44,5.3,8.98,9,15.43,9s12-3.7,15.43-9
                                             C31.53,17.15,28.92,14.62,25.78,13.01z M18.01,11.42c-3.36,0-6.11,2.75-6.11,6.11c0,0.52,0.44,0.96,0.96,0.96s0.96-0.44,0.96-0.96
                                             c0-2.29,1.89-4.18,4.18-4.18c0.52,0,0.96-0.44,0.96-0.96C18.97,11.87,18.53,11.42,18.01,11.42z"/>
				      </svg>
			      </div>
          </Radio>
          <Radio name={this.props.name}
                 label={i18n.t('identification.traits.eye.unknown')}
                 value="Unknown"
                 help={this.props.help}
                 disabled={this.props.disabled}
                 onChange={this.handleChange}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 >
            <div className="eye-icon">
				      <svg viewBox="0 0 30.86 36.84">
					      <path id="eye-color-unknown" d="M15.43,34.25C6.91,34.25,0,27.34,0,18.82C0,10.3,6.91,3.39,15.43,3.39s15.43,6.91,15.43,15.43
						                                    C30.87,27.34,23.95,34.25,15.43,34.25z M15.84,8.53c-3.28,0-5.73,1.41-7.46,4.28c-0.18,0.28-0.1,0.64,0.16,0.84l2.65,2.01
						                                    c0.1,0.08,0.24,0.12,0.38,0.12c0.18,0,0.38-0.08,0.5-0.24c0.94-1.21,1.35-1.57,1.73-1.85c0.34-0.24,1-0.48,1.73-0.48
						                                    c1.29,0,2.47,0.82,2.47,1.71c0,1.04-0.54,1.57-1.77,2.13c-1.43,0.64-3.38,2.31-3.38,4.26v0.72c0,0.36,0.28,0.64,0.64,0.64h3.86
						                                    c0.36,0,0.64-0.28,0.64-0.64c0-0.46,0.58-1.45,1.53-1.99c1.53-0.87,3.62-2.03,3.62-5.08C23.15,11.28,19.29,8.53,15.84,8.53z
						                                    M18.01,24.61c0-0.36-0.28-0.64-0.64-0.64H13.5c-0.36,0-0.64,0.28-0.64,0.64v3.86c0,0.36,0.28,0.64,0.64,0.64h3.86
						                                    c0.36,0,0.64-0.28,0.64-0.64V24.61z"/>
				      </svg>
			      </div>
          </Radio>
        </RadioGroup>
      </div>
    )
  }
}
