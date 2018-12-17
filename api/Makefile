#MAKEFLAGS += --silent

all: clean test build

test:
	GOLANG_ENV=test go test -coverprofile=coverage.txt -covermode=atomic -cover $(shell go list ./... | grep -v /vendor/)

coverage:
	# Use -c to remove processed reports so coverage-js won't find it
	codecov -c -F backend -f coverage.txt -X gcov

build:
	go build -o api ./cmd/server
	chown -f 1000:1000 api

clean:
	rm -f api \
		bin/compare bin/flush bin/form bin/fuzzer bin/load bin/load-scenario \
		bin/submit bin/transmit bin/unlock

.PHONY: cmd
cmd:
	go build -o bin/compare ./cmd/compare
	go build -o bin/flush ./cmd/flush
	go build -o bin/form ./cmd/form
	go build -o bin/fuzzer ./cmd/fuzzer
	go build -o bin/load ./cmd/load
	go build -o bin/load-scenario ./cmd/load-scenario
	go build -o bin/transmit ./cmd/transmit
	go build -o bin/submit ./cmd/submit
	go build -o bin/unlock ./cmd/unlock
	chown -f 1000:1000 \
		bin/compare bin/flush bin/form bin/fuzzer bin/load bin/load-scenario \
		bin/transmit bin/unlock

specs: cmd
	./bin/fuzzer testdata/identification-birthdate.json \
		testdata/identification-birthplace.json \
        testdata/identification-contacts.json \
        testdata/identification-othernames.json \
        testdata/identification-physical.json \
        testdata/identification-ssn.json \
        testdata/identification-name.json \
        testdata/history-education.json \
        testdata/history-employment.json \
        testdata/history-federal.json \
        testdata/history-residence.json \
        testdata/relationships-people.json \
        testdata/relationships-relatives.json \
        testdata/relationships-status-cohabitant.json \
        testdata/relationships-status-marital.json \
        testdata/citizenship-multiple.json \
        testdata/citizenship-passports.json \
        testdata/citizenship-status.json \
        testdata/military-disciplinary.json \
        testdata/military-foreign.json \
        testdata/military-history.json \
        testdata/military-selective.json \
        testdata/foreign-activities-benefits.json \
        testdata/foreign-activities-direct.json \
        testdata/foreign-activities-indirect.json \
        testdata/foreign-activities-realestate.json \
        testdata/foreign-activities-support.json \
        testdata/foreign-business-advice.json \
        testdata/foreign-business-conferences.json \
        testdata/foreign-business-contact.json \
        testdata/foreign-business-employment.json \
        testdata/foreign-business-family.json \
        testdata/foreign-business-political.json \
        testdata/foreign-business-sponsorship.json \
        testdata/foreign-business-ventures.json \
        testdata/foreign-business-voting.json \
        testdata/foreign-contacts.json \
        testdata/foreign-passport.json \
        testdata/foreign-travel.json \
        testdata/financial-bankruptcy.json \
        testdata/financial-card.json \
        testdata/financial-credit.json \
        testdata/financial-delinquent.json \
        testdata/financial-gambling.json \
        testdata/financial-nonpayment.json \
        testdata/financial-taxes.json \
        testdata/substance-alcohol-additional.json \
        testdata/substance-alcohol-negative.json \
        testdata/substance-alcohol-ordered.json \
        testdata/substance-alcohol-voluntary.json \
        testdata/substance-drug-clearance.json \
        testdata/substance-drug-misuse.json \
        testdata/substance-drug-ordered.json \
        testdata/substance-drug-publicsafety.json \
        testdata/substance-drug-purchase.json \
        testdata/substance-drug-usage.json \
        testdata/substance-drug-voluntary.json \
        testdata/legal-associations-activities-to-overthrow.json \
        testdata/legal-associations-advocating.json \
        testdata/legal-associations-engaged-in-terrorism.json \
        testdata/legal-associations-membership-overthrow.json \
        testdata/legal-associations-membership-violence-or-force.json \
        testdata/legal-associations-terrorism-association.json \
        testdata/legal-associations-terrorist-organization.json \
        testdata/legal-court.json \
        testdata/legal-investigations-debarred.json \
        testdata/legal-investigations-history.json \
        testdata/legal-investigations-revoked.json \
        testdata/legal-police-additionaloffenses.json \
        testdata/legal-police-domesticviolence.json \
        testdata/legal-police-offenses.json \
        testdata/legal-technology-manipulating.json \
        testdata/legal-technology-unauthorized.json \
        testdata/legal-technology-unlawful.json \
        testdata/psychological-competence.json \
        testdata/psychological-conditions.json \
        testdata/psychological-consultations.json \
        testdata/psychological-diagnoses.json \
        testdata/psychological-hospitalizations.json \
        > fuzzed.json;
	cat fuzzed.json | ./bin/load;
	cat fuzzed.json | ./bin/compare;
	rm -f ./fuzzed.json;
