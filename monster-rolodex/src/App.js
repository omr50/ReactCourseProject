// component is a class that react has which allows
// which allows new components we write in a class 
// component format to have access to the functionality
// React has already built for us inside of the component
// class.
import { useState, useEffect } from 'react'
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component'

import logo from './logo.svg';
import './App.css';
import userEvent from '@testing-library/user-event';

const App = () => {
  console.log('render')

  const [searchField, setSearchField] = useState('')
  const [monsters, setMonsters] = useState([])
  const [filteredMonsters, setFilteredMonsters] = useState(monsters)
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users))
  }, [])

  useEffect(
    () => {
      const newFilteredMonsters = monsters.filter((monster) => {
        return monster.name.toLocaleLowerCase().includes(searchField)
      })
      setFilteredMonsters(newFilteredMonsters)
    },
    [monsters, searchField]
    // it may seem at first that monsters is constant
    // and shouldn't be in the dependency array but
    // it is only constant after the first call because
    // initially it is empty but then it changes once
    // the fetch is called and therefore when the monsters
    // array changes because of that we want useEffect to
    // run so that we can filter the monsters again.
  )

  const onSearchChange = (event) => {
    // everytime the user types we want to change the search
    // field depending on that.
    const searchFieldString = event.target.value.toLocaleLowerCase()
    setSearchField(searchFieldString)
  }

  return (
    <div className="App" >
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox className='monsters-search-box' onChangeHandler={onSearchChange} placeholder='Search Monsters' />
      <CardList monsters={filteredMonsters} />

    </div >
  )
}

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: ''
//     }
//   }

//   // what ever code is in here will run when component mounts
//   // component mount means the first time it is placed on to the
//   // DOM.
//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((users) => this.setState(
//         () => {
//           return { monsters: users, filteredArray: users }
//         },
//         () => {
//           console.log(this.state)
//         }
//       ))
//   }

//   onSearchChange = (event) => {
//     // everytime the user types we want to change the search
//     // field depending on that.
//     const searchField = event.target.value.toLocaleLowerCase()

//     this.setState(
//       () => {
//         // In this callback we call setState 
//         // to change the searchField parameter
//         // of the state after modifying it in the
//         // code above asynchronously. 
//         // After this code runs, the UI will re-render
//         // meaning that the filteredMonsters array above
//         // will change based on the searchField we are
//         // returning just below. After that we will use the
//         // map function below to render all of the monsters
//         // inside of the filteredMonsters array
//         return { searchField }
//       })
//   }

//   render() {
//     const { monsters, searchField } = this.state
//     const { onSearchChange } = this

//     // This function below will get the filtered array by using the filter method
//     // to create a new array with all elements that match searchField
//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField)
//     })

//     return (
//       <div className="App" >
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox className='monsters-search-box' onChangeHandler={onSearchChange} placeholder='Search Monsters' />
//         <CardList monsters={filteredMonsters} />

//       </div >
//     )
//   }
// }
export default App;
