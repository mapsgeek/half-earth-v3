export const isLandscapeViewOnEvent = (zoomValue, zoomLevelTrigger, landscapeView, countryISO) => !countryISO && zoomValue >= zoomLevelTrigger && !landscapeView;
export const isLandscapeViewOffEvent = (zoomValue, zoomLevelTrigger, landscapeView, countryISO) => countryISO || (zoomValue < zoomLevelTrigger && landscapeView);
