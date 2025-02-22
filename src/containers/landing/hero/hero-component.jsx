// dependencies
import cx from 'classnames';
import { motion } from 'framer-motion';
// assets
import AUDIO_CARD_1_GIF from 'gifs/audio-card-1.gif';
import AUDIO_CARD_2_GIF from 'gifs/audio-card-2.gif';
import React from 'react';
import { DATA, NATIONAL_REPORT_CARD_LANDING } from 'router';
import { T, useT } from '@transifex/react';
// Components
import AudioCard from './audio-card';
// Constants
import { useMobile } from 'constants/responsive';
// styles
import styles from './hero-styles.module.scss';

const HeroComponent = ({ className, changeUI, browsePage }) => {
  const isMobile = useMobile();
  const t = useT();

  return (
    <div className={cx(styles.container, className)}>
      <motion.h3
        className={styles.subtitle}
        initial={{ opacity: 0.5, x: 250 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
        }}
      >
        <T _str="Welcome to the Half-Earth Project® Map" />
      </motion.h3>

      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.5,
        }}
      >
        <T _str="Explore where species conservation" />
        <br />
        <T _str="activities are needed the most" />
      </motion.h1>

      <motion.p
        className={styles.ctoText}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 1.5,
        }}
      >
        {!isMobile && (
          <T _str="SELECT ONE OF THE AUDIO TOURS BELOW TO LEARN MORE ABOUT IT" />
        )}
      </motion.p>

      {!isMobile && (
        <div className={styles.audioCards}>
          <motion.div
            className={styles.audioCard}
            initial={{ opacity: 0, x: -100, y: -30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              duration: 1,
              delay: 1.5,
            }}
          >
            <AudioCard
              number="01"
              duration={'7-8'}
              gif={AUDIO_CARD_1_GIF}
              title={t('Priority places')}
              description={t(
                'Understand where the suggested priority places should happen for vertebrates.'
              )}
              handleClick={() => {
                browsePage({ type: DATA });
                changeUI({
                  onboardingType: 'priority-places',
                  onboardingStep: 0,
                });
              }}
            />
          </motion.div>
          <motion.div
            className={styles.audioCard}
            initial={{ opacity: 0, x: 100, y: -30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              duration: 1,
              delay: 1.5,
            }}
          >
            <AudioCard
              number="02"
              duration={'10'}
              gif={AUDIO_CARD_2_GIF}
              title={t('National Report cards')}
              description={t(
                'Analyze national and other areas of interest. Download reports to share with others.'
              )}
              handleClick={() => {
                browsePage({ type: NATIONAL_REPORT_CARD_LANDING });
                changeUI({
                  onboardingType: 'national-report-cards',
                  onboardingStep: 0,
                });
              }}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default HeroComponent;
