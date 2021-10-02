import { useCallback } from "react";
import Select from "react-select";
import { Skill, skillList } from "./data";

const containerStyleFn = (base: object) => ({
  ...base,
  width: "17em"
});

const Header = () => {
  const style = { minWidth: "21em" };
  return (
    <thead>
      <tr>
        <th>特技名</th>
        <th>消費TP</th>
        <th>参照P</th>
      </tr>
    </thead>
  );
};

type State = [Skill | null, React.Dispatch<React.SetStateAction<Skill | null>>];

const SkillTr = ({ state }: { state: State }) => {
  const [value, setValue] = state;
  const handleChange = useCallback((inputValue) => setValue(inputValue), []);
  return (
    <tr>
      <td>
        <Select
          value={value}
          options={skillList}
          onChange={handleChange}
          styles={{
            container: containerStyleFn
          }}
        />
      </td>
      <td>{value?.cost ?? "ー"}</td>
      <td>{value?.page ?? "ー"}</td>
    </tr>
  );
};

export const Skills = ({ skills }: { skills: State[] }) => {
  return (
    <table style={{ fontSize: "small" }}>
      <Header />
      <tbody>
        <SkillTr state={skills[0]} />
        <SkillTr state={skills[1]} />
        <SkillTr state={skills[2]} />
      </tbody>
    </table>
  );
};
