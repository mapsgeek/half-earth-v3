import React, { useState } from 'react';
import { ReactComponent as CloseIcon } from 'icons/x.svg';
import PartnersComponent from './partners/partners-component';
import MapInstructionsComponent from './map-instructions/map-instructions-component';

import styles from './about-styles.module.scss';


const About = () => {
  const [isAboutPageOpened, setAboutPageOpened] = useState(false);
  const [isPartnersActive, setPartnersActive] = useState(true);

  const handleOpenAboutPage = () => {
    setAboutPageOpened(true);
  };

  const handleCloseAboutPage = () => {
    setAboutPageOpened(false);
  };

  return (
    <>
      <button
        className={styles.aboutButton}
        onClick={handleOpenAboutPage}
      >
        About the Half-Earth map
      </button>
      {isAboutPageOpened && 
        <div className={styles.aboutPage}>
          <div className={styles.navbar}>
            <button onClick={() => setPartnersActive(true)}>PARTNERS</button>
            <button onClick={() => setPartnersActive(false)}>MAP INTRSUCTIONS</button>
          </div>
          { isPartnersActive && <PartnersComponent /> || <MapInstructionsComponent />}
          <button 
            className={styles.closeButton}
            onClick={handleCloseAboutPage}
          >
            <CloseIcon />
          </button>
          ABOUT
        </div>
      }
    </>
  )
}

export default About;