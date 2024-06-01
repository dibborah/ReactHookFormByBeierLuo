import { useForm } from "react-hook-form";

let renderCount = 0;
type FormValues = {
  firstName: string;
  customError: string;
}

const sleep = (ms: number) => {// This function returns a promise but this is in the function defination
  // We are not calling the function which returns a promise . Just defining it !!!
  return new Promise ((resolve) =>  setTimeout(resolve, ms));
}

const App = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit = async (data: FormValues) => {
    await sleep(1000);// In 1sec the result gets resolved
    console.log('data', data);
    // throw new Error('testing gggg');
  };
  const onError = () => {
    console.log('Wrong!!!');
  }
  renderCount++;
  return (
    <div>
      {/* <form onSubmit={(e) => 
        handleSubmit(
          onSubmit, onError
        )(e).catch((e) => {
        console.log('e', e);
      })
      }> */}
      <form>
        <button type='button'>{renderCount}</button>
        <br />
        {/* <input type="text" {...register('firstName', { disabled: true })} */}
        <input type="text" {...register('firstName', { required: true })}
          placeholder="First Name"
        />
        <br />
        <br />
        <input type="submit" />
        <button type="button" onClick={(e) => {
          handleSubmit(onSubmit, onError)(e)
        }}
        >Fake Submit</button>
      </form>
    </div>
  )
}

export default App;
