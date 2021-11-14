interface InputType {
  name: string;
  value: string;
  setValue: (input: string) => void;
  className?: string;
  readonly?: boolean;
}

const Input = ({ name, value, setValue, className, readonly = false }: InputType) => {
  return (
    <div className={className ? className : ''}>
      <label className="block font-normal text-gray-500 dark:text-gray-400 text-sm mt-3 mb-2">{name}</label>
      <input
        readOnly={readonly}
        className="mt-1 block w-full bg-white dark:bg-app-dark-5 rounded-md 
        border-gray-300 dark:border-gray-800 
        focus:border-purple focus:ring-1 focus:ring-purple text-gray-500 dark:text-gray-400"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Input;
