import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo((props) => {
  const submitHandler = (event) => {
    event.preventDefault();
    // ...
  };

  const [titleState, setTitleState] = useState({ title: '' });
  const [amountState, setAmountState] = useState({ amount: '' });

  return (
    <section className='ingredient-form'>
      <Card>
        <form onSubmit={submitHandler}>
          <div className='form-control'>
            <label htmlFor='title'>Name</label>
            <input
              type='text'
              id='title'
              value={titleState.title}
              onChange={(event) => {
                setTitleState({
                  title: event.target.value,
                });
              }}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='amount'>Amount</label>
            <input
              type='number'
              id='amount'
              value={amountState.amount}
              onChange={(event) => {
                setAmountState({
                  amount: event.target.value,
                });
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
