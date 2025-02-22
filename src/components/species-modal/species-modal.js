import React, {
  useEffect, useState, useCallback, useMemo,
} from 'react';
import { useLocale } from '@transifex/react';
import { useFeatureLayer } from 'hooks/esri';
import { SPECIES_LIST, MARINE_SPECIES_LIST } from 'constants/layers-slugs';
import { LAND_MARINE } from 'constants/country-mode-constants';
import { SORT } from 'components/header-item';
import Component from './species-modal-component';
import { connect } from 'react-redux';
import {
  getCountryData,
  getSearchTerm,
  getSpeciesModalSort,
  getSortedSpeciesList,
} from './species-modal-selectors';
import * as urlActions from 'actions/url-actions';
import { getVertebrateTabs } from './species-modal-constants';

const actions = { ...urlActions };

const mapStateToProps = (state) => ({
  countryData: getCountryData(state),
  speciesModalSort: getSpeciesModalSort(state),
  searchTerm: getSearchTerm(state),
  state,
});

function SpeciesModalContainer(props) {
  const {
    changeUI, countryData, speciesModalSort, state,
  } = props;

  const locale = useLocale();
  const vertebrateTabs = useMemo(() => getVertebrateTabs(), [locale]);

  const [vertebrateType, setVertebrateType] = useState(vertebrateTabs[0].slug);
  const [speciesList, setSpeciesList] = useState([]);

  const landLayer = useFeatureLayer({ layerSlug: SPECIES_LIST });
  const marineLayer = useFeatureLayer({ layerSlug: MARINE_SPECIES_LIST });

  useEffect(() => {
    const layer = vertebrateType === LAND_MARINE.land ? landLayer : marineLayer;
    if (layer && countryData.iso
    ) {
      const getFeatures = async () => {
        const query = await layer.createQuery();
        query.where = `iso3 = '${countryData.iso}'`;
        query.maxRecordCountFactor = '10000';
        const results = await layer.queryFeatures(query);
        const { features } = results;
        if (features) {
          setSpeciesList(features.map((f) => f.attributes));
        }
      };

      getFeatures(countryData.iso);
    }
  }, [landLayer, marineLayer, countryData.iso, vertebrateType]);

  const handleSearch = (event) => {
    const { value } = event.target;
    changeUI({ speciesModalSearch: value });
  };

  const handleSortClick = (category) => {
    const sortedCategory = speciesModalSort && speciesModalSort.split('-')[0];
    const direction = speciesModalSort && speciesModalSort.split('-')[1];
    const sortDirection = sortedCategory === category && direction === SORT.DESC
      ? SORT.ASC
      : SORT.DESC;
    changeUI({ speciesModalSort: `${category}-${sortDirection}` });
  };

  const handleVertebrateChange = useCallback((tabSlug) => { setVertebrateType(tabSlug); }, []);

  return (
    <Component
      {...props}
      handleSortClick={handleSortClick}
      handleSearchChange={handleSearch}
      speciesList={getSortedSpeciesList({ ...state, speciesList })}
      sortCategory={speciesModalSort}
      handleVertebrateChange={handleVertebrateChange}
      vertebrateType={vertebrateType}
    />
  );
}

export default connect(mapStateToProps, actions)(SpeciesModalContainer);
