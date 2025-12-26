import { BeatLoader } from 'react-spinners'
import styles from './Loader.module.css';

const Loader = ({ loading }) => {
  return (loading ?
    <div className={styles.loaderWrapper}>
      <BeatLoader />
    </div > : <></>)
}

export default Loader;