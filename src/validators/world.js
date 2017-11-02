import { navigationWalker } from '../config'
import { reportCompletion } from '../actions/ApplicationActions'

export const validateWorld = (application, dispatch) => {
  navigationWalker((path, child) => {
    if (path.length && path[0].store && child.store && child.validator) {
      const sectionName = path[0].url
      const data = application[path[0].store][child.store] || {}

      let subsectionName = child.url
      if (path.length > 1) {
        for (let i = path.length - 1; i > 0; i--) {
          subsectionName = `${path[i].url}/${subsectionName}`
        }
      }

      let valid = null
      try {
        valid = new child.validator(data, data).isValid()
      } catch (e) {
        valid = null
      }

      dispatch(reportCompletion(sectionName.toLowerCase(), subsectionName.toLowerCase(), valid))
    }
  })
}
