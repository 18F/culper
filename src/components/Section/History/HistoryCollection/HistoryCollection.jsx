import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Svg, RadioGroup, Radio, Show } from '../../../Form'
import { ResidenceItem } from '../Residence'
import { EmploymentItem } from '../Employment'
import { EducationItem } from '../Education'
import { Row } from './Row'
import { Gap } from './Gap'
import { InjectGaps, EmploymentSummary, ResidenceSummary, EducationSummary } from './summaries'
import { daysAgo, today } from '../dateranges'
import { EmploymentValidator, ResidenceValidator, EducationValidator } from '../../../../validators'

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
      collectionType: props.types.length === 1 ? props.types[0] : '',

      indices: [],

      // Error codes for each of the child collections
      errorCodes: []
    }

    this.handleCollectionTypeChange = this.handleCollectionTypeChange.bind(this)
    this.create = this.create.bind(this)
    this.fillGap = this.fillGap.bind(this)
  }

  componentDidMount () {
    // If user has requested to show create form for a specific type when,
    // first loading the component, check that here and do so
    if (this.isEmpty() && this.props.addOnLoad && this.props.types.length > 1) {
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
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      const errorObject = { [this.props.name]: codes }
      const statusObject = { [this.props.name]: { status: complexStatus } }
      if (complexStatus === false || complexStatus === true) {
        super.handleValidation(event, statusObject, errorObject)
        return
      }

      super.handleValidation(event, statusObject, errorObject)
    })
  }

  isValid () {
    if (!this.state.List || !this.state.List.length) {
      return false
    }

    return this.validateEmploymentList(this.state.List)
      && this.validateResidenceList(this.state.List)
      && this.validateEducationList(this.state.List)
  }

  validateEmploymentList (list) {
    for (const employment of list.filter(item => { return item.type === 'Employment' })) {
      if (!this.validateEmployment(employment.Item)) {
        return false
      }
    }

    return true
  }

  validateEmployment (item) {
    return new EmploymentValidator(item, null).isValid()
  }

  validateResidenceList (list) {
    for (const residence of list.filter(item => { return item.type === 'Residence' })) {
      if (!this.validateResidence(residence.Item)) {
        return false
      }
    }

    return true
  }

  validateResidence (item) {
    return new ResidenceValidator(item, null).isValid()
  }

  validateEducationList (list) {
    for (const education of list.filter(item => { return item.type === 'Education' })) {
      if (!this.validateEducation(education.Item)) {
        return false
      }
    }

    return true
  }

  validateEducation (item) {
    return new EducationValidator(item, null).isValid()
  }

  /**
   * Determines if any items exist in the collection. This includes residence and employer
   * information
   */
  isEmpty () {
    return !this.containsResidence() && !this.containsEmployment() && !this.containsEducation()
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

  /**
   * Determines if any education items exist
   */
  containsEducation () {
    return this.props.history && this.props.history.Education && this.props.history.Education.List
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
    if (this.props.types.includes('Residence') && history.Residence && history.Residence.List) {
      const residences = history.Residence.List.map(r => {
        r.type = 'Residence'
        return r
      })

      list = list.concat(residences)
    }

    if (this.props.types.includes('Employment') && history.Employment && history.Employment.List) {
      const employment = history.Employment.List.map(r => {
        r.type = 'Employment'
        return r
      })

      list = list.concat(employment)
    }

    if (this.props.types.includes('Education') && history.Education && history.Education.List) {
      const education = history.Education.List.map(r => {
        r.type = 'Education'
        return r
      })

      list = list.concat(education)
    }

    this.setState({
      List: list.sort(this.sort)
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
    this.setState({ List: items }, () => {
      // filter list by current collection type being updated
      const filtered = items.filter(i => { return i.type === type })

      if (type === 'Residence' && this.props.onResidenceUpdate) {
        this.props.onResidenceUpdate({List: filtered})
      } else if (type === 'Employment' && this.props.onEmploymentUpdate) {
        this.props.onEmploymentUpdate({List: filtered})
      } else if (type === 'Education' && this.props.onEducationUpdate) {
        this.props.onEducationUpdate({List: filtered})
      } else {
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

    let indices = [...this.state.indices]
    indices.push(super.guid())

    this.setState({ currentNewItem: null, collectionType: null, indices: indices }, () => {
      this.doUpdate(type, items, () => {
        // Check to see if there are multiple types of items supported
        if (this.props.types.length === 1) {
          this.selectCollectionType(this.props.types[0])
        } else {
          this.refs.createOptions.scrollIntoView()
        }
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

    let indices = [...this.state.indices]
    indices.splice(index, 1)

    this.setState({ indices: indices }, () => {
      this.doUpdate(type, items)
    })
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
   * Residence | Employment | Education
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
      if (this.refs.createOptions.scrollIntoView) {
        this.refs.createOptions.scrollIntoView()
      }
    })
  }

  /**
   * Prepoulate a new item to fill in a particular gap.
   */
  fillGap (type, dates) {
    this.setState({
      collectionType: type,
      currentNewItem: {
        type: type,
        force: true,
        values: {
          Dates: {
            from: dates.from,
            to: dates.to
          }
        }
      }
    }, () => {
      if (this.refs.createOptions.scrollIntoView) {
        this.refs.createOptions.scrollIntoView()
      }
    })
  }

  /**
   * Contains the types of History objects a user can create
   */
  createOptions () {
    if (this.props.types.length < 2) {
      return (
        <div className="eapp-field-wrap" ref="createOptions"></div>
      )
    }

    let options = []
    if (this.props.types.includes('Residence')) {
      options.push(
        <Radio label="Residence"
               value="Residence"
               onChange={this.handleCollectionTypeChange}>
          <div className="eye-icon">
            <Svg src="img/residence-house.svg" />
          </div>
        </Radio>
      )
    }

    if (this.props.types.includes('Employment')) {
      options.push(
        <Radio label="Employer"
               value="Employment"
               onChange={this.handleCollectionTypeChange}>
          <div className="eye-icon">
            <Svg src="img/employer-briefcase.svg" />
          </div>
        </Radio>
      )
    }

    if (this.props.types.includes('Education')) {
      options.push(
        <Radio label="School/Degree"
               value="Education"
               onChange={this.handleCollectionTypeChange}>
          <div className="eye-icon">
            <Svg src="img/school-cap.svg" />
          </div>
        </Radio>
      )
    }

    return (
      <div>
        <h3>Add new</h3>
        <div className="eapp-field-wrap" ref="createOptions">
          <RadioGroup className="option-list eapp-extend-labels create"
                      name="createOptions"
                      selectedValue={this.state.collectionType}>
            {options}
          </RadioGroup>
        </div>
      </div>
    )
  }

  render () {
    // Inject any gaps in to our timeline
    const start = daysAgo(today, 365 * parseInt(this.props.total || 10))
    const list = this.props.showGaps
          ? InjectGaps(this.state.List, ['Residence', 'Employment'], start).sort(this.sort)
          : this.state.List.sort(this.sort)

    // Create the list items
    const listItems = list.map((item, i, arr) => {
      const firstRow = (i === 0)
      const lastRow = arr.length === (i + 1)

      if (item.type === 'Residence') {
        const hasErrors = !this.validateResidence(item.Item)
        const header = (<ResidenceSummary residence={item} hasErrors={hasErrors} />)
        const errorMessage = i18n.t('history.residence.collection.summary.incomplete')

        return (
          <Row header={header}
               index={i}
               key={this.state.indices[i]}
               first={firstRow}
               last={lastRow}
               hasErrors={hasErrors}
               errorMessage={errorMessage}
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
        const hasErrors = !this.validateEmployment(item.Item)
        const header = (<EmploymentSummary employment={item} hasErrors={hasErrors} />)
        const errorMessage = i18n.t('history.employment.default.collection.summary.incomplete')

        return (
          <Row header={header}
               index={i}
               key={this.state.indices[i]}
               first={firstRow}
               last={lastRow}
               hasErrors={hasErrors}
               errorMessage={errorMessage}
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

      if (item.type === 'Education') {
        const hasErrors = !this.validateEducation(item.Item)
        const header = (<EducationSummary education={item} hasErrors={hasErrors} />)
        const errorMessage = i18n.t('history.education.collection.school.summary.incomplete')

        return (
          <Row header={header}
               index={i}
               key={this.state.indices[i]}
               first={firstRow}
               last={lastRow}
               hasErrors={hasErrors}
               errorMessage={errorMessage}
               onRemove={this.remove.bind(this, item.type)}
               show={item.isNew}>
            <div className="education">
              <EducationItem name="Education"
                              {...item.Item}
                              onUpdate={this.onUpdate.bind(this, 'Education', i)}
                              onValidate={this.handleValidation}
                              />
            </div>
          </Row>
        )
      }

      if (item.type === 'Gap') {
        return (
          <Gap index={i}
               key={this.state.indices[i]}
               first={firstRow}
               last={lastRow}
               dates={item.Item.Dates}
               type={item.Item.Type}
               onClick={this.fillGap.bind(this, item.Item.Type, item.Item.Dates)}
               />
        )
      }

      return null
    })

    const force = (this.state.currentNewItem || {}).force || false
    const values = (this.state.currentNewItem || {}).values || {}

    // Render the defaults
    return (
      <div className="history-collection collection">

        <Show when={listItems.length === 0}>
          <div className="item">
            <div className="summary">
              <div className="caption gutters">
                <div className="title">
                  <h4>{i18n.t('collection.summary')}</h4>
                  <hr />
                </div>
              </div>
              <div className="gutters">
                There hasn&rsquo;t been any history saved yet. Please add details below.
              </div>
              <div className="divider gutters closed last">
                <hr />
              </div>
            </div>
          </div>
        </Show>

        { listItems }

        <div>
          {this.createOptions()}

          <Show when={this.state.collectionType === 'Residence'}>
            <div>
              <h2>{i18n.t('history.residence.heading.details')}</h2>
              {i18n.m('history.residence.para.details')}
              <ResidenceItem name="Residence"
                             {...values}
                             receiveProps={force}
                             onUpdate={this.onNewUpdate.bind(this, 'Residence')}
                             onValidate={this.handleValidation}
                             />
            </div>
          </Show>

          <Show when={this.state.collectionType === 'Employment' && this.props.types.length > 1}>
            <div>
              <h2>{i18n.t('history.employment.heading.employment')}</h2>
              {i18n.m('history.employment.para.employment')}
              {i18n.m('history.employment.para.employment2')}
            </div>
          </Show>

          <Show when={this.state.collectionType === 'Employment'}>
            <div className="employment">
              <EmploymentItem name="Employment"
                              {...values}
                              receiveProps={force}
                              onUpdate={this.onNewUpdate.bind(this, 'Employment')}
                              onValidate={this.handleValidation}
                              />
            </div>
          </Show>

          <Show when={this.state.collectionType === 'Education' && this.props.types.length > 1}>
            <div>
              <h2>{i18n.t('history.education.title')}</h2>
              {i18n.m('history.education.info')}
            </div>
          </Show>

          <Show when={this.state.collectionType === 'Education'}>
            <div className="education">
              <EducationItem name="Education"
                             onUpdate={this.onNewUpdate.bind(this, 'Education')}
                             onValidate={this.handleValidation}
                             />
            </div>
          </Show>

          <Show when={this.state.collectionType}>
            <div>
              <hr className="section-divider" />
              <h2>Done! Now let's add some more</h2>
              <p>Use the button below to save your first history entry and start another</p>
              <div>
                <button className="add usa-button-outline" onClick={this.create}>
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
