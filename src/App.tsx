/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
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
  return render({
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
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });
  const onSubmit = (data: FormValues) => {
    console.log('data', data);
  };
  renderCount++;
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
