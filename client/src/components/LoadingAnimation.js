import React from 'react'
import { RadarSpinner } from 'react-epic-spinners'

import styles from './LoadingAnimation.module.scss'

const LoadingAnimation = () => (
  <div className={styles.wrapper}>
    <RadarSpinner color="#51dd1a" size={200} />
  </div>
)

export default LoadingAnimation
