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
    return React.Children.map(this.props.children, (child) => {
      let extendedProps = {
        disabled: !this.state.applicable,
        onError: this.props.onError
      }

      return React.cloneElement(child, {
        ...child.props,
        ...extendedProps
      })
    })
  }

  render () {
    // Append on any classes passed down
    const klass = `${this.props.className || ''}`.trim()
    const dithered = this.state.applicable ? '' : 'disabled'

    // When there is nothing special do the status quo
    return (
      <div className={`not-applicable ${this.props.or ? 'with-or' : ''}`.trim()}>
        <div className={`${klass} ${dithered} content`.trim()}>
          {this.renderChildren()}
        </div>
        <div className={`${klass} button`.trim()}>
          <div className="or">{this.props.or}</div>
          <Checkbox name={this.props.name}
                    label={this.props.label}
                    checked={!this.state.applicable}
                    onUpdate={this.onUpdate}
                    onError={this.props.onError}
                    />
        </div>
      </div>
    )
  }
}

NotApplicable.defaultProps = {
  name: 'NotApplicable',
  label: i18n.t('financial.bankruptcy.notApplicable'),
  or: '',
  applicable: true,
  onError: (value, arr) => { return arr }
}
