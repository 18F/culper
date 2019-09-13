/* eslint-disable import/no-cycle */
import validate from './validate'
import DateControlValidator from './datecontrol'
import DateRangeValidator from './daterange'

import NameValidator from './name'

import ForeignBornDocumentValidator from './foreignborndocument'

import HistoryResidenceValidator, { ResidenceValidator } from './residence'
import SelectiveServiceValidator, {
  hideSelectiveService,
} from './selectiveservice'
import PoliceOffensesValidator from './policeoffenses'
import PoliceOtherOffensesValidator from './policeotheroffenses'
import RelativesValidator, {
  RelativeValidator,
  AliasValidator,
} from './relatives'
import TaxesValidator, { TaxValidator } from './taxes'
import PsychologicalValidator, { hideExistingConditions } from './psychological'
import TreatmentValidator from './treatment'
import RelationshipsValidator from './relationships'
import PeopleValidator from './people'
import PersonValidator from './person'
import LegalAssociationsTerrorismValidator from './legalassociationsterrorism'
import LocationValidator from './location'
import SignatureValidator from './signature'
import SentenceValidator from './sentence'
import {
  nameIsEmpty,
  validBranch,
  validGenericTextfield,
  validPhoneNumber,
  validSSN,
} from './helpers'
import { hideHippa, formIsSigned, formIsLocked } from './releases'

export default validate
export {
  DateControlValidator,
  DateRangeValidator,
  ForeignBornDocumentValidator,
  NameValidator,
  HistoryResidenceValidator,
  ResidenceValidator,
  SelectiveServiceValidator,
  PoliceOffensesValidator,
  PoliceOtherOffensesValidator,
  RelativesValidator,
  RelativeValidator,
  AliasValidator,
  TaxesValidator,
  TaxValidator,
  PsychologicalValidator,
  TreatmentValidator,
  RelationshipsValidator,
  PeopleValidator,
  PersonValidator,
  LegalAssociationsTerrorismValidator,
  LocationValidator,
  SignatureValidator,
  SentenceValidator,
  nameIsEmpty,
  validBranch,
  validGenericTextfield,
  validPhoneNumber,
  validSSN,
  hideExistingConditions,
  hideSelectiveService,
  hideHippa,
  formIsSigned,
  formIsLocked,
}
