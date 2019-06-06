package admin

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/pkg/errors"

	"github.com/18F/e-QIP-prototype/api"
)

// Rejecter is used to reject/kickback an application
type Rejecter struct {
	db    api.DatabaseService
	store api.StorageService
	pdf   api.PdfService
}

// NewRejecter returns a configured Rejecter
func NewRejecter(db api.DatabaseService, store api.StorageService, pdf api.PdfService) Rejecter {
	return Rejecter{
		db,
		store,
		pdf,
	}
}

// Reject rejects the application for a given account
func (r Rejecter) Reject(account api.Account) error {
	err := account.Unlock(r.db)
	if err != nil {
		return errors.Wrap(err, "Reject failed to unlock account")
	}

	// TODO: port over PDF.RemovePdfs.
	// err = r.PDF.RemovePdfs(account)
	// if err != nil {
	// 	return errors.Wrap(err, "Reject failed to remove PDFs")
	// }

	app, loadErr := r.store.LoadApplication(account.ID)
	if loadErr != nil {
		if loadErr == api.ErrApplicationDoesNotExist {
			return nil
		}
		return errors.Wrap(loadErr, "Unable to load application to reject it")
	}

	// clearErr := app.ClearNoBranches()
	// if clearErr != nil {
	// 	return clearErr
	// }

	appJSONBytes, jsonErr := json.Marshal(app)
	if jsonErr != nil {
		return errors.Wrap(jsonErr, "We messed up so bad the app can't be json anymore")
	}

	clearedJSON, clearJSONErr := clearNosJSON(appJSONBytes)
	if clearJSONErr != nil {
		return errors.Wrap(clearJSONErr, "It all went wrong")
	}

	// fmt.Println("TRYIN", string(clearedJSON))
	// fmt.Println("WORKN", string(appJSONBytes))

	writeErr := json.Unmarshal(clearedJSON, &app)
	if writeErr != nil {
		return errors.Wrap(writeErr, "No writing json, really. ")
	}

	saveErr := r.store.UpdateApplication(app)
	if saveErr != nil {
		return errors.Wrap(saveErr, "Unable to save application after rejecting it")
	}

	return nil
}

func clearNosJSON(jsonBytes []byte) ([]byte, error) {

	app := make(map[string]interface{})
	parseErr := json.Unmarshal(jsonBytes, &app)
	if parseErr != nil {
		fmt.Println("PARSERRR")
		return []byte{}, parseErr
	}

	nosToClear := []string{
		"Identification.OtherNames.props.HasOtherNames.props.value",
		"Identification.OtherNames.props.List.props.branch.props.value",

		"History.Residence.props.List.props.branch.props.value",
		"History.Employment.props.List.props.branch.props.value",
		"History.Employment.props.EmploymentRecord.props.value",
		"History.Employment.props.List.props.items.Item.Reprimand.props.items.Item.Has.props.value",
		"History.Education.props.List.props.branch.props.value",
		"History.Education.props.HasAttended.props.value",
		"History.Federal.props.List.props.branch.props.value",
		"History.Federal.props.HasFederalService.props.value",

		"Relationships.Marital.props.CivilUnion.props.Separated.props.value",
		"Relationships.Marital.props.CivilUnion.props.Divorced.props.value",
		"Relationships.Marital.props.DivorcedList.props.branch.props.value",
		"Relationships.Marital.props.DivorcedList.props.items.Item.Deceased.props.value",
		"Relationships.Cohabitants.props.HasCohabitant.props.value",
		"Relationships.Cohabitants.props.CohabitantList.props.branch.props.value",
		"Relationships.People.props.List.props.branch.props.value",
		"Relationships.Relatives.props.List.props.branch.props.value",
		"Relationships.Relatives.props.List.props.items.Item.IsDeceased.props.value",

		"Military.Foreign.props.List.props.items.Item.Has.props.value",
		"Military.Foreign.props.List.props.items.Item.MaintainsContact.props.value",

		"Foreign.Support.props.List.props.branch.props.value",
		"Foreign.Support.props.HasForeignSupport.props.value",
		"Foreign.DirectActivity.props.List.props.items.Item.CoOwners.props.List.props.items.Item.Has.props.value",
		"Foreign.DirectActivity.props.List.props.branch.props.value",
	}

	for _, path := range nosToClear {
		recursiveModifyJSON(app, strings.Split(path, "."))
	}

	appBytes, squanchErr := json.Marshal(app)
	if squanchErr != nil {
		return []byte{}, squanchErr
	}

	return appBytes, nil

}

func recursiveModifyJSON(json map[string]interface{}, path []string) map[string]interface{} {

	key := path[0]
	remainingKeys := path[1:]

	value, ok := json[key]
	if !ok {
		return json
	}

	if len(remainingKeys) == 0 {
		stringVal := value.(string)
		if stringVal == "No" {
			fmt.Println("WOAH BUDDY")
			json[key] = ""
			return json
		} else {
			fmt.Println("Not No", stringVal)
			return json
		}
	}

	if dict, ok := value.(map[string]interface{}); ok {

		json[key] = recursiveModifyJSON(dict, remainingKeys)

		return json
	}

	if array, ok := value.([]interface{}); ok {
		for i, item := range array {
			if dict, ok := item.(map[string]interface{}); ok {
				array[i] = recursiveModifyJSON(dict, remainingKeys)
			}
		}

		json[key] = array
		return json
	}

	fmt.Println("UNNOW")

	return json
}
