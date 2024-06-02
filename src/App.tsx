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
  const { fields, append, prepend, remove } = useFieldArray<any>({
    name: 'cart',
    control,
    rules: {
      required: 'Please append at least1 item'
    }
  })
  const onSubmit = (data: FormValues) => {
    console.log('data', data);
  };
  // console.log('field errors', errors);
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
              <input type="text" {...register(`cart.${index}.name`, { required: 'This is required' })} />
            </label>
            <label>
              <span>amount</span>
              <input type="number" {...register(`cart.${index}.amount`, { valueAsNumber: true })} />
            </label>
            <p>{errors?.cart?.[index]?.name?.message}</p>
            <button type='button' onClick={() => remove(index)}>Delete</button>
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
        <p>{errors?.cart?.root?.message}</p>
        <input type="submit" />
      </form>
    </div>
  )
}

export default App;

