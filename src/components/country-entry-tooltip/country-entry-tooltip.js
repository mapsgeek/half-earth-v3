import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// Services
import EsriFeatureService from 'services/esri-feature-service';
// Constants
import { COUNTRIES_DATA_SERVICE_URL } from 'constants/layers-urls';
import * as urlActions from 'actions/url-actions';
import { enterNrcAnalytics } from 'actions/google-analytics-actions';
import Component from './country-entry-tooltip-component';
import { NATIONAL_REPORT_CARD } from 'router';

import countryTooltipActions from 'redux_modules/country-tooltip';
import mapStateToProps from 'selectors/country-tooltip-selectors';
const actions = { enterNrcAnalytics, ...urlActions, ...countryTooltipActions}

const CountryEntryTooltipContainer = props => {
  const { mapTooltipIsVisible, countryISO } = props;
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const [tooltipContent, setContent] = useState({});

  // Set country tooltip position
  useEffect(() => {
    if (countryISO) {
      const { setTooltipIsVisible } = props;
      EsriFeatureService.getFeatures({
        url: COUNTRIES_DATA_SERVICE_URL,
        whereClause: `GID_0 = '${countryISO}'`,
        returnGeometry: true
      }).then((features) => {
        const { geometry, attributes } = features[0];
        setTooltipPosition(geometry);
        setTooltipIsVisible(true);
        setContent({
          spi: attributes.SPI,
          vertebrates: attributes.N_SPECIES,
          endemic: attributes.total_endemic,
          protection: attributes.prop_protected,
          protectionNeeded: attributes.protection_needed
        })
      })
    }
  }, [countryISO])

  const handleTooltipClose = () => {
    const { setTooltipIsVisible, setTooltipContent } = props;
    setTooltipIsVisible(false);
    setTooltipContent({});
  }

  const handleExploreCountryClick = () => {
    const { setTooltipIsVisible, countryISO, setTooltipContent, browsePage, countryName, enterNrcAnalytics } = props;
   setTooltipIsVisible(false);
    setTooltipContent({});
    enterNrcAnalytics(countryName);
    browsePage({type: NATIONAL_REPORT_CARD, payload: { iso: countryISO }});
  };

  return (
    <Component
      mapTooltipIsVisible={mapTooltipIsVisible}
      tooltipContent={tooltipContent}
      tooltipPosition={tooltipPosition}
      handleTooltipClose={handleTooltipClose}
      onExploreCountryClick={handleExploreCountryClick}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(CountryEntryTooltipContainer);