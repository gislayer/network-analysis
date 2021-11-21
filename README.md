#  Network Analiysis With GeoJSON and Spatial Files

![Network Analysis - Shortest Path](https://static.wixstatic.com/media/638a67_02b8a07487954d0aa0e6481f403d2208~mv2.gif)
======
***A geospatial library written in JavaScript***

You can analyze network of your local geometric data using this package.

[Developed By alikilic.org](https://alikilic.org/)

# Installation

## In Node.js

```js
npm install network-analysis
```
## In Browser
Download the [minified file](https://cdn.jsdelivr.net/gh/gislayer/network-analysis@main/index.js), and include it in a script tag. This will expose a global variable named `networkAnalysis`.
```html
<script src="network-analysis.min.js" charset="utf-8"></script>
```

## CDN
You can also include it directly from a CDN:

```html
<script src="https://cdn.jsdelivr.net/gh/gislayer/network-analysis@main/index.js"></script>
```

# Which Spatial Files Can Be Used
You can use an API or URL address other than local files. If geojson data is defined in a javascript variable, you can use it this way. The local files you can use are listed below

 - GeoJSON File
 - KML File
 - WKT GeometryCollection File
 - GPX File
 - SHP File

## How to Use Local Files
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

## How to Use URL
```js
// if you have URL
var networkAnalysis = require('network-analysis');

var url = 'https://domain.com/api/getRoads/1';

networkAnalysis.settings({
    indexQuality:17, // Spatial index Tile Zoom Level
    tolerance:1, // Meters limit between start-end point of close segments
    segment:true // Segmenting of LineStrings
});

networkAnalysis.addURL(url);
```

## How to Javascript Variable
```js
// if you have defined a GeoJSON
var networkAnalysis = require('network-analysis');

var geojson = {type:'FeatureCollection',features:[...]};

networkAnalysis.settings({
    indexQuality:17, // Spatial index Tile Zoom Level
    tolerance:1, // Meters limit between start-end point of close segments
    segment:true // Segmenting of LineStrings
});

networkAnalysis.setData(geojson);
```

# Methods
After using the above encodings, you can use the following methods
```js
// You can get geojson of lines
const segments = networkAnalysis.getGeoJSON();

// You can get segments of lines
const segments = networkAnalysis.getSegments();

// You can get points of lines
const points = networkAnalysis.getNodes();

// You can get graph of lines
const grapsh = networkAnalysis.getGraphs();

// You can find shortest path of network
var startPoint = [27.24,38.48];
var finishPoint = [27.48,38.36];
const roadGeoJSON = networkAnalysis.findShortestPath(startPoint,finishPoint);

// You can find lines that cannot be used in network analysis
const wrongLines = networkAnalysis.findWrongLines();
```


