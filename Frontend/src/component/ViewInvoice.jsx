import React, { useState } from 'react';
import Sidebar from './layout/Sidebar';
import Navbar from './Navbar';
import AvatarImg from '../assets/Avatar.png';
import { Button, Modal } from 'react-bootstrap';
import editIcon from '../Icons/Edit.png';
import viewICon from '../Icons/view.png';
import deleteIcon from '../Icons/delete.png';
import { LuArrowDownSquare } from "react-icons/lu";
import { jsPDF } from 'jspdf'; 

const ViewInvoice = () => {

    const [complaint, setComplaint] = useState([
        { id: '152563', bdate: '10/02/2024', pdate: '10/02/2024',  mamt: '1500', pamt: '2500' },
        { id: '152564',bdate: '11/02/2024', pdate: '11/02/2024',  mamt: '2000', pamt: '3000' },
        { id: '152565', bdate: '12/02/2024', pdate: '12/02/2024', mamt: '1200', pamt: '2200' },
        { id: '152566',bdate: '13/02/2024', pdate: '13/02/2024', mamt: '1800', pamt: '2800' },
        { id: '152566', bdate: '13/02/2024', pdate: '13/02/2024',  mamt: '1800', pamt: '2800' },
        { id: '152566', bdate: '13/02/2024', pdate: '13/02/2024',  mamt: '1800', pamt: '2800' },
        { id: '152566',bdate: '13/02/2024', pdate: '13/02/2024', mamt: '1800', pamt: '2800' },
        { id: '152566',bdate: '13/02/2024', pdate: '13/02/2024',  mamt: '1800', pamt: '2800' },
        { id: '152566',bdate: '13/02/2024', pdate: '13/02/2024',  mamt: '1800', pamt: '2800' },
        { id: '152566', bdate: '13/02/2024', pdate: '13/02/2024',  mamt: '1800', pamt: '2800' },
        { id: '152566',bdate: '13/02/2024', pdate: '13/02/2024',  mamt: '1800', pamt: '2800' },
        { id: '152566',bdate: '13/02/2024', pdate: '13/02/2024',  mamt:'1800', pamt: '2800' },
        { id: '152566', bdate: '13/02/2024', pdate: '13/02/2024', mamt: '1800', pamt: '2800' },
        { id: '152566',bdate: '13/02/2024', pdate: '13/02/2024',  mamt: '1800', pamt: '2800' }
    ]);

    const [showViewModal, setShowViewModal] = useState(false);
    const [viewComplaint, setViewComplaint] = useState(null);

    const handleShowViewModal = (index) => {
        setViewComplaint(complaint[index]); // Set the specific complaint data
        setShowViewModal(true); // Show the modal
    };

    const handleCloseViewModal = () => setShowViewModal(false);

    const handleDownloadInvoice = () => {
        if (!viewComplaint) return;

        const doc = new jsPDF();

        // Add Title
        doc.setFontSize(16);
        doc.text("Maintenance Invoice", 14, 20);

        // Add Invoice Details
        doc.setFontSize(12);
        doc.text(`Invoice ID: ${viewComplaint.id}`, 14, 30);
        doc.text(`Owner Name: ${viewComplaint.name}`, 14, 40);
        doc.text(`Bill Date: ${viewComplaint.bdate}`, 14, 50);
        doc.text(`Payment Date: ${viewComplaint.pdate}`, 14, 60);
        doc.text(`Phone Number: ${viewComplaint.pnumber}`, 14, 70);
        doc.text(`Email: ${viewComplaint.email}`, 14, 80);

        // Add Maintenance and Pending Amount
        doc.text(`Maintenance Amount: ₹${viewComplaint.mamt}`, 14, 90);
        doc.text(`Pending Amount: ₹${viewComplaint.pamt}`, 14, 100);
        doc.text("Penalty: ₹350.00", 14, 110);
        doc.text("Grand Total: ₹1850.00", 14, 120);

        // Add Footer Note
        doc.text("Note: A visual representation of your spending categories.", 14, 140);

        // Save PDF
        doc.save(`Invoice_${viewComplaint.id}.pdf`);
    };

    return (
        <div className='dashboard-bg w-100'>
            <Sidebar />
            <Navbar />


            <div className='marginLeft'>
                <div className='container-fluid stickyHeader'>

                    <div className='row p-4'>

                        <div className='bg-light rounded '>
                            <div className="table-responsive rounded custom-scrollbar" style={{
                                maxHeight: '760px', // Adjust height as needed
                                overflowY: complaint.length > 10 ? 'scroll' : 'hidden',
                            }}>

                                <div >
                                    <div className='d-flex justify-content-between align-items-center mb-0 py-4 ps-1 '>
                                        <h5 className='financial-income-title '>Maintenance Invoices</h5>
                                        <div>
                                            <select className='month-btn rounded-2 d-flex align-items-center bg-light text-dark me-4'>
                                                <option>Month</option>
                                            </select>
                                        </div>
                                    </div>

                                    <table className="table  ">
                                        <thead className='table-primary '>
                                            <tr>
                                                <th scope="col">Invoice ID</th>
                                                <th scope="col">Due Date</th>
                                                <th scope="col" className='text-center'>Payment Date</th>
                                                <th scope="col" className='text-center'>Maintenance Amount</th>
                                                <th scope="col" className='text-center'>Pending Amount</th>
                                                <th scope="col" className='text-center'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                complaint.map((val, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td style={{ height: '55px' }}>{val.id}</td>
                                                            <td style={{ height: '55px' }}>{val.bdate}</td>
                                                            <td style={{ height: '55px' }} className='text-center'>{val.pdate}</td>
                                                            <td style={{ height: '55px' }} className='text-success text-center'>₹ {val.mamt}</td>
                                                            <td style={{ height: '55px' }} className='text-danger text-center'>{val.pamt}</td>
                                                            <td style={{ height: '55px', textAlign: "center", verticalAlign: "middle" }}>
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <img src={viewICon} className="text-primary me-2" style={{ cursor: "pointer" }} onClick={() => handleShowViewModal(index)} />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                {/* View Modal */}
                                <Modal show={showViewModal} onHide={handleCloseViewModal} centered className='square-modal'>
                                    <Modal.Header className='border-0 pb-0' closeButton>
                                        <Modal.Title>Maintenance Invoice</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {viewComplaint && (
                                            <div>
                                                {/* Invoice Details */}
                                                <div className="d-flex flex-column gap-2">
                                                    <div className='bg-light p-4'>
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <strong className='view-strong'>Invoice Id:</strong>
                                                                <p>{viewComplaint.id}</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <strong className='view-strong'>Owner Name:</strong>
                                                                <p>{viewComplaint.name}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <strong className='view-strong'>Bill Date:</strong>
                                                                <p>{viewComplaint.bdate}</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <strong className='view-strong'>Payment Date:</strong>
                                                                <p>{viewComplaint.pdate}</p>
                                                            </div>
                                                        </div>

                                                        
                                                            <div className="col-12">
                                                                <strong className='view-strong'>Phone Number:</strong>
                                                                <p>{viewComplaint.pnumber}</p>
                                                            </div>
                                                            <div className="col-12">
                                                                <strong className='view-strong'>Email:</strong>
                                                                <p>{viewComplaint.email}</p>
                                                            </div>
                                                      

                                                        <div className="col-12">
                                                            <strong className='view-strong'>Address:</strong>
                                                            <p>2118 Thornridge Cir. Syracuse, Connecticut 35624</p>
                                                        </div>
                                                    </div>

                                                    {/* Maintenance Amount, Penalty, and Total */}
                                                    <div className='bg-light p-4'>
                                                        <div className="col-12 d-flex justify-content-between">
                                                            <p>Maintenance Amount:</p> <p className=' text-success'> ₹ {viewComplaint.mamt}</p>
                                                        </div>
                                                        <div className="col-12  d-flex justify-content-between">
                                                            <p>Penalty:</p> <p className='text-danger'> ₹ 350.00</p>
                                                        </div>

                                                        <div className="col-12 d-flex justify-content-between">
                                                            <p>Grand Total:</p> <p> ₹ 1850.00</p>
                                                        </div>
                                                    </div>

                                                    {/* Note Section */}
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className='bg-light p-4'>
                                                                <strong className='view-strong'>Note:</strong>
                                                                <p>A visual representation of your spending categories visual representation.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Download Button */}
                                                <div className="text-center mt-2 mb-2">
                                                    <Button variant="warning" className="px-4 save maintainance-income-btn-bg w-100" onClick={handleDownloadInvoice}>
                                                        <LuArrowDownSquare className='text-light me-1' />
                                                        Download Invoice
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </Modal.Body>
                                </Modal>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default ViewInvoice;
