
module.exports = {
    zoom:18,
    coordToTile(c) {
        var z = this.zoom;
        var tilex = Math.floor((c[0] + 180) / 360 * Math.pow(2, z));
        var tiley = Math.floor((1 - Math.log(Math.tan(c[1] * Math.PI / 180) + 1 / Math.cos(c[1] * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, z));
        return tilex+'-'+tiley;
    },

    getGeoJSONTiles(coords){
        var tiles = [];
        coords.map(c=>{
            var tileName = this.coordToTile(c);
            if(tiles.indexOf(tileName)==-1){
                tiles.push(tileName);
            }
        });
        return tiles;
    },

    findIndexed:function(data){
        const ti={};
        const fi={};
        for(var i in data){
            const feature = data[i];
            const fid = feature.node;
            const findedTiles = this.getGeoJSONTiles(feature.coords);
            if(fi[fid]==undefined){
                fi[fid] = findedTiles;
            }
            findedTiles.map(name=>{
                if(ti[name]==undefined){
                    ti[name] = [fid];
                }else{
                    if(ti[name].indexOf(fid)==-1){
                        ti[name].push(fid);
                    }
                }
            });
        }
        return {tileIndex:ti,featureIndex:fi};
    }


}