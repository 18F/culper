import React from 'react'
import ValidationElement from '../ValidationElement'

export default class Collection extends ValidationElement {
  constructor (props) {
    super(props)

    let min = this.props.minimum || 0
    this.state = {
      minimum: min,
      length: min,
      items: this.factory(min)
    }

    this.add = this.add.bind(this)
  }

  generateKey () {
    return new Date().getTime()
  }

  factory (min) {
    let collection = []
    for (let i = 0; i < min; i++) {
      collection.push({
        id: this.generateKey(),
        children: [...React.Children.toArray(this.props.children)]
      })
    }
    return collection
  }

  append () {
    let collection = this.state.items
    collection.push({
      id: this.generateKey(),
      children: [...React.Children.toArray(this.props.children)]
    })
    this.setState({ items: collection })
  }

  remove (id) {
    let collection = []
    this.state.items.forEach((item) => {
      if (item.id !== id) {
        collection.push(item)
      }
    })
    this.setState({ items: collection })
  }

  render () {
    let content = this.state.items.map((item) => {
      return (
        <div key={item.id}>
          {item.children}
        </div>
      )
    })

    return (
      <div className="collection">
        {content}
        <div className="text-center">
          <button onClick={this.add}>{this.props.textAppend}</button>
        </div>
      </div>
    )
  }
}
