type Props = {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({ label, name, type = "text", value, onChange }: Props) {
  return (
    <div className="flex flex-col items-start gap-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        className="input__field"
      />
    </div>
  );
}
export default InputField;
