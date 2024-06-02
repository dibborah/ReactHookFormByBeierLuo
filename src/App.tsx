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
  const { fields } = useFieldArray<any>({
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
        <input type="submit" />
      </form>
    </div>
  )
}

export default App;
