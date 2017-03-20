import React from 'react'
import { i18n } from '../../../../config'
import { PoliceValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Collection, Checkbox, CheckboxGroup } from '../../../Form'
import { dateSummary } from '../../History/HistoryCollection/summaries'

/**
 * Convenience function to send updates along their merry way
 */
const sendUpdate = (fn, name, props) => {
  if (fn) {
    fn({
      name: name,
      ...props
    })
  }
}

export default class Relatives extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      Types: props.Types,
      List: props.List,
      errorCodes: []
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.checkToClear = this.checkToClear.bind(this)
    this.updateSummons = this.updateSummons.bind(this)
    this.updateArrests = this.updateArrests.bind(this)
    this.updateCharges = this.updateCharges.bind(this)
    this.updateProbation = this.updateProbation.bind(this)
    this.updateTrial = this.updateTrial.bind(this)
    this.updateList = this.updateList.bind(this)
    this.hasOffenses = this.hasOffenses.bind(this)
  }

  onUpdate (name, values, fn) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)

      if (fn) {
        fn()
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

    let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      const errorObject = { [this.props.name]: codes }
      const statusObject = { [this.props.name]: { status: complexStatus } }
      if (this.state.error === false || this.state.valid === true) {
        super.handleValidation(event, statusObject, errorObject)
        return
      }

      super.handleValidation(event, statusObject, errorObject)
    })
  }

  /**
   * Determine if all items in the collection are considered to be in
   * a valid state.
   */
  isValid () {
    return new PoliceValidator(this.state, null).isValid()
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const o = (item || {}).Item || {}
    const relation = o.Relation || i18n.t('legal.police.collection.summary.item')
    const name = o.Name
          ? `${o.Name.first || ''} ${o.Name.middle || ''} ${o.Name.last || ''}`.trim()
          : i18n.t('legal.relatives.collection.summary.unknown')
    const dates = dateSummary({ Date: o.BirthDate })

    return (
      <div className="table">
        <div className="table-cell index">{relation}:</div>
        <div className="table-cell info"><strong>{name}</strong></div>
        <div className="table-cell dates"><strong>{dates}</strong></div>
      </div>
    )
  }

  needCitizenshipDocumentation () {
    const relations = ['Father', 'Mother', 'Child', 'Stepchild', 'Brother', 'Sister', 'Half-brother', 'Half-sister', 'Stepbrother', 'Stepsister', 'Stepmother', 'Stepfather']
    if (this.state.Relations.some(x => relations.includes(x)) && this.state.Citizen && this.state.Birthplace.type === 'international' && this.state.IsDeceased === 'Yes') {
      return true
    }

    if (this.state.Address.type === 'domestic' && this.state.Birthplace.type === 'international' && this.state.Citizen) {
      return true
    }

    if (this.state.Address.type === 'apofpo' && this.state.Birthplace.type === 'international' && this.state.Citizen) {
      return true
    }

    if (this.state.Birthplace.type === 'international' && this.state.Citizen) {
      return true
    }

    return false
  }

  render () {
    return (
      <div className="relatives">
        <h2>{i18n.t('legal.relatives.heading.title')}</h2>
        {i18n.m('legal.relatives.para.opportunity')}
        {i18n.m('legal.relatives.para.checkall')}

        <CheckboxGroup className=""
                       selectedValues={this.state.Relations}>
          <Checkbox name="relation-mother"
                    label={i18n.t('legal.relatives.label.relation.mother')}
                    value="Mother"
                    className="relation-mother"
                    />
          <Checkbox name="relation-father"
                    label={i18n.t('legal.relatives.label.relation.father')}
                    value="Father"
                    className="relation-father"
                    />
          <Checkbox name="relation-stepmother"
                    label={i18n.t('legal.relatives.label.relation.stepmother')}
                    value="Stepmother"
                    className="relation-stepmother"
                    />
          <Checkbox name="relation-stepfather"
                    label={i18n.t('legal.relatives.label.relation.stepfather')}
                    value="Stepfather"
                    className="relation-stepfather"
                    />
          <Checkbox name="relation-fosterparent"
                    label={i18n.t('legal.relatives.label.relation.fosterparent')}
                    value="Fosterparent"
                    className="relation-fosterparent"
                    />
          <Checkbox name="relation-child"
                    label={i18n.t('legal.relatives.label.relation.child')}
                    value="Child"
                    className="relation-child"
                    />
          <Checkbox name="relation-stepchild"
                    label={i18n.t('legal.relatives.label.relation.stepchild')}
                    value="Stepchild"
                    className="relation-stepchild"
                    />
          <Checkbox name="relation-brother"
                    label={i18n.t('legal.relatives.label.relation.brother')}
                    value="Brother"
                    className="relation-brother"
                    />
          <Checkbox name="relation-sister"
                    label={i18n.t('legal.relatives.label.relation.sister')}
                    value="Sister"
                    className="relation-sister"
                    />
          <Checkbox name="relation-stepbrother"
                    label={i18n.t('legal.relatives.label.relation.stepbrother')}
                    value="Stepbrother"
                    className="relation-stepbrother"
                    />
          <Checkbox name="relation-stepsister"
                    label={i18n.t('legal.relatives.label.relation.stepsister')}
                    value="Stepsister"
                    className="relation-stepsister"
                    />
          <Checkbox name="relation-halfbrother"
                    label={i18n.t('legal.relatives.label.relation.halfbrother')}
                    value="Half-brother"
                    className="relation-halfbrother"
                    />
          <Checkbox name="relation-halfsister"
                    label={i18n.t('legal.relatives.label.relation.halfsister')}
                    value="Half-sister"
                    className="relation-halfsister"
                    />
          <Checkbox name="relation-fatherinlaw"
                    label={i18n.t('legal.relatives.label.relation.fatherinlaw')}
                    value="Father-in-law"
                    className="relation-fatherinlaw"
                    />
          <Checkbox name="relation-montherinlaw"
                    label={i18n.t('legal.relatives.label.relation.montherinlaw')}
                    value="Monther-in-law"
                    className="relation-montherinlaw"
                    />
          <Checkbox name="relation-guardian"
                    label={i18n.t('legal.relatives.label.relation.guardian')}
                    value="Guardian"
                    className="relation-guardian"
                    />
        </CheckboxGroup>

        <Show when={this.state.List.length > 0}>
          <Collection minimum="1"
                      items={this.state.List}
                      dispatch={this.updateList}
                      summary={this.summary}
                      summaryTitle={i18n.t('legal.relatives.collection.summary.title')}
                      appendTitle={i18n.t('legal.relatives.collection.appendTitle')}
                      appendMessage={i18n.m('legal.relatives.collection.appendMessage')}
                      appendLabel={i18n.t('legal.relatives.collection.append')}>
            <h3>{i18n.t('legal.relatives.heading.relation')}</h3>
            <h3>{i18n.t('legal.relatives.heading.name')}</h3>
            <h3>{i18n.t('legal.relatives.heading.birthdate')}</h3>
            <h3>{i18n.t('legal.relatives.heading.birthplace')}</h3>
            <h3>{i18n.t('legal.relatives.heading.citizenship')}</h3>

            <Show when={this.state.Relations.some(x => x === 'Maiden')}>
              <div>
                <h3>{i18n.t('legal.relatives.heading.maiden')}</h3>
              </div>
            </Show>

            <Show when={this.state.Relations.some(x => ['Father', 'Mother', 'Child', 'Stepchild', 'Brother', 'Sister', 'Half-brother', 'Half-sister', 'Stepbrother', 'Stepsister', 'Stepmother', 'Stepfather'].includes(x))}>
              <div>
                <h3>{i18n.t('legal.relatives.heading.alias.branch')}</h3>
                <Branch name="has_alias"
                        className="eapp-field-wrap no-label relative-alias"
                        value={this.state.HasAlias}
                        help="legal.relatives.help.alias"
                        onUpdate={this.updateHasAlias}
                        onValidate={this.props.onValidate}>
                </Branch>

                <Show when={this.state.HasAlias === 'Yes'}>
                  <div>
                    <h3>{i18n.t('legal.relatives.heading.alias.title')}</h3>
                    <h4>{i18n.t('legal.relatives.heading.alias.maiden')}</h4>
                  </div>
                </Show>
              </div>
            </Show>

            <h3>{i18n.t('legal.relatives.heading.deceased.branch')}</h3>
            <Branch name="is_deceased"
                    className="eapp-field-wrap no-label relative-deceased"
                    value={this.state.IsDeceased}
                    help="legal.relatives.help.deceased"
                    onUpdate={this.updateIsDeceased}
                    onValidate={this.props.onValidate}>
            </Branch>
            <Show when={this.state.IsDeceased === 'No'}>
              <div>
                <h3>{i18n.t('legal.relatives.heading.deceased.address')}</h3>
              </div>
            </Show>

            <Show when={this.needCitizenshipDocumentation()}>
              <div>
                <h3>{i18n.t('legal.relatives.heading.us.title')}</h3>
                <h4>{i18n.t('legal.relatives.heading.us.documentation')}</h4>

                {i18n.m('legal.relatives.para.abroad')}
                <RadioGroup className=""
                            selectedValue={this.state.Abroad}>
                  <Radio name="abroad-fs"
                         label={i18n.t('legal.relatives.label.abroad.fs')}
                         value="FS"
                         className="abroad-fs"
                         />
                  <Radio name="abroad-ds"
                         label={i18n.t('legal.relatives.label.abroad.ds')}
                         value="DS"
                         className="abroad-ds"
                         />
                </RadioGroup>

                {i18n.m('legal.relatives.para.naturalized')}
                <RadioGroup className=""
                            selectedValue={this.state.Naturalized}>
                  <Radio name="naturalized-alien"
                         label={i18n.t('legal.relatives.label.naturalized.alien')}
                         value="Alien"
                         className="naturalized-alien"
                         />
                  <Radio name="naturalized-permanent"
                         label={i18n.t('legal.relatives.label.naturalized.permanent')}
                         value="Permanent"
                         className="naturalized-permanent"
                         />
                  <Radio name="naturalized-certificate"
                         label={i18n.t('legal.relatives.label.naturalized.certificate')}
                         value="Certificate"
                         className="naturalized-certificate"
                         />
                </RadioGroup>

                {i18n.m('legal.relatives.para.derived')}
                <RadioGroup className=""
                            selectedValue={this.state.Derived}>
                  <Radio name="derived-alien"
                         label={i18n.t('legal.relatives.label.derived.alien')}
                         value="Alien"
                         className="derived-alien"
                         />
                  <Radio name="derived-permanent"
                         label={i18n.t('legal.relatives.label.derived.permanent')}
                         value="Permanent"
                         className="derived-permanent"
                         />
                  <Radio name="derived-certificate"
                         label={i18n.t('legal.relatives.label.derived.certificate')}
                         value="Certificate"
                         className="derived-certificate"
                         />
                  <Radio name="derived-other"
                         label={i18n.t('legal.relatives.label.derived.other')}
                         value="Other"
                         className="derived-other"
                         />
                </RadioGroup>

                <h4>{i18n.t('legal.relatives.heading.us.number')}</h4>
                <h4>{i18n.t('legal.relatives.heading.us.name')}</h4>
                <h4>{i18n.t('legal.relatives.heading.us.address')}</h4>
              </div>
            </Show>

            <Show when={!this.state.Citizen && this.state.IsDeceased === 'No'}>
              <div>
                <Show when={this.state.Address.type === 'domestic'}>
                  <h3>{i18n.t('legal.relatives.heading.address.title')}</h3>
                  {i18n.t('legal.relatives.para.notcitizen')}
                  <RadioGroup className=""
                              selectedValue={this.state.Document}>
                    <Radio name="document-permanent"
                          label={i18n.t('legal.relatives.label.document.permanent')}
                          value="Permanent"
                          className="document-permanent"
                          />
                    <Radio name="document-employment"
                          label={i18n.t('legal.relatives.label.document.employment')}
                          value="Employment"
                          className="document-employment"
                          />
                    <Radio name="document-arrival"
                          label={i18n.t('legal.relatives.label.document.arrival')}
                          value="Arrival"
                          className="document-arrival"
                          />
                    <Radio name="document-visa"
                          label={i18n.t('legal.relatives.label.document.visa')}
                          value="Visa"
                          className="document-visa"
                          />
                    <Radio name="document-f1"
                          label={i18n.t('legal.relatives.label.document.f1')}
                          value="F1"
                          className="document-f1"
                          />
                    <Radio name="document-j1"
                          label={i18n.t('legal.relatives.label.document.j1')}
                          value="J1"
                          className="document-j1"
                          />
                    <Radio name="document-other"
                          label={i18n.t('legal.relatives.label.document.other')}
                          value="Other"
                          className="document-other"
                          />
                  </RadioGroup>

                  <h3>{i18n.t('legal.relatives.heading.address.number')}</h3>
                  <h3>{i18n.t('legal.relatives.heading.address.expiration')}</h3>
                </Show>

                <Show when={this.state.Address.type === 'international'}>
                  <h3>{i18n.t('legal.relatives.heading.address.title')}</h3>
                  <h3>{i18n.t('legal.relatives.heading.address.firstcontact')}</h3>
                  <h3>{i18n.t('legal.relatives.heading.address.lastcontact')}</h3>
                  <h3>{i18n.t('legal.relatives.heading.address.methods')}</h3>
                  {i18n.m('legal.relatives.para.checkall')}
                  <CheckboxGroup className=""
                                 selectedValues={this.state.Methods}>
                    <Checkbox name="methods-inperson"
                              label={i18n.t('legal.relatives.label.methods.inperson')}
                              value="In person"
                              className="methods-inperson"
                              />
                    <Checkbox name="methods-telephone"
                              label={i18n.t('legal.relatives.label.methods.telephone')}
                              value="Telephone"
                              className="methods-telephone"
                              />
                    <Checkbox name="methods-electronic"
                              label={i18n.t('legal.relatives.label.methods.electronic')}
                              value="Electronic"
                              className="methods-electronic"
                              />
                    <Checkbox name="methods-written"
                              label={i18n.t('legal.relatives.label.methods.written')}
                              value="Written"
                              className="methods-written"
                              />
                    <Checkbox name="methods-other"
                              label={i18n.t('legal.relatives.label.methods.other')}
                              value="Other"
                              className="methods-other"
                              />
                  </CheckboxGroup>

                  <h3>{i18n.t('legal.relatives.heading.address.frequency')}</h3>
                  <RadioGroup className=""
                              selectedValue={this.state.Frequency}>
                    <Radio name="frequency-daily"
                           label={i18n.t('legal.relatives.label.frequency.daily')}
                           value="Daily"
                           className="frequency-daily"
                           />
                    <Radio name="frequency-weekly"
                           label={i18n.t('legal.relatives.label.frequency.weekly')}
                           value="Weekly"
                           className="frequency-weekly"
                           />
                    <Radio name="frequency-monthly"
                           label={i18n.t('legal.relatives.label.frequency.monthly')}
                           value="Monthly"
                           className="frequency-monthly"
                           />
                    <Radio name="frequency-quarterly"
                           label={i18n.t('legal.relatives.label.frequency.quarterly')}
                           value="Quarterly"
                           className="frequency-quarterly"
                           />
                    <Radio name="frequency-annually"
                           label={i18n.t('legal.relatives.label.frequency.annually')}
                           value="Annually"
                           className="frequency-annually"
                           />
                    <Radio name="frequency-other"
                           label={i18n.t('legal.relatives.label.frequency.other')}
                           value="Other"
                           className="frequency-other"
                           />
                    <Radio name="frequency-daily"
                           label={i18n.t('legal.relatives.label.frequency.daily')}
                           value="daily"
                           className="frequency-daily"
                           />
                  </RadioGroup>

                  <h3>{i18n.t('legal.relatives.heading.employer.name')}</h3>
                  <h3>{i18n.t('legal.relatives.heading.employer.address')}</h3>

                  <h3>{i18n.t('legal.relatives.heading.employer.affiliated')}</h3>
                  <Branch name="has_affiliation"
                          className="eapp-field-wrap no-label foreign-affiliation"
                          value={this.state.HasAffiliation}
                          help="legal.relatives.help.affiliation"
                          onUpdate={this.updateHasAffiliation}
                          onValidate={this.props.onValidate}>
                  </Branch>
                  <Show when={this.state.HasAffiliation}>
                    <div>
                      <h3>{i18n.t('legal.relatives.heading.employer.relationship')}</h3>
                    </div>
                  </Show>

                </Show>
              </div>
            </Show>

          </Collection>
        </Show>
      </div>
    )
  }
}

Relatives.defaultProps = {
  Types: [],
  List: []
}
