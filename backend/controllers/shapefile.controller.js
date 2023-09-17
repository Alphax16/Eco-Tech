const shapefileModel = require('../models/shapefile.model');


async function getShapefileData(req, res, filePath) {
  try {
    const shapefileData = await shapefileModel.getShapefileData(filePath);
    res.json(shapefileData);
  } catch (err) {
    console.error('Error fetching Shapefile data:', err);
    res.status(500).json({ error: 'Error fetching Shapefile data' });
  }
};

module.exports = { getShapefileData };
