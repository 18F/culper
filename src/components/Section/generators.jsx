import React from 'react'
import { i18n } from '../../config'
import { SectionView } from './SectionView'

export const getComponentByName = (storeToComponentMap, name) => {
  // https://reactjs.org/docs/jsx-in-depth.html#choosing-the-type-at-runtime
  const NamedComponent = storeToComponentMap[name]
  if (!NamedComponent) {
    console.error(`${name} component not found`)
  }
  return NamedComponent
}

// Returns the component corresponding to the provided subsection object
export const createSubsection = (
  storeToComponentMap,
  subsection,
  extraProps = {}
) => {
  const SubsectionComponent = getComponentByName(
    storeToComponentMap,
    subsection.store
  )

  const props = {
    key: subsection.url,
    name: subsection.url,
    ...extraProps
  }

  return <SubsectionComponent {...props} />
}

export const createSectionView = (
  section,
  subsection,
  prevUrl,
  nextUrl,
  subsectionComponent
) => {
  return (
    <SectionView
      key={`${section}/${subsection.url}`}
      name={subsection.url}
      back={`${section}/${prevUrl}`}
      backLabel={i18n.t(`${section}.destination.${prevUrl}`)}
      next={`${section}/${nextUrl}`}
      nextLabel={i18n.t(`${section}.destination.${nextUrl}`)}>
      {subsectionComponent}
    </SectionView>
  )
}

// Returns a new array with section dividers after each component
export const addDividers = components => {
  // essentially this is a flatMap()
  const componentsWithDividers = []
  components.forEach(component => {
    componentsWithDividers.push(component)

    const divider = (
      <hr key={`${component.key}-divider`} className="section-divider" />
    )
    componentsWithDividers.push(divider)
  })

  return componentsWithDividers
}
