import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { MyPaper } from "./paper";
import {
  hobbyList,
  subjectList,
  committeeList,
  clubList,
  arbeitList,
  foodList,
  dreamList,
  motivationList,
  troubleList,
  memoryList
} from "./data/lifeTagData";
import { useStorageContext } from "./storage";
import { range } from "./util";

const list = [
  { value: hobbyList, label: "①趣味" },
  { value: hobbyList, label: "②特技" },
  { value: hobbyList, label: "③熱中しているもの" },
  { value: subjectList, label: "④得意科目" },
  { value: subjectList, label: "⑤苦手科目" },
  { value: committeeList, label: "⑥委員会" },
  { value: clubList, label: "⑦部活" },
  { value: arbeitList, label: "⑧アルバイト" },
  { value: foodList, label: "⑨好きな食べ物" },
  { value: dreamList, label: "⑩将来の夢" },
  { value: motivationList, label: "⑪志望動機" },
  { value: troubleList, label: "⑫悩み事" },
  { value: memoryList, label: "⑬思い出" }
];

const Tag = ({ index }: { index: number }) => {
  const { lifeTags } = useStorageContext();
  const { value, label } = list[index - 1];

  const handleChange = (_: React.ChangeEvent<{}>, newValue: string | null) => {
    const temp = [...lifeTags[0]];
    temp[index - 1] = newValue ?? "";
    lifeTags[1](temp);
  };

  return (
    <Autocomplete
      size="small"
      value={lifeTags[0][index - 1]}
      onChange={handleChange}
      freeSolo
      options={value}
      renderInput={(params) => (
        <Paper style={{ background: "#fff" }}>
          <TextField {...params} label={label} />
        </Paper>
      )}
    />
  );
};

export const LifeTags = () => {
  return (
    <MyPaper>
      <Box p={0.1}>
        <Typography style={{ color: "#fff" }}>
          ライフタグ(選択 or 自由入力)
        </Typography>
        <Grid container spacing={1}>
          <Grid item container direction="column" xs={6} spacing={1}>
            {range(1, 5).map((index) => {
              return (
                <Grid item>
                  <Tag index={index} />
                </Grid>
              );
            })}
          </Grid>
          <Grid item container direction="column" xs={6} spacing={1}>
            {range(6, 10).map((index) => {
              return (
                <Grid item>
                  <Tag index={index} />
                </Grid>
              );
            })}
          </Grid>
          <Grid item container direction="column" xs={12} spacing={1}>
            {range(11, 13).map((index) => {
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
