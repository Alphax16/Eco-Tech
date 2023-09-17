const csvModel = require("../models/csv.model");
const { reverseGeocoder } = require("../utils/reverseGeocoder");


const getCsvData = async (req, res, filePath) => {
    try {
        const data = await csvModel.getCsvData(filePath);
        
        if (!Array.isArray(data)) {
        throw new Error('CSV data is not an array');
        }

        res.json(data);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getCsvDataWithGeoCodings = async (req, res, filePath) => {

    try {
        const data = await csvModel.getCsvData(filePath);
        const newArray = await Promise.all(data.map(async (d) => {
            const newObject = { ...d };
            
            const coords = await reverseGeocoder(d['State/UTs']);
            
            if (Array.isArray(coords) && coords.length >= 2) {
                const [latitude, longitude] = coords;

                newObject.Latitude = latitude;
                newObject.Longitude = longitude;
            } else {
                console.warn(`Invalid coordinates for ${d['State/UTs']}`);
                newObject.Latitude = null;
                newObject.Longitude = null;
            }
            
            return newObject;
        }));

        res.json(newArray);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};



    // csvModel.getCsvData(filePath, async(err, data) => {
    //     if (err) {
    //         res.status(500).json({ error: 'Internal server error' });
    //     } else {
    //         const newArray = data.map(async (d) => {
    //             const newObject = { ...d };
                
    //             newObject.Latitude, newObject.Longitude = await reverseGeocoder(d['State/UTs']);
    //             return newObject;
    //         });
    //         res.json(newArray);
    //     }
    // })


module.exports = { getCsvData, getCsvDataWithGeoCodings };
