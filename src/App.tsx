import Grid from "@material-ui/core/Grid";
import "./styles.css";
import { Skills } from "./skills";
import { PrincessCores } from "./cores";
import { WingDrives } from "./wingDrives";
import { Weapons, VariationPanel } from "./weapons";
import { Memory } from "./memory";
import { SheetInfo } from "./sheetInfo";
import { LifeTags } from "./lifetag";
import { StorageProvider } from "./storage";

export default function App() {
  return (
    <div className="App" style={{ textAlign: "left" }}>
      <StorageProvider loadingNode={<div>Loading...</div>}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <h2>プリンセスウイング　キャラクターシート</h2>
          </Grid>
          <Grid item container xs={12} spacing={1}>
            <Memory />
          </Grid>
          <Grid item xs={12}>
            <SheetInfo />
          </Grid>
          <Grid item container direction="column" xs={5} spacing={1}>
            <Grid item>
              <LifeTags />
            </Grid>
          </Grid>
          <Grid item container direction="column" xs={7} spacing={1}>
            <Grid item>
              <Skills />
            </Grid>
            <Grid item>
              <PrincessCores />
            </Grid>
            <Grid item>
              <WingDrives />
            </Grid>
            <Grid item>
              <Weapons />
            </Grid>
            <VariationPanel />
          </Grid>
        </Grid>
      </StorageProvider>
    </div>
  );
}
