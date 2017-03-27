import React from 'react'
import ValidationElement from '../ValidationElement'
import { Help, HelpIcon } from '../Help'
import Text from '../Text'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'
import { NameValidator } from '../../../validators'
import { i18n } from '../../../config'

export default class Name extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      first: props.first,
      firstInitialOnly: props.firstInitialOnly,
      last: props.last,
      lastInitialOnly: props.lastInitialOnly,
      middle: props.middle,
      middleInitialOnly: props.middleInitialOnly,
      noMiddleName: props.noMiddleName,
      suffix: props.suffix,
      suffixOther: props.suffixOther,
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false,
      errorCodes: []
    }
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    let part = event.target.name || ''
    let value = event.target.value
    let updated = null

    switch (part) {
      case 'first':
        updated = { first: value }
        break
      case 'last':
        updated = { last: value }
        break
      case 'middle':
        updated = { middle: value }
        break
      case 'suffix':
        updated = { suffix: value }
        break
      case 'suffixOther':
        updated = { suffixOther: value }
        break
      case 'firstInitialOnly':
        event.persist()
        updated = { firstInitialOnly: event.target.checked }
        break
      case 'lastInitialOnly':
        event.persist()
        updated = { lastInitialOnly: event.target.checked }
        break
      case 'middleInitialOnly':
        event.persist()
        updated = { middleInitialOnly: event.target.checked, noMiddleName: false }
        break
      case 'noMiddleName':
        event.persist()
        updated = { noMiddleName: event.target.checked, middleInitialOnly: false, middle: '' }
        break

    }

    this.setState(updated, () => {
      super.handleChange(event)

      if (part.indexOf('InitialOnly') !== -1) {
        // Blur/validation forced
        this.refs.first.refs.text.refs.input.focus()
        this.refs.first.refs.text.refs.input.blur()
        this.refs.middle.refs.text.refs.input.focus()
        this.refs.middle.refs.text.refs.input.blur()
        this.refs.last.refs.text.refs.input.focus()
        this.refs.last.refs.text.refs.input.blur()

        // Re-focus on the target
        if (event.target) {
          event.target.focus()
        }
      }

      if (this.props.onUpdate) {
        const {
          first,
          firstInitialOnly,
          last,
          lastInitialOnly,
          middle,
          middleInitialOnly,
          noMiddleName,
          suffix,
          suffixOther
        } = this.state

        this.props.onUpdate({
          name: this.props.name,
          first: first,
          firstInitialOnly: firstInitialOnly,
          last: last,
          lastInitialOnly: lastInitialOnly,
          middle: middle,
          middleInitialOnly: middleInitialOnly,
          noMiddleName: noMiddleName,
          suffix: suffix,
          suffixOther: suffixOther
        })
      }
    })
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    if (!event) {
      return
    }

    const codes = super.mergeError(this.state.errorCodes, error)
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      let e = { [this.props.name]: codes }
      let s = { [this.props.name]: { status: complexStatus } }
      if (this.state.error === false || this.state.valid === true) {
        super.handleValidation(event, s, e)
        return
      }

      super.handleValidation(event, s, e)
    })
  }

  isValid () {
    return new NameValidator(this.state, null).isValid()
  }

  /**
   * Toggles visibility class for the extended suffix element.
   */
  suffixOtherClass () {
    return this.state.suffix === 'Other'
      ? 'suffix-other'
      : 'hidden'
  }

  render () {
    const prefix = this.props.prefix
    const klass = `name ${this.props.className || ''}`.trim()
    return (
      <div className={klass}>
        {this.props.title && <h2>{this.props.title}</h2>}
        <Help id="identification.name.first.help" errorPrefix="name">
          <Text name="first"
                ref="first"
                label={i18n.t(`${prefix}.label.first`)}
                pattern="^[a-zA-Z\-\.' ]*$"
                maxlength={this.state.firstInitialOnly ? '1' : '100'}
                className="first"
                placeholder={i18n.t(`${prefix}.placeholder.first`)}
                value={this.state.first}
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
          <HelpIcon />
          <div className="text-right">
            <div className="inline">
              <input id="firstInitialOnly"
                     name="firstInitialOnly"
                     type="checkbox"
                     value="firstInitial"
                     checked={this.props.firstInitialOnly}
                     onChange={this.handleChange} />
              <label>Initial Only</label>
            </div>
          </div>
        </Help>
        <Help id="identification.name.middle.help" errorPrefix="name">
          <Text name="middle"
                ref="middle"
                label={i18n.t(`${prefix}.label.middle`)}
                minlength="0"
                maxlength={this.state.middleInitialOnly ? '1' : '100'}
                className="middle"
                placeholder={i18n.t(`${prefix}.placeholder.middle`)}
                value={this.state.middle}
                disabled={this.state.noMiddleName}
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
          <HelpIcon />
          <div className="middle-options text-right">
            <div className="inline">
              <input id="noMiddleName"
                     name="noMiddleName"
                     type="checkbox"
                     value="noMiddleName"
                     checked={this.props.noMiddleName}
                     onChange={this.handleChange} />
              <label>No middle name</label>
            </div>
            <div className="inline">
              <input id="middleInitialOnly"
                     name="middleInitialOnly"
                     type="checkbox"
                     value="middleInitial"
                     checked={this.props.middleInitialOnly}
                     onChange={this.handleChange} />
              <label>Initial Only</label>
            </div>
          </div>
        </Help>
        <Help id="identification.name.last.help" errorPrefix="name">
          <Text name="last"
                ref="last"
                label={i18n.t(`${prefix}.label.last`)}
                maxlength={this.state.lastInitialOnly ? '1' : '100'}
                className="last"
                pattern="^[a-zA-Z\-\.' ]*$"
                placeholder={i18n.t(`${prefix}.placeholder.last`)}
                value={this.state.last}
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
          <HelpIcon />
          <div className="text-right">
            <div className="inline">
              <input id="lastInitialOnly"
                     name="lastInitialOnly"
                     type="checkbox"
                     value="lastInitial"
                     checked={this.props.lastInitialOnly}
                     onChange={this.handleChange} />
              <label>Initial Only</label>
            </div>
          </div>
        </Help>
        <Help id="identification.name.suffix.help" errorPrefix="name">
          <label>Suffix <span className="optional">(Optional)</span></label>

          <RadioGroup className="option-list suffix" selectedValue={this.state.suffix}>
            <Radio name="suffix"
                   label="Jr"
                   value="Jr"
                   onChange={this.handleChange}
                   onValidate={this.handleValidation}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label="Sr"
                   value="Sr"
                   onChange={this.handleChange}
                   onValidate={this.handleValidation}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label="I"
                   value="I"
                   onChange={this.handleChange}
                   onValidate={this.handleValidation}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label="II"
                   value="II"
                   onChange={this.handleChange}
                   onValidate={this.handleValidation}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label="III"
                   value="III"
                   onChange={this.handleChange}
                   onValidate={this.handleValidation}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label="IV"
                   value="IV"
                   onChange={this.handleChange}
                   onValidate={this.handleValidation}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label="V"
                   value="V"
                   onChange={this.handleChange}
                   onValidate={this.handleValidation}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label="VI"
                   value="VI"
                   onChange={this.handleChange}
                   onValidate={this.handleValidation}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label="VII"
                   value="VII"
                   onChange={this.handleChange}
                   onValidate={this.handleValidation}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label="VIII"
                   value="VIII"
                   onChange={this.handleChange}
                   onValidate={this.handleValidation}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label="IX"
                   value="IX"
                   onChange={this.handleChange}
                   onValidate={this.handleValidation}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label="X"
                   value="X"
                   onChange={this.handleChange}
                   onValidate={this.handleValidation}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
            <Radio name="suffix"
                   label="Other"
                   value="Other"
                   onChange={this.handleChange}
                   onValidate={this.handleValidation}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
          </RadioGroup>
          <HelpIcon className="suffix-help-icon" />
          <div className={this.suffixOtherClass()}>
            <Text name="suffixOther"
                  label="Other"
                  maxlength="100"
                  value={this.state.suffixOther}
                  onChange={this.handleChange}
                  onValidate={this.handleValidation}
                  onFocus={this.props.onFocus}
                  onBlur={this.props.onBlur}
                  />
          </div>
        </Help>
      </div>
    )
  }
}

Name.defaultProps = {
  first: '',
  firstInitialOnly: false,
  last: '',
  lastInitialOnly: false,
  middle: '',
  middleInitialOnly: false,
  noMiddleName: false,
  suffix: '',
  suffixOther: '',
  prefix: 'name',
  focus: false,
  error: false,
  valid: false,
  errorCodes: []
}
