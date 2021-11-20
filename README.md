![gislayer shortest path](https://static.wixstatic.com/media/638a67_512f0938079e4ea98e08c25a544dd8fa~mv2.gif)
======
# network-analysis

```js
var networkAnalysis = require('network-analysis');

var filePath = './data/lines.geojson';

networkAnalysis.settings({
    indexQuality:17,
    tolerance:1,
    segment:true
});
networkAnalysis.addLocalFile(filePath);
```
You can analyze network of your local geometric data using this package.


