import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ gallery, onImageClick }) => {
  return <ul className={styles.gallery}>
    {gallery.map(image => (<li key={image.id} className={styles.card}>
      <ImageCard image={image} onImageClick={onImageClick}/>
    </li>))}
  </ul>
}

export default ImageGallery;