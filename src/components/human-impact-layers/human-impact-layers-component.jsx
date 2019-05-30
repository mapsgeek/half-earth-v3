import React from 'react';
import PropTypes from 'prop-types';
import { loadModules } from '@esri/react-arcgis';

import MultipleActiveLayers from 'components/multiple-active-layers';

import { HUMAN_PRESSURE_LAYER_ID } from 'constants/human-pressures';

const HumanImpactLayers = ({ map, title, rasters, setRasters, description, options, setLayerVisibility, theme, activeLayers }) => {
  const alreadyChecked = options.reduce((acc, option) => ({ 
    ...acc, [option.value]: rasters[option.value]
  }), {});

  const handleHumanPressureRasters = (rasters, option) => {
    const { layers } = map;
    const humanImpactLayer = layers.items.find(l => l.id === HUMAN_PRESSURE_LAYER_ID);
    setRasters(rasters);

    if (Object.values(rasters).some(raster => raster)) {
      setLayerVisibility(HUMAN_PRESSURE_LAYER_ID, true);
    } else {
      setLayerVisibility(HUMAN_PRESSURE_LAYER_ID, false);
    }

    const activeRasters = Object.keys(rasters).filter(rasterName => rasters[rasterName])
    const rasterNames = activeRasters.map(value => `human_impact_${value}`)

    const mosaicWhereClause = `Name IN('${rasterNames.join("','")}')`;

    loadModules(["esri/layers/support/MosaicRule"]).then(([MosaicRule]) => {
      humanImpactLayer.mosaicRule = new MosaicRule({
        method: 'attribute',
        operation: 'sum',
        where: mosaicWhereClause
      });
    });
  }

  return (
    <MultipleActiveLayers
      options={options}
      alreadyChecked={alreadyChecked}
      handleClick={handleHumanPressureRasters}
      title='Land use pressures'
      description='Human pressures causing habitat loss and accelerating species extinction.'
      activeLayers={activeLayers}
    />
  )}

HumanImpactLayers.propTypes = {
  map: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  options: PropTypes.array,
  setLayerVisibility: PropTypes.func,
  theme: PropTypes.string,
  activeLayers: PropTypes.array
};

HumanImpactLayers.defaultProps = {
  map: {},
  title: '',
  description: '',
  options: [],
  setLayerVisibility: () => {},
  theme: '',
  activeLayers: []
};

export default HumanImpactLayers;