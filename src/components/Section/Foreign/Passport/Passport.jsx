import React from 'react'
import { ValidationElement, Help, Name, RadioGroup } from '../../../Form'
import { api } from '../../../../services/api'

export default class Passport extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      yesNo: props.HasPassport
    }
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    if (!event) {
      return
    }
  }

  yesNoClicked (val) {
    this.setState({ yesNo: val }, () => {
      if (val === 'Yes') {
      }
    })
  }

  options () {
    return (
      <RadioGroup className="option-list" selectedValue={this.state.yesNo}>
        <Radio name="has_passport"
               label="Yes"
               value="Yes"
               onChange={this.yesNoClicked.bind(this, 'Yes')}
               onValidate={this.handleValidation}
               />
        <Radio name="has_passport"
               label="No"
               value="No"
               onChange={this.yesNoClicked.bind(this, 'No')}
               onValidate={this.handleValidation}
               />
      </RadioGroup>
    )
  }

  render () {
    if (this.state.yesNo !== 'Yes') {
      return (
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name=""
                       next="tbd"
                       nextLabel="TBD"
                       back="history"
                       backLabel="Your history">
            <div className="passport eapp-field-wrap">
              <h2>U.S. passsport information</h2>
              <p>Provide information related to your current passport.</p>
              <div>
                Do you have a passport?
              </div>
              {this.options()}
            </div>
          </SectionView>
        </SectionViews>
      )
    }

    return (
      <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
        <SectionView name=""
                     next="tbd"
                     nextLabel="TBD"
                     back="history"
                     backLabel="Your history">
          <div className="passport eapp-field-wrap">
            <h2>U.S. passsport information</h2>
            <p>Provide information related to your current passport.</p>
            <div>
              Do you have a passport?
            </div>
            {this.options()}
            <Name name="name"
                  />
          </div>
        </SectionView>
      </SectionViews>
    )
  }
