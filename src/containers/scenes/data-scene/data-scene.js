import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getSelectedAnalysisLayer } from 'utils/analyze-areas-utils';
import MAP_TOOLTIP_CONFIG from 'constants/map-tooltip-constants';
import Component from './data-scene-component';
// ACTIONS
import { AREA_OF_INTEREST } from 'router';
import urlActions from 'actions/url-actions';
import { aoiAnalyticsActions } from 'actions/google-analytics-actions';
import mapTooltipActions from 'redux_modules/map-tooltip';
import mapStateToProps from 'selectors/map-tooltip-selectors';
import { HALF_EARTH_FUTURE_TILE_LAYER } from 'constants/layers-slugs';
import { createHashFromGeometry } from 'utils/analyze-areas-utils';

const actions = { ...mapTooltipActions, ...urlActions, ...aoiAnalyticsActions };


const Container = (props) => {
  const { activeLayers, setBatchTooltipData, browsePage, mapTooltipContent, precomputedAoiAnalytics } = props;
  const [selectedAnalysisLayer, setSelectedAnalysisLayer] = useState();

  const handleHighlightLayerFeatureClick = (features) => {

    if (features && features.length && selectedAnalysisLayer) {
      const tooltipConfig = MAP_TOOLTIP_CONFIG[selectedAnalysisLayer.slug];

      const { title, subtitle, buttonText, id } = tooltipConfig;
      const { geometry, attributes } = features[0].graphic;

      let futurePlacesId;
      let futurePlacesTitle;
      if (selectedAnalysisLayer.slug === HALF_EARTH_FUTURE_TILE_LAYER) {
        // Calculate sha-1 id for future places
        futurePlacesId = createHashFromGeometry(geometry);
        futurePlacesTitle = `Priority place ${attributes.cluster}`;
      }

      setBatchTooltipData({
        isVisible: true,
        geometry,
        content: {
          buttonText,
          id: futurePlacesId || attributes[id],
          title: futurePlacesTitle || attributes[title],
          subtitle: attributes[subtitle],
          objectId: attributes.OBJECTID // Only for feature places
        }
      });
    }
  }

  const handleTooltipActionButtonClick = () => {
    precomputedAoiAnalytics(mapTooltipContent.title);
    browsePage({ type: AREA_OF_INTEREST, payload: { id: mapTooltipContent.id }, query: { precalculatedLayer: selectedAnalysisLayer.slug, OBJECTID: mapTooltipContent.objectId } });
  }

  useEffect(() => {
    const activeOption = getSelectedAnalysisLayer(activeLayers);
    setSelectedAnalysisLayer(activeOption);
  }, [activeLayers])

  return (
    <Component
      selectedAnalysisLayer={selectedAnalysisLayer}
      handleTooltipActionButtonClick={handleTooltipActionButtonClick}
      handleHighlightLayerFeatureClick={handleHighlightLayerFeatureClick}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(Container);
