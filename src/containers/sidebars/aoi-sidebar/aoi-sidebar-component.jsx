import React, { useState, useMemo } from 'react';
import cx from 'classnames';
import { useT, useLocale } from '@transifex/react';

import { ReactComponent as ShareIcon } from 'icons/share.svg';
import { ReactComponent as CloseIcon } from 'icons/closes.svg';
import { ReactComponent as EditIcon } from 'icons/edit.svg';
import { ReactComponent as LandCoverIcon } from 'icons/land-cover.svg';
import { ReactComponent as PopulationIcon } from 'icons/population.svg';
import { ReactComponent as ClimateRegimeIcon } from 'icons/climate-regime.svg';

import Button from 'components/button';
import ShareModal from 'components/share-modal';
import SidebarCard from './sidebar-card-content';
import SpeciesCard from './species-card';
import DummyBlurWorkaround from 'components/dummy-blur-workaround';

import { writeToForageItem } from 'utils/local-forage-utils';

import { getHumanPressuresLandUse } from 'constants/human-pressures';
import { getWDPALayers } from 'constants/protected-areas';
import { getAOIBiodiversityToggles } from 'constants/biodiversity-layers-constants';
import {
  LAND_HUMAN_PRESSURES_SLUG,
  BIODIVERSITY_SLUG,
  PROTECTION_SLUG,
} from 'constants/analyze-areas-constants';
import {
  getAOIContextualData,
  getCountryNames,
} from 'constants/translation-constants';
import {
  MERGED_PROTECTION,
  MERGED_LAND_HUMAN_PRESSURES,
  ALL_TAXA_PRIORITY,
} from 'constants/metadata';
import styles from './styles.module.scss';

const AOISidebarComponent = ({
  map,
  area,
  className,
  landCover,
  population,
  speciesData,
  activeLayers,
  climateRegime,
  contextualData,
  shareAoiAnalytics,
  handleClose,
  isShareModalOpen,
  setShareModalOpen,
  dataLoaded,
}) => {
  const t = useT();
  const locale = useLocale();
  const humanPressuresLandUse = useMemo(
    () => getHumanPressuresLandUse(),
    [locale]
  );

  const aoiBiodiversityToggles = useMemo(
    () => getAOIBiodiversityToggles(),
    [locale]
  );
  const WDPALayers = useMemo(() => getWDPALayers(), [locale]);

  const [isEditingName, setIsEditingName] = useState(false);
  const [updatedAreaName, setUpdatedAreaName] = useState(false);
  const handleShareModalOpen = () => {
    shareAoiAnalytics();
    setShareModalOpen(true);
  };

  const saveName = () => {
    setIsEditingName(false);
    writeToForageItem(contextualData.aoiId, {
      ...contextualData,
      timestamp: Date.now(),
      areaName: updatedAreaName,
    });
  };

  const AOIContextualTranslations = useMemo(
    () => getAOIContextualData(),
    [locale]
  );
  const countryNamesTranslations = useMemo(() => getCountryNames(), [locale]);

  return (
    <>
      <section className={styles.headerCard}>
        <Button
          type="rounded"
          handleClick={handleClose}
          Icon={CloseIcon}
          className={styles.backButton}
          tooltipText={t('Go back to the globe')}
        />
        <DummyBlurWorkaround />
        <div className={styles.topRow}>
          <div className={styles.nameWrapper}>
            {isEditingName ? (
              <input
                autoFocus
                type="text"
                className={styles.areaNameEdit}
                onChange={(e) => setUpdatedAreaName(e.target.value)}
                placeholder={t('Type name')}
              />
            ) : (
              <p className={styles.areaName}>
                {updatedAreaName ||
                  countryNamesTranslations[contextualData.areaName] ||
                  contextualData.areaName}
              </p>
            )}
            {area && (
              <p className={styles.area}>
                {`${area} `}
                <span>
                  {t('km')}
                  <sup>2</sup>
                </span>
              </p>
            )}
          </div>
          {isEditingName ? (
            <div className={styles.actionButtons}>
              <Button
                type="rectangular"
                className={styles.saveButton}
                handleClick={saveName}
                tooltipText={t('Save the area name')}
                label={t('SAVE')}
              />
            </div>
          ) : (
            <div className={styles.actionButtons}>
              {contextualData.isCustom && (
                <Button
                  Icon={EditIcon}
                  type="icon-square"
                  handleClick={() => setIsEditingName(true)}
                  tooltipText={t('Edit area name')}
                />
              )}
              {dataLoaded && (
                <Button
                  Icon={ShareIcon}
                  type="icon-square"
                  handleClick={handleShareModalOpen}
                  tooltipText={t('Share this area')}
                  disabled
                />
              )}
            </div>
          )}
        </div>
      </section>
      <div className={cx(styles.container, className)}>
        <div className={styles.contextualDataRow}>
          <div className={styles.contextualIndicator} title="population">
            <PopulationIcon />
            <span>{population}</span>
          </div>
          <div
            className={styles.contextualIndicator}
            title={`${t('land cover: ')}${
              AOIContextualTranslations[landCover && landCover.toLowerCase()] ||
              landCover
            }`}
          >
            <LandCoverIcon />
            <span>
              {AOIContextualTranslations[
                landCover && landCover.toLowerCase()
              ] || landCover}
            </span>
          </div>
          <div
            className={styles.contextualIndicator}
            title={`${t('climate regime: ')}${
              AOIContextualTranslations[
                climateRegime && climateRegime.toLowerCase()
              ] || climateRegime
            }`}
          >
            <ClimateRegimeIcon />
            <span>
              {AOIContextualTranslations[
                climateRegime && climateRegime.toLowerCase()
              ] || climateRegime}
            </span>
          </div>
        </div>
        <SpeciesCard area={area} speciesData={speciesData} />
        <SidebarCard
          map={map}
          toggleType="radio"
          activeLayers={activeLayers}
          contextualData={contextualData}
          cardCategory={BIODIVERSITY_SLUG}
          layers={aoiBiodiversityToggles}
          metadataSlug={ALL_TAXA_PRIORITY}
          // displayWarning={area < 10000}
        />
        <SidebarCard
          map={map}
          layers={WDPALayers}
          toggleType="checkbox"
          activeLayers={activeLayers}
          cardCategory={PROTECTION_SLUG}
          contextualData={contextualData}
          metadataSlug={MERGED_PROTECTION}
        />
        <SidebarCard
          map={map}
          toggleType="checkbox"
          activeLayers={activeLayers}
          layers={humanPressuresLandUse}
          contextualData={contextualData}
          cardCategory={LAND_HUMAN_PRESSURES_SLUG}
          metadataSlug={MERGED_LAND_HUMAN_PRESSURES}
        />
        <section className={styles.completeDatabaseWrapper}>
          <p>{t('Do you have more information about this particular area?')}</p>
          <a
            className={styles.link}
            href="https://mol.org/upload"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t(' help us complete our database')}
          </a>
        </section>
        <ShareModal
          isOpen={isShareModalOpen}
          setShareModalOpen={setShareModalOpen}
        />
      </div>
    </>
  );
};

export default AOISidebarComponent;
