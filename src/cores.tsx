import { useCallback } from "react";
import Select from "react-select";
import { PrincessCore, princessCoreList } from "./data";

const containerStyleFn = (base: object) => ({
  ...base,
  width: "17em"
});

const Header = () => {
  return (
    <thead>
      <tr>
        <th>コア名</th>
        <th>最大HP</th>
        <th>最大TP</th>
        <th>SS値</th>
        <th>移動値</th>
        <th>特殊機能</th>
        <th>参照P</th>
      </tr>
    </thead>
  );
};

type State = [
  PrincessCore | null,
  React.Dispatch<React.SetStateAction<PrincessCore | null>>
];

export const PrincessCores = ({ cores }: { cores: State }) => {
  const [value, setValue] = cores;
  const handleChange = useCallback((inputValue) => setValue(inputValue), []);
  return (
    <table style={{ fontSize: "small" }}>
      <Header />
      <tbody>
        <tr>
          <td>
            <Select
              value={value}
              options={princessCoreList}
              onChange={handleChange}
              styles={{
                container: containerStyleFn
              }}
            />
          </td>
          <td>{value?.hp ?? "ー"}</td>
          <td>{value?.tp ?? "ー"}</td>
          <td>{value?.ss ?? "ー"}</td>
          <td>{value?.move ?? "ー"}</td>
          <td>{value?.special ?? "ー"}</td>
          <td>{value?.page ?? "ー"}</td>
        </tr>
      </tbody>
    </table>
  );
};
