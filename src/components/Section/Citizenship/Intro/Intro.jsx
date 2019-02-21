import React from 'react'
import { i18n } from '@config'
import { Field } from '@components/Form'

const Intro = () => (
  <div>
    <h1 className="section-header">{i18n.t('citizenship.intro.title')}</h1>
    <Field
      className="no-margin-bottom"
      optional
    >
      {i18n.m('citizenship.intro.body')}
    </Field>
  </div>
)

export default Intro
