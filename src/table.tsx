import { ReactNode } from "react";
import { Table, TableContainer, Paper, Typography } from "@material-ui/core";
import { MyPaper } from "./paper";

export const MyTableWithoutPaper = ({
  children,
  title
}: {
  children: ReactNode;
  title: string;
}) => (
  <>
    <Typography style={{ color: "#fff" }}>{title}</Typography>
    <TableContainer
      component={Paper}
      style={
        {
          // width: "max-content"
        }
      }
    >
      <Table size="small" aria-label="a dense table">
        {children}
      </Table>
    </TableContainer>
  </>
);

export const MyTable = ({
  children,
  title
}: {
  children: ReactNode;
  title: string;
}) => (
  <MyPaper>
    <MyTableWithoutPaper title={title}>{children}</MyTableWithoutPaper>
  </MyPaper>
);
