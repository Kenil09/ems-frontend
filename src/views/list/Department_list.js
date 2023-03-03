import React from 'react';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import MUIDataTable from 'mui-datatables';
function Department_list() {
    const columns = ['Name', 'Email', 'City', 'Department', 'Phone Number', 'actions'];
    // const [ViewShow, SetViewShow] = useState(false);
    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const hanldeViewClose = () => {
    //     SetViewShow(false);
    // };
    const data = [
        [
            'Ajay',
            'ajay@gmail.com',
            'Surat',
            'HR',
            '9316575588',
            <div className="d-flex">
                <button className="btn btn-outline-primary" onClick={handleShow}>
                    Update
                </button>
                <button className="btn btn-outline-danger" onClick={handleShow}>
                    Delete
                </button>
            </div>
        ],
        [
            'Kenil',
            'Kenil@gmail.com',
            'Surat',
            'HR',
            '9316575588',
            <div className="d-flex">
                <button className="btn btn-outline-primary" onClick={handleShow}>
                    Update
                </button>
                <button className="btn btn-outline-danger" onClick={handleShow}>
                    Delete
                </button>
            </div>
        ],
        [
            'Vishal',
            'Vishal@gmail.com',
            'Surat',
            'HR',
            '9316575588',
            <div className="d-flex">
                <button className="btn btn-outline-primary" onClick={handleShow}>
                    Update
                </button>
                <button className="btn btn-outline-danger" onClick={handleShow}>
                    Delete
                </button>
            </div>
        ],
        [
            'Yash',
            'Yash@gmail.com',
            'Surat',
            'HR',
            '9316575588',
            <div className="d-flex">
                <button className="btn btn-outline-primary" onClick={handleShow}>
                    Update
                </button>
                <button className="btn btn-outline-danger" onClick={handleShow}>
                    Delete
                </button>
            </div>
        ]
    ];

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card-body table-responsive">
                            <MUIDataTable
                                title={'Department List'}
                                data={data}
                                columns={columns}
                                options={{ selectableRows: false }}
                            ></MUIDataTable>
                        </div>
                    </div>
                </div>
                <div>
                    <Modal show={showModal} onHide={handleClose} backdrop="static" centered className="dataModal mt-4">
                        <Modal.Header>
                            <Modal.Title>View Employee Data</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <div className="form-group">
                                    <span>Name</span>
                                    <input type="text" className="form-control" value={'Ajay'} readOnly />
                                </div>
                                <div className="form-group mt-3">
                                    <span>Email</span>
                                    <input type="email" className="form-control" value={'ajay@gmail.com'} readOnly />
                                </div>
                                <div className="form-group mt-3">
                                    <span>City</span>
                                    <input type="text" className="form-control" value={'Surat'} readOnly />
                                </div>
                                <div className="form-group mt-3">
                                    <span>Department</span>
                                    <input type="text" className="form-control" value={'HR'} readOnly />
                                </div>
                                <div className="form-group mt-3">
                                    <span>Phone Number</span>
                                    <input type="tel" className="form-control" value={'9316575588'} readOnly />
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </>
    );
}

export default Department_list;
