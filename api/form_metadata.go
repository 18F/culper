package api

// GetFormMetadata returns the metadata

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

	metadata["form_type"] = account.SFType
	metadata["form_version"] = account.SFVersion

	return metadata, nil
}
