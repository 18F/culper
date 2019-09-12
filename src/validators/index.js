/* eslint-disable import/no-cycle */
import validate from './validate'
import DateControlValidator from './datecontrol'
import DateRangeValidator from './daterange'

import NameValidator from './name'

import ForeignBornDocumentValidator from './foreignborndocument'

import PassportValidator from './passport'
import HistoryResidenceValidator, { ResidenceValidator } from './residence'
import SelectiveServiceValidator, {
  hideSelectiveService,
} from './selectiveservice'
import MilitaryHistoryValidator, {
  MilitaryServiceValidator,
} from './militaryhistory'
import MilitaryDisciplinaryValidator, {
  ProcedureValidator,
  hideDisciplinaryProcedures,
} from './militarydisciplinary'
import MilitaryForeignValidator, {
  ForeignServiceValidator,
  ForeignContactValidator,
} from './militaryforeign'
import PoliceOffensesValidator from './policeoffenses'
import PoliceOtherOffensesValidator from './policeotheroffenses'
import OtherOffenseValidator from './otheroffense'
import OffenseValidator from './offense'
import RelativesValidator, {
  RelativeValidator,
  AliasValidator,
} from './relatives'
import TaxesValidator, { TaxValidator } from './taxes'
import NonpaymentValidator, { NonpaymentItemValidator } from './nonpayment'
import PsychologicalValidator, { hideExistingConditions } from './psychological'
import TreatmentValidator from './treatment'
import MaritalValidator from './marital'
import RelationshipsValidator from './relationships'
import PeopleValidator from './people'
import PersonValidator from './person'
import LegalNonCriminalCourtActionsValidator, {
  NonCriminalCourtActionValidator,
} from './legalnoncriminalcourtactions'
import LegalInvestigationsHistoryValidator, {
  HistoryValidator,
} from './legalinvestigationshistory'
import LegalInvestigationsRevokedValidator, {
  RevokedItemValidator,
} from './legalinvestigationsrevoked'
import LegalInvestigationsDebarredValidator, {
  DebarredValidator,
} from './legalinvestigationsdebarred'
import LegalTechnologyUnauthorizedValidator, {
  UnauthorizedValidator,
} from './legaltechnologyunauthorized'
import LegalTechnologyManipulatingValidator, {
  ManipulatingValidator,
} from './legaltechnologymanipulating'
import LegalTechnologyUnlawfulValidator, {
  UnlawfulValidator,
} from './legaltechnologyunlawful'
import LegalAssociationsTerroristValidator, {
  TerroristValidator,
} from './legalassociationsterrorist'
import LegalAssociationsOverthrowValidator, {
  OverthrowValidator,
} from './legalassociationsoverthrow'
import LegalAssociationsViolenceValidator, {
  ViolenceValidator,
} from './legalassociationsviolence'
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
import OrderValidator, {
  CompetenceOrderValidator,
  ConsultationOrderValidator,
} from './order'
import { hideHippa, formIsSigned, formIsLocked } from './releases'

export default validate
export {
  DateControlValidator,
  DateRangeValidator,
  ForeignBornDocumentValidator,
  NameValidator,
  PassportValidator,
  HistoryResidenceValidator,
  ResidenceValidator,
  SelectiveServiceValidator,
  MilitaryHistoryValidator,
  MilitaryServiceValidator,
  MilitaryDisciplinaryValidator,
  ProcedureValidator,
  MilitaryForeignValidator,
  ForeignServiceValidator,
  ForeignContactValidator,
  PoliceOffensesValidator,
  PoliceOtherOffensesValidator,
  OtherOffenseValidator,
  OffenseValidator,
  RelativesValidator,
  RelativeValidator,
  AliasValidator,
  TaxesValidator,
  TaxValidator,
  NonpaymentValidator,
  NonpaymentItemValidator,
  PsychologicalValidator,
  TreatmentValidator,
  MaritalValidator,
  RelationshipsValidator,
  PeopleValidator,
  PersonValidator,
  LegalNonCriminalCourtActionsValidator,
  NonCriminalCourtActionValidator,
  LegalInvestigationsHistoryValidator,
  HistoryValidator,
  LegalInvestigationsRevokedValidator,
  RevokedItemValidator,
  LegalInvestigationsDebarredValidator,
  DebarredValidator,
  LegalTechnologyUnauthorizedValidator,
  UnauthorizedValidator,
  LegalTechnologyManipulatingValidator,
  ManipulatingValidator,
  LegalTechnologyUnlawfulValidator,
  UnlawfulValidator,
  LegalAssociationsTerroristValidator,
  TerroristValidator,
  LegalAssociationsOverthrowValidator,
  OverthrowValidator,
  LegalAssociationsViolenceValidator,
  ViolenceValidator,
  LegalAssociationsTerrorismValidator,
  LocationValidator,
  SignatureValidator,
  SentenceValidator,
  nameIsEmpty,
  validBranch,
  validGenericTextfield,
  validPhoneNumber,
  validSSN,
  OrderValidator,
  CompetenceOrderValidator,
  ConsultationOrderValidator,
  hideDisciplinaryProcedures,
  hideExistingConditions,
  hideSelectiveService,
  hideHippa,
  formIsSigned,
  formIsLocked,
}
