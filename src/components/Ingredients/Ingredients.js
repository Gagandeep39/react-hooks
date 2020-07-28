import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
  const [ingredientsState, setIngredientsState] = useState([]);

  const addIngredientHandler = (newIngredients) => {
    setIngredientsState((previouseIngredients) => [
      // Taking all previous ingreidents
      ...previouseIngredients,
      // Attaching id to new ingredient and adding it to the state
      { id: Math.random().toString(), ...newIngredients },
    ]);
  };

  return (
    <div className='App'>
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        {/* Need to add list here! */}
        <IngredientList ingredients={ingredientsState} />
      </section>
    </div>
  );
}

export default Ingredients;
