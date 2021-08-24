import Form from './Form'
import DataHandler from '../modules/DataHandler'
import Message from './Message'

// Form submit data handler
async function getData(e) {
    e.preventDefault();
    const records = await DataHandler.retrieveRecords(e).then((data) => {
        console.log(data);
        // Handle the response

    });
}

// Wrapper for content
export default function Content() {
    let message = "Enter your credentials."; // Needs to change based on response

    return (
        <div>
            <Form onSubmit={getData} />
            <Message>{message}</Message>
            {/* <div>{DataHandler.records}</div> */}
        </div>
    );
}
