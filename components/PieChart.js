import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

class Chart extends React.Component {
    constructor(props) {
        super(props);

        // Initialize state
        this.state = {
            records: props.records,
            dataCounts: {}
        };

        this.getDataCounts("MODE", "BAND");
    }
    // Sum specified properties
    getDataCounts = (...theProps) => {
        let dataCounts = {};

        // Loop through records
        this.state.records.forEach(record => {
            // Loop through args
            for (const prop of theProps) {
                dataCounts[prop] = dataCounts[prop] || {}; // Initialize prop if doesnt exist
                dataCounts[prop][record[prop]] = (dataCounts[prop][record[prop]] + 1) || 1; // Set to 1 if doesnt exist, otherwise increment
            }
        });

        console.log(dataCounts);       
    }
    
    render() {
        return (
            <p>charts placeholder</p>
        );
    }
}

export default Chart;