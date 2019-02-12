import React from 'react'
import { i18n } from '../../../config'
import { Field } from '../../Form'

const Intro = () => {
  return (
    <div>
      <h1 className="section-header">{i18n.t('identification.intro.title')}</h1>
      <Field
        optional={true}
        className="no-margin-bottom">
        {i18n.m('identification.intro.body')}
      </Field>
    </div>
  )
}

export default Intro
