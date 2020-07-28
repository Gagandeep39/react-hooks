import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo((props) => {
  const submitHandler = (event) => {
    event.preventDefault();
    // ...
  };

  const [inputState, setInputState] = useState({
    title: '',
    amount: '', // Always better to use as a string rather than converting
  });

  return (
    <section className='ingredient-form'>
      <Card>
        <form onSubmit={submitHandler}>
          <div className='form-control'>
            <label htmlFor='title'>Name</label>
            <input
              type='text'
              id='title'
              value={inputState.title}
              onChange={(event) => {
                // First we store a value in a consttant
                // The interior arrow fn cannot directly access event hence its value must be in a constant
                const newTitle = event.target.value;
                // Hooks are required to update the state of all data in itinstead of justsingle parameter
                setInputState((previousInputState) => ({
                  title: newTitle,
                  amount: previousInputState.amount,
                }));
              }}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='amount'>Amount</label>
            <input
              type='number'
              id='amount'
              value={inputState.amount}
              onChange={(event) => {
                const newAmount = event.target.value;
                setInputState((previousInputState) => ({
                  title: previousInputState.title,
                  amount: newAmount,
                }));
              }}
            />
          </div>
          <div className='ingredient-form__actions'>
            <button type='submit'>Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
