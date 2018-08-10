package xml

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path"
	"regexp"
	"strings"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/mock"
	"github.com/antchfx/xmlquery"
)

func TestPackage(t *testing.T) {
	application := applicationData()
	tests := []struct {
		Schema string
		Data   map[string]interface{}
	}{
		{Schema: "identification.xml", Data: application},
		{Schema: "identification-name.xml", Data: readSectionData("testdata/identification-name.json")},
		{Schema: "identification-birth.xml", Data: readSectionData("testdata/identification-birth.json")},
		{Schema: "identification-eyecolor.xml", Data: readSectionData("testdata/identification-eyecolor.json")},
		{Schema: "identification-height.xml", Data: readSectionData("testdata/identification-height.json")},
		{Schema: "identification-othernames.xml", Data: readSectionData("testdata/identification-othernames.json")},
		{Schema: "identification-ssn.xml", Data: readSectionData("testdata/identification-ssn.json")},
		{Schema: "identification-sex.xml", Data: readSectionData("testdata/identification-sex.json")},
		{Schema: "identification-weight.xml", Data: readSectionData("testdata/identification-weight.json")},
		{Schema: "financial.xml", Data: application},
		{Schema: "financial-bankruptcy.xml", Data: readSectionData("testdata/financial-bankruptcy.json")},
		{Schema: "financial-card.xml", Data: readSectionData("testdata/financial-card.json")},
		{Schema: "financial-credit.xml", Data: readSectionData("testdata/financial-credit.json")},
		{Schema: "financial-delinquent.xml", Data: readSectionData("testdata/financial-delinquent.json")},
		{Schema: "financial-gambling.xml", Data: readSectionData("testdata/financial-gambling.json")},
		{Schema: "financial-nonpayment.xml", Data: readSectionData("testdata/financial-nonpayment.json")},
		{Schema: "financial-taxes.xml", Data: readSectionData("testdata/financial-taxes.json")},
		{Schema: "history.xml", Data: application},
		{Schema: "history-education.xml", Data: readSectionData("testdata/history-education.json")},
		{Schema: "history-employment.xml", Data: readSectionData("testdata/history-employment.json")},
		{Schema: "history-federal.xml", Data: readSectionData("testdata/history-federal.json")},
		{Schema: "history-residence.xml", Data: readSectionData("testdata/history-residence.json")},
		{Schema: "relationships.xml", Data: application},
		{Schema: "relatives-and-associates.xml", Data: readSectionData("testdata/relationships-relatives.json")},
		{Schema: "spouse-cohabitants.xml", Data: readSectionData("testdata/relationships-status-cohabitant.json")},
		{Schema: "spouse-former.xml", Data: readSectionData("testdata/spouse-former.json")},
		{Schema: "spouse-have-former.xml", Data: readSectionData("testdata/spouse-former.json")},
		{Schema: "spouse-marital-status.xml", Data: readSectionData("testdata/spouse-marital-status.json")},
		{Schema: "spouse-present-marriage.xml", Data: readSectionData("testdata/spouse-present-marriage.json")},
		{Schema: "personal-references.xml", Data: readSectionData("testdata/relationships-people.json")},
		{Schema: "citizenship.xml", Data: application},
		{Schema: "citizenship-status.xml", Data: application},
		{Schema: "citizenship-multiple.xml", Data: readSectionData("testdata/citizenship-multiple.json")},
		{Schema: "military.xml", Data: application},
		{Schema: "military-disciplinary.xml", Data: readSectionData("testdata/military-disciplinary.json")},
		{Schema: "military-foreign.xml", Data: readSectionData("testdata/military-foreign.json")},
		{Schema: "military-history.xml", Data: readSectionData("testdata/military-history.json")},
		{Schema: "military-selective.xml", Data: readSectionData("testdata/military-selective.json")},
		{Schema: "foreign.xml", Data: application},
		{Schema: "foreign-travel.xml", Data: readSectionData("testdata/foreign-travel.json")},
		{Schema: "foreign-contacts.xml", Data: readSectionData("testdata/foreign-contacts.json")},
		{Schema: "foreign-direct-interests.xml", Data: readSectionData("testdata/foreign-activities-direct.json")},
		{Schema: "foreign-indirect-interests.xml", Data: readSectionData("testdata/foreign-activities-indirect.json")},
		{Schema: "foreign-passports.xml", Data: readSectionData("testdata/citizenship-passports.json")},
		{Schema: "foreign-realestate-holdings.xml", Data: readSectionData("testdata/foreign-activities-realestate.json")},
		{Schema: "foreign-financial-benefits.xml", Data: readSectionData("testdata/foreign-activities-benefits.json")},
		{Schema: "foreign-national-support.xml", Data: readSectionData("testdata/foreign-activities-support.json")},
		{Schema: "foreign-business-support-activities.xml", Data: readSectionData("testdata/foreign-business-advice.json")},
		{Schema: "foreign-business-consultancies.xml", Data: readSectionData("testdata/foreign-business-family.json")},
		{Schema: "foreign-business-job-offers.xml", Data: readSectionData("testdata/foreign-business-employment.json")},
		{Schema: "foreign-business-other-employment.xml", Data: readSectionData("testdata/foreign-business-ventures.json")},
		{Schema: "foreign-business-meetings.xml", Data: readSectionData("testdata/foreign-business-conferences.json")},
		{Schema: "foreign-business-government-contacts.xml", Data: readSectionData("testdata/foreign-business-contact.json")},
		{Schema: "foreign-business-sponsored-visits.xml", Data: readSectionData("testdata/foreign-business-sponsorship.json")},
		{Schema: "foreign-business-political-office.xml", Data: readSectionData("testdata/foreign-business-political.json")},
		{Schema: "foreign-business-voted.xml", Data: readSectionData("testdata/foreign-business-voting.json")},
		{Schema: "substance.xml", Data: application},
		{Schema: "substance-alcohol-additional.xml", Data: readSectionData("testdata/substance-alcohol-additional.json")},
		{Schema: "substance-alcohol-negative.xml", Data: readSectionData("testdata/substance-alcohol-negative.json")},
		{Schema: "substance-alcohol-ordered.xml", Data: readSectionData("testdata/substance-alcohol-ordered.json")},
		{Schema: "substance-alcohol-voluntary.xml", Data: readSectionData("testdata/substance-alcohol-voluntary.json")},
		{Schema: "substance-drug-clearance.xml", Data: readSectionData("testdata/substance-drug-clearance.json")},
		{Schema: "substance-drug-misuse.xml", Data: readSectionData("testdata/substance-drug-misuse.json")},
		{Schema: "substance-drug-ordered.xml", Data: readSectionData("testdata/substance-drug-ordered.json")},
		{Schema: "substance-drug-publicsafety.xml", Data: readSectionData("testdata/substance-drug-publicsafety.json")},
		{Schema: "substance-drug-purchase.xml", Data: readSectionData("testdata/substance-drug-purchase.json")},
		{Schema: "substance-drug-usage.xml", Data: readSectionData("testdata/substance-drug-usage.json")},
		{Schema: "substance-drug-voluntary.xml", Data: readSectionData("testdata/substance-drug-voluntary.json")},
		{Schema: "legal.xml", Data: application},
		{Schema: "legal-police-offenses.xml", Data: readSectionData("testdata/legal-police-offenses.json")},
		{Schema: "legal-police-additional-offenses.xml", Data: readSectionData("testdata/legal-police-additionaloffenses.json")},
		{Schema: "legal-police-domestic-violence.xml", Data: readSectionData("testdata/legal-police-domesticviolence.json")},
		{Schema: "legal-investigations-denied.xml", Data: readSectionData("testdata/legal-investigations-revoked.json")},
		{Schema: "legal-investigations-debarment.xml", Data: readSectionData("testdata/legal-investigations-debarred.json")},
		{Schema: "legal-investigations-investigated.xml", Data: readSectionData("testdata/legal-investigations-history.json")},
		{Schema: "legal-court.xml", Data: readSectionData("testdata/legal-court.json")},
		{Schema: "legal-technology-unauthorized.xml", Data: readSectionData("testdata/legal-technology-unauthorized.json")},
		{Schema: "legal-technology-manipulating.xml", Data: readSectionData("testdata/legal-technology-manipulating.json")},
		{Schema: "legal-technology-unlawful.xml", Data: readSectionData("testdata/legal-technology-unlawful.json")},
		{Schema: "legal-associations-activities-to-overthrow.xml", Data: readSectionData("testdata/legal-associations-activities-to-overthrow.json")},
		{Schema: "legal-associations-advocating.xml", Data: readSectionData("testdata/legal-associations-advocating.json")},
		{Schema: "legal-associations-membership-violence-or-force.xml", Data: readSectionData("testdata/legal-associations-membership-violence-or-force.json")},
		{Schema: "legal-associations-terrorist-organization.xml", Data: readSectionData("testdata/legal-associations-terrorist-organization.json")},
		{Schema: "legal-associations-engaged-in-terrorism.xml", Data: readSectionData("testdata/legal-associations-engaged-in-terrorism.json")},
		{Schema: "legal-associations-terrorism-association.xml", Data: readSectionData("testdata/legal-associations-terrorism-association.json")},
		{Schema: "legal-associations-membership-overthrow.xml", Data: readSectionData("testdata/legal-associations-membership-overthrow.json")},
		{Schema: "psychological.xml", Data: application},
		{Schema: "psychological-competence.xml", Data: readSectionData("testdata/psychological-competence.json")},
		{Schema: "psychological-conditions.xml", Data: readSectionData("testdata/psychological-conditions.json")},
		{Schema: "psychological-consultations.xml", Data: readSectionData("testdata/psychological-consultations.json")},
		{Schema: "psychological-diagnoses.xml", Data: readSectionData("testdata/psychological-diagnoses.json")},
		{Schema: "psychological-hospitalizations.xml", Data: readSectionData("testdata/psychological-hospitalizations.json")},
	}

	logger := &mock.LogService{}
	service := Service{Log: logger}

	for _, test := range tests {
		tmpl, err := service.DefaultTemplate(test.Schema, test.Data)
		if err != nil {
			t.Fatal(err)
		}
		if tmpl == "" {
			t.Fatalf("XML template (%s) should not be empty", test.Schema)
		}
	}
}

