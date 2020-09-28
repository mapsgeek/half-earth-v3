import React from 'react';
import LocalSceneCard from 'components/local-scene-card';
import SpeciesModal from 'components/species-modal';
import PieChart from 'components/charts/pie-chart';
import HighLightedSpeciesList from 'components/highlighted-species-list';
import { MODALS } from 'constants/ui-params';
import { ReactComponent as MammalsIcon } from 'icons/taxa_mammals.svg';
import { ReactComponent as BirdsIcon } from 'icons/taxa_birds.svg';
import { ReactComponent as ReptilesIcon } from 'icons/taxa_reptiles.svg';
import { ReactComponent as AmphibiansIcon } from 'icons/taxa_amphibians.svg';
import { ReactComponent as SpeciesOval } from 'icons/species_oval.svg';
import { ReactComponent as EndemicOval } from 'icons/endemic_oval.svg';
import styles from './local-species-card-styles.module.scss';
import buttonTheme from 'styles/themes/button-theme.module.scss';
import { Button } from 'he-components';

const LocalSpeciesCardComponent = ({
  birds,
  mammals,
  reptiles,
  changeUI,
  chartData,
  countryISO,
  amphibians,
  countryName,
  openedModal,
  birdsEndemic,
  mammalsEndemic,
  reptilesEndemic,
  vertebratesCount,
  amphibiansEndemic,
  maxHighlightedSpecies,
  endemicVertebratesSentence,
}) => {
  const setModal = (opened) => {
    changeUI({ openedModal: opened ? MODALS.SPECIES : null });
  };

  return (
    <LocalSceneCard>
      <section className={styles.chartContainer}>
        <h3 className={styles.title}>Species composition:</h3>
        <PieChart
          width={280}
          height={280}
          id="local-species-composition"
          data={chartData}
          explodingSliceStroke="none"
          strokeWidth={20}
          regularSliceR={100}
          explodingSliceR={130}
        />
        <div className={styles.chartLegend}>
          <div className={styles.legendItem}>
            <SpeciesOval />
            <span>{`${vertebratesCount}`}</span>
            <span>species</span>
          </div>
          <div className={styles.legendItem}>
            <EndemicOval />
            <span>{endemicVertebratesSentence}</span>
            <span>endemic</span>
          </div>
        </div>
        <div>
          <p className={styles.speciesCount}>
            <span className={styles.amphibiansIcon}>
              <AmphibiansIcon />
            </span>{' '}
            {`${amphibians} amphibians (${amphibiansEndemic} endemic)`}
          </p>
          <p className={styles.speciesCount}>
            <span className={styles.birdsIcon}>
              <BirdsIcon />
            </span>{' '}
            {`${birds} birds (${birdsEndemic} endemic)`}
          </p>
          <p className={styles.speciesCount}>
            <span className={styles.mammalsIcon}>
              <MammalsIcon />
            </span>{' '}
            {`${mammals} mammals (${mammalsEndemic} endemic)`}
          </p>
          <p className={styles.speciesCount}>
            <span className={styles.reptilesIcon}>
              <ReptilesIcon />
            </span>{' '}
            {`${reptiles} reptiles (${reptilesEndemic} endemic)`}
          </p>
        </div>
      </section>
      <section>
        <p
          className={styles.speciesSentence}
        >{`These are the four species in ${countryName} with the smallest global range (one per taxonomic group).`}</p>
        <HighLightedSpeciesList
          countryISO={countryISO}
          maxHighlightedSpecies={maxHighlightedSpecies}
        />
        <Button theme={buttonTheme} onClick={() => setModal(true)}>
          See all species
        </Button>
        <SpeciesModal open={openedModal === MODALS.SPECIES} handleModalClose={() => setModal(false)} />
      </section>
    </LocalSceneCard>
  );
};

export default LocalSpeciesCardComponent;