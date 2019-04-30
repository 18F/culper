import React from 'react'

import i18n from 'util/i18n'
import { LEGAL } from 'config/formSections/legal'

import SectionIntro from 'components/Section/shared/SectionIntro'

const Intro = () => (
  <SectionIntro
    title={i18n.t('legal.intro.title')}
    body={i18n.m('legal.intro.body')}
    sectionKey={LEGAL.key}
  />
)

export default Intro
