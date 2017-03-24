import React from 'react'
import { i18n } from '../../../../config'
import { RelativesValidator } from '../../../../validators'
import { ValidationElement, Show, Accordion, Checkbox, CheckboxGroup, Help, HelpIcon } from '../../../Form'
import Relative from './Relative'

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

export const subtext = (text, subtext) => {
  return (
    <div className="up-a-bit">
      <p>
        {i18n.t(text)}<br />
        <span className="smaller">{i18n.t(subtext)}</span>
      </p>
    </div>
  )
}

export default class Relatives extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      Relations: props.Relations,
      List: props.List,
      errorCodes: []
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateRelations = this.updateRelations.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  onUpdate (name, values, fn) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)

      if (fn) {
        fn()
      }
    })
  }

  updateRelations (event) {
    let relation = event.target.value
    let selected = [...this.state.Relations]
    let items = [...this.state.List]

    if (selected.includes(relation)) {
      // Remove the relation if it was previously selected
      selected.splice(selected.indexOf(relation), 1)
    } else {
      // Add the relation if it wasn't already
      selected.push(relation)

      // If the list does not have this relation type then we add it
      if (!this.state.List.some(x => x.Item.Relations.includes(relation))) {
        items.push({
          uuid: super.guid(),
          open: false,
          Item: {
            Relations: [relation]
          }
        })
      }
    }

    this.setState({ Relations: selected, List: items }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updateList (values) {
    this.onUpdate('List', values)
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
    return new RelativesValidator(this.status, null).isValid()
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const o = (item || {}).Item || {}
    const relation = (o.Relations || []).length > 0
          ? o.Relations[0]
          : i18n.t('family.relatives.collection.summary.item')
    const name = o.Name
          ? `${o.Name.first || ''} ${o.Name.middle || ''} ${o.Name.last || ''}`.trim()
          : i18n.t('family.relatives.collection.summary.unknown')

    return (
      <span>
        <span className="index">{relation}:</span>
        <span className="info"><strong>{name}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="relatives">
        <h2>{i18n.t('family.relatives.heading.title')}</h2>
        {i18n.m('family.relatives.para.opportunity')}
        {i18n.m('family.relatives.para.checkall')}

        <div className="eapp-field-wrap no-label">
          <Help id="family.relatives.help.relation">
            <CheckboxGroup className="option-list relatives-relation"
                           selectedValues={this.state.Relations}>
              <Checkbox name="relation-mother"
                        label={i18n.m('family.relatives.label.relation.mother')}
                        value="Mother"
                        className="relation-mother"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-father"
                        label={i18n.m('family.relatives.label.relation.father')}
                        value="Father"
                        className="relation-father"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-stepmother"
                        label={i18n.m('family.relatives.label.relation.stepmother')}
                        value="Stepmother"
                        className="relation-stepmother"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-stepfather"
                        label={i18n.m('family.relatives.label.relation.stepfather')}
                        value="Stepfather"
                        className="relation-stepfather"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-fosterparent"
                        label={i18n.m('family.relatives.label.relation.fosterparent')}
                        value="Fosterparent"
                        className="relation-fosterparent"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-child"
                        label={subtext('family.relatives.label.relation.child.text', 'family.relatives.label.relation.child.subtext')}
                        value="Child"
                        className="relation-child"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-stepchild"
                        label={i18n.m('family.relatives.label.relation.stepchild')}
                        value="Stepchild"
                        className="relation-stepchild"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-brother"
                        label={i18n.m('family.relatives.label.relation.brother')}
                        value="Brother"
                        className="relation-brother"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-sister"
                        label={i18n.m('family.relatives.label.relation.sister')}
                        value="Sister"
                        className="relation-sister"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-stepbrother"
                        label={i18n.m('family.relatives.label.relation.stepbrother')}
                        value="Stepbrother"
                        className="relation-stepbrother"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-stepsister"
                        label={i18n.m('family.relatives.label.relation.stepsister')}
                        value="Stepsister"
                        className="relation-stepsister"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-halfbrother"
                        label={i18n.m('family.relatives.label.relation.halfbrother')}
                        value="Half-brother"
                        className="relation-halfbrother"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-halfsister"
                        label={i18n.m('family.relatives.label.relation.halfsister')}
                        value="Half-sister"
                        className="relation-halfsister"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-fatherinlaw"
                        label={i18n.m('family.relatives.label.relation.fatherinlaw')}
                        value="Father-in-law"
                        className="relation-fatherinlaw"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-montherinlaw"
                        label={i18n.m('family.relatives.label.relation.montherinlaw')}
                        value="Monther-in-law"
                        className="relation-montherinlaw"
                        onChange={this.updateRelations}
                        />
              <Checkbox name="relation-guardian"
                        label={i18n.m('family.relatives.label.relation.guardian')}
                        value="Guardian"
                        className="relation-guardian"
                        onChange={this.updateRelations}
                        />
            </CheckboxGroup>
            <HelpIcon />
          </Help>
        </div>

        <Show when={this.state.List.length > 0}>
          <Accordion minimum="1"
                     items={this.state.List}
                     onUpdate={this.updateList}
                     summary={this.summary}
                     description={i18n.t('family.relatives.collection.summary.title')}
                     appendTitle={i18n.t('family.relatives.collection.appendTitle')}
                     appendMessage={i18n.m('family.relatives.collection.appendMessage')}
                     appendLabel={i18n.t('family.relatives.collection.append')}>
            <Relative name="Item"
                      bind={true}
                      />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Relatives.defaultProps = {
  Relations: [],
  List: []
}
