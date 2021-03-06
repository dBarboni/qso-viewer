import Form from './Form'
import DataHandler from '../modules/DataHandler'
import Message from './Message'
import Card from './Card'
import CardWrapper from './CardWrapper'
import { useState } from 'react'
import Map from './Map'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import styles from '../styles/Content.module.css'
import 'react-tabs/style/react-tabs.css'

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
            setRecords(data.records);
        });
    }
     
    // Build the record list
    const buildCards = () => {
        const cards = Object.values(records).map(record => {
            return <Card key={record.CALL} call={record.CALL} band={record.BAND} mode={record.MODE} qso_date={record.QSO_DATE} onClick={() => getLocation(record.CALL) } />;
        });
        return cards;
    }

    // Render content based on state
    return (
        <div className={styles.container}>
            <Form onSubmit={getData} />
            <Message type={records.length ? "success" : "error"}>{message}</Message>
            {records.length ? (
                <Tabs selectedTabClassName={styles.activeTab}>
                    <TabList className={styles.tabList}>
                        <Tab className={styles.tab}>List</Tab>
                        <Tab className={styles.tab}>Map</Tab>
                    </TabList>
                    <TabPanel>
                        <CardWrapper>{buildCards()}</CardWrapper>
                    </TabPanel>
                    <TabPanel>
                        <Map records={records} />
                    </TabPanel>
                </Tabs>
            ) : (
                <div></div>
            )}
        </div>
    );
}
