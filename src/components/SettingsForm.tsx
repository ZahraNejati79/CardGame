import InputField from "./InputField";

type Props = {
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  formInputs: {
    actionNumber: number;
    time: number;
  };
};

function SettingsForm({ submitHandler, changeHandler, formInputs }: Props) {
  return (
    <form className="flex flex-col gap-4" onSubmit={submitHandler}>
      <InputField
        value={formInputs.actionNumber}
        onChange={(e) => changeHandler(e, "actionNumber")}
        name="actionNumber"
        type="number"
        label="Action Number"
      />
      <InputField
        value={formInputs.time}
        onChange={(e) => changeHandler(e, "time")}
        name="time"
        type="number"
        label="Time"
      />
      <button className="btn btn__primary" type="submit">
        submit
      </button>
    </form>
  );
}

export default SettingsForm;
