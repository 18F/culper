import NavigationConstants from './NavigationsConstants'

export function handleUpdateNavigation(sections) {
  return {
    type: NavigationConstants.UPDATE_NAVIGATION,
    sections
  }
}

export function handleUpdateNavigationCount(completed, total) {
  return {
    type: NavigationConstants.UPDATE_SECTION_COUNT,
    completed,
    total
  }
}
