import React, { useState } from 'react';
import { api } from '../../config/AxiosConfig';
import { useNavigate } from 'react-router-dom';

function CreateFormPage(props) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

    const [serverErrorMessage, setServerErrorMessage] = useState("");
    const [serverSuccessMessage, setServerSuccessMessage] = useState("");

    return (
        <>
            <section className="vh-100" style={{ backgroundColor: "#eee" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
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
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <>
                                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Fill The Form</p>
                                                <form className="mx-1 mx-md-4">
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="email" id="form3Example3c" className="form-control" name='phone_number' />
                                                            <label className="form-label" for="form3Example3c">Image Title</label>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <textarea type="password" id="form3Example4c" className="form-control" name='password'  />
                                                            <label className="form-label" for="form3Example4c">Image Description</label>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="file" id="form3Example4c" className="form-control" name='password' />
                                                            <label className="form-label" for="form3Example4c">Image File</label>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <select id="form3Example4c" className="form-control" name='password'>
                                                            <option>People</option>
                                                            <option>Tech</option>
                                                            <option>Entertainment</option>
                                                            </select>
                                                            <label className="form-label" for="form3Example4c">Category</label>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="radio" id="form3Example4c" className="me-1 form-check-input" name='password'  />
                                                            <label className="form-label" for="form3Example4c ">Yes, Item for Sale</label>
                                                            <input type="radio" id="form3Example4c" className="ms-3 me-1 form-check-input" name='password'  />
                                                            <label className="form-label" for="form3Example4c">No, it’s free.</label>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="checkbox" id="form3Example4c" className="form-check-input me-2" name='password'  />
                                                            <label className="form-check-label form-label" for="form3Example4c ">Accept T&C </label>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                        <button type="button" className="btn btn-primary btn-lg" onClick={() => false}>Submit</button>
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