import React from "react";
import { useForm } from "react-hook-form";

let renderCount = 0;

type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
}

// Note: Unlike form made in Pure react RHF form inputs are uncontrolled by nature
const App = () => {
  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      firstName: 'bill',
      lastName: '',
      age: 0
    }
  });
  renderCount++;

  // below providing inline default values
  // console.log(watch('firstName', 'bill'));// The second arguement of the watch API is a default value

  // const [firstName, lastName] = watch(['firstName', 'lastName']);
  // console.log('firstName', firstName);

  // When wanting to subscribe to the whole form without triggering re-rendering
  // Then we use Watch in useEffect with watch as a dependency array

  //  console.log(watch('firstName'));

  // watch with subscribe 
  // useEffect confusion

  // get values without unnecessary Re-renders

  //  React.useEffect(() => {
  //   const subscription = watch((data) => {
  //     console.log(data.firstName);
  //   })
  //   return () => {
  //     subscription.unsubscribe();
  //   } 
  //  }, [watch])

  // watch always produces a new value
  const firstName = watch('firstName');

  // This won't work
  // React.useEffect(() => {
  //   console.log(firstName);
  // }, [firstName])

  // Return of watch is really helpful when we intergrate it with the render function
  // Rather than treating it as a side Effect or useEffect of your application

  return (
    <div>
      <p>{firstName === 'bill1' ? 'This is a fake one' : 'wait'}</p>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <button type='button'>{renderCount}</button>
        <br />
        <br />
        <input type="text" {...register('firstName')}
          placeholder="First Name"
        />
        <br />
        <input type="text" {...register('lastName')}
          placeholder="Last Name"
        />
        <br />
        <input type="number" {...register('age', { valueAsNumber: true })} />
        <br />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default App;