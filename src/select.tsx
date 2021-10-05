import { useCallback } from "react";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

type SelectProps = {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  list: { value: number; label: string }[];
};
export const Select = ({ value, setValue, list }: SelectProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      return setValue(Number(event.target.value));
    },
    []
  );
  return (
    <FormControl>
      <NativeSelect
        value={value ?? -1}
        onChange={handleChange}
        name="index"
        inputProps={{ "aria-label": "index" }}
        style={{ width: "17em" }}
      >
        <option value={-1}></option>
        {list.map(({ value, label }) => (
          <option value={value}>{label}</option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

type GroupList = {
  groupList: { label: string; cond: (node: any) => boolean }[];
};

export const GroupSelect = ({
  value,
  setValue,
  list,
  groupList
}: SelectProps & GroupList) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      return setValue(Number(event.target.value));
    },
    []
  );
  return (
    <FormControl>
      <NativeSelect
        value={value ?? -1}
        onChange={handleChange}
        name="index"
        inputProps={{ "aria-label": "index" }}
        style={{ width: "17em" }}
      >
        <option value={-1} key="default"></option>
        {groupList.map(({ label, cond }) => {
          const group = list.filter(cond);
          return (
            <optgroup label={label} key={label}>
              {group.map(({ value, label }) => (
                <option value={value} key={label}>
                  {label}
                </option>
              ))}
            </optgroup>
          );
        })}
      </NativeSelect>
    </FormControl>
  );
};
