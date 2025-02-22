import { createSelector, createStructuredSelector } from 'reselect';
import {
  getHumanPressuresLandUse,
  getHumanPressuresMarine,
} from 'constants/human-pressures';
import { selectLangUrlState } from 'selectors/location-selectors';

// locale is here to recompute the data when the language changes
const getComputedHumanPressuresLandUse = createSelector(selectLangUrlState, (locale) => getHumanPressuresLandUse());
// locale is here to recompute the data when the language changes
const getComputedHumanPressuresMarine = createSelector(selectLangUrlState, (locale) => getHumanPressuresMarine());

export const getCountedActiveLayers = createSelector([(state, props) => props && props.activeLayers, getComputedHumanPressuresLandUse, getComputedHumanPressuresMarine], (activeLayers, humanPressuresLandUse, humanPressuresMarine) => {
  if (!activeLayers || !activeLayers.length) return 0;
  const humanPressuresLayers = humanPressuresLandUse.concat(humanPressuresMarine);
  const allLayers = Object.values(humanPressuresLayers).map((layer) => layer.value);
  return activeLayers
    .map((l) => l.title)
    .reduce((acc, l) => (allLayers.includes(l) ? acc + 1 : acc), 0);
});

export default createStructuredSelector({
  countedActiveLayers: getCountedActiveLayers,
});