func TestAddressIn(t *testing.T) {
	country := "United States"

	us := "testdata/us-address.json"
	if !addressIn(readSectionData(us), country) {
		t.Fatalf("%s should be in %s", us, country)
	}

	nonus := "testdata/nonus-address.json"
	if addressIn(readSectionData(nonus), country) {
		t.Fatalf("%s should not be in %s", nonus, country)
	}

	bad := "testdata/bad-address.json"
	if addressIn(readSectionData(bad), country) {
		t.Fatalf("%s should not be in %s", bad, country)
	}
}

func TestCitizenStatus(t *testing.T) {
	template := "citizenship-status.xml"
	xpath := "Citizenship/USCitizen/ProofOfUSCitizenship/USPassport"

	// Born in US with passport
	form := newForm(t,
		"citizenship-status.json",
		"foreign-passport.json",
	)
	snippet := applyForm(template, form, t)
	doc := xmlDoc(snippet, t)

	list := xmlquery.Find(doc, xpath)
	if len(list) != 1 {
		t.Fatalf("XML derived from `%s` should have `%s`: %s", template, xpath, snippet)
	}

	// Born in US without passport
	form = newForm(t,
		"citizenship-status.json",
		"no-passport.json",
	)
	snippet = applyForm(template, form, t)
	doc = xmlDoc(snippet, t)
	list = xmlquery.Find(doc, xpath)
	if len(list) != 0 {
		t.Fatalf("XML derived from `%s` should not have `%s`: %s", template, xpath, snippet)
	}
}

