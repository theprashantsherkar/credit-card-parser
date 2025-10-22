import React from 'react'
import { useState } from 'react'


function Content() {

    const [cardDetails, setCartDetails] = useState(
        {
            provider: "",
            card_last4: "",
            billing_cycle: "",
            due_date: "",
            total_due: "",
        });

    function renderUploader() {
        return (<div>
            uploader

            {/* add uploader file here */}
        </div>)
    }

    const isLoaded = () => {
        return cardDetails.provider !== "";
    }

    function renderDetailsCard({ provider, card_last4, billing_cycle, due_date, total_due }) {
        return <div className='p-5 bg-amber-200 border border-black rounded-lg w-90'>
            <div>Provider: {provider}</div>
            <div>Last 4 digits: {card_last4}</div>
            <div>Billing cycle: {billing_cycle}</div>
            <div>Due Date: {due_date}</div>
            <div>Total Due: {total_due}</div>
        </div>
    }



    return (
        <div className='flex flex-col items-center justify-center gap-5 min-h-3/4 w-full bg-blue-100'>
            {renderUploader()}
            {cardDetails.provider.length > 0 &&  renderDetailsCard(cardDetails)}
        </div>
    )
}

export default Content;