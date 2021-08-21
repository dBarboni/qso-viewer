// Form component

export default function Form() {
    const retrieveData = e => {
        // Prevent refresh
        e.preventDefault();
        // Call LOTW API
        // Bare minimum needs login, password, qso_query params
        // qso_startdate not req'd but recommended
    }
    return (
        <form onSubmit={retrieveData}>
            <label htmlFor="call">Call sign</label>
            <input type="text" name="call" id="call" required />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required />
            <label htmlFor="date">Start Date</label>
            <input type="date" name="date" id="date" />
            <button type="Submit">Submit</button>
        </form>
    )
}
