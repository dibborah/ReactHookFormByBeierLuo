import { useForm } from "react-hook-form";

let renderCount = 0;
type FormValues = {
  firstName: string;
  customError: string;
}

const App = () => {
  const {
    register,
    handleSubmit,
    resetField,
    // formState: { errors, isValid }
    // formState: { isDirty, dirtyFields }
    formState: { touchedFields }
  } = useForm<FormValues>({
    defaultValues: {
      firstName: 'bill '
    },
    mode: 'onChange',
  });
  const onSubmit = async (data: FormValues) => {
    console.log('data', data);
  };
  // console.log('isDirty, dirtyFields', isDirty, dirtyFields);
  console.log('touchedFields', touchedFields);
  renderCount++;
  // checking commit 
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type='button'>{renderCount}</button>
        <br />
        <input type="text" {...register('firstName', {
          required: 'this is required',
          minLength: {
            value: 5,
            message: 'Min length of 5 is required'
          }
        })}
          placeholder="First Name"
        />
        {/* <p>{errors?.firstName?.message}</p> */}
        {/* <p>{isValid ? 'Valid' : 'Not Valid'}</p> */}
        <br />
        <br />
        {/* <button type="button" onClick={() => resetField('firstName', { keepError: true })}>Reset Field</button> */}
        {/* <button type="button" onClick={() => resetField('firstName', { keepDirty: true })}>Reset Field</button> */}
        <button type="button" onClick={() => resetField('firstName', { keepTouched: true })}>Reset Field</button>
        <input type="submit" />
      </form>
    </div>
  )
}

export default App;
