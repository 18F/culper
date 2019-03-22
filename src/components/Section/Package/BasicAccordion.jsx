import React from 'react'
import PropTypes from 'prop-types'

import { Show } from 'components/Form'

const BasicAccordion = ({ items }) => (
  <div className="basic-accordion">
    <ul className="usa-accordion-bordered">
      {items.map((i) => {
        const validIcon = i.valid() ? <span className="valid-icon" /> : null

        return (
          <BasicAccordionItem
            key={i.title}
            component={i.component()}
            onClick={i.onClick}
            title={i.title}
            validIcon={validIcon}
            open={i.open}
            scrollIntoView={i.scrollIntoView}
            aria-expanded={i.open}
          />
        )
      })}
    </ul>
  </div>
)

BasicAccordion.propTypes = {
  items: PropTypes.array,
}

BasicAccordion.defaultProps = {
  items: [],
}

export default BasicAccordion

class BasicAccordionItem extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { scrollIntoView } = this.props

    if (nextProps.scrollIntoView !== scrollIntoView
      && nextProps.scrollIntoView === true) {
      const timeout = 350
      const offset = 100
      window.setTimeout(() => {
        const t = this.item.getBoundingClientRect().top
        window.scrollBy({ top: t - offset, left: 0, behavior: 'smooth' })
      }, timeout)
    }
  }

  render() {
    const {
      onClick, open, title, validIcon, component,
    } = this.props

    return (
      <li ref={(el) => { this.item = el }}>
        <button
          type="button"
          className="usa-accordion-button"
          onClick={onClick}
          aria-expanded={open}
        >
          {title}
          {validIcon}
        </button>
        <Show when={open}>
          <div aria-hidden="false" className="usa-accordion-content">
            {component}
          </div>
        </Show>
      </li>
    )
  }
}

BasicAccordionItem.propTypes = {
  onClick: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.node.isRequired,
  validIcon: PropTypes.node,
  component: PropTypes.node.isRequired,
  scrollIntoView: PropTypes.bool,
}

BasicAccordionItem.defaultProps = {
  onClick: () => {},
  open: false,
  validIcon: null,
  scrollIntoView: false,
}
