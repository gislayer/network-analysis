#  Network Analiysis With GeoJSON and Spatial Files

![Network Analysis - Shortest Path](https://static.wixstatic.com/media/638a67_02b8a07487954d0aa0e6481f403d2208~mv2.gif)
======
***A geospatial library written in JavaScript***

You can analyze network of your local geometric data using this package.

[Developed By alikilic.org](https://alikilic.org/)

## Installation

### In Node.js

```js
npm install network-analysis
```
### In Browser
Download the [minified file](https://cdn.jsdelivr.net/npm/gislayer/network-analysis.min.js), and include it in a script tag. This will expose a global variable named `networkAnalysis`.
```html
<script src="network-analysis.min.js" charset="utf-8"></script>
```

You can also include it directly from a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/gislayer/network-analysis.min.js"></script>
```

# Which Spatial Files Can Be Used
You can use an API or URL address other than local files. If geojson data is defined in a javascript variable, you can use it this way. The local files you can use are listed below

 - GeoJSON File
 - KML File
 - WKT GeometryCollection File
 - GPX File
 - SHP File

## How to use local files
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



