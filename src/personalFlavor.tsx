import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { MyPaper } from "./paper";
import { useStorageContext } from "./storage";

const range = (start: number, end: number) =>
  [...Array(end - start + 1)].map((_, i) => start + i);

const labels = [
  "プレシャスギアの形状",
  "アクセサリ",
  "髪型",
  "イメージカラー",
  "コネクション①",
  "コネクション②"
];

const Tag = ({ index }: { index: number }) => {
  const { personalFlavors } = useStorageContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const temp = [...personalFlavors[0]];
    temp[index - 1] = event.target.value ?? "";
    personalFlavors[1](temp);
  };

  return (
    <Paper style={{ background: "#fff" }}>
      <TextField
        size="small"
        value={personalFlavors[0][index - 1]}
        onChange={handleChange}
        label={labels[index - 1]}
        multiline={true}
        style={{ minWidth: "-webkit-fill-available" }}
      />
    </Paper>
  );
};

export const PersonalFlavors = () => {
  return (
    <MyPaper>
      <Box p={0.1}>
        <Typography style={{ color: "#fff" }}>
          パーソナルフレーバー(自由入力)
        </Typography>
        <Grid container spacing={1}>
          <Grid item container direction="column" xs={6} spacing={1}>
            {range(1, 3).map((index) => {
              return (
                <Grid item>
                  <Tag index={index} />
                </Grid>
              );
            })}
          </Grid>
          <Grid item container direction="column" xs={6} spacing={1}>
            {range(4, 6).map((index) => {
              return (
                <Grid item>
                  <Tag index={index} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Box>
    </MyPaper>
  );
};
