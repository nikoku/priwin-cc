import { ReactNode } from "react";
import Paper from "@material-ui/core/Paper";
import { blueGrey } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";

export const MyPaper = ({ children }: { children: ReactNode }) => (
  <Paper
    style={{
      width: "max-content",
      background: blueGrey[400]
    }}
  >
    <Box p={0.5}>{children}</Box>
  </Paper>
);
