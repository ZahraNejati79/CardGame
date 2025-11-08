import InputField from "./InputField";

type Props = {
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  formInputs: {
    actionNumber: number;
    time: number;
  };
};

function SettingsForm({ onFormSubmit, onInputChange, formInputs }: Props) {
  return (
    <form className="flex flex-col gap-4" onSubmit={onFormSubmit}>
      <InputField
        value={formInputs.actionNumber}
        onChange={(e) => onInputChange(e, "actionNumber")}
        name="actionNumber"
        type="number"
        label="Action Number"
      />
      <InputField
        value={formInputs.time}
        onChange={(e) => onInputChange(e, "time")}
        name="time"
        type="number"
        label="Time"
      />
      <button className="btn btn__primary" type="submit">
        Apply Settings
      </button>
    </form>
  );
}

export default SettingsForm;
