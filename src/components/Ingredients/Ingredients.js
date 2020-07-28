import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
  const [ingredientsState, setIngredientsState] = useState([]);

  useEffect(() => {
    fetch('https://emerald-mission-191715.firebaseio.com/ingredients.json')
      .then((response) => response.json())
      .then((responseData) => {
        const loadingIngredients = [];
        for (const key in responseData) {
          loadingIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        setIngredientsState(loadingIngredients);
      });
  }, []);

  const addIngredientHandler = (newIngredients) => {
    fetch('https://emerald-mission-191715.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(newIngredients),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(
        // Will generate and return a promise, will also add ID
        // This is just an HTTP response, not the actual JSON. To extract the JSON body content from the response, we use the json()
        (response) => {
          return response.json();
        }
      )
      .then((responseData) => {
        setIngredientsState((previouseIngredients) => [
          // Taking all previous ingreidents
          ...previouseIngredients,
          // Attaching id to new ingredient and adding it to the state
          { id: responseData.name, ...newIngredients },
        ]);
      });
  };

  return (
    <div className='App'>
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        {/* Need to add list here! */}
        <IngredientList
          ingredients={ingredientsState}
          onRemoveItem={() => {}}
        />
      </section>
    </div>
  );
}

export default Ingredients;
