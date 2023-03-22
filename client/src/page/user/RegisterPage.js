import React, { useState } from 'react';
import { api } from '../../config/AxiosConfig';
import { useNavigate } from 'react-router-dom';

function RegisterPage(props) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        phone_number: '',
        password: ''
    });
    const [formError, setFormError] = useState({});
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState('');
    const [serverErrorMessage, setServerErrorMessage] = useState("");
    const [serverSuccessMessage, setServerSuccessMessage] = useState("");

    const handleInputChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        setUserData({
            ...userData,
            [event.target.name]: value.toLowerCase(),
        })
    }

    const handleOtpChange = (event) => {
        event.preventDefault();
        setOtp(event.target.value)
    }

    const validateData = (data) => {
        let error_data = {};
        if (data.phone_number === "" || data.phone_number === null || data.phone_number === undefined) {
            error_data['phone_number'] = "Mobile Number Required";
        }

        if (data.password === "" || data.password === null || data.password === undefined) {
            error_data['password'] = "password Required";
        }

        return error_data;
    }


    const clearStates = () => {
        setFormError({});
        setServerErrorMessage("");
        setServerSuccessMessage("");
    }

    const submitData = (data) => {
        clearStates();
        const validate = validateData(data);
        if (Object.keys(validate)?.length) {
            setFormError(validate);
            return false;
        }

        api.post('/user/sign_up', data).then((response) => {
            if (response.data?.valid) {
                setShowOtp(true);
                setServerSuccessMessage(response.data?.message)
            } else {
                setServerErrorMessage(response.data?.message)
            }
        })
    }

    const submitOtp = (otp, phone_number) => {
        clearStates();
        if (otp === "" || otp === null || otp === undefined) {
            setFormError({ otp_error: "Otp cannot be empty" });
        }
        let data = {
            otp: otp,
            phone_number: phone_number
        }
        api.post('/user/verify_user_otp', data).then((response) => {
            if (response.data?.valid) {
                setShowOtp(true);
                setServerSuccessMessage(response.data?.message)
                navigate('/create_form');
            } else {
                setServerErrorMessage(response.data?.message)
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
                                            {
                                                showOtp ? (
                                                    <>
                                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"></p>
                                                        <form className="mx-1 mx-md-4">
                                                            <div className="d-flex flex-row align-items-center mb-4">
                                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                                <div className="form-outline flex-fill mb-0">
                                                                    <input type="email" id="otp" className="form-control" name='otp' value={otp} onChange={handleOtpChange} />
                                                                    <label className="form-label" htmlFor="otp">Enter OTP</label>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                                <button type="button" className="btn btn-primary btn-lg" onClick={() => submitOtp(otp, userData?.phone_number)}>Register</button>
                                                            </div>
                                                        </form>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                                        <form className="mx-1 mx-md-4">
                                                            <div className="d-flex flex-row align-items-center mb-4">
                                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                                <div className="form-outline flex-fill mb-0">
                                                                    <input type="email" id="phone_number" className="form-control" name='phone_number' value={userData?.phone_number} onChange={handleInputChange} />
                                                                    <label className="form-label" htmlFor="phone_number">Mobile Number</label>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex flex-row align-items-center mb-4">
                                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                                <div className="form-outline flex-fill mb-0">
                                                                    <input type="password" id="password" className="form-control" name='password' value={userData?.password} onChange={handleInputChange} />
                                                                    <label className="form-label" htmlFor="password">Password</label>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                                <button type="button" className="btn btn-primary btn-lg" onClick={() => submitData(userData)}>Register</button>
                                                            </div>
                                                        </form>
                                                    </>
                                                )
                                            }

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

export default RegisterPage