import React from 'react'
import { i18n } from '../../config'
import SubsectionElement from './SubsectionElement'
import { Field, Text } from '../Form'

export default class SectionComments extends SubsectionElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateComments = this.updateComments.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Comments: this.props.Comments,
      ...queue
    })
  }

  updateComments (values) {
    this.update({
      Comments: values
    })
  }

  render () {
    return (
      <Field title={this.props.title}
             titleSize="h4"
             optional={true}
             optionalText={i18n.t('app.optional')}
             className="section-comment">
        <Text name="Comments"
              {...this.props.Comments}
              onUpdate={this.updateComments}
              />
      </Field>
    )
  }
}

SectionComments.defaultProps = {
  title: '',
  Comments: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'identification',
  subsection: 'comments',
  dispatch: () => {},
  validator: (data) => {
    return true
  },
  defaultState: true
}
