import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getSelectedAnalysisLayer } from 'utils/analyze-areas-utils';
import MAP_TOOLTIP_CONFIG from 'constants/map-tooltip-constants';
import Component from './data-scene-component';
import EsriFeatureService from 'services/esri-feature-service';

import { LAYERS_URLS } from 'constants/layers-urls';
// ACTIONS
import { AREA_OF_INTEREST } from 'router';
import urlActions from 'actions/url-actions';
import { aoiAnalyticsActions } from 'actions/google-analytics-actions';
import mapTooltipActions from 'redux_modules/map-tooltip';
import mapStateToProps from 'selectors/map-tooltip-selectors';

const actions = {...mapTooltipActions, ...urlActions, ...aoiAnalyticsActions };


const Container = (props) => {
  const { activeLayers, setBatchTooltipData, browsePage, mapTooltipContent, precomputedAoiAnalytics } = props;
  const [selectedAnalysisLayer, setSelectedAnalysisLayer] = useState();

  const handleHighlightLayerFeatureClick = (features) => {
    if (features && features.length && selectedAnalysisLayer) {
      const tooltipConfig = MAP_TOOLTIP_CONFIG[selectedAnalysisLayer.slug];
      const { title, subtitle, buttonText, id, dataLayer } = tooltipConfig;
      const { geometry, attributes } = features[0].graphic;
      EsriFeatureService.getFeatures({
        url: LAYERS_URLS[dataLayer],
        whereClause: `${id} = '${attributes[id]}'`,
      }).then((features) => {
        const data = features[0].attributes;
        setBatchTooltipData({
          isVisible: true,
          geometry,
          content: {
            buttonText,
            id: data[id],
            title: data[title],
            subtitle: data[subtitle],
          }
        });
      })
    }
  }

  const handleTooltipActionButtonClick = () => {
    precomputedAoiAnalytics(mapTooltipContent.title);
    browsePage({type: AREA_OF_INTEREST, payload: { id: mapTooltipContent.id }, query: { precalculatedLayer: selectedAnalysisLayer.slug }});
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
