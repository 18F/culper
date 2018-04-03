package api

type FinancialBankruptcy struct {
	PayloadHasBankruptcy Payload `json:"HasBankruptcy" sql:"-"`
	PayloadList          Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasBankruptcy *Branch     `json:"-"`
	List          *Collection `json:"-"`

	// Persister specific fields
	ID              int `json:"-"`
	HasBankruptcyID int `json:"-" pg:", fk:HasBankruptcy"`
	ListID          int `json:"-" pg:", fk:List"`
}

type FinancialGambling struct {
	PayloadHasGamblingDebt Payload `json:"HasGamblingDebt" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasGamblingDebt *Branch     `json:"-"`
	List            *Collection `json:"-"`

	// Persister specific fields
	ID                int `json:"-"`
	HasGamblingDebtID int `json:"-" pg:", fk:HasGamblingDebt"`
	ListID            int `json:"-" pg:", fk:List"`
}

type FinancialTaxes struct {
	PayloadHasTaxes Payload `json:"HasTaxes" sql:"-"`
	PayloadList     Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasTaxes *Branch     `json:"-"`
	List     *Collection `json:"-"`

	// Persister specific fields
	ID         int `json:"-"`
	HasTaxesID int `json:"-" pg:", fk:HasTaxes"`
	ListID     int `json:"-" pg:", fk:List"`
}

type FinancialCard struct {
	PayloadHasCardAbuse Payload `json:"HasCardAbuse" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasCardAbuse *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	HasCardAbuseID int `json:"-" pg:", fk:HasCardAbuse"`
	ListID         int `json:"-" pg:", fk:List"`
}

type FinancialCredit struct {
	PayloadHasCreditCounseling Payload `json:"HasCreditCounseling" sql:"-"`
	PayloadList                Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasCreditCounseling *Branch     `json:"-"`
	List                *Collection `json:"-"`

	// Persister specific fields
	ID                    int `json:"-"`
	HasCreditCounselingID int `json:"-" pg:", fk:HasCreditCounseling"`
	ListID                int `json:"-" pg:", fk:List"`
}

type FinancialDelinquent struct {
	PayloadHasDelinquent Payload `json:"HasDelinquent" sql:"-"`
	PayloadList          Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasDelinquent *Branch     `json:"-"`
	List          *Collection `json:"-"`

	// Persister specific fields
	ID              int `json:"-"`
	HasDelinquentID int `json:"-" pg:", fk:HasDelinquent"`
	ListID          int `json:"-" pg:", fk:List"`
}

type FinancialNonpayment struct {
	PayloadHasNonpayment Payload `json:"HasNonpayment" sql:"-"`
	PayloadList          Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasNonpayment *Branch     `json:"-"`
	List          *Collection `json:"-"`

	// Persister specific fields
	ID              int `json:"-"`
	HasNonpaymentID int `json:"-" pg:", fk:HasNonpayment"`
	ListID          int `json:"-" pg:", fk:List"`
}

// FinancialComments subsection of identification section.
type FinancialComments struct {
	PayloadComments Payload `json:"Comments" sql:"-"`

	// Validator specific fields
	Comments *Text `json:"-"`

	// Persister specific fields
	ID         int `json:"-"`
	CommentsID int `json:"-"`
}
