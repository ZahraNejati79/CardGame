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
    <div className="flex flex-col gap-4">
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="actionNumber">action number</label>
          <input
            value={formInputs.actionNumber}
            onChange={(e) => changeHandler(e, "actionNumber")}
            id="actionNumber"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="time">time game</label>
          <input
            value={formInputs.time}
            onChange={(e) => changeHandler(e, "time")}
            id="time"
            type="text"
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default SettingsForm;
