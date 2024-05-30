import { useForm } from "react-hook-form";

let renderCount = 0;
const App = () => {
  console.log('component renders')
  const { register, formState: {errors}, watch } = useForm({
    mode: 'all',
    defaultValues: {
      firstName: 'bill',
      lastName: 'luo'
    }
  });
  // console.log('watch', watch());// watch function trigger re-render of the component
  const firstName = watch('firstName');
  console.log('watching just firstName', firstName)

  renderCount++;
  return (
    <form>
      <button type='button'>{renderCount}</button>
      <br />
      <br />
      <input type="text" {...register('firstName', {
        required: true,
        minLength: 3
      })} />
      <br />
      <input type="text" {...register('lastName', {
        required: true,
        minLength: 3
      })} />
    </form>
  )
}

export default App;