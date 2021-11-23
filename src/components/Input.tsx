import { Field, ErrorMessage } from "formik";

interface InputType {
  name: string;
  value?: string | number;
  className?: string;
  readonly?: boolean;
  label?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  type?: string;
}

const Input = (props: InputType) => {
  const { className, name, readonly, label, onChange, type = "text", value } = props;
  let optionProps: { onChange?: (e: React.FormEvent<HTMLInputElement>) => void; value?: string | number } = {};
  if (onChange) optionProps.onChange = onChange;
  if (value) optionProps.value = value;
  return (
    <div className={className ? className : ""}>
      <label className="block font-normal text-gray-500 dark:text-gray-400 text-sm mt-3 mb-2">{label}</label>
      <Field
        type={type}
        readOnly={readonly}
        name={name}
        {...optionProps}
        className="mt-1 block w-full bg-white dark:bg-app-dark-5 rounded-md 
        border-gray-300 dark:border-gray-800  font-bold
        focus:border-purple focus:ring-1 focus:ring-purple text-gray-900 dark:text-gray-100"
      />
      <ErrorMessage name={name}>{(msg) => <div className=" text-red-500 text-sm mt-3">{msg}</div>}</ErrorMessage>
    </div>
  );
};

export default Input;
