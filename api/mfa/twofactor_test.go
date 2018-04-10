package mfa

import (
	"encoding/base32"
	"testing"

	"github.com/18F/e-QIP-prototype/api/mock"
)

var tests = []struct {
	secret  []byte
	account string
	token   string
	base64  string
}{
	{[]byte("secret"), "bryan", "814628", "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAABlBMVEX///8AAABVwtN+AAAClElEQVR42uzbQW7jMAwF0Mn9Lz0HKGJ8kpZiWO+vgjR1rNcFK1L+JyIiIiIiIiIiIiIiIiIinzjJFf6+/+3z16/vujcAAAAAAJAArPhM9Z2csPoZAAAAAACQXOBbebkuUL3SWiXM7w0AAAAAAOwHuP6t6ysn3wsAAAAAAJ4GUG2M5cUTAAAAAADsB+ghVTc61ZHLw3qCAAAAAPBCgHxZ+18/7HwAAAAAALwKYEXxrG6eHrAgAAAAADgUoNrEqh5urRbh5FsAAAAAAMATymCvGXa9rMkgBQAAAAAATJaSlL7qLVQPRuVLXzAYAQAAAIBDAZJ2V+9Bh6TE5Ri9R+sAAAAAAEAC8GmleiOTg1QLWmUAAAAAcDRAtTz2HpXL22O9IQwAAAAAAFhRDPNhRW+IUX04b9nfHgAAAAAOBeiVl5xkss360XODAAAAAHAQQHX4UB1N9DZMycZrwd4PAAAAAI4DqI4+qoWrOlTffgIYAAAAAI4GyDcu1YHJZAvVG6oAAAAAAIDVS8+H5L1jsPNyCgAAAAAA5oORvFXWW1ZvM7SsJQYAAAAAhwJUtzX3DrrzEppvpwAAAAAAwL2D8Wo7qlc258N2AAAAAABwV2Ns0k7Lr1zdAC0+JQYAAAAAxwFMtj69DU3SkKsOVQAAAAAAwJ4kg+t8Q1Mdgy/uCQIAAADAcQCTxyCqi0iukL++tRkGAAAAAEcDTFpfSdGbX21LNxAAAAAAjga461jrZNzRK8gAAAAAAGAPQO+Q1Hy5y4bkAAAAAACgXAaTRfdGJXnT7qf/BwAAAADACwGqba3k2FTy03w8/oCeIAAAAAC8EKC6KekNq/MDVluaYQAAAAAAQERERERERERERERERETkLfkfAAD//9UZTTURTSSBAAAAAElFTkSuQmCC"},
	{[]byte("702387654342348"), "paul", "525516", "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAABlBMVEX///8AAABVwtN+AAACzUlEQVR42uzb227bMBAE0Ob/f7rvQcTO8NbAOvOUoJbNnALa9ZL6IyIiIiIiIiIiIiIiIiIiIiIiX//Otxf3vwY/ffu0alUAAAAAsAjQ/+vjqn96yfj9greq1gwAAAAAUwDjhYz/uuB1wRVVjQAAAACA6wBph/rTZQFPvyoAAAAAuA7w2MkGLW5aQQAAAADgOkDAs3xFUFV+60AEAAAAHwzQd7c3fvpdW2MAAAD4TICNUONtpOWK9J8DAACAzwRIm9NAoX/ndBR68t4PAAAAAF9pXzoeU06utbpivwIAAAAAPO/9BIurqkDwQf1eOgAAAACc+rL/eOcdLzP4jMcrJs+cAwAAAMC2UjDukYMONVVIJwN3qgAAAADeCJB+QH8AfON082QVAAAAAID4nHe6rmqqMJ4WBLMEAAAAANgGUA0sJ0tBNZvtp7QAAAAAsG0o2t+608pQvdXFg0IAAAB4GUB/PLK6rHqD26MAAAAAAIhb0uUv9su7VCdbYQAAALwbILhhB/fg9Pma/q9LVwAAAAAA861wemOv/tjqAPjKA9oAAAAAcKoyTO7kBL102jwfL4MAAAB4N8CeeWj1pE1ah/r/GwAAAADYsTNUnYLs19oXAAAAAAA4BTA5yQy+7Pe1JGijAQAAAODr5FA0eIwmXfXkrTvoqgEAAABgbxUI5pfj4lH9urK1dKgMAgAA4N0A/YLHjH0n228ZAQAAAMClKtBPFYLJQLrddFIBAAAA7wZYrhbpsZ/0xRUtAAAAAGwbivaHs9Nmtxq8bqxNAAAAADB1dw++oQctbrWXvjKbAAAAAIBt84D0AZjq2ed+RpAyAgAAAMBNgJXdosmjkMcnIAAAAADQAaw8Rpi21mkJAgAAAIBL84DJr+npkLWfvgIAAADAzZ2h9GBP0EEHDXU6lgAAAAAAERERERERERERERERERERERF5bf4GAAD///rJRPPdPVHuAAAAAElFTkSuQmCC"},
	{[]byte("⌘⌘⌘⌘⌘"), "alan", "63750", "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAABlBMVEX///8AAABVwtN+AAACgklEQVR42uzbQZKjMAwF0OH+l55tb6C+JNvpNO+vUsAkntcLlSzzT0RERERERERERERERERErjg/n0++8+5Xnp+crA0AAAAAAPQA8mfuSJ7Bngnv7vawAQAAAABADyApfdXC9VwMn0tZdW0AAAAAAGA3QH4luQ4AAAAAAL63DCYLydum5PsBAAAAAMA+gN6gI7mbb6rN1wYAAAAAAM6Mx898/sXnAwAAAADg6wFWFc9kOR9dMgAAAAAAaDY6vaF33rL0DlJtOyoLAAAAAC8FSIbVvUOvydZX/m+XllMAAAAAAHBVByD55lmPs/q7AAAAAABgXy1Y2+LMB+MbttYAAAAA4NUA+WbY5Ejs5KWKfEsPAAAAAADMt8QmL8/li6oey9r2VwcAAAAAAIUxRT5U6b1ml49QAAAAAADAqgYov14dnsybmM0jEQAAAAB4KUC+NZWUqV7J6g3DAQAAAADAGYC8YPZercgbo80MAAAAAPA6gMm4I/nvTsodAAAAAAA4AzBnqLZQ1aaqOrQBAAAAAACrhuR5IaoemJ2POAAAAAAAwNoymB9TzUl6R65WIQEAAAAAgLzVyD/32qzq6DvZQgMAAAAAADsAeleqGHkjtaEwAgAAAACAq1pqqkOS/G5veAIAAAAAAM6kOh6vvlpR3TADAAAAAABry2D1aGp1qJK3OHl7BAAAAAAAVpW1agmaHKGqlsENjREAAAAAAGgeesrxeoTVJgkAAAAAAHwWoLfw3tgcAAAAAACcB8iHIdVNuGT8smFjDAAAAAAAXL1ncrDeyD0vtgAAAAAA4OR4PHl9YbJ5tqHpAQAAAAAAIiIiIiIiIiIiIiIiIiJ/N/8DAAD//7oDTcVGJzkNAAAAAElFTkSuQmCC"},
	{[]byte("000000"), "john", "343152", "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAABlBMVEX///8AAABVwtN+AAAChklEQVR42uzcUW4bMQwEUOf+l+4BgixmREkNsm++CmNraN8PS1LuR0REREREREREREREREREvuKsPf/9b33/fNfZAAAAAADAGsC5ZyYH3HU2AAAAAACQfMFz6Xt+5qcnfyqDefHMzwYAAAAAAE4D5J/khSspoQAAAAAA4DcDPJfBpDDmhRQAAAAAAHz9p5HY2hokX2i0LwcAAAAAAO6vx2/++VfeDwAAAACAPwLwOVBCW7ytZQ0AAAAAAIxGYs8vtOuY+bflYzMAAAAAADBvhvLn2/YlWYmsXZsCAAAAAACn25p5+UrWJvm4bmvzBAAAAAAAosuw7U8iJmuQ0w0ZAAAAAABYKz7tsCp5oaRgHlikAAAAAACAxWtH8wuwbelreQAAAAAAwORV2muz+TIkKb/z1ToAAAAAAGjX3ZMS1K7Z11qoY/8OAAAAAIBXA6yVwTW89iQHtkEAAAAAAGDDf57Urj7aBfv1xQgAAAAAAPgko6x2cJWU08lYDgAAAAAATBgmo6a1Qppf0Tq2EwIAAAAAAMWwalK42oLWNmQAAAAAAGDXknwNo2222sXIsWIIAAAAAC8FmBy/HaEli5F85QIAAAAAAE4PxtYW6e1orV2hXOkGAQAAAOAVAHnDscYzKbl5IwUAAAAAAO4kh1n74UXbEl2HAQAAAIA/BbDramq+ym4JE1oAAAAAADAva/kzawuTFqNt2gAAAAAAwK7mpl1xz0nakdiBMggAAAAAAOqldH4NNilo7YsCAAAAAICbAGurjzWMvEgCAAAAAICbI7FnmHwJk3zPxfvBAAAAAPBSgMl6PCmSbXPTtkoAAAAAAEBERERERERERERERERE5NX5FwAA//+6LkyB/dR2SwAAAABJRU5ErkJggg=="},
	{[]byte("z.83234."), "jay", "562450", "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAABlBMVEX///8AAABVwtN+AAACiUlEQVR42uzdsW7rMAwFUPf/f7prlhiXpCUk0bnTw4ti2KcDS1FGLxERERERERERERERERER+YuTf+t1zbv179bM7w0AAAAAAFQB8jX3JPmN38P07g0AAAAAAEwAkmJV/e59WZtfHwAAAAAA7AdIClrerPRKKwAAAAAA2A8wX5+3NQAAAAAAYCdAdU3yQEl7lAB8zJ4gAAAAAPwgQHWUsfPfH3Y+AAAAAAB+CuBa0EjN26YvCQAAAAB8PUBvKyspVsnQozo8ebQNAgAAAAAAhQtXX55ICmBOm98PAAAAAACYAyRtTbK+93DVrTIAAAAAAHAtG49UB9rV8cXGBwUAAAAAAFfe+vQeaz7uTvgf2hgDAAAAAADlY7Dz8lVtnqqNFwAAAAAA6LVByaf5Jln+rV6jBgAAAAAAVrw8Pdk2ywnnDwcAAAAAANaNx/NXHKrHafNyWm2hAAAAAADApAxWH6j6iPPmbPHvAQAAAABwEECvPcqHHnmxzX8giw9PAQAAAMBxAPnl5yPr6sbYtSMAAAAAcChAfqCp9wpFb6BRHbkAAAAAAIB1JTEpevMDUPn/AwAAAACAa9lJ0erGVVLcqq1S764AAAAAAMCcIW9rJltf91tiVQwAAAAAAPDsoz87jq4O0jcOSQAAAADgaID9G2aTNmvLniAAAAAAHATw7EvMvSO01ZfqFuwJAgAAAMDRAJOGaX7Mqtc2LesGAQAAAOBQgGo5WlHK8oK88YU5AAAAAAAw+mM7yXWSLbRkJQAAAAAA2F8G81FGsrL6KQAAAAAA2Lkl1rv9fJz+1J0DAAAAAIDkMtWNqN5RqWTN5E4AAAAAAICIiIiIiIiIiIiIiIiIyKH5DwAA///Ffk3pzKpfMwAAAABJRU5ErkJggg=="},
}

