/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, useWatch } from "react-hook-form";
import * as React from 'react';

let renderCount = 0;

type FormValues = {
  firstName: string;
  lastName: string;
};

type ControllerValues = {
  render: any;
  name: string;
  register: any;
  control: any;
  rules: any;
}

const Controller = ({ render, name, register, control, rules }: ControllerValues) => {
  const props = register(name, rules);
  const value = useWatch({ control, name })// using useWatch in controller the default value worked but not the asynchronous setValue
  // This won't fix the asynchronous setValue
  // That need to be fixed inside the <Input/> component
  return render({
    value,
    onChange: (e: any) => props.onChange({
      target: {
        name,
        value: e.target.value
      }
    }),
    name: props.name
  });
};

const Input = (props: any) => {
  const [value, setValue] = React.useState(props.value || '');
  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  return (
    <input
      name={props.name}
      onChange={(e) => {
        setValue(e.target.value)
        props.onChange && props.onChange(e);// Whatever happens in the input react hook form will know of it// This line is doing that
      }}
      value={value}
    />
  )
}

const App = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: 'dtest',
    },
  });
  const onSubmit = (data: FormValues) => {
    console.log('data', data);
  };
  renderCount++;
  React.useEffect(() => {
    setTimeout(() => {
      setValue('lastName', 'ltest');
    }, 1000);
  }, [setValue]);
  console.log('errors', errors);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type='button'>{renderCount}</button>
        <br />
        <input type="text" {...register('firstName', { required: true })}
          placeholder="First Name"
        />
        <br />

        <Controller
          {...{
            control,
            name: 'lastName',
            register,
            rules: {
              required: true,
            },
            render: (props: any) => <Input {...props} />
          }}
        />

        <br />
        <br />
        <input type="submit" />
      </form>
    </div>
  )
}

export default App;
