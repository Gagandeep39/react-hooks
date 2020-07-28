import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
  const [ingredientsState, setIngredientsState] = useState([]);

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
          console.log(response);
          return response.json();
        }
      )
      .then((responseData) => {
        console.log(responseData);
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
