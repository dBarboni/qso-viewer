import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from '../styles/Map.module.css'

class Map extends Component {
    // Center on US
    static defaultProps = {
        center: {
            lat: 37.2757368,
            lng: -104.6549972
        },
        zoom: 4
    };

    render() {
        return (
            // API key is defined in .env.local
            <div className={styles.container}>
                <p>Currently only US call signs are able to be charted on the map.</p>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAPS_API_KEY }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >

                </GoogleMapReact>
            </div>
        );
    }
}

export default Map;
