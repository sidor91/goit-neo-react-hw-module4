import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ errorMessage }) => {
  return <p className={styles.errorMessage}>{errorMessage}</p>
}

export default ErrorMessage;