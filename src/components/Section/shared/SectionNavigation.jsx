import React from 'react'

import { env } from '@config'
import { getBackAndNext } from '@helpers/navigation'

import SectionNavButton from './SectionNavButton'

const SectionNavigation = ({ section, subsection }) => {
  const { back, next } = getBackAndNext({ section, subsection })

  if (!back && !next) {
    return null
  }

  const goToSection = (path) => {
    env.History().push(path)
  }

  const backOnClick = back && (() => { goToSection(`/form${back.path}`) })
  const nextOnClick = next && (() => { goToSection(`/form${next.path}`) })

  return (
    <div className="bottom-btns">
      <div className="btn-wrap">
        <div className="btn-container">
          <SectionNavButton
            direction="back"
            label={back && back.navLabel}
            onClick={backOnClick}
            isEmpty={!back} />
          <div className="btn-spacer" />
          <SectionNavButton
            direction="next"
            label={next && next.navLabel}
            onClick={nextOnClick}
            isEmpty={!next} />
        </div>
      </div>
    </div>
  )
}

export default SectionNavigation
