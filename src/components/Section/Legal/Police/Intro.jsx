import React from 'react'
import { i18n } from 'config'
import { Field } from 'components/Form'

const PoliceIntro = () => (
  <div>
    <h1 className="section-header">{i18n.t('legal.intro.title')}</h1>
    <Field
      optional
      className="no-margin-bottom"
    >
      {i18n.m('legal.intro.body')}
    </Field>
  </div>
)

export default PoliceIntro
