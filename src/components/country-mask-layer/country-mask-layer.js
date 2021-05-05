import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import { difference } from "@arcgis/core/geometry/geometryEngine";
import Graphic from "@arcgis/core/Graphic";
import { COUNTRY_MASK_LAYER } from 'constants/layers-slugs';
import { MASK_STYLES } from 'constants/graphic-styles';
import { createGraphic, createGraphicLayer } from 'utils/graphic-layer-utils';
import countriesGeometriesActions from 'redux_modules/countries-geometries';
import mapStateToProps from './country-mask-layer-selectors';

const CountryMaskLayer = props => {
  const { view, countryBorder, countryMask, setCountryMaskReady, countryISO } = props;
  const [graphicsLayer, setGraphicsLayer] = useState(null);

  // Create graphic layer to store the mask
  useEffect(() => {
    const _graphicsLayer = createGraphicLayer(GraphicsLayer, [], COUNTRY_MASK_LAYER);
    setGraphicsLayer(_graphicsLayer);
    view.map.layers.add(_graphicsLayer);
  }, []);

  useEffect(() => {
    if (graphicsLayer && countryBorder) {
      if (countryMask) {
        graphicsLayer.graphics = [countryMask];
      } else {
        const expandedExtent = countryBorder.extent.clone().expand(1.1)
        const maskGeometry = difference(expandedExtent, countryBorder);
        const maskGraphic = createGraphic(Graphic, MASK_STYLES, maskGeometry);
        graphicsLayer.graphics = [maskGraphic];
        setCountryMaskReady({ iso: countryISO, mask: maskGraphic })
      }
    }
  }, [graphicsLayer, countryBorder]);

  return null
}

export default connect(mapStateToProps, countriesGeometriesActions)(CountryMaskLayer);
