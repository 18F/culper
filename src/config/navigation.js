import env from './environment'
import * as validators from '../validators/index'
import Identification from '../components/Section/Identification/navigation'
// disambiguate from History class in browser
import historyNavigation from '../components/Section/History/navigation'
import relationshipsNavigation from '../components/Section/Relationships/navigation'
import Citizenship from '../components/Section/Citizenship/navigation'
import Military from '../components/Section/Military/navigation'
import Foreign from '../components/Section/Foreign/navigation'
import Financial from '../components/Section/Financial/navigation'
import SubstanceUse from '../components/Section/SubstanceUse/navigation'
import Legal from '../components/Section/Legal/navigation'
import psychologicalNavigation from '../components/Section/Psychological/navigation'
import store from './../services/store'

export const Review = {
  title: 'Review and submit',
  name: 'Review and submit',
  url: 'package',
  showNumber: false,
  exclude: true,
  subsections: [
    /* XXX See: https://github.com/18F/e-QIP-prototype/issues/795
                https://github.com/18F/e-QIP-prototype/issues/787
    {
      name: 'Attachments',
      url: 'attachments',
      locked: validators.formIsLocked,
      hiddenFunc: application => {
        return !env.AttachmentsEnabled()
      }
    },
    */
    {
      name: 'Review',
      url: 'review',
      locked: validators.formIsLocked
    },
    {
      name: 'Submit',
      url: 'submit',
      locked: store => {
        const hasErrors = store => {
          let errors = 0

          navigationWalker((path, child) => {
            if (
              path.length &&
              path[0].store &&
              child.store &&
              child.validator
            ) {
              if (
                child.excluded ||
                child.hidden ||
                (child.hiddenFunc && child.hiddenFunc(store))
              ) {
                return
              }

              const data = (store[path[0].store] || {})[child.store] || {}
              let subsectionName = child.url
              if (path.length > 1) {
                for (let i = path.length - 1; i > 0; i--) {
                  subsectionName = `${path[i].url}/${subsectionName}`
                }
              }

              let valid = null
              try {
                // eslint-disable-next-line new-cap
                valid = new child.validator(data, data).isValid()
              } catch (e) {
                valid = null
              }

              if (valid !== true) {
                errors++
              }
            }
          })

          return errors > 0
        }

        return validators.formIsLocked(store) || hasErrors(store)
      }
    },
    {
      name: 'Print',
      url: 'print',
      locked: store => {
        return !validators.formIsLocked(store)
      }
    }
  ]
}

// This needs to be deleted/changed to implement new forms
const navigation = [
  Identification,
  historyNavigation(),
  relationshipsNavigation(),
  Citizenship,
  Military,
  Foreign,
  Financial,
  SubstanceUse,
  Legal,
  psychologicalNavigation(),
  Review
]

export default navigation

export const navigationWalker = action => {
  const eAppStore = store.getState()
  eAppStore.application.Navigation.sections.forEach(section => {
    walk(section, action)
  })
}

export const walk = (section, action, path = []) => {
  if (!section.subsections || !action) {
    return
  }

  section.subsections.forEach(subsection => {
    walk(subsection, action, path.concat(section))
    action(path.concat(section), subsection)
  })
}
