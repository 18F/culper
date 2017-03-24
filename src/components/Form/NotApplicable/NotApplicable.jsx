import React from 'react'
import { i18n } from '../../../config'
import Checkbox from '../Checkbox'

export default class NotApplicable extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      applicable: props.applicable
    }

    this.onUpdate = this.onUpdate.bind(this)
  }

  onUpdate (values) {
    this.setState({ applicable: !this.state.applicable }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          applicable: this.state.applicable
        })
      }
    })
  }

  renderChildren () {
    if (this.state.applicable) {
      return this.props.children
    }

    // return React.cloneElement(this.props.children, { disabled: true })
    return React.Children.map(this.props.children, (child) => {
      let extendedProps = { disabled: true }

      return React.cloneElement(child, {
        ...child.props,
        ...extendedProps
      })
    })
  }

  render () {
    // Append on any classes passed down
    const klass = `${this.props.className || ''}`.trim()
    const dithered = this.state.applicable ? '' : 'dithered'

    // When there is nothing special do the status quo
    return (
      <div className="not-applicable">
        <div className={`${klass} button`.trim()}>
          <Checkbox name={this.props.name}
                    label={this.props.label}
                    checked={!this.state.applicable}
                    onUpdate={this.onUpdate}
                    />
          {this.props.or}
        </div>
        <div className={`${klass} ${dithered} content`.trim()}>
          {this.renderChildren()}
        </div>
      </div>
    )
  }
}

NotApplicable.defaultProps = {
  name: 'NotApplicable',
  label: i18n.t('financial.bankruptcy.notApplicable'),
  or: '',
  applicable: true
}
