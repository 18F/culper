import React from 'react'
import { i18n } from '../../config'
import { Field } from '../Form'
import { SectionView } from './SectionView'

import identification from './Identification/subsections'

// section name (lower case) -> subsection store name -> subsection component
const componentsBySectionAndStore = {
  identification
}

export const getComponentByName = (storeToComponentMap, name) => {
  // https://reactjs.org/docs/jsx-in-depth.html#choosing-the-type-at-runtime
  const NamedComponent = storeToComponentMap[name]
  if (!NamedComponent) {
    console.error(`${name} component not found`)
  }
  return NamedComponent
}

const getSubsectionByName = (sectionName, subsectionName) => {
  const storeToComponentMap = componentsBySectionAndStore[sectionName]
  if (!storeToComponentMap) {
    console.error(`${sectionName} not included in componentsBySectionAndStore`)
  }
  return getComponentByName(storeToComponentMap, subsectionName)
}

// Returns the component corresponding to the provided subsection object
export const createSubsection = (sectionName, subsection, extraProps = {}) => {
  const SubsectionComponent = getSubsectionByName(sectionName, subsection.store)

  const props = {
    key: subsection.url,
    name: subsection.url,
    ...extraProps
  }

  return <SubsectionComponent {...props} />
}

const createSectionView = (
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
  components.forEach((component, index, array) => {
    componentsWithDividers.push(component)

    const divider = (
      <hr key={`${component.key}-divider`} className="section-divider" />
    )

    if (index !== array.length - 1) {
      componentsWithDividers.push(divider)
    }
  })

  return componentsWithDividers
}

export const createIntroSubsection = (section, prevSection = undefined) => {
  const nextSubsection = section.subsections[1]

  const backProps = {}
  if (prevSection) {
    const numPrevSubsections = prevSection.subsections.length
    const prevSubsection = prevSection.subsections[numPrevSubsections - 1]
    backProps.back = `${prevSection.url}/${prevSubsection.url}`
    backProps.backLabel = i18n.t(
      `${prevSection.url}.destination.${prevSubsection.url}`
    )
  }

  return (
    <SectionView
      name="intro"
      {...backProps}
      next={`${section.url}/${nextSubsection.url}`}
      nextLabel={i18n.t(`${section.url}.destination.${nextSubsection.url}`)}>
      <h1 className="section-header">{i18n.t(`${section.url}.intro.title`)}</h1>
      <Field
        optional={true}
        className="no-margin-bottom">
        {i18n.m(`${section.url}.intro.body`)}
      </Field>
    </SectionView>
  )
}

export const createReviewGroups = (
  sectionNavigation,
  subsectionPropsCallback = null
) => {
  const subsections = sectionNavigation.subsections

  let components = subsections.map(subsection => {
    if (subsection.exclude) {
      return null
    }

    const extraProps = subsectionPropsCallback
      ? subsectionPropsCallback(subsection)
      : {}
    extraProps.section = sectionNavigation.url
    extraProps.subsection = subsection.url
    extraProps.required = true
    extraProps.scrollIntoView = false

    return createSubsection(sectionNavigation.url, subsection, extraProps)
  })

  // exclude nulls
  components = components.filter(c => !!c)

  return addDividers(components)
}

// Returns an array of SectionViews with their corresponding child component, based on the navigation. The `subsectionPropsCallback` is an optional function that accepts the `subsection` navigation config and gives back the corresponding properties to be passed to the subsection's component.
export const createSectionViews = (
  sectionNavigation,
  subsectionPropsCallback = null
) => {
  const subsections = sectionNavigation.subsections

  const views = subsections.map((subsection, i) => {
    if (subsection.exclude) {
      return null
    }

    const prev = subsections[i - 1]
    const next = subsections[i + 1]

    const extraProps = subsectionPropsCallback
      ? subsectionPropsCallback(subsection)
      : {}
    const ssComponent = createSubsection(
      sectionNavigation.url,
      subsection,
      extraProps
    )

    return createSectionView(
      sectionNavigation.url,
      subsection,
      prev.url,
      next.url,
      ssComponent
    )
  })

  // exclude nulls
  return views.filter(v => !!v)
}

export const createPrintSubsectionViews = (
  sectionNavigation,
  subsectionPropsCallback = null
) => {
  const subsections = sectionNavigation.subsections

  const components = subsections.map((subsection, i) => {
    if (subsection.exclude) {
      return null
    }

    const extraProps = subsectionPropsCallback
      ? subsectionPropsCallback(subsection)
      : {}
    extraProps.required = true
    extraProps.scrollIntoView = false

    return createSubsection(sectionNavigation.url, subsection, extraProps)
  })

  // exclude nulls
  return components.filter(v => !!v)
}
