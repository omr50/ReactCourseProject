import './card-list.styles.css'
import Card from '../card/card.component'
import { useState } from 'react'
const CardList = ({ monsters }) => (
    // in the parameters above the first parameter
    // is always guaranteed to be the props. So we
    // can destructure in there to get our monsters
    // array.
    < div className='card-list' >
        {
            monsters.map((monster) => {

                return <Card monster={monster} key={monster.id} />
            })
        }
    </div >
)

export default CardList