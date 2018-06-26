import { PUSH_STATE } from './NavConstants'

/**
 * Action requesting a history push state
 */
export const push = (path, scrollTo = 'scrollTo') => {
  return {
    type: PUSH_STATE,
    to: path,
    scrollTo: scrollTo
  }
}
