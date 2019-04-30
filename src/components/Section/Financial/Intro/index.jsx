import React from 'react'

import i18n from 'util/i18n'
import { FINANCIAL } from 'config/formSections/financial'

import SectionIntro from 'components/Section/shared/SectionIntro'

const Intro = () => (
  <SectionIntro
    title={i18n.t('financial.intro.title')}
    body={i18n.m('financial.intro.body')}
    sectionKey={FINANCIAL.key}
  />
)

export default Intro
