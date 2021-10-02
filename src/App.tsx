import { useEffect, useState } from "react";
import "./styles.css";
import { Skills } from "./skills";
import { PrincessCores } from "./cores";
import { WingDrives } from "./wingDrives";
import { Variations, Weapons } from "./weapons";
import { Skill, PrincessCore, Weapon, WingDrive } from "./data";
import { getKey, Memory, subscribeData } from "./memory";

import {
  skillList,
  princessCoreList,
  wingDriveList,
  armList,
  topsList,
  bottomsList
} from "./data";

export default function App() {
  const skillValues = [
    useState<Skill | null>(null),
    useState<Skill | null>(null),
    useState<Skill | null>(null)
  ];
  const princessCoreValue = useState<PrincessCore | null>(null);
  const wingDriveValue = useState<WingDrive | null>(null);
  const weaponValues = [
    useState<Weapon | null>(null),
    useState<Weapon | null>(null),
    useState<Weapon | null>(null),
    useState<Weapon | null>(null)
  ];
  const variation1Values = [
    useState<Weapon | null>(null),
    useState<Weapon | null>(null),
    useState<Weapon | null>(null),
    useState<Weapon | null>(null)
  ];
  const variation2Values = [
    useState<Weapon | null>(null),
    useState<Weapon | null>(null),
    useState<Weapon | null>(null),
    useState<Weapon | null>(null)
  ];
  const variation3Values = [
    useState<Weapon | null>(null),
    useState<Weapon | null>(null),
    useState<Weapon | null>(null),
    useState<Weapon | null>(null)
  ];
  const [pcName, setPcName] = useState("");
  const [plName, setPlName] = useState("");
  const [memo, setMemo] = useState("");

  const dataState = {
    pcName: pcName,
    plName: plName,
    skills: skillValues.map((n) => n[0]?.value),
    core: princessCoreValue[0]?.value,
    wingDrive: wingDriveValue[0]?.value,
    weapons: weaponValues.map((n) => n[0]?.value),
    variations1: variation1Values.map((n) => n[0]?.value),
    variations2: variation2Values.map((n) => n[0]?.value),
    variations3: variation3Values.map((n) => n[0]?.value),
    memo: memo
  };

  useEffect(() => {
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

      skillValues.forEach((v, i) => v[1](skillList[data["skills"][i]]));
      princessCoreValue[1](princessCoreList[data["core"]]);
      wingDriveValue[1](wingDriveList[data["wingDrive"]]);
      const weaponMatrix = [armList, armList, topsList, bottomsList];
      weaponValues.forEach((v, i) => v[1](weaponMatrix[i][data["weapons"][i]]));
      variation1Values.forEach((v, i) =>
        v[1](weaponMatrix[i][data["variations1"][i]])
      );
      variation2Values.forEach((v, i) =>
        v[1](weaponMatrix[i][data["variations2"][i]])
      );
      variation3Values.forEach((v, i) =>
        v[1](weaponMatrix[i][data["variations3"][i]])
      );
      setPcName(data["pcName"]);
      setPlName(data["plName"]);
      setMemo(data["memo"]);
    };
    func();
  }, []);

  const variationCount = princessCoreValue[0]?.variation ?? 0;
  const getDisplayVariation = (variationIndex: number) =>
    variationCount >= variationIndex ? {} : { display: "none" };

  return (
    <div className="App" style={{ textAlign: "left" }}>
      <h2>プリンセスウイング　キャラクターシート</h2>
      <Memory data={dataState} />
      PC名
      <textarea
        value={pcName}
        onChange={(e) => setPcName(e.target.value)}
        style={{ width: "10em" }}
      />
      PL名
      <textarea
        value={plName}
        onChange={(e) => setPlName(e.target.value)}
        style={{ width: "10em" }}
      />
      <br />
      <br />
      メモ
      <br />
      <textarea
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        style={{ width: "38em", height: "12ex" }}
      />
      <br />
      特技
      <Skills skills={skillValues} />
      プリンセスコア
      <PrincessCores cores={princessCoreValue} />
      ウイングドライブ
      <WingDrives wingDrives={wingDriveValue} />
      武装
      <Weapons weapons={weaponValues} />
      <br />
      <div style={getDisplayVariation(1)}>
        バリエーション①
        <Variations weapons={variation1Values} />
        <br />
      </div>
      <div style={getDisplayVariation(2)}>
        バリエーション②
        <Variations weapons={variation2Values} />
        <br />
      </div>
      <div style={getDisplayVariation(3)}>
        バリエーション③
        <Variations weapons={variation3Values} />
      </div>
    </div>
  );
}
