package simplestore

import (
	"bytes"
	"io/ioutil"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
)

func TestSingleAttachment(t *testing.T) {

	store := getSimpleStore()
	account := CreateTestAccount(t, store)

	certificationPath := "../testdata/attachments/signature-form.pdf"
	certificationBytes, readErr := ioutil.ReadFile(certificationPath)
	if readErr != nil {
		t.Fatal(readErr)
	}

	attachment := api.Attachment{
		AccountID: account.ID,
		Filename:  "signature-form.pdf",
		Size:      int64(len(certificationBytes)),
		DocType:   "CER",
		Raw:       certificationBytes,
	}

	createErr := store.CreateAttachment(&attachment)
	if createErr != nil {
		t.Fatal(createErr)
	}

	if attachment.ID == 0 {
		t.Fatal("Should have set an ID")
	}

	fetchedAttachment, fetchErr := store.LoadAttachment(account.ID, attachment.ID)
	if fetchErr != nil {
		t.Fatal(fetchErr)
	}

	if fetchedAttachment.AccountID != attachment.AccountID {
		t.Fatal("Got back different AccountID")
	}

	if fetchedAttachment.Filename != attachment.Filename {
		t.Fatal("Got back different Filename")
	}

	if fetchedAttachment.Size != attachment.Size {
		t.Fatal("Got back different Size")
	}

	if fetchedAttachment.DocType != attachment.DocType {
		t.Fatal("Got back different DocType")
	}

	if !bytes.Equal(fetchedAttachment.Raw, attachment.Raw) {
		t.Fatal("Got back different Raw")
	}

	_, fetchBadAccountErr := store.LoadAttachment(-1, attachment.ID)
	if fetchBadAccountErr != api.ErrAttachmentDoesNotExist {
		t.Fatal("Shouldn't get back something with the wrong account_id")
	}

	delErr := store.DeleteAttachment(account.ID, attachment.ID)
	if delErr != nil {
		t.Fatal(delErr)
	}

	delAgain := store.DeleteAttachment(account.ID, attachment.ID)
	if delAgain == nil {
		t.Fatal("Should have errored deleting a second time")
	}

	_, fetchDeletedErr := store.LoadAttachment(account.ID, attachment.ID)
	if fetchDeletedErr != api.ErrAttachmentDoesNotExist {
		t.Fatal("Shouldn't get back something when its been deleted")
	}

}

func TestListAttachments(t *testing.T) {

	store := getSimpleStore()
	account := CreateTestAccount(t, store)

	testAttachments := []string{
		"../testdata/attachments/signature-form.pdf",
		"../testdata/attachments/release-credit.pdf",
		"../testdata/attachments/release-information.pdf",
		"../testdata/attachments/release-medical.pdf",
	}

	attachmentCount := 10

	for i := 0; i < attachmentCount; i++ {
		certificationPath := testAttachments[i%4]
		certificationBytes, readErr := ioutil.ReadFile(certificationPath)
		if readErr != nil {
			t.Fatal(readErr)
		}

		attachment := api.Attachment{
			AccountID: account.ID,
			Filename:  "signature-form.pdf",
			Size:      int64(len(certificationBytes)),
			DocType:   "CER",
			Raw:       certificationBytes,
		}

		createErr := store.CreateAttachment(&attachment)
		if createErr != nil {
			t.Fatal(createErr)
		}
	}

	metadata, listErr := store.ListAttachmentsMetadata(account.ID)
	if listErr != nil {
		t.Fatal(listErr)
	}

	if len(metadata) != attachmentCount {
		t.Log("Should have gotten back as many as we put in")
		t.Error()
	}

	for i, attachment := range metadata {
		if i%2 == 0 {
			delErr := store.DeleteAttachment(account.ID, attachment.ID)
			if delErr != nil {
				t.Fatal("Should be able to delete every other.")
			}
		}
	}

	halfMetadata, listHalfErr := store.ListAttachmentsMetadata(account.ID)
	if listHalfErr != nil {
		t.Fatal("should have been able to fetch half")
	}

	if len(halfMetadata) != attachmentCount/2 {
		t.Fatal("Should have gotten back half!")
	}

}
