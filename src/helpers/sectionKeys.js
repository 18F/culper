// Helper for mapping legacy section "store keys" to new section keys
// Currently needed because /form data does not include section keys

// Only using SF86 because it's a superset of all form sections
import { FLAT_SF86 } from 'config/formTypes'

const sectionKeyMap = {}

FLAT_SF86.filter(s => s.storeKey && s.parentStore)
  .forEach((s) => {
    sectionKeyMap[`${s.parentStore}.${s.storeKey}`] = s.key
  })

// special case
sectionKeyMap['Foreign.Passport'] = 'CITIZENSHIP_US_PASSPORT'

export default sectionKeyMap
