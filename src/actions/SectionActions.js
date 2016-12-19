import SectionConstants from './SectionConstants'

export function updateTitle (title) {
  return function (dispatch, getState) {
    return dispatch(handleSectionUpdate(title))
  }
}

export function handleSectionUpdate (title) {
  return {
    type: SectionConstants.UPDATE,
    title: title
  }
}
