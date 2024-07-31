import styles from './Loader.module.css';

export const Loader = () => (
  <div className={styles['loader-wrapper']} data-testid="loader-wrapper">
    <div className={styles.loader}></div>
  </div>
);
