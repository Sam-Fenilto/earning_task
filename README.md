

# Client

Routes
- /regiser
    - mobile input field.
    - password input field
    - submit button
    generates otp for the mobile number and if the response is succes then otp component appears
    - otp input field.
    - submit
    after successful otp verification the form redirects to the user image creation form page /create_form

- /create_form
    - Image Title (Input Text)
    - Image Description (Input Text)
    - Image (File Type) (Min 2000px width resolution)
    - Category (Select Input)
        - People
        - Tech
        - . Entertainment
    - Item for Sale (Radio Button)
        - Yes, Item for Sale
            -  Item Price (Input Text)
        - No, it’s free.
    - Accept T&C (Checkbox)
    create new form
- /update_form
    - Image Title (Input Text)
    - Image Description (Input Text)
    - Image (File Type) (Min 2000px width resolution)
    - Category (Select Input)
        - People
        - Tech
        - . Entertainment
    - Item for Sale (Radio Button)
        - Yes, Item for Sale
            -  Item Price (Input Text)
        - No, it’s free.
    - Accept T&C (Checkbox)
    update form
- /form_list
    - has edit and delete button 
    - list of all form created
		
# server
Routes
- /user/sign_up [POST]
   ```
   req json:
   {
	"phone_number": 9384661563,
	"password": "test1234"
    }
   ```
   ### output
    ```
   success json:
   {
	"valid": true,
	"message": "Please Verify account with the Otp    922723       for   the mobile number 93846611563",
	"data": [
		{
			"otp": "922723",
			"phone_number": 93846611563
		}
	],
	"force_logout": 0
  }

  error json:
  {
	"valid": false,
	"message": "User Already Exist",
	"data": null,
	"force_logout": 0
    }
   ```
- /user/verify_user_otp [POST]
     ```
   req json:
   {
	"phone_number": 9384661561,
	"otp": 622908
    }
   ```
   ### output
    ```
   success json:
   {
	"valid": true,
	"message": "Mobile Number Verified Successfully!",
	"data": null,
	"force_logout": 0
    }

  error json:
    {
	"valid": false,
	"message": "Mobile Number cannot be found",
	"data": null,
	"force_logout": 0
    }
    {
	"valid": false,
	"message": "Please enter a valid otp!",
	"data": null,
	"force_logout": 0
    }
   ```
- /form/create_form [POST] | update form pass form_uuid: uuid
    ```
    req json:
   {
    category_id: "2",
        image_description: "asdasdasd",
            image_extension: "jpeg",
                image_title: "asdasd",
                    is_price_avaliable: "true",
                        is_terms_accepted: true,
        original_file_name:"pexels-michael-spadoni-813465.jpg"
    price: "123"
    }
   ```
- /form/form_list [GET]
    ```
    req json:
   {

    }
   ```
- /form/delete_form [DELETE]
    ```
    req json:
    {
        form_uuid: uuid
    }
   ```
- /form/get_form [GET]
    ```
    req json:
    {
        form_uuid: uuid
    }
   ```
