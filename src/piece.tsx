import Button from "@material-ui/core/Button";
import { useStorageData } from "./storage";
import { princessCoreList, wingDriveList, skillList } from "./data";
import { Weapon, autoList, armList, topsList, bottomsList } from "./data";
import { useGetPower, useGetRange, useGetAvoid } from "./weapons";
import { useStorageContext } from "./storage";
import { range } from "./util";

const useCreateSkillLines = () => {
  const { skills, additionalSkills } = useStorageData();
  return skills
    .concat(additionalSkills)
    .filter((i) => i > -1)
    .map((i) => {
      const { label, cost } = skillList[i];
      return `:TP-${cost} ${label}`;
    });
};

const useCreateWeaponLine = (
  weapons: [number, React.Dispatch<React.SetStateAction<number>>][],
  list: Weapon[],
  weapon: number,
  index: number
) => {
  const cell = list[weapon] ?? {};
  const { label, type, page } = cell;
  const suit = ["ー", "ー", "♠", "♣", "♡", "◇"][index];
  const power = useGetPower(weapons, cell);
  const range = useGetRange(weapons, index, cell);
  const avoid = useGetAvoid(weapons, index, cell);

  return `${label}/${suit}/${type}/${power}/${range}/${avoid}/${page}`;
};

const useCreateWeaponLines = (
  weapons: [number, React.Dispatch<React.SetStateAction<number>>][]
) => {
  return [
    useCreateWeaponLine(weapons, autoList, 0, 0),
    useCreateWeaponLine(weapons, autoList, 1, 1),
    useCreateWeaponLine(weapons, armList, weapons[0][0], 2),
    useCreateWeaponLine(weapons, armList, weapons[1][0], 3),
    useCreateWeaponLine(weapons, topsList, weapons[2][0], 4),
    useCreateWeaponLine(weapons, bottomsList, weapons[3][0], 5)
  ];
};

const useCreateCommand = () => {
  const {
    weapons,
    variations1,
    variations2,
    variations3
  } = useStorageContext();
  const skillLines = useCreateSkillLines();
  const weaponLines = useCreateWeaponLines(weapons);
  const variations1Lines = useCreateWeaponLines(variations1);
  const variations2Lines = useCreateWeaponLines(variations2);
  const variations3Lines = useCreateWeaponLines(variations3);
  const variationLines = [variations1Lines, variations2Lines, variations3Lines];
  const { princessCore } = useStorageContext();
  const variationMax = princessCoreList[princessCore[0]]?.variation ?? 0;

  return (
    `// 特技
${skillLines.join("\n")}

// 武装
${weaponLines.join("\n")}` +
    range(1, variationMax).map((i) => {
      const index = ["①", "②", "③"][i - 1];
      const lines = variationLines[i - 1].map((line) => `v${i} ${line}`);
      return `

// バリエーション${index}
${lines.join("\n")}`;
    })
  );
};

const useCreateJson = () => {
  const { pcName, plName, memo, core, update, wingDrive } = useStorageData();
  const coreData = princessCoreList[core] ?? { hp: 0, tp: 0, ss: 0, label: "" };
  const wingData = wingDriveList[wingDrive] ?? { label: "" };

  const hp = coreData.hp + update.extend * 10;
  const tp = coreData.tp + update.extend * 5;
  const ss = coreData.ss + update.radicalization * 2;

  const piece = {
    kind: "character",
    data: {
      name: pcName,
      playerName: plName,
      memo,
      initiative: ss,
      externalUrl: window.location.href,
      status: [
        {
          label: "HP",
          value: hp,
          max: hp
        },
        {
          label: "TP",
          value: tp,
          max: tp
        },
        {
          label: "手札",
          value: 7,
          max: 10
        },
        {
          label: "特殊機能",
          value: 1,
          max: 1
        },
        {
          label: "WD",
          value: 1,
          max: 1
        }
      ],
      params: [
        { label: "SS値", value: ss },
        { label: "プリンセスコア", value: coreData.label },
        { label: "ウイングドライブ", value: wingData.label }
      ],
      face: [],
      x: 0,
      y: 0,
      z: 0,
      angle: 0,
      width: 4,
      height: 4,
      active: true,
      secret: false,
      invisible: false,
      hideStatus: false,
      color: "",
      roomId: null,
      commands: useCreateCommand(),
      speaking: true
    }
  };

  return JSON.stringify(piece);
};

const onClick = (json: string) => () => {
  if (!navigator.clipboard) {
    alert("エラー1");
    return;
  }
  navigator.clipboard
    .writeText(json)
    .then(() => alert("取得完了"))
    .catch(() => alert("エラー2"));
};

export const GetPiece = () => {
  const json = useCreateJson();
  return (
    <>
      <Button onClick={onClick(json)} variant="contained" size="small">
        コマ生成(ココフォリア用)
      </Button>
    </>
  );
};
