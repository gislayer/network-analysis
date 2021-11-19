var networkAnalysis = require('./index');
var geojsonFile = './data/lines.geojson';

networkAnalysis.addLocalFile(geojsonFile);

console.log(networkAnalysis.geojson.features.length);