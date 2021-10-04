import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { MyTableWithoutPaper } from "./table";
import { MyPaper } from "./paper";
import { Select } from "./select";
import { princessCoreList } from "./data";
import { Update } from "./update";
import { useStorageContext } from "./storage";

const Header = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>コア名</TableCell>
        <TableCell align="center">最大HP</TableCell>
        <TableCell align="center">最大TP</TableCell>
        <TableCell align="center">SS値</TableCell>
        <TableCell align="center">移動値</TableCell>
        <TableCell align="center">特殊機能</TableCell>
        <TableCell align="center">参照P</TableCell>
      </TableRow>
    </TableHead>
  );
};

export const PrincessCores = () => {
  const { princessCore, update } = useStorageContext();
  const cell = princessCoreList[princessCore[0] ?? -1];

  const { extend, radicalization } = update[0];
  const calcUpdate = (
    value: number | null,
    update: number,
    coefficient: number
  ) => {
    const raw = princessCore[0] ?? "ー";
    return update > 0
      ? String(Number(princessCore[0] ?? 0) + update * coefficient) + `(${raw})`
      : raw;
  };
  const hp = calcUpdate(cell?.hp, extend, 10);
  const tp = calcUpdate(cell?.tp, extend, 5);
  const ss = calcUpdate(cell?.ss, radicalization, 2);
  const move = calcUpdate(cell?.move, radicalization, 1);

  return (
    <MyPaper>
      <MyTableWithoutPaper title="プリンセスコア">
        <Header />
        <TableBody>
          <TableRow key={0}>
            <TableCell>
              <Select
                value={princessCore[0]}
                setValue={princessCore[1]}
                list={princessCoreList}
              />
            </TableCell>
            <TableCell align="center">{hp}</TableCell>
            <TableCell align="center">{tp}</TableCell>
            <TableCell align="center">{ss}</TableCell>
            <TableCell align="center">{move}</TableCell>
            <TableCell align="center">{cell?.special ?? "ー"}</TableCell>
            <TableCell align="center">{cell?.page ?? "ー"}</TableCell>
          </TableRow>
        </TableBody>
      </MyTableWithoutPaper>
      <Update updateState={update} />
    </MyPaper>
  );
};
