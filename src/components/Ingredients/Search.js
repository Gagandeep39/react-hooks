import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo((props) => {
  const searchRef = useRef();
  const [filterState, setFilterState] = useState('');
  // Props destructuring
  // Fetchin g props data and storing it in a variable
  // This allows useEffect to run only when taht specific thing changes
  const { onLoadIngredients } = props;

  // Now the function will check if the inout has changed in a 0.5 sec interval and then run nstead of sending request in every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      if(filterState === searchRef.current.value) {
        console.log('Executed');
    const query =
      filterState.length === 0
        ? ''
        : `?orderBy="title"&equalTo="${filterState}"`;
    fetch(
      'https://emerald-mission-191715.firebaseio.com/ingredients.json' + query
    )
      .then((response) => response.json())
      .then((responseData) => {
        const loadedIngredients = [];
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        onLoadIngredients(loadedIngredients);
      });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    }
  }, [filterState, onLoadIngredients, searchRef]);
  return (
    <section className='search'>
      <Card>
        <div className='search-input'>
          <label>Filter by Title</label>
          <input
            ref={searchRef}
            type='text'
            value={filterState}
            onChange={(event) => setFilterState(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
