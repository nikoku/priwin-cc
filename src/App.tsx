import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import "./styles.css";
import { Skills } from "./skills";
import { PrincessCores } from "./cores";
import { WingDrives } from "./wingDrives";
import { Variations, Weapons } from "./weapons";
import { princessCoreList, updateList } from "./data";
import { getKey, Memory, subscribeData } from "./memory";
import { SheetInfo } from "./sheetInfo";

export default function App() {
  const skillValues = [useState(-1), useState(-1), useState(-1)];
  const princessCoreValue = useState(-1);
  const wingDriveValue = useState(-1);
  const weaponValues = [useState(-1), useState(-1), useState(-1), useState(-1)];
  const variation1Values = [
    useState(-1),
    useState(-1),
    useState(-1),
    useState(-1)
  ];
  const variation2Values = [
    useState(-1),
    useState(-1),
    useState(-1),
    useState(-1)
  ];
  const variation3Values = [
    useState(-1),
    useState(-1),
    useState(-1),
    useState(-1)
  ];
  const [pcName, setPcName] = useState("");
  const [plName, setPlName] = useState("");
  const [memo, setMemo] = useState("");
  const [updateState, setUpdateState] = useState({
    changeSkill: 0,
    powerUp: 0,
    extend: 0,
    radicalization: 0,
    paint: 0,
    unite: 0,
    rayConstruction: 0,
    addVariation: 0,
    exploit: 0
  });

  const dataState = {
    pcName: pcName,
    plName: plName,
    skills: skillValues.map((n) => n[0]),
    core: princessCoreValue[0],
    wingDrive: wingDriveValue[0],
    weapons: weaponValues.map((n) => n[0]),
    variations1: variation1Values.map((n) => n[0]),
    variations2: variation2Values.map((n) => n[0]),
    variations3: variation3Values.map((n) => n[0]),
    memo: memo,
    update: updateState
  };

  const [first, setFirst] = useState(true);
  if (first) {
    setFirst(false);
    const func = async () => {
      const key = getKey();
      if (key === null) {
        return;
      }
      const json = localStorage.getItem(key) ?? (await subscribeData(key));
      if (json === null) {
        window.location.search = "";
        return;
      }

      const data = JSON.parse(json);
      document.title = `${data["pcName"]} － プリンセスウイング キャラクターシート`;

      skillValues.forEach((v, i) => v[1](data["skills"][i] ?? -1));
      princessCoreValue[1](data["core"] ?? -1);
      wingDriveValue[1](data["wingDrive"]);
      weaponValues.forEach((v, i) => v[1](data["weapons"][i]));
      variation1Values.forEach((v, i) => v[1](data["variations1"][i]));
      variation2Values.forEach((v, i) => v[1](data["variations2"][i]));
      variation3Values.forEach((v, i) => v[1](data["variations3"][i]));
      setPcName(data["pcName"]);
      setPlName(data["plName"]);
      setMemo(data["memo"]);
      setUpdateState({ ...updateState, ...data["update"] });
    };
    func();
  }

  const variationCount = princessCoreList[princessCoreValue[0]]?.variation ?? 0;
  const getDisplayVariation = (variationIndex: number) =>
    variationCount >= variationIndex ? {} : { display: "none" };

  const requiredExp = updateList
    .map((update) => updateState[update.name] * update.cost)
    .reduce((a, x) => a + x);

  return (
    <div className="App" style={{ textAlign: "left" }}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <h2>プリンセスウイング　キャラクターシート</h2>
        </Grid>
        <Grid item container spacing={1}>
          <Memory data={dataState} />
        </Grid>
        <Grid item>
          <SheetInfo
            pcState={[pcName, setPcName]}
            plState={[plName, setPlName]}
            memoState={[memo, setMemo]}
            exp={requiredExp}
          />
        </Grid>
        <Grid item>
          <Skills skills={skillValues} />
        </Grid>
        <Grid item>
          <PrincessCores
            cores={princessCoreValue}
            updateState={[updateState, setUpdateState]}
          />
        </Grid>
        <Grid item>
          <WingDrives wingDrives={wingDriveValue} />
        </Grid>
        <Grid item>
          <Weapons weapons={weaponValues} />
        </Grid>
        <Grid item style={getDisplayVariation(1)}>
          <Variations index={1} weapons={variation1Values} />
        </Grid>
        <Grid item style={getDisplayVariation(2)}>
          <Variations index={2} weapons={variation2Values} />
        </Grid>
        <Grid item style={getDisplayVariation(3)}>
          <Variations index={3} weapons={variation3Values} />
        </Grid>
      </Grid>
    </div>
  );
}
