import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import SectionElement from '../SectionElement'
import { SectionViews, SectionView } from '../SectionView'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { Field, Show } from '../../Form'
import Status from './Status'
import Multiple from './Multiple'
import Passports from './Multiple/Passports'

class Citizenship extends SectionElement {
  render() {
    const { formType } = this.props
    return (
      <div>
        <SectionViews
          current={this.props.subsection}
          dispatch={this.props.dispatch}
          update={this.props.update}
        >

          <SectionView
            name="intro"
            back={{
              85: 'history/review',
              86: 'relationships/review'
            }[formType]}
            backLabel={{
              85: i18n.t('history.destination.review'),
              86: i18n.t('relationships.destination.review')
            }[formType]}
            next="citizenship/status"
            nextLabel={i18n.t('citizenship.destination.status')}>
            <h1 className="section-header">
              {{
                85: i18n.t('citizenship.85.intro.title'),
                86: i18n.t('citizenship.intro.title')
              }[formType]}
            </h1>
            <div>
              <Field
                optional={true}
                className="no-margin-bottom">
                {i18n.m('citizenship.intro.body')}
              </Field>
            </div>
          </SectionView>

          <SectionView
            name="status"
            back="citizenship/intro"
            backLabel={i18n.t('citizenship.destination.intro')}
            next="citizenship/multiple"
            nextLabel={i18n.t('citizenship.destination.multiple')}>
            <h1 className="section-header">{i18n.t('citizenship.destination.status')}</h1>
            <Status
              name="status"
              {...this.props.Status}
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Status')}
              onError={this.handleError}
              formType={formType}
            />
          </SectionView>

          <SectionView
            name="multiple"
            back="citizenship/status"
            backLabel={i18n.t('citizenship.destination.status')}
            next={{
              85: 'citizenship/review',
              86: 'citizenship/passports'
            }[formType]}
            nextLabel={{
              85: i18n.t('citizenship.destination.review'),
              86: i18n.t('citizenship.destination.passports')
            }[formType]}>
            <h1 className="section-header">
              {i18n.t('citizenship.destination.multiple')}
            </h1>
            <Multiple
              name="multiple"
              {...this.props.Multiple}
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Multiple')}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
              formType={formType}
            />
          </SectionView>

          {['86'].indexOf(formType) > -1 && (
            <SectionView
              name="passports"
              back="citizenship/multiple"
              backLabel={i18n.t('citizenship.destination.multiple')}
              next="citizenship/review"
              nextLabel={i18n.t('citizenship.destination.review')}>
              <h1 className="section-header">{i18n.t('citizenship.destination.passports')}</h1>
              <Passports
                name="passports"
                {...this.props.Passports}
                dispatch={this.props.dispatch}
                onUpdate={this.handleUpdate.bind(this, 'Passports')}
                onError={this.handleError}
                scrollToBottom={this.props.scrollToBottom}
              />
            </SectionView>
          )}

          <SectionView
            name="review"
            title={i18n.t('review.title')}
            para={i18n.m('review.para')}
            showTop={true}
            back={{
              85: 'citizenship/status',
              86: 'citizenship/passports'
            }[formType]}
            backLabel={{
              85: i18n.t('citizenship.destination.status'),
              86: i18n.t('citizenship.destination.passports')
            }[formType]}
            next="military/intro"
            nextLabel={i18n.t('military.destination.intro')}>
            <h1 className="section-header">{i18n.t('citizenship.destination.status')}</h1>
            <Status
              name="status"
              {...this.props.Status}
              section="citizenship"
              subsection="status"
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Status')}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
              formType={formType}
            />

            <hr className="section-divider" />
            <h1 className="section-header">{i18n.t('citizenship.destination.multiple')}</h1>
            <Multiple
              name="multiple"
              {...this.props.Multiple}
              section="citizenship"
              subsection="multiple"
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Multiple')}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
              formType={formType}
            />

            <Show when={['86'].indexOf(formType) > -1}>
              <hr className="section-divider" />
              <h1 className="section-header">{i18n.t('citizenship.destination.passports')}</h1>
              <Passports
                name="passports"
                {...this.props.Passports}
                section="citizenship"
                subsection="passports"
                dispatch={this.props.dispatch}
                onUpdate={this.handleUpdate.bind(this, 'Passports')}
                onError={this.handleError}
                required={true}
                scrollIntoView={false}
              />
            </Show>
          </SectionView>

        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let app = state.application || {}
  let citizenship = app.Citizenship || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Application: app,
    Citizenship: citizenship,
    Status: citizenship.Status || {},
    Multiple: citizenship.Multiple || {},
    Passports: citizenship.Passports || {},
    Errors: errors.citizenship || [],
    Completed: completed.citizenship || []
  }
}

Citizenship.defaultProps = {
  section: 'citizenship',
  store: 'Citizenship',
  scrollToBottom: SectionView.BottomButtonsSelector,
  formType: '86'
}

export class CitizenshipSections extends React.Component {
  render() {
    const { formType } = this.props
    return (
      <div>
        <Status
          name="status"
          {...this.props.Status}
          defaultState={false}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          required={true}
          scrollIntoView={false}
          formType={formType}
        />

        <hr className="section-divider" />
        <Multiple
          name="multiple"
          {...this.props.Multiple}
          defaultState={false}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          required={true}
          scrollIntoView={false}
          formType={formType}
        />

        <Show when={['86'].indexOf(formType) > -1}>
          <hr className="section-divider" />
          <Passports
            name="passports"
            {...this.props.Passports}
            defaultState={false}
            dispatch={this.props.dispatch}
            onError={this.props.onError}
            required={true}
            scrollIntoView={false}
          />
        </Show>
      </div>
    )
  }
}

CitizenshipSections.defualtProps = {
  formType: '86'
}

export default connect(mapStateToProps)(AuthenticatedView(Citizenship))
