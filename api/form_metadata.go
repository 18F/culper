package api

// GetFormMetadata returns the metadata for the form
func GetFormMetadata(context DatabaseService, accountID int) (map[string]string, error) {
	account := Account{
		ID: accountID,
	}

	err := account.Find(context)
	if err != nil {
		return nil, err
	}

	metadata := make(map[string]string)
	metadata["type"] = "metadata"

	metadata["form_type"] = account.FormType
	metadata["form_version"] = account.FormVersion

	return metadata, nil
}
