import { useEffect } from 'react';
import { loadModules } from 'esri-loader';

const exaggeratedElevationLayerComponent = ({ map, exaggeration = 3}) => {

  useEffect(() => {
    loadModules(["esri/layers/ElevationLayer", "esri/layers/BaseElevationLayer"]).then(([ElevationLayer, BaseElevationLayer]) => {
      const ExaggeratedElevationLayer = BaseElevationLayer.createSubclass({
    
        properties: {
          exaggeration
        },
      
        // The load() method is called when the layer is added to the map
        // prior to it being rendered in the view.
        load: function () {

          this._elevation = new ElevationLayer({
            url: "//elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
          });

          // wait for the elevation layer to load before resolving load()
          this.addResolvingPromise(
            this._elevation.load().then(() => {
              // get tileInfo, spatialReference and fullExtent from the elevation service
              // this is required for elevation services with a custom spatialReference
              this.tileInfo = this._elevation.tileInfo;
              this.spatialReference = this._elevation.spatialReference;
              this.fullExtent = this._elevation.fullExtent;
            })
          );

          return this;
        },
      
        fetchTile: function (level, row, col) {
          // calls fetchTile() on the elevationlayer for the tiles
          // visible in the view
          return this._elevation.fetchTile(level, row, col)
            .then(function (data) {
      
              var exaggeration = this.exaggeration;
              for (var i = 0; i < data.values.length; i++) {
                data.values[i] = data.values[i] * exaggeration;
              }
      
              return data;
            }.bind(this));
        }
      });
      map.ground.layers = [new ExaggeratedElevationLayer()];
    })

    return () => {
      map.ground.layers = [];
    }
  }, [])

  return null
};

export default exaggeratedElevationLayerComponent;