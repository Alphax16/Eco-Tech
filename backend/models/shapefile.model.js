const shapefile = require("shapefile");


async function getShapefileData(filePath) {
    try {
        const features = [];

        const source = await shapefile.open(filePath);
        let result = await source.read();

        while (!result.done) {
            features.push(result.value);
            result = await source.read();
        }

        return { type: 'FeatureCollection', features };
    } catch (error) {
        console.error('Error reading Shapefile:', error);
        throw new Error('Error reading Shapefile');
    }
};

module.exports = { getShapefileData };
