import React from "react";
import { useForm } from "react-hook-form";

let renderCount = 0;
type FormValues = {
  firstName: string;
  checkbox: boolean;
}

const App = () => {
  const {
    register,
    handleSubmit,
    watch,
    unregister,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      checkbox: true,
    },
    // shouldUnregister: true
  });
  const onSubmit = (data: FormValues) => {
    console.log('data', data);
  };
  const checkbox = watch('checkbox');
  // console.log('checkbox', checkbox)
  React.useEffect(() => {
    if (!checkbox) {
      unregister('firstName', { keepError: true });
    }
  }, [unregister, checkbox]);
  renderCount++;
  console.log('errors', errors);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type='button'>{renderCount}</button>
        <br />
        {checkbox && (
          <input type="text" {...register('firstName', { required: true })}
            placeholder="First Name"
          />
        )}
        <br />
        <input type="checkbox" {...register('checkbox')} />
        <br />
        <input type="submit" />
      </form>
    </div>
  )
}

export default App;
