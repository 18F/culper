import ApplicantName from './ApplicantName'
import ApplicantSSN from './ApplicantSSN'
import ApplicantBirthPlace from './ApplicantBirthPlace'
import ApplicantBirthDate from './ApplicantBirthDate'
import OtherNames from './OtherNames'
import Physical from './Physical'
import ContactInformation from './ContactInformation'

const storeToComponentMap = {
  ApplicantBirthDate,
  ApplicantBirthPlace,
  ApplicantName,
  ApplicantSSN,
  Contacts: ContactInformation,
  OtherNames,
  Physical
}

export default storeToComponentMap
