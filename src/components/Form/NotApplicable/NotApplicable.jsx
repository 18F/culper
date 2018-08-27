import React from 'react'
import { i18n } from '../../../config'
import Checkbox from '../Checkbox'

export default class NotApplicable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      applicable: props.applicable
    }
    this.errors = []
    this.onUpdate = this.onUpdate.bind(this)
  }

  onUpdate(values) {
    const next = !this.state.applicable
    this.setState({ applicable: next }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          applicable: next
        })

        let lastErrors = [...this.errors]
        if (!next) {
          // If not applicable, we set all validators to valid
          // since we shouldn't take into account their values
          lastErrors = lastErrors.map(err => {
            return {
              code: err.code,
              valid: true,
              uid: err.uid
            }
          })
          this.props.onError('', [...lastErrors])
        } else {
          // If we are applicable, then let's send up that last set
          // of errors
          this.props.onError('', [...this.errors])
        }
      }
    })
  }

  renderChildren() {
    return React.Children.map(this.props.children, child => {
      let extendedProps = {
        disabled: !this.state.applicable,
        required: this.state.applicable && (child.props.required || false),
        onError: (value, arr) => {
          let errors = [...this.errors]
          for (const e of arr) {
            const idx = errors.findIndex(
              x => x.uid === e.uid && x.code === e.code
            )
            if (idx !== -1) {
              errors[idx] = { ...e }
            } else {
              errors.push({ ...e })
            }
          }
          // Store latest errors
          this.errors = [...errors]
          this.props.onError(value, arr)
          return arr
        }
      }

      return React.cloneElement(child, {
        ...child.props,
        ...extendedProps
      })
    })
  }

  render() {
    // Append on any classes passed down
    const klass = `${this.props.className || ''}`.trim()
    const dithered = this.state.applicable ? 'enable' : 'disable'

    // When there is nothing special do the status quo
    return (
      <div
        className={`not-applicable ${dithered} ${
          this.props.or ? 'with-or' : ''
        }`.trim()}>
        <div className={`${klass} ${dithered} content`.trim()}>
          {this.renderChildren()}
        </div>
        <div className={`${klass} button`.trim()}>
          <div className="or">{this.props.or}</div>
          <Checkbox
            name={this.props.name}
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
  onError: (value, arr) => {
    return arr
  }
}
