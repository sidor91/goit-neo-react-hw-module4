import { useState, useRef, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar"
import ImageGallery from './components/ImageGallery/ImageGallery'
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from './components/ImageModal/ImageModal';
import { Toaster } from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_ACCESS_KEY;

function App() {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState('');
  const [isVisibleLoadMore, setIsVisibleLoadMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (currentPage === 1) return;

    setTimeout(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100)
  }, [gallery, currentPage]);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const fetchData = async (query, page = 1) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const response = await axios.get(`${BASE_URL}/search/photos`, {
        params: {
          client_id: API_KEY,
          query,
          page,
          per_page: 12,
          orientation: "landscape",
        },
      });
      return response.data?.results?.map(
        ({ id, alt_description, urls }) => ({ id, alt: alt_description, src: urls.small, full: urls.full })
      ) || [];
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong...');
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoadMore = async () => {
    if (isLoading) return;

    const nextPage = currentPage + 1;
    const data = await fetchData(currentQuery, nextPage);

    if (!data.length) {
      setIsVisibleLoadMore(false);
      return
    };

    setGallery(prevGallery => [...prevGallery, ...data]);
    setCurrentPage(nextPage);
  }

  const onSubmit = async (query) => {
    if (currentQuery === query || isLoading) {
      return;
    }
    const data = await fetchData(query);
    setCurrentPage(1);

    if (data.length) {
      setCurrentQuery(query);
      setGallery(data);
      setIsVisibleLoadMore(true)
    } else {
      setGallery([])
      setIsVisibleLoadMore(false);
      setErrorMessage('No data to show');
    }
  }

  return <>
    <div><Toaster position="top-right" /></div>
    <SearchBar onSubmit={onSubmit} />
    {errorMessage ?
      <ErrorMessage errorMessage={errorMessage} /> :
      <>
        {!!gallery.length && <ImageGallery gallery={gallery} onImageClick={openModal} />}
        <Loader loading={isLoading} />
        {!!gallery.length && !isLoading && isVisibleLoadMore && <LoadMoreBtn onLoadMore={handleLoadMore} />}
        <div ref={bottomRef} />
      </>}
    {!!selectedImage && <ImageModal isOpen={isModalOpen} closeModal={closeModal} selectedImage={selectedImage} />}
  </>
}

export default App
