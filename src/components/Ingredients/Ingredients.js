import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
  const [ingredientsState, setIngredientsState] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  // Using callback will cache the function and revent recreation in a re render cycle
  const filterIngredientHandler = useCallback((filteredIngredients) => {
    setIngredientsState(filteredIngredients);
  }, []);

  // Will cause Infinite rerendering 
  // const filterIngredientHandler = (filteredIngredients) => {
  //   setIngredientsState(filteredIngredients);
  // };

  const addIngredientHandler = (newIngredients) => {
    setIsLoading(true);
    fetch('https://emerald-mission-191715.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(newIngredients),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(
        // Will generate and return a promise, will also add ID
        // This is just an HTTP response, not the actual JSON. To extract the JSON body content from the response, we use the json()
        (response) => {
          setIsLoading(false)
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

  const removeIngredientHandler = ingredientId => {
    setIsLoading(true);
    fetch(`https://emerald-mission-191715.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    }).then(response => {
      setIsLoading(false)
      console.log('Executed');
      console.log(ingredientsState);
      setIngredientsState(prevIngredients =>
        prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      );
      console.log(ingredientsState);
    })
  }

  return (
    <div className='App'>
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filterIngredientHandler} />
        {/* Need to add list here! */}
        <IngredientList
          ingredients={ingredientsState}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
