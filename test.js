var networkAnalysis = require('./index');
var filePath = './data/lines.geojson';

networkAnalysis.settings({
    indexQuality:17,
    tolerance:1,
    segment:true
});
networkAnalysis.addLocalFile(filePath);