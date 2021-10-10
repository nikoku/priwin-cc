import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { MyTable } from "./table";
import { MyTableWithoutPaper } from "./table";
import { MyPaper } from "./paper";
import { Select } from "./select";
import { skillList } from "./data";
import { useStorageContext } from "./storage";

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

const visibility = (cond: boolean): { visibility: "visible" | "hidden" } => ({
  visibility: cond ? "visible" : "hidden"
});

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

const AdditionalSkillTr = ({ index }: { index: number }) => {
  const { additionalSkills } = useStorageContext();
  // const [value, setValue] = additionalSkills;
  const value = additionalSkills[0][index];
  const setValue = (select: any) => {
    const temp = [...additionalSkills[0]];
    temp[index] = select;
    additionalSkills[1](temp);
  };
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

export const Skills = () => {
  const { skills, additionalSkills } = useStorageContext();
  const count = additionalSkills[0].length;
  const add = () => {
    const temp = [...additionalSkills[0]];
    temp.push(-1);
    additionalSkills[1](temp);
  };
  const remove = () => {
    const temp = [...additionalSkills[0]];
    temp.pop();
    additionalSkills[1](temp);
  };
  return (
    <MyPaper>
      <MyTableWithoutPaper title="特技">
        <Header />
        <TableBody>
          <SkillTr state={skills[0]} index={0} />
          <SkillTr state={skills[1]} index={1} />
          <SkillTr state={skills[2]} index={2} />
          {additionalSkills[0].map((_, index) => {
            return <AdditionalSkillTr index={index} />;
          })}
        </TableBody>
      </MyTableWithoutPaper>
      <IconButton size="small" onClick={add}>
        <AddCircleOutlineIcon />
      </IconButton>
      <IconButton size="small" onClick={remove} style={visibility(count > 0)}>
        <RemoveCircleOutlineIcon />
      </IconButton>
    </MyPaper>
  );
};
