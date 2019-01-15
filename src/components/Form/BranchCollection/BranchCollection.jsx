import React from 'react'
import { Branch } from '../../Form'
import { newGuid } from '../ValidationElement'
import { scrollToBottom } from '../Accordion/Accordion'

export default class BranchCollection extends React.Component {
  constructor(props) {
    super(props)
    this.content = this.content.bind(this)
  }

  /**
   * Updates existing selected branch values
   */
  onBranchClick(item, index, values) {
    let items = [...this.props.items]
    switch (values.value) {
      case 'Yes':
        if (!items[index].Item) {
          items[index].Item = {}
        }
        items[index].Item = {
          ...items[index].Item,
          [this.props.valueKey]: values
        }
        break
      default: {
        const isLastItem = index + 1 >= this.props.items.length
        if (!isLastItem && this.props.removable) {
          // If it's not the last item being marked as No, then remove it. This addresses the issue
          // where the user must click No twice on the last item.
          items.splice(index, 1)
        } else if (index === 0 && items.length === 1) {
          // If this is the first and last item, and "no" has been selected, then clear out
          // any persisted data **except** the branch value.
          items[index] = {
            Item: {
              [this.props.valueKey]: values
            },
            index: item.index
          }
        } else {
          // If this is the last item then we still need to remove it.
          items.splice(index, 1)
        }
      }
    }

    this.props.onUpdate({ items: items })
  }

  /**
   * Used when populating branch values for the first time
   */
  onDefaultBranchClick(values) {
    let item = {
      Item: {
        [this.props.valueKey]: values
      },
      index: newGuid()
    }
    let items = [item]
    this.props.onUpdate({ items: items })
  }

  /**
   * Used when a user decides to add new information. This refers to the last displayed yes/no branch
   */
  onLastBranchClick(values) {
    let item = {
      Item: {
        [this.props.valueKey]: values
      },
      index: newGuid()
    }
    if (values.value === 'Yes') {
      let items = [...this.props.items]
      items.push(item)
      this.props.onUpdate({ items: items })
    } else {
      let items = [...this.props.items]
      items.push(item)
      if (this.props.scrollToBottom) {
        scrollToBottom(this.props.scrollToBottom)
      }
      this.props.onUpdate({ items: items })
    }
  }

  recursiveCloneChildren(children, item, index) {
    return React.Children.map(children, child => {
      var childProps = {}
      if (React.isValidElement(child)) {
        if (child.props.bind) {
          let field = item[child.props.name]
          childProps = { ...field }
          childProps.onUpdate = value => {
            let items = [...this.props.items]
            const item = items[index][child.props.name]
            items[index][child.props.name] = {
              ...item,
              ...value
            }
            this.props.onUpdate({ items: items })
          }
          childProps.onError = this.props.onError
        }
      }

      const typeOfChildren = Object.prototype.toString.call(
        child.props.children
      )
      if (
        child.props.children &&
        ['[object Object]', '[object Array]'].includes(typeOfChildren)
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
        required={this.props.required}
        onError={props.onError}
        scrollIntoView={this.props.scrollIntoView}>
        {props.children}
      </Branch>
    )
  }

  content() {
    let items = (this.props.items || []).map(item => {
      if (!item.index) {
        item.index = newGuid()
      }
      return item
    })
    let hasNo = !!items.find(
      item => ((item.Item || {})[this.props.valueKey] || {}).value !== 'Yes'
    )

    // When no items are present, render default branch yes/no
    if (items.length === 0) {
      return (
        <div>
          {this.branch({
            name: this.props.branchName,
            label: this.props.label,
            labelSize: this.props.labelSize,
            help: this.props.help,
            value: {},
            warning: false,
            children: this.props.content,
            onUpdate: this.onDefaultBranchClick.bind(this),
            onError: this.props.onError
          })}
        </div>
      )
    }

    // If a branch has been selected but it has a `No` value, rather than deleting, we'll update
    // its value
    if (
      items.length === 1 &&
      ((items[0].Item || {})[this.props.valueKey] || {}).value === 'No'
    ) {
      var item = this.props.items[0]
      return (
        <div key={item.index}>
          {this.branch({
            name: this.props.branchName,
            label: this.props.label,
            labelSize: this.props.labelSize,
            help: this.props.help,
            value: { value: 'No' },
            warning: false,
            children: this.props.content,
            onUpdate: this.onBranchClick.bind(this, item, 0),
            onError: this.props.onError
          })}
        </div>
      )
    }

    // When more than 1 item is in
    const top = (index, item, arr) => {
      const className =
        ((item.Item || {})[this.props.valueKey] || {}).value === 'Yes'
          ? this.props.branchClassName
          : null
      if (index === 0) {
        return this.branch({
          name: this.props.branchName,
          label: this.props.label,
          labelSize: this.props.labelSize,
          className: className,
          value: (item.Item || {})[this.props.valueKey],
          warning: true,
          help: this.props.help,
          children: this.props.content,
          onUpdate: this.onBranchClick.bind(this, item, index),
          onError: this.props.onError
        })
      }

      return this.branch({
        name: this.props.branchName,
        label: this.props.appendLabel,
        labelSize: this.props.appendSize,
        className: className,
        help: this.props.help,
        value: (item.Item || {})[this.props.valueKey],
        warning: true,
        children: this.props.appendContent,
        onUpdate: this.onBranchClick.bind(this, item, index),
        onError: this.props.onError
      })
    }

    // Render the branch question at the very end
    const bottom = (index, item, arr) => {
      if (index < arr.length - 1 || hasNo) {
        return null
      }

      return this.branch({
        name: this.props.branchName,
        className: 'last-branch',
        label: this.props.appendLabel,
        labelSize: this.props.appendSize,
        help: this.props.help,
        onUpdate: this.onLastBranchClick.bind(this),
        children: this.appendContent,
        value: {},
        warning: false
      })
    }

    const kiddos = (index, item) => {
      const key = (item.Item || {})[this.props.valueKey] || {}
      return key.value === 'Yes'
        ? this.recursiveCloneChildren(this.props.children, item, index)
        : null
    }

    const rows = items.map((item, index, arr) => {
      return (
        <div key={item.index}>
          {top(index, item, arr)}
          <div>{kiddos(index, item)}</div>
          {bottom(index, item, arr)}
        </div>
      )
    })

    return <div>{rows}</div>
  }

  render() {
    return <div className={this.props.className}>{this.content()}</div>
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
  branchClassName: ''
}

BranchCollection.errors = []
