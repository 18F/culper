import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Svg, RadioGroup, Radio, Show } from '../../../Form'
import { ResidenceItem } from '../Residence/Residence'
import { EmploymentItem } from '../Employment/Employment'
import { Row, Gap } from './Row'
import { InjectGaps, EmploymentSummary, ResidenceSummary, dateSummary } from './summaries'

/**
 * Contains a collection of Residence and Employment information. This component
 * reconciles the information in the History redux state key and generates one
 * single array `List`. Each item is added a type to distinguish them and to allow
 * us to apply the approriate component and sory them by common criteria.
 */
export default class HistoryCollection extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      // List of history items managed by this collection
      List: [],

      // Current item that user is creating (NOT editing)
      currentNewItem: null,

      // Contains the type of item the user is requesting to create. This may included
      // Residence, Employment or School
      collectionType: '',

      // Error codes for each of the child collections
      errorCodes: []
    }
  }

  componentDidMount () {
    // If user has requested to show create form for a specific type when,
    // first loading the component, check that here and do so
    if (this.isEmpty() && this.props.addOnLoad) {
      this.selectCollectionType(this.props.addOnLoad)
      return
    }
    this.prepare(this.props.history)
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
      // } else if (this.isValid()) {
      //   complexStatus = true
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

  /**
   * Determines if any items exist in the collection. This includes residence and employer
   * information
   */
  isEmpty () {
    return !this.containsResidence() && !this.containsEmployment()
  }

  /**
   * Determines if any residence items exist
   */
  containsResidence () {
    return this.props.history && this.props.history.Residence && this.props.history.Residence.List
  }

  /**
   * Determines if any employment items exist
   */
  containsEmployment () {
    return this.props.history && this.props.history.Employment && this.props.history.Employment.List
  }

  componentWillReceiveProps (nextProps) {
    this.prepare(nextProps.history)
  }

  /**
   * Creates an array of items consisting of Residence and Employment items. These items are obtained
   * from History. For each, a type property is added to indicate the type of item it is in the collection.
   * Since this collection can contain a mix of history objects (Residence, Employer, School), this allows
   * us to differentiate when iterating and rendering them.
   */
  prepare (history) {
    if (!history) {
      return
    }

    let list = []
    if (history.Residence && history.Residence.List) {
      let residences = history.Residence.List.map(r => {
        r.type = 'Residence'
        return r
      })
      list = list.concat(residences)
    }

    if (history.Employment && history.Employment.List) {
      let employment = history.Employment.List.map(r => {
        r.type = 'Employment'
        return r
      })
      list = list.concat(employment)
    }
    list.sort(this.sort)

    this.setState({
      List: list
    })
  }

  /**
   * Default sorting of history objects. This assumes that all objects contain a `Dates` property
   * with date range values.
   */
  sort (a, b) {
    const first = ((a || {}).Item || {}).Dates
    const second = ((b || {}).Item || {}).Dates

    if (!first && !second) {
      return 0
    }

    if (!first || !first.to) {
      return -1
    }

    if (!second || !second.to) {
      return 1
    }

    return second.to.getTime() - first.to.getTime()
  }

  /**
   * Updates an existing item in the collection.
   */
  onUpdate (field, index, values) {
    let items = [...this.state.List]
    items[index] = {
      type: field,
      Item: values
    }
    this.doUpdate(field, items)
  }

  /**
   * Helper func that takes the combined list of History items and then
   * generates a new list containing only objects matching the `type` property
   * passed in. When items are updated, we don't trigger all object types to be updated
   * in redux. For instance, if a user updates a Residence, we only send up Residence objects,
   * not Employer and School.
   */
  doUpdate (type, items, callback) {
    this.setState({
      List: items
    }, () => {
      // filter list by current collection type being updated
      let filtered = this.state.List.filter(i => {
        return i.type === type
      })

      switch (type) {
      case 'Residence':
        if (this.props.onResidenceUpdate) {
          this.props.onResidenceUpdate({ List: filtered })
        }
        break
      case 'Employment':
        if (this.props.onEmploymentUpdate) {
          this.props.onEmploymentUpdate({ List: filtered })
        }
        break
      default:
        console.warn('No update callback method was provided in HistoryCollection')
      }
      if (callback) {
        callback()
      }
    })
  }

  /**
   * Takes a populated entry and actually adds it to the array of items
   */
  create () {
    const type = this.state.collectionType
    let items = [...this.state.List]

    items.push({
      type: type,
      Item: this.state.currentNewItem.values
    })

    this.setState({ currentNewItem: null, collectionType: null }, () => {
      this.doUpdate(type, items, () => {
        this.refs.createOptions.scrollIntoView()
      })
    })
  }

  /**
   * Removes an item from the collection and then sends the data back out
   * based on the type that was updated
   */
  remove (type, index) {
    let items = [...this.state.List]
    items.splice(index, 1)
    this.doUpdate(type, items)
  }

  /**
   * Keeps a temporary copy of a new item being updated. At this point, the item
   * has NOT been added to the redux store. This is being held in local state
   * Since the flow for this collection is slightly different, the create
   * process uses a temporary state property `currentNewItem` to store a `new` history item
   * being worked on. This item is not added to the List until the user explicitly saves.
   */
  onNewUpdate (field, values) {
    this.setState({
      currentNewItem: {
        type: field,
        values: values
      }
    })
  }

  /**
   * Handles when user is choosing between which new object type to create. This includes
   * Residence | Employment | School
   */
  handleCollectionTypeChange (e) {
    let type = e.target.value
    this.selectCollectionType(type)
  }

  /**
   * Helper func that sets the current object type being created and then ensures to
   * scroll the user to those options
   */
  selectCollectionType (type) {
    this.setState({
      collectionType: type,
      currentNewItem: {
        type: type,
        values: {}
      }
    }, () => {
      this.refs.createOptions.scrollIntoView()
    })
  }

  /**
   * Contains the types of History objects a user can create
   */
  createOptions () {
    return (
      <RadioGroup className="option-list eapp-extend-labels create"
                  name="createOptions"
                  selectedValue={this.state.collectionType}>
        <Radio
          label="Residence"
          value="Residence"
          onChange={this.handleCollectionTypeChange.bind(this)}>
          <div className="eye-icon">
            <Svg src="img/residence-house.svg" />
          </div>
        </Radio>
        <Radio
          label="Employer"
          value="Employment"
          onChange={this.handleCollectionTypeChange.bind(this)}>
          <div className="eye-icon">
            <Svg src="img/employer-briefcase.svg" />
          </div>
        </Radio>
      </RadioGroup>
    )
  }

  render () {
    // Inject any gaps in to our timeline
    const list = InjectGaps(this.state.List, ['Residence', 'Employment']).sort(this.sort)

    // Create the list items
    const listItems = list.map((item, i, arr) => {
      const firstRow = (i === 0)
      const lastRow = arr.length === (i + 1)

      if (item.type === 'Residence') {
        let header = (<ResidenceSummary residence={item} />)
        return (
          <Row header={header}
               index={i}
               key={i}
               first={firstRow}
               last={lastRow}
               onRemove={this.remove.bind(this, item.type)}
               show={item.isNew}>
            <ResidenceItem name="Residence"
                           {...item.Item}
                           onUpdate={this.onUpdate.bind(this, 'Residence', i)}
                           onValidate={this.handleValidation}
                           />
          </Row>
        )
      }

      if (item.type === 'Employment') {
        let header = (<EmploymentSummary employment={item} />)
        return (
          <Row header={header}
               index={i}
               key={i}
               first={firstRow}
               last={lastRow}
               onRemove={this.remove.bind(this, item.type)}
               show={item.isNew}>
            <div className="employment">
              <EmploymentItem name="Employment"
                              {...item.Item}
                              onUpdate={this.onUpdate.bind(this, 'Employment', i)}
                              onValidate={this.handleValidation}
                              />
            </div>
          </Row>
        )
      }

      if (item.type === 'Gap') {
        return (
          <Gap index={i}
               key={i}
               first={firstRow}
               last={lastRow}
               dates={item.Item.Dates}
               type={item.Item.Type}
               />
        )
      }

      return null
    })

    // Render the defaults
    return (
      <div className="history-collection collection">
        { listItems }
        <div>
          <h3>Add new</h3>
          <div className="eapp-field-wrap" ref="createOptions">
            {this.createOptions()}
          </div>
          <Show when={this.state.collectionType === 'Residence'}>
            <ResidenceItem name="Residence"
                           onUpdate={this.onNewUpdate.bind(this, 'Residence')}
                           onValidate={this.handleValidation}
                           />
          </Show>
          <Show when={this.state.collectionType === 'Employment'}>
            <div className="employment">
              <EmploymentItem name="Employment"
                              onUpdate={this.onNewUpdate.bind(this, 'Employment')}
                              onValidate={this.handleValidation}
                              />
            </div>
          </Show>

          <Show when={this.state.collectionType}>
            <div>
              <h3>Done! Now let's add some more</h3>
              <p>Use the button below to save your first history entry and start another</p>
              <div className="text-center">
                <button className="add usa-button-outline" onClick={this.create.bind(this)}>
                  <span>Save and add another address, job, or school</span>
                  <i className="fa fa-plus-circle"></i>
                </button>
              </div>
            </div>
          </Show>
        </div>
      </div>
    )
  }
}
