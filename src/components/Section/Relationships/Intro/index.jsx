import React from 'react'

import i18n from 'util/i18n'

import { RELATIONSHIPS } from 'config/formSections/relationships'

import SectionIntro from 'components/Section/shared/SectionIntro'

const Intro = () => (
  <SectionIntro
    title={i18n.t('relationships.intro.title')}
    body={i18n.m('relationships.intro.body')}
    sectionKey={RELATIONSHIPS.key}
  />
)

export default Intro
