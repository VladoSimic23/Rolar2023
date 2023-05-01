type SetStateFn<T> = React.Dispatch<React.SetStateAction<T>>;

export function handleChange<T>(e: any, setState: SetStateFn<T>): void {
  const value = e.target.value;
  const name = e.target.name;
  if (value === "") {
    setState((prevState) => ({ ...prevState, [name]: "" }));
  } else {
    setState((prevState) => ({ ...prevState, [name]: Number(value) }));
  }
}
