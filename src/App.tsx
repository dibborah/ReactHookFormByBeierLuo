import { useForm } from "react-hook-form";

let renderCount = 0;

type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
}

const App = () => {
  console.log('component renders')
  const { register, handleSubmit } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      firstName: '',
      lastName: '',
      age: 0,
    }
  });
  renderCount++;

  // register
  // register('firstName', { required: true, minLength: 5 });
  // console.log(register('lastName', { maxLength: 5 }));

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <button type='button'>{renderCount}</button>
      <br />
      <br />
      <input type="text" {...register('firstName', {
        required: true,
        minLength: 3
      })}
        placeholder="First Name"
      />
      <br />
      <input type="text" {...register('lastName', {
        required: true,
        minLength: 3
      })}
        placeholder="Last Name"
      />
      <br />
      <input type="number" {...register('age', {valueAsNumber: true})}
      />
      <br />
      <button>Submit</button>
    </form>
  )
}

export default App;