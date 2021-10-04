import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { MyTable } from "./table";
import { GroupSelect } from "./select";
import { Weapon, autoList, armList, topsList, bottomsList } from "./data";
import { princessCoreList } from "./data";
import { useStorageContext } from "./storage";

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

export const Weapons = () => {
  const { weapons } = useStorageContext();
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

const getVariationNumber = (index: 1 | 2 | 3) => {
  switch (index) {
    case 1:
      return "variations1";
    case 2:
      return "variations2";
    case 3:
      return "variations3";
    default:
      throw Error("illegal index");
  }
};

export const Variations = ({ index }: { index: 1 | 2 | 3 }) => {
  const variationNumber = getVariationNumber(index);
  const { [variationNumber]: weapons } = useStorageContext();
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

export const VariationPanel = () => {
  const { princessCore } = useStorageContext();
  const variationMax = princessCoreList[princessCore[0]]?.variation ?? 0;

  const getDisplayVariation = (variationIndex: number) =>
    variationMax >= variationIndex ? {} : { display: "none" };

  return (
    <>
      <Grid item style={getDisplayVariation(1)}>
        <Variations index={1} />
      </Grid>
      <Grid item style={getDisplayVariation(2)}>
        <Variations index={2} />
      </Grid>
      <Grid item style={getDisplayVariation(3)}>
        <Variations index={3} />
      </Grid>
    </>
  );
};
