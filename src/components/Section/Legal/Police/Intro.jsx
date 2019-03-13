import React from 'react'
import { i18n } from 'config'
import { Field } from 'components/Form'

const PoliceIntro = () => (
  <div>
    <h1 className="section-header">{i18n.t('legal.police.heading.title')}</h1>
    <Field
      optional
      className="no-margin-bottom"
    >
      {i18n.m('legal.police.para.intro1')}
      {i18n.m('legal.police.para.intro2')}
      {i18n.m('legal.police.para.intro3')}
    </Field>
  </div>
)

export default PoliceIntro
