import SectionConstants from './SectionConstants'

export function updateSection (section, subsection) {
  return function (dispatch, getState) {
    return dispatch(handleSectionUpdate(section, subsection))
  }
}

export function handleSectionUpdate (section, subsection) {
  return {
    type: SectionConstants.SECTION_UPDATE,
    section: section,
    subsection: subsection
  }
}
