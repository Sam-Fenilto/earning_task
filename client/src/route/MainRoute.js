import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

// components
import Loader from '../component/Loader';
import RegisterPage from '../page/user/RegisterPage';
import CreateFormPage from '../page/form/CreateFormPage';
import FormListPage from '../page/form/FormListPage';



function MainRoute() {
    return (
        <Suspense fallback={<Loader />} >
            <Routes>
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/create_form' element={<CreateFormPage />} />
            <Route path='/update_form' element={<CreateFormPage />} />
            <Route path='/form_list' element={<FormListPage />} />

                {/* Wild Routes */}
                <Route path='/' element={<Navigate to="/register" replace={true} />} />
                <Route path='*' element={<Navigate to="/register" replace={true} />} />
            </Routes>
        </Suspense>
    )
}

export default MainRoute