// Load a fully-populated, valid SF-86 form with test data
func applicationData() map[string]interface{} {
	return map[string]interface{}{
		"Identification": map[string]interface{}{
			"ApplicantName":       readSectionData("testdata/identification-name.json"),
			"Contacts":            readSectionData("testdata/identification-contacts.json"),
			"OtherNames":          readSectionData("testdata/identification-othernames.json"),
			"ApplicantBirthDate":  readSectionData("testdata/identification-birthdate.json"),
			"ApplicantBirthPlace": readSectionData("testdata/identification-birthplace.json"),
			"ApplicantSSN":        readSectionData("testdata/identification-ssn.json"),
			"Physical":            readSectionData("testdata/identification-physical.json"),
		},
		"Relationships": map[string]interface{}{
			"Marital":     readSectionData("testdata/relationships-status-marital.json"),
			"Cohabitants": readSectionData("testdata/relationships-status-cohabitant.json"),
			"People":      readSectionData("testdata/relationships-people.json"),
			"Relatives":   readSectionData("testdata/relationships-relatives.json"),
		},
		"History": map[string]interface{}{
			"Education":  readSectionData("testdata/history-education.json"),
			"Employment": readSectionData("testdata/history-employment.json"),
			"Federal":    readSectionData("testdata/history-federal.json"),
			"Residence":  readSectionData("testdata/history-residence.json"),
		},
		"Citizenship": map[string]interface{}{
			"Status":    readSectionData("testdata/citizenship-status.json"),
			"Multiple":  readSectionData("testdata/citizenship-multiple.json"),
			"Passports": readSectionData("testdata/citizenship-passports.json"),
		},
		"Military": map[string]interface{}{
			"Disciplinary": readSectionData("testdata/military-disciplinary.json"),
			"Foreign":      readSectionData("testdata/military-foreign.json"),
			"History":      readSectionData("testdata/military-history.json"),
			"Selective":    readSectionData("testdata/military-selective.json"),
		},
		"Foreign": map[string]interface{}{
			"Contacts":           readSectionData("testdata/foreign-contacts.json"),
			"DirectActivity":     readSectionData("testdata/foreign-activities-direct.json"),
			"IndirectActivity":   readSectionData("testdata/foreign-activities-indirect.json"),
			"RealEstateActivity": readSectionData("testdata/foreign-activities-realestate.json"),
			"BenefitActivity":    readSectionData("testdata/foreign-activities-benefits.json"),
			"Support":            readSectionData("testdata/foreign-activities-support.json"),
			"Advice":             readSectionData("testdata/foreign-business-advice.json"),
			"Family":             readSectionData("testdata/foreign-business-family.json"),
			"Employment":         readSectionData("testdata/foreign-business-employment.json"),
			"Ventures":           readSectionData("testdata/foreign-business-ventures.json"),
			"Conferences":        readSectionData("testdata/foreign-business-conferences.json"),
			"Contact":            readSectionData("testdata/foreign-business-contact.json"),
			"Sponsorship":        readSectionData("testdata/foreign-business-sponsorship.json"),
			"Political":          readSectionData("testdata/foreign-business-political.json"),
			"Voting":             readSectionData("testdata/foreign-business-voting.json"),
			"Passport":           readSectionData("testdata/foreign-passport.json"),
			"Travel":             readSectionData("testdata/foreign-travel.json"),
		},
		"Substance": map[string]interface{}{
			"ReceivedCounselings":  readSectionData("testdata/substance-alcohol-additional.json"),
			"NegativeImpacts":      readSectionData("testdata/substance-alcohol-negative.json"),
			"OrderedCounselings":   readSectionData("testdata/substance-alcohol-ordered.json"),
			"VoluntaryCounselings": readSectionData("testdata/substance-alcohol-voluntary.json"),
			"DrugClearanceUse":     readSectionData("testdata/substance-drug-clearance.json"),
			"PrescriptionUses":     readSectionData("testdata/substance-drug-misuse.json"),
			"OrderedTreatments":    readSectionData("testdata/substance-drug-ordered.json"),
			"DrugPublicSafetyUses": readSectionData("testdata/substance-drug-publicsafety.json"),
			"DrugInvolvements":     readSectionData("testdata/substance-drug-purchase.json"),
			"DrugUses":             readSectionData("testdata/substance-drug-usage.json"),
			"VoluntaryTreatments":  readSectionData("testdata/substance-drug-voluntary.json"),
		},
		"Legal": map[string]interface{}{
			"PoliceOffenses":          readSectionData("testdata/legal-police-offenses.json"),
			"PoliceOtherOffenses":     readSectionData("testdata/legal-police-additionaloffenses.json"),
			"PoliceDomesticViolence":  readSectionData("testdata/legal-police-domesticviolence.json"),
			"Revoked":                 readSectionData("testdata/legal-investigations-revoked.json"),
			"Debarred":                readSectionData("testdata/legal-investigations-debarred.json"),
			"History":                 readSectionData("testdata/legal-investigations-history.json"),
			"NonCriminalCourtActions": readSectionData("testdata/legal-court.json"),
			"Unauthorized":            readSectionData("testdata/legal-technology-unauthorized.json"),
			"Unlawful":                readSectionData("testdata/legal-technology-unlawful.json"),
			"Manipulating":            readSectionData("testdata/legal-technology-manipulating.json"),
			"ActivitiesToOverthrow":   readSectionData("testdata/legal-associations-activities-to-overthrow.json"),
			"Advocating":              readSectionData("testdata/legal-associations-advocating.json"),
			"MembershipViolence":      readSectionData("testdata/legal-associations-membership-violence-or-force.json"),
			"TerroristOrganization":   readSectionData("testdata/legal-associations-terrorist-organization.json"),
			"EngagedInTerrorism":      readSectionData("testdata/legal-associations-engaged-in-terrorism.json"),
			"TerrorismAssociation":    readSectionData("testdata/legal-associations-terrorism-association.json"),
			"MembershipOverthrow":     readSectionData("testdata/legal-associations-membership-overthrow.json"),
		},
		"Psychological": map[string]interface{}{
			"Competence":         readSectionData("testdata/psychological-competence.json"),
			"ExistingConditions": readSectionData("testdata/psychological-conditions.json"),
			"Consultations":      readSectionData("testdata/psychological-consultations.json"),
			"Diagnoses":          readSectionData("testdata/psychological-diagnoses.json"),
			"Hospitalizations":   readSectionData("testdata/psychological-hospitalizations.json"),
		},
	}
}

