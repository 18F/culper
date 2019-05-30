import React from 'react'
import { Branch } from '../index'
import { newGuid } from '../ValidationElement'
import { scrollToBottom as scrollToBottomFn } from '../Accordion/Accordion'

export default class BranchCollection extends React.Component {
  constructor(props) {
    super(props)
    this.content = this.content.bind(this)
  }

  /**
   * Updates existing selected branch values
   */
  onBranchClick(item, index, values) {
    const {
      items, valueKey, removable, onUpdate,
    } = this.props

    const newItems = [...items]
    switch (values.value) {
      case 'Yes':
        if (!newItems[index].Item) {
          newItems[index].Item = {}
        }
        newItems[index].Item = {
          ...newItems[index].Item,
          [valueKey]: values,
        }
        break
      default: {
        const isLastItem = index + 1 >= items.length
        if (!isLastItem && removable) {
          // If it's not the last item being marked as No, then remove it. This addresses the issue
          // where the user must click No twice on the last item.
          newItems.splice(index, 1)
        } else if (index === 0 && newItems.length === 1) {
          // If this is the first and last item, and "no" has been selected, then clear out
          // any persisted data **except** the branch value.
          newItems[index] = {
            Item: {
              [valueKey]: values,
            },
            index: item.index,
          }
        } else {
          // If this is the last item then we still need to remove it.
          newItems.splice(index, 1)
        }
      }
    }

    onUpdate({ items: newItems })
  }

  /**
   * Used when populating branch values for the first time
   */
  onDefaultBranchClick(values) {
    const { valueKey, onUpdate } = this.props

    const item = {
      Item: { [valueKey]: values },
      index: newGuid(),
    }
    const items = [item]
    onUpdate({ items })
  }

  /**
   * Used when a user decides to add new information. This refers to the last
   * displayed yes/no branch
   */
  onLastBranchClick(values) {
    const {
      items, valueKey, scrollToBottom, onUpdate,
    } = this.props

    const item = {
      Item: { [valueKey]: values },
      index: newGuid(),
    }

    if (values.value === 'Yes') {
      const newItems = [...items]
      newItems.push(item)
      onUpdate({ items: newItems })
    } else {
      const newItems = [...items]
      newItems.push(item)
      if (scrollToBottom) {
        scrollToBottomFn(scrollToBottom)
      }
      onUpdate({ items: newItems })
    }
  }

  recursiveCloneChildren(children, item, index) {
    return React.Children.map(children, (child) => {
      let childProps = {}
      if (React.isValidElement(child)) {
        if (child.props.bind) {
          const { items, onUpdate, onError } = this.props
          const field = item[child.props.name]
          childProps = { ...field }
          childProps.onUpdate = (value) => {
            const newItems = [...items]
            const newItem = newItems[index][child.props.name]
            newItems[index][child.props.name] = {
              ...newItem,
              ...value,
            }
            onUpdate({ items: newItems })
          }
          childProps.onError = onError
        }
      }

      const typeOfChildren = Object.prototype.toString.call(
        child.props.children
      )
      if (child.props.children
        && ['[object Object]', '[object Array]'].includes(typeOfChildren)
      ) {
        childProps.children = this.recursiveCloneChildren(
          child.props.children,
          item,
          index
        )
      }

      return React.cloneElement(child, childProps)
    })
  }

  /**
   * Helper that renders branch information. Allows props to be overriden
   */
  branch(props) {
    const { required, scrollIntoView } = this.props

    return (
      <Branch
        name={props.name}
        label={props.label}
        labelSize={props.labelSize}
        className={props.className}
        help={props.help}
        {...props.value || {}}
        warning={props.warning}
        onUpdate={props.onUpdate}
        required={required}
        onError={props.onError}
        scrollIntoView={scrollIntoView}
      >
        {props.children}
      </Branch>
    )
  }

  content() {
    const {
      items, valueKey, branchName, label, labelSize, help, content, onError,
      branchClassName, appendLabel, appendSize, appendContent, children,
    } = this.props

    const renderItems = (items || []).map((item) => {
      if (!item.index) {
        item.index = newGuid() // eslint-disable-line
      }
      return item
    })

    const hasNo = !!renderItems.find(item => ((item.Item || {})[valueKey] || {}).value !== 'Yes')

    // When no items are present, render default branch yes/no
    if (renderItems.length === 0) {
      return (
        <div>
          {this.branch({
            name: branchName,
            label,
            labelSize,
            help,
            value: {},
            warning: false,
            children: content,
            onUpdate: this.onDefaultBranchClick.bind(this),
            onError,
          })}
        </div>
      )
    }

    // If a branch has been selected but it has a `No` value, rather than deleting, we'll update
    // its value
    if (renderItems.length === 1
      && ((renderItems[0].Item || {})[valueKey] || {}).value === 'No'
    ) {
      const [item] = items
      return (
        <div key={item.index}>
          {this.branch({
            name: branchName,
            label,
            labelSize,
            help,
            value: { value: 'No' },
            warning: false,
            children: content,
            onUpdate: this.onBranchClick.bind(this, item, 0),
            onError,
          })}
        </div>
      )
    }

    // When more than 1 item is in
    const top = (index, item) => {
      const className = ((item.Item || {})[valueKey] || {}).value === 'Yes'
        ? branchClassName
        : null

      if (index === 0) {
        return this.branch({
          name: branchName,
          label,
          labelSize,
          className,
          value: (item.Item || {})[valueKey],
          warning: true,
          help,
          children: content,
          onUpdate: this.onBranchClick.bind(this, item, index),
          onError,
        })
      }

      return this.branch({
        name: branchName,
        label: appendLabel,
        labelSize: appendSize,
        className,
        help,
        value: (item.Item || {})[valueKey],
        warning: true,
        children: appendContent,
        onUpdate: this.onBranchClick.bind(this, item, index),
        onError,
      })
    }

    // Render the branch question at the very end
    const bottom = (index, item, arr) => {
      if (index < arr.length - 1 || hasNo) {
        return null
      }

      return this.branch({
        name: branchName,
        className: 'last-branch',
        label: appendLabel,
        labelSize: appendSize,
        help,
        onUpdate: this.onLastBranchClick.bind(this),
        children: appendContent,
        value: {},
        warning: false,
      })
    }

    const kiddos = (index, item) => {
      const key = (item.Item || {})[valueKey] || {}
      return key.value === 'Yes'
        ? this.recursiveCloneChildren(children, item, index)
        : null
    }

    const rows = renderItems.map((item, index, arr) => (
      <div key={item.index}>
        {top(index, item, arr)}
        <div>{kiddos(index, item)}</div>
        {bottom(index, item, arr)}
      </div>
    ))

    return <div>{rows}</div>
  }

  render() {
    const { className } = this.props
    return <div className={className}>{this.content()}</div>
  }
}

BranchCollection.defaultProps = {
  // Items in the collection to render
  items: [],

  // If selecting No removes the item
  removable: true,

  // Input name for the supporting Branch component
  branchName: 'branchcollection',

  // Branch help id
  help: '',

  // Key name that stores whether yes/no has been selected
  valueKey: 'Has',

  label: '',
  labelSize: 'h4',
  content: null,
  appendLabel: '',
  appendSize: 'h4',
  appendContent: null,

  onUpdate: () => {
    console.warn(
      'onUpdate function not provided in BranchCollection. Please add one or your updates will not work'
    )
  },
  scrollToBottom: '',
  branchClassName: '',
}

BranchCollection.errors = []
