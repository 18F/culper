import React from 'react'
import { connect } from 'react-redux'
import AuthenticatedView from '../../../views/AuthenticatedView'
import ValidationElement from '../../Form/ValidationElement'
import { push } from '../../../middleware/history'
import Height from '../../Form/Height'
import Weight from '../../Form/Weight'
import HairColor from '../../Form/HairColor'
import EyeColor from '../../Form/EyeColor'
import Sex from '../../Form/Sex'
import { updateApplication, reportErrors, reportCompletion } from '../../../actions/ApplicationActions'
import { SectionView, SectionViews } from '../SectionView'

class Identifying extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection
    }

    this.handleTour = this.handleTour.bind(this)
    this.handleReview = this.handleReview.bind(this)
  }

  handleTour (event) {
    this.props.dispatch(push('/form/identifying/height'))
  }

  handleReview (event) {
    this.props.dispatch(push('/form/identifying/review'))
  }

  onUpdate (field, values) {
    this.props.dispatch(updateApplication('YourIdentification', field, values))
  }

  onValidate (event, status, errorCodes) {
    if (!event) {
      return
    }

    let errors = super.triageErrors('identifying', [...this.props.Errors], errorCodes)
    this.props.dispatch(reportErrors('identifying', '', errors))

    let cstatus = 'neutral'
    if (this.hasStatus('height', true)
        && this.hasStatus('weight', true)
        && this.hasStatus('hair', true)
        && this.hasStatus('eye', true)
        && this.hasStatus('sex', true)) {
      cstatus = 'complete'
    } else if (this.hasStatus('height', false)
               || this.hasStatus('weight', false)
               || this.hasStatus('hair', false)
               || this.hasStatus('eye', false)
               || this.hasStatus('sex', false)) {
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

  intro () {
    return (
      <div className="identification">
        <div id="titles" className="usa-grid-full">
          <div className="usa-width-one-half">
            <h3>One piece at a time</h3>
          </div>
          <div className="usa-width-one-half">
            <h3>Full section view</h3>
          </div>
        </div>

        <div id="dialogs" className="usa-grid-full">
          <div className="usa-width-one-half">
            <p>Take a guided tour through the section</p>
          </div>
          <div className="usa-width-one-half">
            <p>View all the sections associated with <strong>Your Identifying Information</strong> at once</p>
          </div>
        </div>

        <div id="actions" className="usa-grid-full">
          <div className="usa-width-one-half">
            <button onClick={this.handleTour}>Take me on the tour!</button>
          </div>
          <div className="usa-width-one-half">
            <button onClick={this.handleReview}>Show me the full section</button>
          </div>
        </div>
      </div>
    )
  }

  render () {
    return (
      <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
        <SectionView name="">
          {this.intro()}
        </SectionView>
        <SectionView
          name="review"
          back="othernames"
          backLabel="Other names">
          <Height
            {...this.props.Height}
            name="height"
            onUpdate={this.onUpdate.bind(this, 'Height')}
            onValidate={this.onValidate.bind(this)}
          />
          <Weight
            name="weight"
            value={this.props.Weight}
            onUpdate={this.onUpdate.bind(this, 'Weight')}
            onValidate={this.onValidate.bind(this)}
          />
          <HairColor
            name="hair"
            value={this.props.HairColor}
            onUpdate={this.onUpdate.bind(this, 'HairColor')}
            onValidate={this.onValidate.bind(this)}
          />
          <EyeColor
            name="eye"
            value={this.props.EyeColor}
            onUpdate={this.onUpdate.bind(this, 'EyeColor')}
            onValidate={this.onValidate.bind(this)}
          />
          <Sex
            name="sex"
            value={this.props.Sex}
            onUpdate={this.onUpdate.bind(this, 'Sex')}
            onValidate={this.onValidate.bind(this)}
          />
        </SectionView>
        <SectionView
          name="height"
          next="identifying/weight"
          nextLabel="Weight">
          <Height
            {...this.props.Height}
            name="height"
            onUpdate={this.onUpdate.bind(this, 'Height')}
            onValidate={this.onValidate.bind(this)}
          />
        </SectionView>
        <SectionView
          name="weight"
          next="identifying/haircolor"
          nextLabel="Hair color"
          back="identifying/height"
          backLabel="Height">
          <Weight
            name="weight"
            value={this.props.Weight}
            onUpdate={this.onUpdate.bind(this, 'Weight')}
            onValidate={this.onValidate.bind(this)}
          />
        </SectionView>
        <SectionView
          name="haircolor"
          next="identifying/eyecolor"
          nextLabel="Eye color"
          back="identifying/weight"
          backLabel="Weight">
          <HairColor
            name="hair"
            value={this.props.HairColor}
            onUpdate={this.onUpdate.bind(this, 'HairColor')}
            onValidate={this.onValidate.bind(this)}
          />
        </SectionView>
        <SectionView
          name="eyecolor"
          next="identifying/sex"
          nextLabel="Sex"
          back="identifying/haircolor"
          backLabel="Hair color">
          <EyeColor
            name="eye"
            value={this.props.EyeColor}
            onUpdate={this.onUpdate.bind(this, 'EyeColor')}
            onValidate={this.onValidate.bind(this)}
          />
        </SectionView>
        <SectionView
          name="sex"
          back="identifying/eyecolor"
          backLabel="Eye color">
          <Sex
            name="sex"
            value={this.props.Sex}
            onUpdate={this.onUpdate.bind(this, 'Sex')}
            onValidate={this.onValidate.bind(this)}
          />
        </SectionView>
      </SectionViews>
    )
  }
}

function mapStateToProps (state) {
  let section = state.section || {}
  let app = state.application || {}
  let identification = app.YourIdentification || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Section: section,
    Height: identification.Height || {},
    Weight: identification.Weight || 0,
    HairColor: identification.HairColor || '',
    EyeColor: identification.EyeColor || '',
    Sex: identification.Sex || '',
    Errors: errors.identifying || [],
    Completed: completed.identifying || []
  }
}

export default connect(mapStateToProps)(AuthenticatedView(Identifying))
