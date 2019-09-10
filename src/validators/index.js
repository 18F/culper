/* eslint-disable import/no-cycle */
import validate from './validate'
import DateControlValidator from './datecontrol'
import DateRangeValidator from './daterange'

import IdentificationContactInformationValidator, {
  ContactPhoneNumberValidator,
} from './identificationcontacts'

import NameValidator from './name'
import { OtherNameValidator } from './identificationothernames'

import PassportValidator from './passport'
import GamblingValidator, { GamblingItemValidator } from './gambling'
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
import HospitalizationsValidator, {
  HospitalizationValidator,
} from './hospitalization'
import NonpaymentValidator, { NonpaymentItemValidator } from './nonpayment'
import PsychologicalValidator, { hideExistingConditions } from './psychological'
import TreatmentValidator from './treatment'
import MaritalValidator from './marital'
import RelationshipsValidator from './relationships'
import PeopleValidator from './people'
import PersonValidator from './person'
import ForeignContactsValidator, {
  ForeignNationalValidator,
} from './foreigncontacts'
import ForeignDirectActivityValidator from './foreigndirectactivity'
import ForeignDirectInterestValidator from './foreigndirectinterest'
import ForeignIndirectActivityValidator from './foreignindirectactivity'
import ForeignIndirectInterestValidator from './foreignindirectinterest'
import ForeignRealEstateActivityValidator from './foreignrealestateactivity'
import ForeignRealEstateInterestValidator from './foreignrealestateinterest'
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
import ForeignActivitiesSupportValidator, {
  SupportValidator,
} from './foreignsupport'
import ForeignBusinessVenturesValidator, {
  VenturesValidator,
} from './foreignbusinessventures'
import ForeignBusinessSponsorshipValidator, {
  SponsorshipValidator,
} from './foreignbusinesssponsorship'
import ForeignBusinessPoliticalValidator, {
  PoliticalValidator,
} from './foreignbusinesspolitical'
import ForeignBusinessVotingValidator, {
  VotingValidator,
} from './foreignbusinessvoting'
import ForeignTravelValidator, { TravelValidator } from './foreigntravel'
import LegalAssociationsOverthrowValidator, {
  OverthrowValidator,
} from './legalassociationsoverthrow'
import LegalAssociationsViolenceValidator, {
  ViolenceValidator,
} from './legalassociationsviolence'
import LegalAssociationsEngagedValidator, {
  EngagedValidator,
} from './legalassociationsengaged'
import LegalAssociationsAdvocatingValidator, {
  AdvocatingValidator,
} from './legalassociationsadvocating'
import LegalAssociationsActivitiesValidator, {
  ActivitiesValidator,
} from './legalassociationsactivities'
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
  IdentificationContactInformationValidator,
  ContactPhoneNumberValidator,
  NameValidator,
  OtherNameValidator,
  PassportValidator,
  GamblingValidator,
  GamblingItemValidator,
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
  HospitalizationsValidator,
  NonpaymentValidator,
  NonpaymentItemValidator,
  PsychologicalValidator,
  TreatmentValidator,
  HospitalizationValidator,
  MaritalValidator,
  RelationshipsValidator,
  PeopleValidator,
  PersonValidator,
  ForeignContactsValidator,
  ForeignNationalValidator,
  ForeignDirectActivityValidator,
  ForeignDirectInterestValidator,
  ForeignIndirectActivityValidator,
  ForeignIndirectInterestValidator,
  ForeignRealEstateActivityValidator,
  ForeignRealEstateInterestValidator,
  ForeignActivitiesSupportValidator,
  SupportValidator,
  ForeignBusinessVenturesValidator,
  VenturesValidator,
  ForeignBusinessSponsorshipValidator,
  SponsorshipValidator,
  ForeignBusinessPoliticalValidator,
  PoliticalValidator,
  ForeignBusinessVotingValidator,
  VotingValidator,
  ForeignTravelValidator,
  TravelValidator,
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
  LegalAssociationsEngagedValidator,
  EngagedValidator,
  LegalAssociationsAdvocatingValidator,
  AdvocatingValidator,
  LegalAssociationsActivitiesValidator,
  ActivitiesValidator,
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
