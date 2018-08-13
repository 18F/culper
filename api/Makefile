MAKEFLAGS += --silent

all: clean test build

test:
	GOLANG_ENV=test go test -coverprofile=coverage.txt -covermode=atomic -cover $(shell go list ./... | grep -v /vendor/)

coverage:
	codecov -R . -F backend -f coverage.txt -X gcov

build:
	go build -o api ./cmd/server
	chown -f 1000:1000 ./api

clean:
	rm -f ./cmd/compare/compare
	rm -f ./cmd/flush/flush
	rm -f ./cmd/form/form
	rm -f ./cmd/fuzzer/fuzzer
	rm -f ./cmd/load/load
	rm -f ./cmd/server/server
	rm -f ./cmd/transmit/transmit
	rm -f ./cmd/unlock/unlock

specs:
	cd ./cmd/compare; go build; cd ../..;
	cd ./cmd/fuzzer; go build; cd ../..;
	cd ./cmd/load; go build; cd ../..;
	./cmd/fuzzer/fuzzer ./testdata/identification-birthdate.json \
                            ./testdata/identification-birthplace.json \
                            ./testdata/identification-comments.json \
                            ./testdata/identification-contacts.json \
                            ./testdata/identification-othernames.json \
                            ./testdata/identification-physical.json \
                            ./testdata/identification-ssn.json \
                            ./testdata/identification-name.json \
                            ./testdata/history-comments.json \
                            ./testdata/history-education.json \
                            ./testdata/history-employment.json \
                            ./testdata/history-federal.json \
                            ./testdata/history-residence.json \
                            ./testdata/relationships-comments.json \
                            ./testdata/relationships-people.json \
                            ./testdata/relationships-relatives.json \
                            ./testdata/relationships-status-cohabitant.json \
                            ./testdata/relationships-status-marital.json \
                            ./testdata/citizenship-comments.json \
                            ./testdata/citizenship-multiple.json \
                            ./testdata/citizenship-passports.json \
                            ./testdata/citizenship-status.json \
                            ./testdata/military-comments.json \
                            ./testdata/military-disciplinary.json \
                            ./testdata/military-foreign.json \
                            ./testdata/military-history.json \
                            ./testdata/military-selective.json \
                            ./testdata/foreign-activities-benefits.json \
                            ./testdata/foreign-activities-direct.json \
                            ./testdata/foreign-activities-indirect.json \
                            ./testdata/foreign-activities-realestate.json \
                            ./testdata/foreign-activities-support.json \
                            ./testdata/foreign-business-advice.json \
                            ./testdata/foreign-business-conferences.json \
                            ./testdata/foreign-business-contact.json \
                            ./testdata/foreign-business-employment.json \
                            ./testdata/foreign-business-family.json \
                            ./testdata/foreign-business-political.json \
                            ./testdata/foreign-business-sponsorship.json \
                            ./testdata/foreign-business-ventures.json \
                            ./testdata/foreign-business-voting.json \
                            ./testdata/foreign-comments.json \
                            ./testdata/foreign-contacts.json \
                            ./testdata/foreign-passport.json \
                            ./testdata/foreign-travel.json \
                            ./testdata/financial-bankruptcy.json \
                            ./testdata/financial-card.json \
                            ./testdata/financial-comments.json \
                            ./testdata/financial-credit.json \
                            ./testdata/financial-delinquent.json \
                            ./testdata/financial-gambling.json \
                            ./testdata/financial-nonpayment.json \
                            ./testdata/financial-taxes.json \
                            ./testdata/substance-alcohol-additional.json \
                            ./testdata/substance-alcohol-negative.json \
                            ./testdata/substance-alcohol-ordered.json \
                            ./testdata/substance-alcohol-voluntary.json \
                            ./testdata/substance-comments.json \
                            ./testdata/substance-drug-clearance.json \
                            ./testdata/substance-drug-misuse.json \
                            ./testdata/substance-drug-ordered.json \
                            ./testdata/substance-drug-publicsafety.json \
                            ./testdata/substance-drug-purchase.json \
                            ./testdata/substance-drug-usage.json \
                            ./testdata/substance-drug-voluntary.json \
                            ./testdata/legal-associations-activities-to-overthrow.json \
                            ./testdata/legal-associations-advocating.json \
                            ./testdata/legal-associations-engaged-in-terrorism.json \
                            ./testdata/legal-associations-membership-overthrow.json \
                            ./testdata/legal-associations-membership-violence-or-force.json \
                            ./testdata/legal-associations-terrorism-association.json \
                            ./testdata/legal-associations-terrorist-organization.json \
                            ./testdata/legal-comments.json \
                            ./testdata/legal-court.json \
                            ./testdata/legal-investigations-debarred.json \
                            ./testdata/legal-investigations-history.json \
                            ./testdata/legal-investigations-revoked.json \
                            ./testdata/legal-police-additionaloffenses.json \
                            ./testdata/legal-police-domesticviolence.json \
                            ./testdata/legal-police-offenses.json \
                            ./testdata/legal-technology-manipulating.json \
                            ./testdata/legal-technology-unauthorized.json \
                            ./testdata/legal-technology-unlawful.json \
                            ./testdata/psychological-comments.json \
                            ./testdata/psychological-competence.json \
                            ./testdata/psychological-conditions.json \
                            ./testdata/psychological-consultations.json \
                            ./testdata/psychological-diagnoses.json \
                            ./testdata/psychological-hospitalizations.json \
                            > fuzzed.json;
	cat fuzzed.json | ./cmd/load/load;
	cat fuzzed.json | ./cmd/compare/compare;
	rm -f ./fuzzed.json;
