import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { MyTable } from "./table";
import { Select } from "./select";
import { wingDriveList } from "./data";
import { useStorageContext } from "./storage";

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

export const WingDrives = () => {
  const { wingDrive } = useStorageContext();
  const cell = wingDriveList[wingDrive[0] ?? -1];
  return (
    <MyTable title="ウイングドライブ">
      <Header />
      <TableBody>
        <TableRow key={0}>
          <TableCell>
            <Select
              value={wingDrive[0]}
              setValue={wingDrive[1]}
              list={wingDriveList}
            />
          </TableCell>
          <TableCell align="center">{cell?.timing ?? "ー"}</TableCell>
          <TableCell align="center">{cell?.page ?? "ー"}</TableCell>
        </TableRow>
      </TableBody>
    </MyTable>
  );
};
