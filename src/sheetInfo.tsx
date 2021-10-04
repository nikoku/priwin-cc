import React from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { MyPaper } from "./paper";

const TextBox = ({
  value,
  setValue,
  label,
  multiline = false,
  minWidth = ""
}: {
  value: string;
  setValue: any;
  label: string;
  multiline?: boolean;
  minWidth?: string;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <Paper
      style={{
        width: "max-content",
        background: "#fff"
      }}
    >
      <TextField
        size="small"
        value={value}
        onChange={handleChange}
        label={label}
        multiline={multiline}
        style={{ minWidth, paddingLeft: "0.2em" }}
      />
    </Paper>
  );
};

const ReadOnlyTextBox = ({
  value,
  label,
  multiline = false,
  width = ""
}: {
  value: string;
  label: string;
  multiline?: boolean;
  width?: string;
}) => {
  return (
    <Paper
      style={{
        width: "max-content",
        background: "#fff"
      }}
    >
      <TextField
        size="small"
        value={value}
        label={label}
        multiline={multiline}
        style={{ width, paddingLeft: "0.2em" }}
        InputProps={{
          readOnly: true
        }}
      />
    </Paper>
  );
};

export const SheetInfo = ({
  pcState,
  plState,
  memoState,
  exp
}: {
  pcState: [string, any];
  plState: [string, any];
  memoState: [string, any];
  exp: number;
}) => {
  return (
    <MyPaper>
      <Box p={0.1}>
        <Typography style={{ color: "#fff" }}>シート情報</Typography>
        <Grid container direction="column" spacing={1}>
          <Grid item container spacing={1}>
            <Grid item>
              <TextBox
                label="キャラクター名"
                value={pcState[0]}
                setValue={pcState[1]}
              />
            </Grid>
            <Grid item>
              <TextBox
                label="プレイヤー名"
                value={plState[0]}
                setValue={plState[1]}
              />
            </Grid>
            <Grid item>
              <ReadOnlyTextBox
                label="必要経験点"
                value={String(exp)}
                width="5em"
              />
            </Grid>
          </Grid>
          <Grid item>
            <TextBox
              label="メモ(改行可)"
              multiline={true}
              value={memoState[0]}
              setValue={memoState[1]}
              minWidth="30.8em"
            />
          </Grid>
        </Grid>
      </Box>
    </MyPaper>
  );
};
