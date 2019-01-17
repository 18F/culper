import NavigationConstants from './NavigationsConstants'

export function handleUpdateNavigation(sections) {
  return {
    type: NavigationConstants.UPDATE_NAVIGATION,
    sections
  }
}

export function handleUpdateTotalSectionTotal(total) {
  return {
    type: NavigationConstants.UPDATE_SECTION_TOTAL,
    total
  }
}

export function handleUpdateCompletedSectionTotal(completed) {
  return {
    type: NavigationConstants.UPDATE_COMPLETED_SECTION_TOTAL,
    completed
  }
}
