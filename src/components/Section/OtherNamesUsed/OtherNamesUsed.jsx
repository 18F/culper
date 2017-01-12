import React from 'react'
import { connect } from 'react-redux'
import AuthenticatedView from '../../../views/AuthenticatedView'
import ValidationElement from '../../Form/ValidationElement'
import { Help, MaidenName, Name, Textarea, DateRange, Radio, RadioGroup } from '../../Form'
import { push } from '../../../middleware/history'
import { updateApplication, reportErrors, reportCompletion } from '../../../actions/ApplicationActions'
import { SectionViews, SectionView } from '../SectionView'

class OtherNamesUsed extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection,
      yesNo: props.HasOtherNames
    }

    this.handleTour = this.handleTour.bind(this)
    this.handleReview = this.handleReview.bind(this)
  }

  handleTour (event) {
    this.props.dispatch(push('/form/othernames/name'))
  }

  handleReview (event) {
    this.props.dispatch(push('/form/othernames/review'))
  }

  onUpdate (id, field, values) {
    let list = this.props.List
    for (let x = 0; x < list.length; x++) {
      if (list[x].ID === id) {
        list[x][field] = values
      }
    }
    this.props.dispatch(updateApplication('OtherNames', 'List', [...list]))
  }

  onValidate (event, status, errorCodes) {
    if (!event) {
      return
    }

    let errors = super.triageErrors('othernames', [...this.props.Errors], errorCodes)
    this.props.dispatch(reportErrors('othernames', '', errors))

    let cstatus = 'neutral'
    if (this.hasStatus('name', true)) {
      cstatus = 'complete'
    } else if (this.hasStatus('name', false)) {
      cstatus = 'incomplete'
    }

    let completed = {
      ...this.props.Completed,
      ...status,
      status: cstatus
    }
    this.props.dispatch(reportCompletion(this.props.Section.section, this.props.Section.subsection, completed))
  }

  hasStatus (property, val) {
    return this.props.Completed[property] && this.props.Completed[property].status === val
  }

  addOtherName () {
    let list = this.props.List
    list.push({
      ID: new Date().getTime(),
      Name: '',
      MaidenName: '',
      Used: '',
      Reason: ''
    })
    this.props.dispatch(updateApplication('OtherNames', 'List', [...list]))
  }

  noOtherName () {
    this.props.dispatch(updateApplication('OtherNames', 'List', []))
    this.props.dispatch(push('/form/identifying'))
  }

  yesNoClicked (val) {
    this.setState({ yesNo: val }, () => {
      if (val === 'Yes') {
        this.props.dispatch(updateApplication('OtherNames', 'HasOtherNames', 'Yes'))
        if (this.props.List.length === 0) {
          this.addOtherName()
        }
      } else if (val === 'No') {
        this.props.dispatch(updateApplication('OtherNames', 'HasOtherNames', 'No'))
        if (this.props.List.length > 0) {
          this.props.dispatch(updateApplication('OtherNames', 'List', []))
        }
      }
    })
  }

  keyName (id, bit) {
    return '' + id + '-' + bit
  }

  options () {
    return (
      <RadioGroup className="option-list" selectedValue={this.state.yesNo}>
        <Radio name="has_othernames"
          label="Yes"
          value="Yes"
          onChange={this.yesNoClicked.bind(this, 'Yes')}
          onValidate={this.handleValidation}
        />
        <Radio name="has_othernames"
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
          <SectionView
            name=""
            next="identifying"
            nextLabel="Your Identifying Information"
            back="identification"
            backLabel="Identification">
            <div className="other-names-used eapp-field-wrap">
              <h2>Other names used</h2>
              <p>Provide your other names used and the period of time you used them (for example: your maiden name, name(s) by a former marriage, former name(s), alias(es), or nickname(s)).</p>
              <div>
                Have you used any other names?
              </div>
              {this.options()}
            </div>
          </SectionView>
        </SectionViews>
      )
    }

    return (
      <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
        <SectionView
          name=""
          next="identifying"
          nextLabel="Your Identifying Information"
          back="identification"
          backLabel="Identification">

          <div className="other-names-used eapp-field-wrap">
            <h2>Other names used</h2>
            <p>Provide your other names used and the period of time you used them (for example: your maiden name, name(s) by a former marriage, former name(s), alias(es), or nickname(s)).</p>
            <div>
              Have you used any other names?
            </div>
            {this.options()}
            {
              this.props.List.map((x) => {
                return (
                  <div key={x.ID}>
                    <Name
                      {...x.Name}
                      key={this.keyName(x.ID, 'name')}
                      name="name"
                      onUpdate={this.onUpdate.bind(this, x.ID, 'Name')}
                      onValidate={this.onValidate.bind(this)}
                    />

                    <MaidenName
                      key={this.keyName(x.ID, 'maiden')}
                      name="maiden"
                      value={x.MaidenName}
                      onUpdate={this.onUpdate.bind(this, x.ID, 'MaidenName')}
                      onValidate={this.onValidate.bind(this)}
                    />

                    <DateRange
                      {...x.DatesUsed}
                      key={this.keyName(x.ID, 'used')}
                      name="dates"
                      onUpdate={this.onUpdate.bind(this, x.ID, 'DatesUsed')}
                      title="Provide dates used"
                      onValidate={this.onValidate.bind(this)}
                    />

                    <div>
                      <h2>Reason for change</h2>
                      <Help id="alias.reason.help">
                        <Textarea
                          name="reason"
                          key={this.keyName(x.ID, 'reason')}
                          value={x.Reasons}
                          onUpdate={this.onUpdate.bind(this, x.ID, 'Reasons')}
                          onValidate={this.onValidate.bind(this)}
                          label={'Provide the reasons why the name changed'}
                        />
                      </Help>
                    </div>
                  </div>
                )
              })
            }
            <div className="text-center">
              <button onClick={this.addOtherName.bind(this)}>
                <span>Add another name used</span>
                <i className="fa fa-plus-circle"></i>
              </button>
            </div>
          </div>
        </SectionView>
      </SectionViews>
    )
  }
}

function mapStateToProps (state) {
  let section = state.section || {}
  let app = state.application || {}
  let othernames = app.OtherNames || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Section: section,
    List: othernames.List || [],
    Errors: errors.othernames || [],
    Completed: completed.othernames || [],
    HasOtherNames: othernames.HasOtherNames
  }
}

export default connect(mapStateToProps)(AuthenticatedView(OtherNamesUsed))
