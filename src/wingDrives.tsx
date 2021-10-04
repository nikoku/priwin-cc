import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { MyTable } from "./table";
import { Select } from "./select";
import { wingDriveList } from "./data";

const Header = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ドライブ名</TableCell>
        <TableCell align="center" style={{ width: "21em" }}>
          タイミング
        </TableCell>
        <TableCell align="center">参照P</TableCell>
      </TableRow>
    </TableHead>
  );
};

type State = [number, React.Dispatch<React.SetStateAction<number>>];

export const WingDrives = ({ wingDrives }: { wingDrives: State }) => {
  const [value, setValue] = wingDrives;
  const cell = wingDriveList[value ?? -1];
  return (
    <MyTable title="ウイングドライブ">
      <Header />
      <TableBody>
        <TableRow key={0}>
          <TableCell>
            <Select value={value} setValue={setValue} list={wingDriveList} />
          </TableCell>
          <TableCell align="center">{cell?.timing ?? "ー"}</TableCell>
          <TableCell align="center">{cell?.page ?? "ー"}</TableCell>
        </TableRow>
      </TableBody>
    </MyTable>
  );
};
