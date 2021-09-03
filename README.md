This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project pulls your QSOs from ARRL's Logbook of the World and lets you visualize them in the forms of lists, maps, and charts.

## Getting Started
### Requirements
- A Google Maps API key. Sign up for one [here](https://developers.google.com/maps/documentation/javascript/get-api-key).
- An ARRL [Logbook of the World](http://www.arrl.org/quick-start) (LOTW) account.
- [Node.js](https://nodejs.org/)

### Installing
1. Clone the project.
```bash 
git clone https://github.com/dBarboni/qso-viewer.git
```

2. Install the dependencies.
```bash
cd qso-viewer
npm install
```

3. Create a file named `.env.local` in your project root. Add the following contents to it where `###` is your Google Maps API key.
```bash
NEXT_PUBLIC_MAPS_API_KEY = "###"
```

4. Build and run the project.
```bash
npm run build
npm run start
```

## Usage
Open [http://localhost:3000](http://localhost:3000) with your browser. Enter your credentials for LOTW in the form, change Start Date to the date that you want to pull all records since, and press Submit. A tabbed view will appear below.

### Tabs
#### List
The default tab shows a list of the QSOs retrieved from LOTW. 
#### Map
The map view shows the location of your QSOs. Unfortunately, the API used to retrieve the coordinates for each QSO only has location data for US call signs.
#### Charts
The charts view shows pie charts that break down the modes and bands for your QSOs.

## Planned features
- Pagination for list view
- Filtering and sorting options
- Charts for additional metrics
- Check additional sources for call sign location data for more complete map view. HamQTH seems promising.

## APIs Used
- [LOTW](https://lotw.arrl.org/lotw-help/developer-query-qsos-qsls/): QSO retrieval
- [CALLOOK](https://callook.info/): location data retrieval
