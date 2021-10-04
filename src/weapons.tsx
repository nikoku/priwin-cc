import { useState } from "react";
import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { MyTable } from "./table";
import { GroupSelect } from "./select";
import { Weapon, autoList, armList, topsList, bottomsList } from "./data";

const parts = [
  "ー/ー",
  "ー/ー",
  "ライト/♠",
  "レフト/♣",
  "トップス/♡",
  "ボトムス/◇"
];

type weaponTr = {
  index: number;
  list: Weapon[];
  state: [number, React.Dispatch<React.SetStateAction<number>>];
};

const WeaponTr = ({ index, list, state }: weaponTr) => {
  const [value, setValue] = state;
  const cell = value === null ? null : list[value];

  return (
    <TableRow key={index}>
      <TableCell align="center">{parts[index]}</TableCell>
      <TableCell>
        <GroupSelect
          value={value}
          setValue={setValue}
          list={list}
          groupList={[
            { label: "アクション", cond: (node) => node.type === "A" },
            { label: "リアクション", cond: (node) => node.type === "R" },
            { label: "パッシブ", cond: (node) => node.type === "P" }
          ]}
        />
      </TableCell>
      <TableCell align="center">{cell?.type ?? "ー"}</TableCell>
      <TableCell align="center">{cell?.power ?? "ー"}</TableCell>
      <TableCell align="center">{cell?.range ?? "ー"}</TableCell>
      <TableCell align="center">{cell?.avoid ?? "ー"}</TableCell>
      <TableCell align="center">{cell?.page ?? "ー"}</TableCell>
    </TableRow>
  );
};

const Header = () => {
  const style = { minWidth: "4em" };
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center">部位/スート</TableCell>
        <TableCell>名称</TableCell>
        <TableCell align="center">種別</TableCell>
        <TableCell align="center" style={style}>
          威力
        </TableCell>
        <TableCell align="center" style={style}>
          射程
        </TableCell>
        <TableCell align="center" style={style}>
          回避コスト
        </TableCell>
        <TableCell align="center">参照P</TableCell>
      </TableRow>
    </TableHead>
  );
};

type State = [number, React.Dispatch<React.SetStateAction<number>>];

export const Weapons = ({ weapons }: { weapons: State[] }) => {
  const tackleState = useState(0);
  const clossState = useState(1);
  return (
    <MyTable title="武装">
      <Header />
      <TableBody>
        <WeaponTr index={0} list={[autoList[0]]} state={tackleState} />
        <WeaponTr index={1} list={[autoList[1]]} state={clossState} />
        <WeaponTr index={2} list={armList} state={weapons[0]} />
        <WeaponTr index={3} list={armList} state={weapons[1]} />
        <WeaponTr index={4} list={topsList} state={weapons[2]} />
        <WeaponTr index={5} list={bottomsList} state={weapons[3]} />
      </TableBody>
    </MyTable>
  );
};

export const Variations = ({
  weapons,
  index
}: {
  weapons: State[];
  index: 1 | 2 | 3;
}) => {
  return (
    <MyTable title={`バリエーション${[null, "①", "②", "③"][index]}`}>
      <Header />
      <TableBody>
        <WeaponTr index={2} list={armList} state={weapons[0]} />
        <WeaponTr index={3} list={armList} state={weapons[1]} />
        <WeaponTr index={4} list={topsList} state={weapons[2]} />
        <WeaponTr index={5} list={bottomsList} state={weapons[3]} />
      </TableBody>
    </MyTable>
  );
};
