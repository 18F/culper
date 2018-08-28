import * as form from '../form'

export const citizenshipStatus = (data = {}) => {
  return {
    CitizenshipStatus: form.radio(data.CitizenshipStatus),
    AbroadDocumentation: form.radio(data.AbroadDocumentation),
    Explanation: form.textarea(data.Explanation),
    DocumentNumber: form.text(data.DocumentNumber),
    DocumentIssued: form.datecontrol(data.DocumentIssued),
    DocumentName: form.name(data.DocumentName),
    DocumentExpiration: form.datecontrol(data.DocumentExpiration),
    DocumentType: form.radio(data.DocumentType),
    PlaceIssued: form.location(data.PlaceIssued),
    CertificateNumber: form.text(data.CertificateNumber),
    CertificateIssued: form.datecontrol(data.CertificateIssued),
    CertificateName: form.name(data.CertificateName),
    CertificateCourtName: form.text(data.CertificateCourtName),
    CertificateCourtAddress: form.location(data.CertificateCourtAddress),
    BornOnMilitaryInstallation: form.branch(data.BornOnMilitaryInstallation),
    MilitaryBase: form.text(data.MilitaryBase),
    EntryDate: form.datecontrol(data.EntryDate),
    EntryLocation: form.location(data.EntryLocation),
    PriorCitizenship: form.country(data.PriorCitizenship),
    HasAlienRegistration: form.branch(data.HasAlienRegistration),
    AlienRegistrationNumber: form.text(data.AlienRegistrationNumber),
    AlienRegistrationExpiration: form.datecontrol(
      data.AlienRegistrationExpiration
    ),
    Basis: form.radio(data.Basis),
    PermanentResidentCardNumber: form.text(data.PermanentResidentCardNumber),
    ResidenceStatus: form.text(data.ResidenceStatus)
  }
}
