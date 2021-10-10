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

type WeaponState = [number, React.Dispatch<React.SetStateAction<number>>];

type weaponTr = {
  index: number;
  list: Weapon[];
  state: WeaponState;
  weapons: WeaponState[];
};

const getRawRange = (cell: Weapon) => {
  const minRange = cell.minRange;
  const maxRange = cell.maxRange;
  if (typeof minRange === "string") return minRange;
  if (minRange === maxRange) return minRange;
  return `${minRange}~${maxRange}`;
};

export const useGetRange = (
  weapons: WeaponState[],
  index: number,
  cell: Weapon | null
) => {
  if (cell == null) return "ー";
  const rawRange = getRawRange(cell);

  if (index !== 3) return rawRange;
  if (rawRange === "ー" || rawRange === "効果参照") return rawRange;
  if (Number(topsList[weapons[2][0]]?.value) !== 13) return rawRange;

  const minRange = Math.max(Number(cell?.minRange ?? 0) - 2, 0);
  const maxRange = Number(cell?.maxRange ?? 0) + 2;
  return `${minRange}~${maxRange} (${rawRange})`;
};

export const useGetAvoid = (
  weapons: WeaponState[],
  index: number,
  cell: Weapon | null
) => {
  if (cell == null) return "ー";
  const rawAvoid = cell.avoid;

  if (index !== 2) return rawAvoid;
  if (rawAvoid === "ー" || rawAvoid === "効果参照") return rawAvoid;
  if (Number(topsList[weapons[2][0]]?.value) !== 14) return rawAvoid;

  const avoid = rawAvoid + 1;
  return `${avoid} (${rawAvoid})`;
};

export const useGetPower = (weapons: WeaponState[], cell: Weapon | null) => {
  const { update } = useStorageContext();
  if (cell == null) return "ー";
  const rawPower = cell.power;

  if (rawPower === "ー" || rawPower === "効果参照") return rawPower;

  const glove = [
    Number(armList[weapons[0][0]]?.value) === 29 ? 3 : 0,
    Number(armList[weapons[1][0]]?.value) === 29 ? 3 : 0
  ];
  const { powerUp } = update[0];

  const power = rawPower + glove[0] + glove[1] + powerUp * 2;
  if (power === rawPower) return rawPower;
  return `${power} (${rawPower})`;
};

const WeaponTr = ({ index, list, state, weapons }: weaponTr) => {
  const [value, setValue] = state;
  const cell = value == null ? null : list[value];

  const power = useGetPower(weapons, cell);
  const range = useGetRange(weapons, index, cell);
  const avoid = useGetAvoid(weapons, index, cell);
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
      <TableCell align="center">{power}</TableCell>
      <TableCell align="center">{range}</TableCell>
      <TableCell align="center">{avoid}</TableCell>
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
  const clossState = useState(0);
  return (
    <MyTable title="武装">
      <Header />
      <TableBody>
        <WeaponTr
          weapons={weapons}
          index={0}
          list={[autoList[0]]}
          state={tackleState}
        />
        <WeaponTr
          weapons={weapons}
          index={1}
          list={[{ ...autoList[1], value: 0 }]}
          state={clossState}
        />
        <WeaponTr
          weapons={weapons}
          index={2}
          list={armList}
          state={weapons[0]}
        />
        <WeaponTr
          weapons={weapons}
          index={3}
          list={armList}
          state={weapons[1]}
        />
        <WeaponTr
          weapons={weapons}
          index={4}
          list={topsList}
          state={weapons[2]}
        />
        <WeaponTr
          weapons={weapons}
          index={5}
          list={bottomsList}
          state={weapons[3]}
        />
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
        <WeaponTr
          weapons={weapons}
          index={2}
          list={armList}
          state={weapons[0]}
        />
        <WeaponTr
          weapons={weapons}
          index={3}
          list={armList}
          state={weapons[1]}
        />
        <WeaponTr
          weapons={weapons}
          index={4}
          list={topsList}
          state={weapons[2]}
        />
        <WeaponTr
          weapons={weapons}
          index={5}
          list={bottomsList}
          state={weapons[3]}
        />
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
