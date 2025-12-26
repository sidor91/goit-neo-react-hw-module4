import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const userInput = e.target.elements.searchInput.value.trim();

    if (!userInput.length){
      // TODO: toast error
      toast.error('Please enter a search query');
      e.target.reset();
    }
    onSubmit(userInput);
  }
  return <header className={styles.header}>
    <form onSubmit={handleSubmit}>
      <input
        name='searchInput'
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        className={styles.input}
      />
      <button type="submit">Search</button>
    </form>
  </header>

}

export default SearchBar;