import { useForm } from "react-hook-form";

let renderCount = 0;
type FormValues = {
  firstName: string;
  customError: string;
}
const App = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormValues>({
    defaultValues: {
      firstName: ''
    },
    criteriaMode: 'all',
  });
  // const onSubmit = (data: FormValues) => {
  //   console.log('data', data);
  // };
  renderCount++;
  return (
    <div>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <form onSubmit={handleSubmit((data) => console.log('submitted data', data))}>
        <button type='button'>{renderCount}</button>
        <br />
        {/* The source of truth for submission block regarding error will be the validation object passed in register function */}
        {/* Or the validation schema passed in hookForm resolvers */}
        {/* The source of submission validation won't be the manuall error set using setError API */}

        {/* When pressed submit the handleSubmit of react-hook-form actually ignores the error set using setErrors and will  look for the schema or register API errors regarding submission errors*/}
        {/* <input type="text" {...register('firstName')} */}
        <input type="text" {...register('firstName', { required: true })}
          placeholder="First Name"
        />
        {errors?.firstName && <div style={{ color: 'red' }}>{errors?.firstName?.types?.test}</div>}
        {errors?.firstName && <div style={{ color: 'red' }}>{errors?.firstName?.types?.test1}</div>}
        <br />
        <br />
        <button type="button" onClick={() => 
          // setError('firstName', {
          //   type: 'custom',
          //   message: 'Something went wrong!!!'
          // })
          // setError('firstName', {
          //   types: {
          //     test: 'test is wrong',
          //     test1: 'test1 is wrong'
          //   }
          // })
          // setError('customError', {
          //   type: 'server side',
          //   message: 'server response false'
          // })
          setError('firstName', 
          {
            type: 'server side',
            message: 'server response false'
          },
        {shouldFocus: true})
        }>setErrors</button>
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