import SectionConstants from './SectionConstants'

export function updateSection (section, subsection) {
  return function (dispatch, getState) {
    let previous = {}
    if (getState) {
      previous = getState()
    }
    return dispatch(handleSectionUpdate(section, subsection, previous))
  }
}

export function handleSectionUpdate (section, subsection, previous = {}) {
  return {
    type: SectionConstants.SECTION_UPDATE,
    section: section,
    subsection: subsection,
    previous: previous
  }
}
