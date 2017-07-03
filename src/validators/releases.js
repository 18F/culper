import { sectionsTotal, sectionsCompleted } from './navigation'

export const hideReleases = (store = {}) => {
  return sectionsTotal() > sectionsCompleted(store.Completed, { application: store })
}
