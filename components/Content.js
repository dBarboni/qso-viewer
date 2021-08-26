import Form from './Form'
import DataHandler from '../modules/DataHandler'
import Message from './Message'
import { useState } from 'react'

// Wrapper for content
export default function Content() {
    // Set default state
    let [message, setMessage] = useState("Enter your credentials.");
    let [records, setRecords] = useState([]);

    // Form submit data handler
    const getData = async e => {
        e.preventDefault();
        const records = await DataHandler.retrieveRecords(e).then((data) => {
            // Update the state
            setMessage(data.message);
            setRecords(data.records)
        });
    }
    
    // Build the record list
    const buildCards = () => {
        console.log(records)
        const cards = Object.values(records).map(record => <p key={record.CALL}>{record.CALL}</p>);
        return cards;
    }

    // Render content based on state
    return (
        <div>
            <Form onSubmit={getData} />
            <Message>{message}</Message>
            {records.length ? (
                <div>{buildCards()}</div>
            ) : (
                <div></div>
            )}
        </div>
    );
}
