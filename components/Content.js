import Form from './Form'
import DataHandler from '../modules/DataHandler'
import Message from './Message'
import Card from './Card'
import CardWrapper from './CardWrapper'
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
        const cards = Object.values(records).map(record => <Card key={record.CALL} call={record.CALL} band={record.BAND} mode={record.MODE} qso_date={record.QSO_DATE} />);
        return cards;
    }

    // Render content based on state
    return (
        <div>
            <Form onSubmit={getData} />
            <Message>{message}</Message>
            {records.length ? (
                <CardWrapper>{buildCards()}</CardWrapper>
            ) : (
                <div></div>
            )}
        </div>
    );
}
