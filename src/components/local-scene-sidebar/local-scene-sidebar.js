import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from './local-scene-sidebar-selectors';
import Component from './local-scene-sidebar-component';
import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';
import countryDataActions from 'redux_modules/country-data';
import { downloadCountryPdfAnalyticsEvent, selectNRCSectionAnalyticsEvent } from 'actions/google-analytics-actions';
import { DATA, NATIONAL_REPORT_CARD } from 'router'

const actions = { ...urlActions, ...countryDataActions, ...metadataActions, downloadCountryPdfAnalyticsEvent };

const LocalSceneSidebarContainer = (props) => {
  const {
    scene,
    browsePage,
    countryName,
    downloadCountryPdfAnalyticsEvent
  } = props;

  const handleSceneModeChange = () => {
    browsePage({ type: DATA, query: { globe: { center: [scene.view.center.longitude, scene.view.center.latitude], zoom: 4}}});
  }

  const handleTabSelection = slug => {
    const { browsePage, countryISO } = props;
    browsePage({type: NATIONAL_REPORT_CARD, payload: { iso: countryISO, view:  slug }});
    selectNRCSectionAnalyticsEvent(slug);
  };

  const handlePrintReport = () => {
    const today = new Date();
    const date = Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric'}).format(today);
    const tempTitle = document.title;
    document.title = `Half-Earth National Report Card ${date} - ${countryName}`;
    window.print();
    downloadCountryPdfAnalyticsEvent(countryName)
    document.title = tempTitle;
  }

  return (
    <Component
      handlePrintReport={handlePrintReport}
      handleTabSelection={handleTabSelection}
      handleSceneModeChange={handleSceneModeChange}
      {...props}
    />
  )
}


export default connect(mapStateToProps, actions)(LocalSceneSidebarContainer);