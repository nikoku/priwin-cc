import { useCallback } from "react";
import Select from "react-select";
import { WingDrive, wingDriveList } from "./data";

const containerStyleFn = (base: object) => ({
  ...base,
  width: "17em"
});

const Header = () => {
  const style = { minWidth: "21em" };
  return (
    <thead>
      <tr>
        <th>ドライブ名</th>
        <th style={style}>タイミング</th>
        <th>参照P</th>
      </tr>
    </thead>
  );
};

type State = [
  WingDrive | null,
  React.Dispatch<React.SetStateAction<WingDrive | null>>
];

export const WingDrives = ({ wingDrives }: { wingDrives: State }) => {
  const [value, setValue] = wingDrives;
  const handleChange = useCallback((inputValue) => setValue(inputValue), []);
  return (
    <table style={{ fontSize: "small" }}>
      <Header />
      <tbody>
        <tr>
          <td>
            <Select
              value={value}
              options={wingDriveList}
              onChange={handleChange}
              styles={{
                container: containerStyleFn
              }}
            />
          </td>
          <td>{value?.timing ?? "ー"}</td>
          <td>{value?.page ?? "ー"}</td>
        </tr>
      </tbody>
    </table>
  );
};
