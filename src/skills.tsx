import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { MyTable } from "./table";
import { Select } from "./select";
import { skillList } from "./data";

const Header = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>特技名</TableCell>
        <TableCell align="center">消費TP</TableCell>
        <TableCell align="center">参照P</TableCell>
      </TableRow>
    </TableHead>
  );
};

type State = [number, React.Dispatch<React.SetStateAction<number>>];

const SkillTr = ({ state, index }: { state: State; index: number }) => {
  const [value, setValue] = state;
  const cell = value === null ? null : skillList[value];
  return (
    <TableRow key={index}>
      <TableCell>
        <Select value={value} setValue={setValue} list={skillList} />
      </TableCell>
      <TableCell align="center">{cell?.cost ?? "ー"}</TableCell>
      <TableCell align="center">{cell?.page ?? "ー"}</TableCell>
    </TableRow>
  );
};

export const Skills = ({ skills }: { skills: State[] }) => {
  return (
    <MyTable title="特技">
      <Header />
      <TableBody>
        <SkillTr state={skills[0]} index={0} />
        <SkillTr state={skills[1]} index={1} />
        <SkillTr state={skills[2]} index={2} />
      </TableBody>
    </MyTable>
  );
};
