import Modal from 'react-modal';

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 'none',
  },
};
Modal.setAppElement("#root");

const ImageModal = ({ isOpen, closeModal, selectedImage }) => {
  return <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    shouldCloseOnOverlayClick
    style={modalStyles}
  >
    <img
      src={selectedImage.full}
      alt={selectedImage.alt}
      style={{ maxWidth: "100%", maxHeight: "80vh", display: "block" }}
    />
  </Modal>
}

export default ImageModal;