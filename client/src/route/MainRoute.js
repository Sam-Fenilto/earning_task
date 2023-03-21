import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

// components
import Loader from '../component/Loader';
import RegisterPage from '../page/user/RegisterPage';



function MainRoute() {
    return (
        <Suspense fallback={<Loader />} >
            <Routes>
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/create_form' element={<RegisterPage />} />

                {/* Wild Routes */}
                <Route path='/' element={<Navigate to="/register" replace={true} />} />
                <Route path='*' element={<Navigate to="/register" replace={true} />} />
            </Routes>
        </Suspense>
    )
}

export default MainRoute