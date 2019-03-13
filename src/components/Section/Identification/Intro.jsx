import React from 'react'
import { i18n } from 'config'
import { Field } from 'components/Form'

const Intro = () => (
  <div>
    <h1 className="section-header">{i18n.t('identification.intro.title')}</h1>
    <Field
      optional
      className="no-margin-bottom"
    >
      {i18n.m('identification.intro.body')}
    </Field>
  </div>
)

export default Intro
