import styles from './ImageCard.module.css';

const ImageCard = ({ image, onImageClick }) => {
  return <div>
    <img className={styles.image} src={image.src} alt={image.alt} onClick={() => onImageClick(image)}/>
  </div>
}

export default ImageCard;
