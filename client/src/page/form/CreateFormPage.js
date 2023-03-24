import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

import { api } from '../../config/AxiosConfig';
import CommonUtil from '../../util/CommonUtil';

function CreateFormPage(props) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        image_title: '',
        image_description: '',
        category_id: 1,
        is_price_avaliable: false,
        price: '',
        is_terms_accepted: false
    });
    const [searchParams, setSearchParams] = useSearchParams();
    const form_id = searchParams.get('form_id');
    const [imageData, setImageData] = useState({
        original_file_name: '',
        image_base: '',
        image_extension: ''
    });

    const [serverErrorMessage, setServerErrorMessage] = useState("");
    const [serverSuccessMessage, setServerSuccessMessage] = useState("");

    useEffect(() => {
        if (form_id) {
            getFormData(form_id);
        }
    }, [])


    const changeImage = (event) => {
        let image_file = event.target.files[0];
        console.log(image_file)
        let image_extension = image_file.type.split('/')[1];
        let original_file_name = image_file.name;

        if (CommonUtil.is_image_1000px) {
            var reader = new FileReader();
            reader.readAsDataURL(image_file);
            reader.onload = function () {
                setImageData({
                    original_file_name: original_file_name,
                    image_base: reader.result,
                    image_extension: image_extension
                });
                return true;
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };

        } else {
            setServerErrorMessage("The image must be min 1000px width")
        }
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setFormData({
            ...formData,
            [event.target.name]: value.toLowerCase(),
        })
    }
    const handleChecks = (event) => {
        const value = event.target.checked;
        setFormData({
            ...formData,
            [event.target.name]: value,
        })
    }

    const clearStates = () => {
        // setFormError({});
        setServerErrorMessage("");
        setServerSuccessMessage("");
    }



    const formSubmit = () => {
        clearStates();
        let data = {
            ...formData,
            ...imageData
        };
        if (form_id) {
            data['form_uuid'] = form_id
        }

        api.post('/form/create_form', data).then((response) => {
            if (response.data?.valid) {
                setServerSuccessMessage(response.data?.message)
            } else {
                setServerErrorMessage(response.data?.message)
            }
        })
    }


    const getFormData = (form_uuid) => {
        api.get('/form/get_form', {
            params: {
                form_uuid: form_uuid
            }
        }).then((response) => {
            if (response.data.valid) {
                setFormData({
                    image_title: response.data.data[0].image_title,
                    image_description: response.data.data[0].image_description,
                    category_id: response.data.data[0].category_id,
                    is_price_avaliable: response.data.data[0].is_price_avaliable == 'Y' ? true : false,
                    price: response.data.data[0].price,
                    is_terms_accepted: response.data.data[0].is_terms_accepted == 'Y' ? true : false,
                    original_file_name: response.data.data[0].original_file_name
                })
                setImageData({
                    original_file_name: response.data.data[0].original_file_name,
                    image_base: response.data.data[0].image_base,
                    image_extension: response.data.data[0].image_extension,
                })
            }
        })
    }


    return (
        <>
            <section className="vh-100" style={{ backgroundColor: "#eee" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">

                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <>
                                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Fill The Form</p>
                                                {
                                                    serverSuccessMessage !== "" ? (
                                                        <div class="alert alert-success" role="alert">
                                                            {serverSuccessMessage}
                                                        </div>
                                                    ) : null
                                                }
                                                {
                                                    serverErrorMessage !== "" ? (
                                                        <div class="alert alert-danger" role="alert">
                                                            {serverErrorMessage}
                                                        </div>
                                                    ) : null
                                                }
                                                <form className="mx-1 mx-md-4">
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <label className="form-label" for="image_title">Image Title</label>
                                                            <input type="email" id="image_title" className="form-control" name='image_title' value={formData.image_title} onChange={handleChange} />

                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <label className="form-label" for="image_description">Image Description</label>
                                                            <textarea type="password" id="image_description" className="form-control" name='image_description' value={formData.image_description} onChange={handleChange} />

                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <label className="form-label" for="form3Example4c">{form_id ? `Current Image : ${formData.original_file_name}` : `Image File`}</label>
                                                            <input type="file" id="form3Example4c" className="form-control" name='image_data' onChange={changeImage} />
                                                            <img width={"300px"} src={imageData?.image_base} />
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <label className="form-label" for="category_id">Category</label>
                                                            <select id="category_id" className="form-control" name='category_id' value={formData.category_id} onChange={handleChange} >
                                                                <option value='1'>People</option>
                                                                <option value='2'>Tech</option>
                                                                <option value='3'>Entertainment</option>
                                                            </select>

                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0" onChange={handleChange}  >
                                                            <input defaultChecked={formData.is_price_avaliable == true} type="radio" id="yes_price" className="me-1 form-check-input" value={true} name='is_price_avaliable' />
                                                            <label className="form-label" for="yes_price ">Yes, Item for Sale</label>
                                                            <input defaultChecked={formData.is_price_avaliable == false} type="radio" id="no_price" className="ms-3 me-1 form-check-input" value={false} name='is_price_avaliable' />
                                                            <label className="form-label" for="no_price">No, it’s free.</label>
                                                        </div>
                                                    </div>
                                                    {
                                                        formData?.is_price_avaliable == 'true' ? (
                                                            <div className="d-flex flex-row align-items-center mb-4">
                                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                                <div className="form-outline flex-fill mb-0">
                                                                    <label className="form-label" for="price">price</label>
                                                                    <input type="text" id="price" className="form-control" name='price' value={formData.price} onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                        ) : null
                                                    }
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="checkbox" id="is_terms_accepted" className="form-check-input me-2" name='is_terms_accepted' checked={formData.is_terms_accepted} onChange={handleChecks} />
                                                            <label className="form-check-label form-label" for="is_terms_accepted ">Accept T&C </label>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex justify-content-between mx-4 mb-3 mb-lg-4">
                                                        <button type="button" className="btn btn-primary btn-lg" onClick={() => navigate('/form_list')}>Form List</button>
                                                        <button type="button" className="btn btn-primary btn-lg" onClick={formSubmit}>Submit</button>
                                                    </div>
                                                </form>
                                            </>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                className="img-fluid" alt="Sample" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CreateFormPage