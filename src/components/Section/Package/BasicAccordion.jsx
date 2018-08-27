import React from 'react'
import { Show } from '../../Form'

export default class BasicAccordion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [...this.props.items]
    }
  }

  toggle(item, index) {
    const items = [...this.state.items]
    item.open = !item.open
    items[index] = item
    this.setState({
      items: items
    })
  }

  render() {
    const items = this.state.items.map((item, index) => {
      const toggle = this.toggle.bind(this, item, index)
      const validIcon = item.valid() ? <span className="valid-icon" /> : null
      return (
        <BasicAccordionItem
          key={item.title}
          onClick={toggle}
          component={item.component()}
          title={item.title}
          validIcon={validIcon}
          open={item.open}
          scrollIntoView={item.scrollIntoView}
          aria-expanded={item.open}
        />
      )
    })

    return (
      <div className="basic-accordion">
        <ul className="usa-accordion-bordered">{items}</ul>
      </div>
    )
  }
}

class BasicAccordionItem extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.scrollIntoView !== this.props.scrollIntoView &&
      nextProps.scrollIntoView === true
    ) {
      const timeout = 350
      const offset = 100
      window.setTimeout(() => {
        const t = this.refs.item.getBoundingClientRect().top
        window.scrollBy({ top: t - offset, left: 0, behavior: 'smooth' })
      }, timeout)
    }
  }

  render() {
    return (
      <li ref="item">
        <button
          className="usa-accordion-button"
          onClick={this.props.onClick}
          aria-expanded={this.props.open}>
          {this.props.title}
          {this.props.validIcon}
        </button>
        <Show when={this.props.open}>
          <div aria-hidden="false" className="usa-accordion-content">
            {this.props.component}
          </div>
        </Show>
      </li>
    )
  }
}

BasicAccordion.defaultProps = {
  items: []
}
