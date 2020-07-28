import React, { useState, useEffect, useCallback, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients
    case 'ADD':
      return [...currentIngredients, action.ingredient]
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id)
        
    default:
      throw new Error('Unreachable');
  }
}

function Ingredients() {
  const [ingredientsState, dispatch] = useReducer(ingredientReducer, [])
  // const [ingredientsState, setIngredientsState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // Using callback will cache the function and revent recreation in a re render cycle
  const filterIngredientHandler = useCallback((filteredIngredients) => {
    // setIngredientsState(filteredIngredients);
    dispatch({
      type: 'SET',
      ingredients: filteredIngredients
    });
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
        // setIngredientsState((previouseIngredients) => [
        //   // Taking all previous ingreidents
        //   ...previouseIngredients,
        //   // Attaching id to new ingredient and adding it to the state
        //   { id: responseData.name, ...newIngredients },
        // ]);
        dispatch({
          type: 'ADD',
          ingredient: { id: responseData.name, ...newIngredients }
        })
      }).catch(error => setError(error.message));
  };

  const removeIngredientHandler = ingredientId => {
    setIsLoading(true);
    fetch(`https://emerald-mission-191715.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    }).then(response => {
      setIsLoading(false)
      console.log('Executed');
      console.log(ingredientsState);
      // setIngredientsState(prevIngredients =>
      //   prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      // );
      dispatch({
        type: 'DELETE',
        id: ingredientId
      })
      console.log(ingredientsState);
    }).catch(error => setError(error.message));
  }

  const clearErrorHandler = () => {
    setError();
    setIsLoading(false);
  }

  return (
    <div className='App'>
      { error ? <ErrorModal onClose={clearErrorHandler}> {error} </ErrorModal> : null }
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
