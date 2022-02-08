import React, { useState, useEffect } from 'react';
import cx from 'classnames';

// components
import SpeciesBar from 'components/charts/species-bar';
import Dropdown from 'components/dropdown';

// containers
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';

// utils
import {
  roundRangeInArea,
  roundGlobalRange,
} from 'utils/data-formatting-utils';

// constants
import {
  SIDEBAR_CARDS_CONFIG,
  SPECIES_SLUG,
} from 'constants/analyze-areas-constants';

// icons
import { ReactComponent as ArrowIconRight } from 'icons/arrow_right.svg';
import { ReactComponent as ArrowIconLeft } from 'icons/arrow_left.svg';
import { ReactComponent as WarningIcon } from 'icons/warning.svg';

// styles
import styles from './styles.module.scss';

const capPercentage = (percentage) => (percentage > 100 ? 100 : percentage);
const getPositionClass = (i) =>
  ({
    0: 'prev',
    1: 'selected',
    2: 'next',
  }[i]);

const Component = ({
  area,
  speciesData,
  speciesFilters,
  setSpeciesFilter,
  selectedSpeciesFilter,
  individualSpeciesData,
  displayImages,
  showCarouselArrows,
  handleSpeciesSearch,
  handleSpeciesChange,
  handleSearchOptionSelected,
  handleCloseSearch,
  selectedSearchOption,
  searchOptions,
}) => {
  const [moving, setMoving] = useState(0);
  useEffect(() => {
    let intervalMoving;
    if (moving) {
      intervalMoving = () =>
        setTimeout(() => {
          setMoving(0);
          handleSpeciesChange(1);
          // setImages(shift(displayImages, moving, 1));
        }, 500);
      intervalMoving();
    }
    return intervalMoving;
  }, [moving]);

  return speciesData.species.length === 0 ? (
    <section className={styles.loaderCard}>
      <div className={styles.loaderBarContainer}>
        <div className={styles.loaderBarPercentage} />
      </div>
      <div className={styles.loaderTextContainer}>
        <p>Looking for species to watch here...</p>
        <p>This could take up to 30 seconds.</p>
      </div>
    </section>
  ) : (
    <SidebarCardWrapper className={styles.cardWrapper}>
      <div>
        <p className={styles.title}>
          {SIDEBAR_CARDS_CONFIG[SPECIES_SLUG].title(speciesData.species.length)}
          <span
            className={styles.infoClue}
            title={SIDEBAR_CARDS_CONFIG[SPECIES_SLUG].hint}
          >
            terrestrial vertebrates
          </span>
        </p>
        <Dropdown
          stacked
          width="full"
          parentWidth="322px"
          options={speciesFilters}
          selectedOption={selectedSpeciesFilter}
          handleOptionSelection={setSpeciesFilter}
        />
        {/* Search dropdown */}
        <Dropdown
          searchMode
          stacked
          width="full"
          parentWidth="322px"
          placeholderText="SEARCH SPECIES"
          onSearch={handleSpeciesSearch}
          options={searchOptions}
          selectedOption={selectedSearchOption}
          handleOptionSelection={handleSearchOptionSelected}
          handleCloseSearch={handleCloseSearch}
        />
        {individualSpeciesData && (
          <section className={styles.speciesDataContainer}>
            <div>
              <div className={styles.speciesCarousel}>
                {displayImages.map((image, index) => (
                  <div
                    key={image.image + index}
                    className={cx(
                      styles.speciesImageWrapper,
                      getPositionClass(index),
                      { [styles[`moving${moving}`]]: moving }
                    )}
                    onClick={() => {
                      setMoving(1);
                      // image.onClick();
                    }}
                    style={{
                      backgroundImage: `url(${image.image})`,
                    }}
                  >
                    {getPositionClass(index) === 'selected' &&
                      image.placeholderText && (
                        <span className={styles.placeholderText}>
                          {image.placeholderText}
                        </span>
                      )}
                  </div>
                ))}
              </div>
              <div className={styles.sliderControls}>
                {showCarouselArrows && (
                  <div
                    className={styles.arrow_icon_container}
                    onClick={displayImages[0] && handleSpeciesChange(-1)}
                  >
                    <ArrowIconLeft className={styles.arrow_icon} />
                  </div>
                )}
                <div className={styles.speciesNames}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.commonName}
                    href={individualSpeciesData.molLink}
                  >
                    {individualSpeciesData.commonname}
                  </a>
                  <span className={styles.scientificName}>
                    {individualSpeciesData.name}{' '}
                  </span>
                </div>
                {showCarouselArrows && (
                  <div
                    className={styles.arrow_icon_container}
                    onClick={displayImages[2] && handleSpeciesChange(1)}
                  >
                    <ArrowIconRight className={styles.arrow_icon} />
                  </div>
                )}
              </div>
            </div>
            <div className={styles.globalRangeArea}>
              <span>Global habitat-suitable range</span>
              <p>
                {`${roundGlobalRange(
                  individualSpeciesData.globaldRangeArea
                )} km`}
                <sup>2</sup>
              </p>
            </div>
            <SpeciesBar
              title="Portion of global range under protection"
              className={styles.speciesBarContainer}
              percentage={individualSpeciesData.globalProtectedPercentage}
              barAnnotation={individualSpeciesData.protectionTarget}
              barAnnotationTitle="Protection target"
            />
            <SpeciesBar
              scale="local"
              title="Portion of global range in this area"
              className={styles.speciesBarContainer}
              percentage={capPercentage(individualSpeciesData.presenceInArea)}
              percentageLabel={roundRangeInArea(
                capPercentage(individualSpeciesData.presenceInArea)
              )}
            />
            <p
              className={styles.iucnStatus}
            >{`IUCN status: ${individualSpeciesData.iucnCategory}`}</p>
          </section>
        )}
      </div>
      {area && area < 1000 && (
        <div className={styles.warningContainer}>
          <WarningIcon className={styles.icon} />
          <span>{SIDEBAR_CARDS_CONFIG[SPECIES_SLUG].warning}</span>
        </div>
      )}
    </SidebarCardWrapper>
  );
};

export default Component;
