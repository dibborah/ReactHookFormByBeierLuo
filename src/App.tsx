import { useForm } from "react-hook-form";

let renderCount = 0;
type FormValues = {
  firstName: string;
  lastName: string;
}
const App = () => {
  const { register, handleSubmit, trigger, formState: { errors } } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    console.log('data', data);
  }
  console.log('errors', errors);
  renderCount++;
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type='button'>{renderCount}</button>
        <br />
        <input type="text" {...register('firstName', {
          required: true,
          minLength: 6,
        })}
          placeholder="First Name"
        />
        <br />
        <br />
        <input type="text" {...register('lastName', {
          required: true,
          minLength: 6,
        })}
          placeholder="Last Name"
        />
        <br />
        {/* trigger API called in synchronous fc */}
        {/* <button type="button" onClick={() => {
          // trigger(['firstName', 'lastName'])
          trigger()// Not providing any validation will validate the validation schema of the entire form
        }}>trigger</button> */}
        {/* trigger API called in Asynchronous fc */}
        <button type="button"
          onClick={async () => {
            const output = await trigger('firstName', {shouldFocus: true})
            console.log(output);
          }}
        >trigger</button>
        <br />
        <input type="submit" />
      </form>
    </div>
  )
}

export default App;

// setValue api set one a single field in form
// Whereas when you want to bulk update the values we use resetValues

// setValues we doesnot wipe-out/ remove the field completely
// reset api wipeout or reset the fields completely