// readSectionData reads in a sub-section of test data, returning a partial form.
func readSectionData(file string) map[string]interface{} {
	b, err := ioutil.ReadFile(file)
	if err != nil {
		return map[string]interface{}{}
	}

	var js map[string]interface{}
	if err := json.Unmarshal(b, &js); err != nil {
		return map[string]interface{}{}
	}
	return js
}

// loadFormData reads in a sub-section of test data from the JSON filepath, populating the provided form.
// Form data will automatically get populated into the correct section/sub-section.
func loadFormData(form map[string]interface{}, filepath string) error {
	b, err := ioutil.ReadFile(path.Join("testdata", filepath))
	if err != nil {
		return err
	}

	var js map[string]interface{}
	if err := json.Unmarshal(b, &js); err != nil {
		return err
	}

	t, ok := js["type"].(string)
	if !ok {
		return fmt.Errorf("Could not identify sub-section in %s via `type`", filepath)
	}
	for _, v := range api.Catalogue() {
		if v.Payload == t {
			val, ok := form[v.Name].(map[string]interface{})
			if !ok {
				form[v.Name] = map[string]interface{}{}
				val = form[v.Name].(map[string]interface{})
			}
			val[v.Subsection] = js
			return nil
		}
	}

	return fmt.Errorf("No payload entry for `%s` in catalogue, from `%s`", t, filepath)
}