func TestSecret(t *testing.T) {
	service := MFAService{Log: mock.LogService{}, Env: mock.Native{}}
	first := service.Secret()
	if first == "" {
		t.Error("Secret should not be empty")
	}

	second := service.Secret()
	if second == "" {
		t.Error("Secret should not be empty")
	}
	if first == second {
		t.Error("Secret should be random on each call")
	}
}

func TestGenerate(t *testing.T) {
	service := MFAService{Log: mock.LogService{}, Env: mock.Native{}}
	for _, x := range tests {
		if png, err := service.Generate(x.account, base32.StdEncoding.EncodeToString(x.secret)); err == nil {
			if png != x.base64 {
				t.Errorf("Generation for %s (secret: %s) returned unexpected base64 of %s", x.account, x.secret, png)
			}
		}
	}
}

func TestAuthenticate(t *testing.T) {
	service := MFAService{Log: mock.LogService{}, Env: mock.Native{}}
	for _, x := range tests {
		if ok, err := service.Authenticate(x.token, base32.StdEncoding.EncodeToString(x.secret)); err == nil {
			if ok {
				t.Errorf("Authentication for %s (secret: %s) with token %s expected to pass", x.account, x.secret, x.token)
			}
		}
	}
}

// func TestEmailSuccess(t *testing.T) {
// 	os.Clearenv()
// 	service := MFAService{Log: mock.LogService{}, Env: mock.Native{}}
// 	if err := os.Setenv("EQIP_SMTP_API_KEY", "SANDBOX_SUCCESS"); err != nil {
// 		t.Errorf("Failed to set EQIP_SMTP_API_KEY environment variable: %v", err)
// 	}
// 	if err := service.Email("test@mail.gov", base32.StdEncoding.EncodeToString([]byte("secret"))); err != nil {
// 		t.Errorf("Failed to send email: %v", err)
// 	}
// }

