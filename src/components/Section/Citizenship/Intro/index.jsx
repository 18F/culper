import React from 'react'

import i18n from 'util/i18n'
import { CITIZENSHIP } from 'config/formSections/citizenship'

import SectionIntro from 'components/Section/shared/SectionIntro'

const Intro = () => (
  <SectionIntro
    title={i18n.t('citizenship.intro.title')}
    body={i18n.m('citizenship.intro.body')}
    sectionKey={CITIZENSHIP.key}
  />
)

export default Intro
