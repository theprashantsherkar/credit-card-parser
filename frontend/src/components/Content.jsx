// import React from 'react'
// import { useState } from 'react'
// import {FileUploader } from './FileUploader.jsx';


// function Content() {

//     const [cardDetails, setCartDetails] = useState(
//         {
//             provider: "",
//             card_last4: "",
//             billing_cycle: "",
//             due_date: "",
//             total_due: "",
//         });
    
//     const [files, setFiles] = useState(null);
    
//     const handleFilesSelected = (files) => {
//         console.log('Files selected in App component:', files);
//         setFiles(files);
//     };

//     function renderUploader() {
//         return (<div className='flex flex-col gap-5'>
//             <FileUploader onFilesSelected={handleFilesSelected} />
            
//             {/* add uploader file here */}
//         </div>)
//     }


//     function renderDetailsCard({ provider, card_last4, billing_cycle, due_date, total_due }) {
//         return <div className=''>
//             <div className='my-6 text-2xl font-bold'>
//                 Bank Details
//             </div>
//             <div className='p-5 bg-blue-200 border border-black rounded-lg w-90'>
//                 <div>Provider: {provider}</div>
//                 <div>Last 4 digits: {card_last4}</div>
//                 <div>Billing cycle: {billing_cycle}</div>
//                 <div>Due Date: {due_date}</div>
//                 <div>Total Due: {total_due}</div>
//             </div>
//         </div>
//     }



//     return (
//         <div className='flex items-center justify-around gap-5 min-h-7/8 w-full bg-blue-100 p-10'>
//             {renderUploader()}
//             {renderDetailsCard(cardDetails)}
//         </div>
//     )
// }

// export default Content;



import axios from "axios";
import { useState } from "react";
import { backendURL } from "./configURLs";


function Content() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [cardDetails, setCardDetails] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);

            const response = await axios.post(`${backendURL}/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Assuming backend returns extracted details
            setCardDetails(response.data);
            console.log("Extracted Data:", response.data);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload or parse file");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-5 h-3/4 w-full bg-blue-100">
            {/* Uploader */}
            <div className="p-5 bg-white rounded-lg shadow-md">
                <input type="file" accept=".pdf" onChange={handleFileChange} />
                <button
                    onClick={handleFileUpload}
                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Upload & Parse
                </button>
            </div>

            {/* Render card details if available */}
            {cardDetails && (
                <div className="p-5 bg-amber-200 border border-black rounded-lg">
                    <div>Provider: {cardDetails.provider}</div>
                    <div>Last 4 digits: {cardDetails.card_last4}</div>
                    <div>Billing cycle: {cardDetails.billing_cycle}</div>
                    <div>Due Date: {cardDetails.due_date}</div>
                    <div>Total Due: {cardDetails.total_due}</div>
                </div>
            )}
        </div>
    );
}

export default Content;
