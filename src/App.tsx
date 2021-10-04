import Grid from "@material-ui/core/Grid";
import "./styles.css";
import { Skills } from "./skills";
import { PrincessCores } from "./cores";
import { WingDrives } from "./wingDrives";
import { Weapons, VariationPanel } from "./weapons";
import { Memory } from "./memory";
import { SheetInfo } from "./sheetInfo";
import { StorageProvider } from "./storage";

export default function App() {
  return (
    <div className="App" style={{ textAlign: "left" }}>
      <StorageProvider loadingNode={<div>Loading...</div>}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <h2>プリンセスウイング　キャラクターシート</h2>
          </Grid>
          <Grid item container spacing={1}>
            <Memory />
          </Grid>
          <Grid item>
            <SheetInfo />
          </Grid>
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
      </StorageProvider>
    </div>
  );
}