// func TestEmailError(t *testing.T) {
// 	os.Clearenv()
// 	service := MFAService{Log: mock.LogService{}, Env: mock.Native{}}
// 	if err := os.Setenv("EQIP_SMTP_API_KEY", "SANDBOX_ERROR"); err != nil {
// 		t.Errorf("Failed to set EQIP_SMTP_API_KEY environment variable: %v", err)
// 	}
// 	if err := service.Email("test@mail.gov", base32.StdEncoding.EncodeToString([]byte("secret"))); err == nil {
// 		t.Error("Expected an error but received none")
// 	}
// }

// func TestEmailCloudFoundry(t *testing.T) {
// 	os.Clearenv()
// 	service := MFAService{Log: mock.LogService{}, Env: cloudfoundry.CloudFoundry{}}
// 	if err := os.Setenv("VCAP_SERVICES", `{ "user-provided": [{ "credentials": { "api_key": "SANDBOX_SUCCESS" }, "label": "user-provided", "name": "eqip-smtp" }] }`); err != nil {
// 		t.Errorf("Failed to set VCAP_SERVICES environment variable: %v", err)
// 	}
// 	if err := service.Email("test@mail.gov", base32.StdEncoding.EncodeToString([]byte("secret"))); err != nil {
// 		t.Errorf("Failed to send email: %v", err)
// 	}
// }
