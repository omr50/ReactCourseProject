import './search-box.styles.css'


const SearchBox = ({ className, placeholder, onChangeHandler }) => (

    // inside of here we want to return
    // the HTML needed for our searchbox
    < input
        className={`search-box ${className}`}
        type='search'
        placeholder={placeholder}
        onChange={onChangeHandler} />
)

export default SearchBox