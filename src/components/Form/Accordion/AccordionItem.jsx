import React from 'react'

export default class AccordionItem extends React.Component {
  constructor(props) {
    super(props)
    this.dynamicProperties = this.dynamicProperties.bind(this)
    this.update = this.update.bind(this)
    this.factory = this.factory.bind(this)
  }

  dynamicProperties(children) {
    const parent = this.props
    let dynamo = {}

    React.Children.map(children, child => {
      const name = child.props.name || ''

      if (React.isValidElement(child)) {
        if (name && child.props.bind) {
          dynamo[child.props.name] = parent[child.props.name] || {}
        }
      }

      const typeOfChildren = Object.prototype.toString.call(
        child.props.children
      )
      if (
        child.props.children &&
        ['[object Object]', '[object Array]'].includes(typeOfChildren)
      ) {
        if (name) {
          dynamo[name] = this.dynamicProperties(child.props.children)
        } else {
          dynamo = {
            ...dynamo,
            ...this.dynamicProperties(child.props.children)
          }
        }
      }
    })

    return dynamo
  }

  update(queue) {
    this.props.onUpdate({
      ...this.dynamicProperties(this.props.children),
      ...queue
    })
  }

  factory(children) {
    const parent = this.props
    return React.Children.map(children, child => {
      let childProps = {}

      if (React.isValidElement(child)) {
        const data = parent[child.props.name || 'Extra'] || {}
        if (child.props.bind) {
          childProps = {
            ...child.props,
            ...data,
            defaultState: parent.defaultState,
            scrollIntoView: parent.scrollIntoView,
            required: parent.required,
            dispatch: parent.dispatch,
            onUpdate: values => {
              this.update({
                [child.props.name]: values
              })
            },
            onError: parent.onError
          }
        }
      }

      const typeOfChildren = Object.prototype.toString.call(
        child.props.children
      )
      if (
        child.props.children &&
        ['[object Object]', '[object Array]'].includes(typeOfChildren)
      ) {
        childProps.children = this.factory(child.props.children)
      }

      return React.cloneElement(child, childProps)
    })
  }

  render() {
    return <div>{this.factory(this.props.children)}</div>
  }
}

AccordionItem.defaultProps = {
  name: 'Item',
  bind: true,
  defaultState: true,
  scrollIntoView: false,
  required: false,
  dispatch: () => {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
