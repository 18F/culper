import React from 'react'
import navigation from '../../config/navigation'

export const getSectionConfig = (section) => {
  return navigation.find(n => n.url === section)
}

export const getSubsectionComponent = (storeToComponentMap, name) => {
  // https://reactjs.org/docs/jsx-in-depth.html#choosing-the-type-at-runtime
  const SubsectionComponent = storeToComponentMap[name]
  if (!SubsectionComponent) {
    console.error(`${name} component not found`)
  }
  return SubsectionComponent
}

// Returns the component corresponding to the provided subsection object
export const createSubsection = (storeToComponentMap,subsection, extraProps = {}) => {
  const SubsectionComponent = getSubsectionComponent(storeToComponentMap, subsection.store)

  const props = {
    key: subsection.url,
    name: subsection.url,
    ...extraProps
  }

  return React.createElement(SubsectionComponent, props)
}

// Returns a new array with section dividers after each component
export const addDividers = (components) => {
  // essentially this is a flatMap()
  const componentsWithDividers = []
  components.forEach((component) => {
    componentsWithDividers.push(component)

    const divider = <hr key={`${component.key}-divider`} className="section-divider" />
    componentsWithDividers.push(divider)
  })

  return componentsWithDividers
}
