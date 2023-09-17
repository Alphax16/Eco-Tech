const { getCsvData } = require("../models/csv.model");


async function reverseGeocoder(locationName) {
    try {
        const locationNameCapitalized = locationName.toUpperCase();
        const data = await getCsvData("./data/Indian States and Union Territories Geocodings.csv");

        if (!Array.isArray(data)) {
        throw new Error('CSV data is not an array');
        }

        const matchingData = data.find((d) => d['State Name'] === locationNameCapitalized);

        if (!matchingData) {
            throw new Error(`Location '${locationNameCapitalized}' not found in geocoding data`);
        }

        const latitude = matchingData.Latitude;
        const longitude = matchingData.Longitude;

        if (!latitude || !longitude) {
            throw new Error(`Invalid coordinates for location '${locationNameCapitalized}'`);
        }

        return [latitude, longitude];
    } catch (error) {
        console.error('Error in reverseGeocoder:', error);
        throw error;
    }
}

module.exports = { reverseGeocoder };
