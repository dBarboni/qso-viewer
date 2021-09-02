import React, { PureComponent } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import styles from '../styles/PieChart.module.css'

class Chart extends React.Component {
    constructor(props) {
        super(props);

        const dataCounts = this.getDataCounts(props.records, "MODE", "BAND"); // records plus properties we are interested in charting

        // Initialize state
        this.state = { 
            dataCounts,
            colors: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#E05263"]
         };
    }
    
    // Sum specified properties
    getDataCounts = (records, ...theProps) => {
        let dataCounts = {};

        // Loop through records
        records.forEach(record => {
            // Loop through args
            for (const prop of theProps) {
                dataCounts[prop] = dataCounts[prop] || {}; // Initialize prop if doesnt exist
                dataCounts[prop][record[prop]] = (dataCounts[prop][record[prop]] + 1) || 1; // Set to 1 if doesnt exist, otherwise increment
            }
        });

        return dataCounts; 
    }
    // Show data based on state
    pickData = () => {
        if (Object.keys(this.state.dataCounts).length === 0) {
            return <p>Building charts.</p>;
        } else {
            return (
                <div className={styles.containerParent}>
                    <div className={styles.containerChild}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={400} height={400}>
                                {this.buildPies()}
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            );
        }
    }
    buildPies = () => {
        // Create pie chart for each property of interest (see constructor)
        let pies = [];

        // Iterate through properties (mode, band)
        for (const property in this.state.dataCounts) {
            let data = [];

            // Iterate through diff modes and bands
            for (const subprop in this.state.dataCounts[property]) {
                data.push({ name: subprop, value: this.state.dataCounts[property][subprop]});
            }

            // New pie component with colored slices
            const pie =
                <Pie
                    dataKey="value"
                    key={property}
                    isAnimationActive={false}
                    data={data}
                    cx={(pies.length * 200) + 400}
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                    className={styles.pie}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={this.state.colors[index % this.state.colors.length]} />
                    ))}
                </Pie>;

            pies.push(pie);
        }

        return pies;
    }
    // Render component
    render() {
        return (
            <div>{this.pickData()}</div>
        );
    }
}

export default Chart;