// applyForm generates an XML snippet given the path to an XML template and form data.
func applyForm(template string, data map[string]interface{}, t *testing.T) string {
	logger := &mock.LogService{}
	service := Service{Log: logger}

	snippet, err := service.DefaultTemplate(template, data)
	if err != nil {
		t.Fatal(err)
	}
	return string(snippet)
}

// newForm returns a form populated with data from the list of JSON filepaths.
func newForm(t *testing.T, filepaths ...string) map[string]interface{} {
	form := map[string]interface{}{}
	for _, v := range filepaths {
		err := loadFormData(form, v)
		if err != nil {
			t.Fatal(err)
		}
	}
	return form
}

// xmlDoc parses the XML snippet, returning a queryable XML object
func xmlDoc(snippet string, t *testing.T) *xmlquery.Node {
	doc, err := xmlquery.Parse(strings.NewReader(snippet))
	if err != nil {
		t.Fatal(err)
	}
	return doc
}

// templateContext returns the JSON path that a parent XML template file calls with a child template.
func templateContext(parent string, template string, t *testing.T) string {
	file, err := os.Open(path.Join("templates", parent))
	if err != nil {
		t.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	re := regexp.MustCompile("\\{\\{tmpl.*\"" + template + "\" *([a-zA-Z.]+) *\\}\\}")
	for scanner.Scan() {
		match := re.FindStringSubmatch(scanner.Text())
		if match != nil {
			return match[1]
		}
	}

	if err := scanner.Err(); err != nil {
		t.Fatal(err)
	}

	t.Fatalf("Could not find reference to `%s` in `%s`", template, parent)

	// Can't get here, but keeps compiler happy
	return ""
}
