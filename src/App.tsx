import { useForm } from "react-hook-form";

let renderCount = 0;

type FormValues = {
  yourDetails: {
    firstName: string;
    lastName: string;
  }
}

// Note: Unlike form made in Pure react RHF form inputs are uncontrolled by nature
const App = () => {
  const { register, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      yourDetails : {
        firstName : '',
        lastName : '',
      }
    }
  });
  renderCount++;
  return (
    <div>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <button type='button'>{renderCount}</button>
        <br />
        <input type="text" {...register('yourDetails.firstName')}
          placeholder="First Name"
        />
        <br />
        <input type="text" {...register('yourDetails.lastName')}
          placeholder="Last Name"
        />
        <br />
        <button type="button" onClick={() => {
          setValue('yourDetails', {
            firstName: 'bill',
            lastName: 'luo'
          }, );
          // setValue('yourDetails.firstName','Bill' );
          // setValue('yourDetails.lastName','luo' );
        }}>Submit</button>
      </form>
    </div>
  )
}

export default App;