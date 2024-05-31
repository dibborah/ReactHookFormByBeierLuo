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
        <button type="button" onClick={() => {
          trigger('firstName')
        }}>trigger</button>
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