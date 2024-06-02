/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { useForm, useWatch, useFieldArray } from "react-hook-form";

let renderCount = 0;

type FormValues = {
  cart: {
    name: string;
    amount: number;
  }[]
};

const App = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      cart: [{ name: '', amount: 0 }]
    }
  });
  const { fields, append, prepend } = useFieldArray<any>({
    name: 'cart',
    control
  })
  const onSubmit = (data: FormValues) => {
    console.log('data', data);
  };
  renderCount++;
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type='button'>{renderCount}</button>
        <br />
        {fields.map((field, index) => (
          <section key={field.id}>
            <label>
              <span>Name</span>
              <input type="text" {...register(`cart.${index}.name`)} />
            </label>
            <label>
              <span>amount</span>
              <input type="number" {...register(`cart.${index}.amount`, { valueAsNumber: true })} />
            </label>
          </section>
        ))}
        <br />
        <br />
        <button type='button' onClick={() => {
          append({
            name: 'append',
            amount: 0
          })
        }}>Append</button>
        <button type='button' onClick={() => {
          prepend({
            name: 'prepend',
            amount: 0
          })
        }}>Prepend</button>
        <br />
        <input type="submit" />
      </form>
    </div>
  )
}

export default App;
