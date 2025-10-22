import React from 'react'
import { useState } from 'react'
import {FileUploader } from './FileUploader.jsx';


function Content() {

    const [cardDetails, setCartDetails] = useState(
        {
            provider: "",
            card_last4: "",
            billing_cycle: "",
            due_date: "",
            total_due: "",
        });
    
    const [files, setFiles] = useState(null);
    
    const handleFilesSelected = (files) => {
        console.log('Files selected in App component:', files);
        setFiles(files);
    };

    function renderUploader() {
        return (<div className='flex flex-col gap-5'>
            <FileUploader onFilesSelected={handleFilesSelected} />
            <button className='hover:cursor-pointer  py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-700 transition-all'>
                Upload
            </button>
            {/* add uploader file here */}
        </div>)
    }


    function renderDetailsCard({ provider, card_last4, billing_cycle, due_date, total_due }) {
        return <div className=''>
            <div className='my-6 text-2xl font-bold'>
                Bank Details
            </div>
            <div className='p-5 bg-amber-200 border border-black rounded-lg w-90'>
                <div>Provider: {provider}</div>
                <div>Last 4 digits: {card_last4}</div>
                <div>Billing cycle: {billing_cycle}</div>
                <div>Due Date: {due_date}</div>
                <div>Total Due: {total_due}</div>
            </div>
        </div>
    }



    return (
        <div className='flex items-center justify-around gap-5 min-h-3/4 w-full bg-blue-100 p-10'>
            {renderUploader()}
            {renderDetailsCard(cardDetails)}
        </div>
    )
}

export default Content;