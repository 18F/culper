/* eslint-disable import/no-cycle */
import validate from './validate'
import DateControlValidator from './datecontrol'
import DateRangeValidator from './daterange'

import NameValidator from './name'

import ForeignBornDocumentValidator from './foreignborndocument'

import SelectiveServiceValidator, {
  hideSelectiveService,
} from './selectiveservice'
import RelativesValidator from './relatives'
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
  SelectiveServiceValidator,
  RelativesValidator,
  LegalAssociationsTerrorismValidator,
  LocationValidator,
  SignatureValidator,
  SentenceValidator,
  nameIsEmpty,
  validBranch,
  validGenericTextfield,
  validPhoneNumber,
  validSSN,
  hideSelectiveService,
  hideHippa,
  formIsSigned,
  formIsLocked,
}
