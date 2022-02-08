import React, { useEffect, useState } from 'react';
import orderBy from 'lodash/orderBy';

// constants
import { DEFAULT_SPECIES_FILTER, IUCN_CATEGORIES } from 'constants/analyze-areas-constants';
import { SPECIES_FILTERS } from 'constants/analyze-areas-constants';
import DEFAULT_PLACEHOLDER_IMAGE from 'images/no-bird.png';

// utils
import { getPlaceholderSpeciesImage, getPlaceholderSpeciesText } from 'utils/analyze-areas-utils';

// services
import MolService from 'services/mol';

// component
import Component from './component';

const SEARCH_RESULTS_SLUG = 'search-results';

const SpeciesCardContainer = (props) => {
  const { speciesData } = props;
  const { species } = speciesData;
  // Species dropdown
  const [selectedSpeciesFilter, setSpeciesFilter] = useState(DEFAULT_SPECIES_FILTER);
  const [selectedSpeciesIndex, setSelectedSpeciesIndex] = useState(0);
  const [placeholderText, setPlaceholderText] = useState(null);
  const [speciesFilters, setFilterWithCount] = useState(SPECIES_FILTERS);
  const [speciesToDisplay, setSpeciesToDisplay] = useState(species);
  const [speciesToDisplayBackUp, setSpeciesToDisplayBackUp] = useState(species);
  const [selectedSpecies, setSelectedSpecies] = useState(speciesToDisplay[selectedSpeciesIndex])
  const [individualSpeciesData, setIndividualSpeciesData] = useState(null)

  const [displayImages, setDisplayImages] = useState(null);
  const [bufferSpeciesWithImages, setBufferSpeciesWithImages] = useState([]);
  // Search dropdown
  const [searchOptions, setSearchOptions] = useState([]);
  const [selectedSearchOption, setSelectedSearchOption] = useState(null);

  const showCarouselArrows = speciesToDisplay.length > 1;

  const handleCloseSearch = () => {
    setSearchOptions([]);
    setSelectedSearchOption(null);
    setSpeciesToDisplay([...speciesToDisplayBackUp]);
  }

  const handleSearchOptionSelected = (option) => {
    if (option.slug === SEARCH_RESULTS_SLUG) {
      const searchSpecies = speciesToDisplayBackUp
        .filter((elem) => searchOptions.findIndex((so) => (so.slug === elem.name)) >= 0);
      setSpeciesToDisplay([...searchSpecies]);
    } else {
      const index = speciesToDisplayBackUp.findIndex((elem) => elem.name === option.slug);
      setSpeciesToDisplay([speciesToDisplayBackUp[index]]);
    }
    setSelectedSpeciesIndex(0);
    setSelectedSearchOption(option);
  }

  const handleSpeciesSearch = (value) => {
    const results = speciesToDisplay
      .filter((species) => {
        const nameFound = species.name.toLowerCase().indexOf(value.toLowerCase()) >= 0;
        let commonNameFound = false;
        if (species.commonName) {
          commonNameFound = species.commonName.findIndex((cnValue) => cnValue.toLowerCase().indexOf(value.toLowerCase()) >= 0 ) >= 0;
        }
        return nameFound || commonNameFound;
      })
      .map((elem) => ({
        label: elem.name,
        slug: elem.name
      }));
    // Remove duplicates
    const tempSet = new Set(results);
    const resultsSorted = Array.from(tempSet).sort((a,b) => {
      if (a.slug < b.slug) return -1;
      if (a.slug > b.slug) return 1;
      return 0;
    });
    if (resultsSorted.length > 0) {
      const summaryOption = { slug: SEARCH_RESULTS_SLUG, label: `${value} (${resultsSorted.length})` };
      setSearchOptions([summaryOption, ...resultsSorted]);
    } else {
      setSearchOptions([]);
    }
  }

  const handleNextSpeciesSelection = () => {
    if (selectedSpeciesIndex === speciesToDisplay.length - 1) {
      setSelectedSpeciesIndex(0)
    } else {
      setSelectedSpeciesIndex(selectedSpeciesIndex + 1);
    }
  }

  const handlePreviousSpeciesSelection = () => {
    selectedSpeciesIndex === 0 ?
      setSelectedSpeciesIndex(speciesToDisplay.length - 1) :
      setSelectedSpeciesIndex(selectedSpeciesIndex - 1)
  }

  // direction: 1 for right -1 for left
  const shift = (arr, direction = 1, n = 1) => {
    const times = n > arr.length ? n % arr.length : n;
    return arr.concat(arr.splice(0, direction > 0 ? arr.length - times : times));
  };

  useEffect(() => {
    if (selectedSearchOption === null && searchOptions && searchOptions.length > 0) {
      handleSearchOptionSelected(searchOptions[0]);
    }
  }, [searchOptions]);

  useEffect(() => {
    const filters = SPECIES_FILTERS.map(filter => {
      switch (filter.slug) {
        case 'all':
          return { slug: filter.slug, label: `${filter.label} (${species.length})` };
        default:
          const count = species.filter(sp => sp.category === filter.slug).length;
          return { slug: filter.slug, label: `${filter.label} (${count})` }
      }
    })
    setFilterWithCount(filters);

    // update species count in selected filter
    const tempLabel = SPECIES_FILTERS.find((sp) => sp.slug === selectedSpeciesFilter.slug).label;
    setSpeciesFilter({
      slug: selectedSpeciesFilter.slug,
      label: (selectedSpeciesFilter.slug === 'all') ?
         `${tempLabel} (${species.length})`
         : `${tempLabel} (${species.filter(sp => sp.category === selectedSpeciesFilter.slug).length})`
    });

  }, [speciesData.species])

  useEffect(() => {
    switch (selectedSpeciesFilter.slug) {
      case 'all':
        const allSorted = orderBy([...speciesData.species], ['has_image', 'conservationConcern'], ['desc', 'desc']);
        setSpeciesToDisplay(allSorted);
        setSpeciesToDisplayBackUp([...allSorted]);
        break;
      case 'flagship':
        const flagshipSorted = species.filter(sp => sp.isFlagship);
        setSpeciesToDisplay(flagshipSorted);
        setSpeciesToDisplayBackUp([...flagshipSorted]);
        break;
      case 'endangered':
        const endangeredSorted = species.sort((a, b) => (b.conservationConcern - a.conservationConcern)).slice(0, 40);
        setSpeciesToDisplay(endangeredSorted);
        setSpeciesToDisplayBackUp([...endangeredSorted]);
        break;
      default:
        const speciesSorted = orderBy([...speciesData.species.filter(sp => sp.category === selectedSpeciesFilter.slug)], ['has_image', 'conservationConcern'], ['desc', 'desc']);
        setSpeciesToDisplay(speciesSorted);
        setSpeciesToDisplayBackUp([...speciesSorted]);
        break;
    }
  }, [speciesData.species, selectedSpeciesFilter])

  useEffect(() => {
    setSelectedSpecies(speciesToDisplay[selectedSpeciesIndex])
  }, [speciesToDisplay, selectedSpeciesIndex])

  useEffect(() => {
    setSelectedSpeciesIndex(0);
  }, [selectedSpeciesFilter])

  useEffect(() => {
    if (selectedSpecies && !displayImages) {
      // On handle change pick the next or prev 5, search and pick 3 from them
      let bufferSpecies = speciesToDisplay.slice(0, 5);

      if (bufferSpecies.length > 3) {
        bufferSpecies = shift(bufferSpecies);
      }

      // TODO: Use Promise.all

      bufferSpecies.forEach((specie, i) => {
        if (!specie) return null;
        MolService.getSpecies(specie.name)
        .then((results) => {
          const updatedBufferSpeciesWithImages = bufferSpeciesWithImages;
          let updatedSpecie = DEFAULT_PLACEHOLDER_IMAGE;
          if (results.length > 0) {
            updatedSpecie = {
              ...specie,
              commonname: results[0].commonname,
              imageUrl: results[0].image ? results[0].image.url : getPlaceholderSpeciesImage(results[0].taxa),
              iucnCategory: IUCN_CATEGORIES[results[0].redlist],
              molLink: `https://mol.org/species/${selectedSpecies.name}`,
              placeholderText: results[0].image ? null : getPlaceholderSpeciesText(results[0].taxa)
            }
          }
          updatedBufferSpeciesWithImages[i] = updatedSpecie
          setBufferSpeciesWithImages(updatedBufferSpeciesWithImages);
        });
      })
    }
  }, [selectedSpecies, displayImages]);

  useEffect(() => {
    if (bufferSpeciesWithImages && (!displayImages || displayImages.length === 0)) {
      setDisplayImages(bufferSpeciesWithImages.slice(1, 4));
    }
  }, [bufferSpeciesWithImages, displayImages]);

  const handleSpeciesChange = (direction) => {
    console.info(direction)
  };

  return (
    <Component
      speciesFilters={speciesFilters}
      individualSpeciesData={individualSpeciesData}
      speciesToDisplay={speciesToDisplay}
      setSpeciesFilter={setSpeciesFilter}
      selectedSpeciesFilter={selectedSpeciesFilter}
      displayImages={displayImages}
      showCarouselArrows={showCarouselArrows}
      searchOptions={searchOptions}
      selectedSearchOption={selectedSearchOption}
      setSearchOptions={setSelectedSearchOption}
      handleSpeciesSearch={handleSpeciesSearch}
      handleSpeciesChange={handleSpeciesChange}
      handleSearchOptionSelected={handleSearchOptionSelected}
      handleCloseSearch={handleCloseSearch}
      {...props}
    />
  )
}

export default SpeciesCardContainer;
