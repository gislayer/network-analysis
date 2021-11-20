const FileConverter = require('./src/FileConverter');
const SpatialIndex = require('./src/SpatialIndex');

module.exports = {
    zoom:18,
    tolerance:1,
    segment:true,
    sid:0,
    node:0,
    geojson:{type:'FeatureCollection',features:[]},
    segments:{},
    nodes:{},
    tileIndex:{},
    featureIndex:{},

    settings(obj){
        this.zoom = obj['indexQuality']!==undefined?isNaN(obj['indexQuality'])==false?Number(obj['indexQuality']):18:18;
        this.tolerance = obj['tolerance']!==undefined?isNaN(obj['tolerance'])==false?Number(obj['tolerance']):1:1;
        this.segment = obj['segment']!==undefined?typeof obj['segment']=='boolean'?obj['segment']:true:true;
    },

    filterLineStrings(data){
        var that = this;
        var features = {};
        var fid=0;
        var coords = {};
        var segmentStatus = this.segment;
        data.features.map(feature => {
            switch(feature.geometry.type){
                case 'LineString':{
                    feature.fid=fid;
                    features[fid]=feature;
                    if(segmentStatus){
                        that.parseSegments(fid,feature.geometry.coordinates);
                    }else{
                        coords[that.node]={fid:fid,sid:1,node:that.node,coords:[feature.geometry.coordinates[0]]}; that.node++;
                        coords[that.node]={fid:fid,sid:2,node:that.node,coords:[feature.geometry.coordinates[feature.geometry.coordinates.length-1]]}; that.node++;
                        that.segments[fid]={fid:fid,sid:fid,node:fid,coords:feature.geometry.coordinates};
                    }
                    fid++;
                    break;
                }
                case 'MultiLineString':{
                    var parts = feature.geometry.coordinates;
                    parts.map(coord =>{
                        var geopart = { "type": "Feature", "fid":fid, "properties": feature.properties, "geometry": { "type": "LineString", "coordinates": [ coord ] } };
                        features[fid]=geopart;
                        if(segmentStatus){
                            that.parseSegments(fid,coord);
                        }else{
                            coords[that.node]={fid:fid,sid:1,node:that.node,coords:[coord[0]]}; that.node++;
                            coords[that.node]={fid:fid,sid:2,node:that.node,coords:[coord[coord.length-1]]}; that.node++;
                            that.segments[fid]={fid:fid,sid:fid,node:fid,coords:coord};
                        }
                        fid++;
                    });
                    break;
                }
            }
        });
        if(segmentStatus==false){
            this.nodes = coords;
        }
        return features;
    },

    addLocalFile(filePath){
        var data = FileConverter.importSpatialFile(filePath);
        this.setData(data);
    },

    setData(data){
        this.geojson = this.filterLineStrings(data);
        SpatialIndex.zoom = this.zoom;
        var pIndex = SpatialIndex.findIndexed(this.nodes)
        var sIndex = SpatialIndex.findIndexed(this.segments);
        this.tileIndex = sIndex.tileIndex;
        this.featureIndex = sIndex.featureIndex;
    },

    parseSegments(fid,coords){
        for(var i=0;i<coords.length-1;i++){
            this.nodes[this.node]={fid:this.sid,sid:1,node:this.node,coords:[coords[i]]}; this.node++;
            this.nodes[this.node]={fid:this.sid,sid:2,node:this.node,coords:[coords[i+1]]}; this.node++;
            this.segments[this.sid]={sid:this.sid,fid:fid,coords:[coords[i],coords[i+1]]};
            this.sid++;
        }
    },

};