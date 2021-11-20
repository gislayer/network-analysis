![gislayer shortest path](https://static.wixstatic.com/media/638a67_02b8a07487954d0aa0e6481f403d2208~mv2.gif)
======
# network-analysis

```js
// if you have local file
var networkAnalysis = require('network-analysis');

var filePath = './data/lines.geojson';

networkAnalysis.settings({
    indexQuality:17, // Spatial index Tile Zoom Level
    tolerance:1, // Meters limit between start-end point of close segments
    segment:true // Segmenting of LineStrings
});
networkAnalysis.addLocalFile(filePath);
```
You can analyze network of your local geometric data using this package.


