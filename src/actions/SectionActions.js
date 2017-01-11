import SectionConstants from './SectionConstants'

export function updateSection (section, subsection, title) {
  return function (dispatch, getState) {
    return dispatch(handleSectionUpdate(section, subsection, title))
  }
}

export function handleSectionUpdate (section, subsection, title) {
  return {
    type: SectionConstants.SECTION_UPDATE,
    section: section,
    subsection: subsection,
    title: title
  }
}
