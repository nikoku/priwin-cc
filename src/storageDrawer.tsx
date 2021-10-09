import { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { MyPaper } from "./paper";
import { getKey, deleteDBData } from "./memory";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper
    }
  })
);

const visibility = (cond: boolean): { visibility: "visible" | "hidden" } => ({
  visibility: cond ? "visible" : "hidden"
});

const baseUrl = window.location.href.split("?")[0];
const DrawerList = () => {
  const classes = useStyles();
  const [, render] = useState("");
  const thisKey = getKey();
  return (
    <div className={classes.root}>
      <List dense={true} disablePadding={true}>
        {Object.entries(localStorage)
          .map(([k, v]) => {
            let name = null;
            try {
              name = JSON.parse(v).pcName;
            } catch (_) {}
            return [k, name];
          })
          .filter(([_, value]) => value != null)
          .map(([key, name]) => {
            const label = "キャラクター名:" + name;
            return key !== thisKey ? (
              <ListItem
                button
                key={name}
                component="a"
                href={baseUrl + "?key=" + key}
              >
                <ListItemText primary={label} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      (async () => {
                        await deleteDBData(key);
                        localStorage.removeItem(key);
                        render(key);
                      })();
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ) : (
              <ListItem button key={name}>
                <ListItemText primary={label} />
              </ListItem>
            );
          })}
      </List>
    </div>
  );
};

type Event = React.KeyboardEvent | React.MouseEvent;
const checkKeyEvent = (event: Event) =>
  event.type === "keydown" &&
  ((event as React.KeyboardEvent).key === "Tab" ||
    (event as React.KeyboardEvent).key === "Shift");

export const StorageList = () => {
  const [state, setState] = useState(false);
  const toggleDrawer = (open: boolean) => (event: Event) => {
    if (checkKeyEvent(event)) return;
    setState(open);
  };

  return (
    <>
      <Button onClick={toggleDrawer(true)} variant="contained" size="small">
        自作シート一覧
      </Button>
      <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
        <Box p={0.5}>
          <MyPaper>
            <Typography style={{ color: "#fff", paddingRight: "2em" }}>
              ローカルに保存されたシート
            </Typography>
            <DrawerList />
          </MyPaper>
        </Box>
      </Drawer>
    </>
  );
};
