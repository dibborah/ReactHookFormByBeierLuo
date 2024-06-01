import React from "react";
import { useForm } from "react-hook-form";

let renderCount = 0;

type FormValues = {
  // yourDetails: {
  //   firstName: string;
  //   lastName: string;
  // }
  firstName: string;
  lastName: string;
}

// Note: Unlike form made in Pure react RHF form inputs are uncontrolled by nature
// We use getValues to do a partial reset
const App = () => {
  const { register, handleSubmit, reset,formState, getValues, formState: { isSubmitSuccessful } } = useForm<FormValues>({
    defaultValues: {
      // yourDetails: {
      //   firstName: 'khana',
      //   lastName: 'khajana',
      // }
      firstName: '',
      lastName: '',
    }
  });
  renderCount++;
  console.log('isSubmittedSuccessfully', isSubmitSuccessful);

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        firstName: 'Rana',
        lastName: 'Pratap Singh'
      })
    }
  }, [isSubmitSuccessful, reset])
  // checking commit 
  return (
    <div>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <button type='button'>{renderCount}</button>
        <br />
        <input type="text" {...register('firstName')}
          placeholder="First Name"
        />
        <br />
        <input type="text" {...register('lastName')}
          placeholder="Last Name"
        />
        <br />
        <button type="button"
          onClick={() => {
            reset({
              ...getValues(),
              lastName: 'duo + lingo  '
            }, {
              // keepDefaultValues: true,
              // keepValues: true,
            });
            // setValue('yourDetails.firstName','Bill' );
            // setValue('yourDetails.lastName','luo' );
          }}
        >Submit</button>
      </form>
    </div>
  )
}

export default App;

// setValue api set one a single field in form
// Whereas when you want to bulk update the values we use resetValues

// setValues we doesnot wipe-out/ remove the field completely
// reset api wipeout or reset the fields completely