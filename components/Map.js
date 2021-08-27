import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import styles from '../styles/Map.module.css'
import DataHandler from '../modules/DataHandler';

class Map extends Component {
    constructor(props) {
        super(props);

        // Coords center on US
        this.state = {
            records: props.records,
            markers: [],
            center: {
                lat: 37.2757368,
                lng: -104.6549972
            },
            zoom: 4
        }

        if (this.state.records.length) {
            this.getLocations();
        }
    }

    // query callook api to get lat and long
    getLocations = () => {
        const locations = this.state.records.forEach(async record => {
            const callSign = record.CALL;
            const location = await DataHandler.retrieveLocations(callSign).then(data => {
                if (data) {
                    // Add new location to array in state
                    this.setState({ markers: [...this.state.markers, data] });
                } else {
                    // Record not found in db, likely outside US
                    console.log("Location not found for", callSign);
                }
            }); 
        });
    }

    // Return info about records
    showInfo() {
        if (this.state.markers.length) {
            return `Location found for ${this.state.markers.length} of ${this.state.records.length} records.`
        }
        return "Loading call sign data.";
    }

    render() {
        return (
            // API key is defined in .env.local
            <div className={styles.container}>
                <p>{this.showInfo()}</p>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAPS_API_KEY }}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                >

                </GoogleMapReact>
            </div>
        );
    }
}

export default Map;
