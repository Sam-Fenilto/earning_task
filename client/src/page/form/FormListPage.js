import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

import { api } from '../../config/AxiosConfig';

function FormListPage(props) {
    const [formListData, setFormListData] = useState([]);
    const [serverErrorMessage, setServerErrorMessage] = useState("");
    const [serverSuccessMessage, setServerSuccessMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getFormList();
    }, []);


    const handleDelete = (event, form_uuid) => {
        event.preventDefault();
        api.delete('/form/delete_form', {
            data: {
                form_uuid: form_uuid
            }
        }).then((response) => {
            if (response.data.valid) {
                setServerSuccessMessage(response.data?.message);
                getFormList();
            }
        })
    }

    const getFormList = () => {
        api.get('/form/form_list').then((response) => {
            if (response.data.valid) {
                setFormListData(response.data.data)
            }
        })
    }

    const columns = [

        {
            name: 'Action',
            cell: (row) => {
                return <>
                    <button className='btn-reset text-15 ' title='Edit Patient' onClick={() => navigate(`/update_form?form_id=${row.uuid}`)}>Edit</button>
                    <button className='btn-reset text-15 mx-3' title='Delete Patient' onClick={(e) => handleDelete(e, row.uuid)}>Delete</button>

                </>
            },
            center: true,
            width: '200px'
        },
        {
            name: '',
            cell: row =>
                <div className='table_image'>
                    <img className='img-fluid' src={`${process.env.REACT_APP_SERVER_URL}/static/original_image/${row.uuid}_image.${row.image_extension}`}></img>
                </div>,
            width: '70px'
        },

        {
            name: 'Image Title',
            selector: row => row.image_title,
            width: '200px'
        },
        {
            name: 'Image Description',
            selector: row => row.image_description,
            width: '200px'
        },
        {
            name: 'Category',
            selector: row => row.category_name,
            width: '300px'
        },
        {
            name: 'Price Available',
            selector: row => row.is_price_available === 'Y' ? 'Yes Price Available' : 'No price not available',
        },
        {
            name: 'price',
            selector: row => row.price == 0 ? '-' : row.price,
        },
    ];

    return (
        <div className='p-5'>
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
            <div className="d-flex justify-content-end mx-4 mb-3 mb-lg-4">
            <button type="button" className="btn btn-primary btn-lg me-3" onClick={() => navigate('/')}>Create Account</button>
                <button type="button" className="btn btn-primary btn-lg" onClick={() => navigate('/create_form')}>Create New Form</button>
            </div>
            <DataTable
                columns={columns}
                data={formListData}
                pagination
            />
        </div>
    )
}

export default FormListPage