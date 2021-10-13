import React from 'react';
import { connect } from 'react-redux';
import { layersConfig } from 'constants/mol-layers-configs';
import { FIREFLY_BASEMAP_LAYER, SATELLITE_BASEMAP_LAYER } from 'constants/layers-slugs';
import mapStateToProps from './data-globe-selectors';
import DataGlobeComponent from './data-globe-component.jsx';
import { activateLayersOnLoad, setBasemap } from 'utils/layer-manager-utils';


const DataGlobeContainer = props => {
  const handleMapLoad = (map, activeLayers) => {
    setBasemap({map, layersArray: [SATELLITE_BASEMAP_LAYER, FIREFLY_BASEMAP_LAYER]});
    activateLayersOnLoad(map, activeLayers, layersConfig);
  }

  return (
    <DataGlobeComponent
      handleMapLoad={handleMapLoad}
      {...props}
    />
  )
}


export default connect(mapStateToProps, null)(DataGlobeContainer);