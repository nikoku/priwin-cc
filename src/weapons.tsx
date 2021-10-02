import { useState, useCallback } from "react";
import Select from "react-select";
import { Weapon, autoList, armList, topsList, bottomsList } from "./data";

const parts = [
  "ー/ー",
  "ー/ー",
  "ライト/♠",
  "レフト/♣",
  "トップス/♡",
  "ボトムス/◇"
];

const containerStyleFn = (base: object) => ({
  ...base,
  width: "17em"
});
type weaponTr = {
  index: number;
  list: Weapon[];
  state: [Weapon | null, React.Dispatch<React.SetStateAction<Weapon | null>>];
};

const WeaponTr = ({ index, list, state }: weaponTr) => {
  const [value, setValue] = state;
  const handleChange = useCallback((inputValue) => setValue(inputValue), []);

  return (
    <tr>
      <td>{parts[index]}</td>
      <td>
        <Select
          value={value}
          options={list}
          onChange={handleChange}
          styles={{
            container: containerStyleFn
          }}
        />
      </td>
      <td>{value?.type ?? "ー"}</td>
      <td>{value?.power ?? "ー"}</td>
      <td>{value?.range ?? "ー"}</td>
      <td>{value?.avoid ?? "ー"}</td>
      <td>{value?.page ?? "ー"}</td>
    </tr>
  );
};

const Header = () => {
  const style = { minWidth: "4em" };
  return (
    <thead>
      <tr>
        <th>部位/スート</th>
        <th>名称</th>
        <th>種別</th>
        <th style={style}>威力</th>
        <th style={style}>射程</th>
        <th style={style}>回避コスト</th>
        <th>参照P</th>
      </tr>
    </thead>
  );
};

type State = [
  Weapon | null,
  React.Dispatch<React.SetStateAction<Weapon | null>>
];

export const Weapons = ({ weapons }: { weapons: State[] }) => {
  const tackleState = useState<Weapon | null>(autoList[0]);
  const clossState = useState<Weapon | null>(autoList[1]);
  return (
    <table style={{ fontSize: "small" }}>
      <Header />
      <tbody>
        <WeaponTr index={0} list={[autoList[0]]} state={tackleState} />
        <WeaponTr index={1} list={[autoList[1]]} state={clossState} />
        <WeaponTr index={2} list={armList} state={weapons[0]} />
        <WeaponTr index={3} list={armList} state={weapons[1]} />
        <WeaponTr index={4} list={topsList} state={weapons[2]} />
        <WeaponTr index={5} list={bottomsList} state={weapons[3]} />
      </tbody>
    </table>
  );
};

export const Variations = ({ weapons }: { weapons: State[] }) => {
  return (
    <table style={{ fontSize: "small" }}>
      <Header />
      <tbody>
        <WeaponTr index={2} list={armList} state={weapons[0]} />
        <WeaponTr index={3} list={armList} state={weapons[1]} />
        <WeaponTr index={4} list={topsList} state={weapons[2]} />
        <WeaponTr index={5} list={bottomsList} state={weapons[3]} />
      </tbody>
    </table>
  );
};
