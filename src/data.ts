import armWeapons from "./data/armWeapon.json";
import autoWeapons from "./data/autoWeapon.json";
import topsWeapons from "./data/topsWeapon.json";
import bottomsWeapons from "./data/bottomsWeapon.json";
import wingDrives from "./data/wingDrive.json";
import cores from "./data/core.json";
import skills from "./data/skill.json";
import updatePrograms from "./data/update.json";

const NanType = ["効果参照", "ー"];
type NumberOrEffect = number | "効果参照" | "ー";

type BaseType = {
  value: number;
  label: string;
  page: string;
  desc: string;
};

export type Weapon = {
  type: "A" | "R" | "P";
  power: NumberOrEffect;
  minRange: NumberOrEffect;
  maxRange: number;
  avoid: NumberOrEffect;
} & BaseType;

function convertInteger(node: Weapon): Weapon {
  const shouldNumber = (node: NumberOrEffect) =>
    NanType.every((e) => e !== node);

  const convert = (node: NumberOrEffect) =>
    shouldNumber(node) ? Number(node) : node;

  return {
    ...node,
    power: convert(node.power),
    minRange: convert(node.minRange)
  };
}

export const autoList: Weapon[] = autoWeapons
  .map((v, i) => ({ ...v, value: i }))
  // @ts-ignore
  .map(convertInteger);
export const armList: Weapon[] = armWeapons
  .map((v, i) => ({ ...v, value: i }))
  // @ts-ignore
  .map(convertInteger);
export const topsList: Weapon[] = topsWeapons
  .map((v, i) => ({ ...v, value: i }))
  // @ts-ignore
  .map(convertInteger);
export const bottomsList: Weapon[] = bottomsWeapons
  .map((v, i) => ({ ...v, value: i }))
  // @ts-ignore
  .map(convertInteger);

export type WingDrive = {
  timing: string;
} & BaseType;

// @ts-ignore
export const wingDriveList: WingDrive[] = [...wingDrives].map((v, i) => ({
  ...v,
  value: i
}));

export type PrincessCore = {
  hp: number;
  tp: number;
  ss: number;
  move: number;
  special: string;
  variation: number;
} & BaseType;

// @ts-ignore
export const princessCoreList: PrincessCore[] = [...cores].map((v, i) => ({
  ...v,
  value: i
}));

export type Skill = {
  cost: number;
} & BaseType;

// @ts-ignore
export const skillList: Skill[] = [...skills].map((v, i) => ({
  ...v,
  value: i
}));

export type UpdateProgram = {
  cost: number;
  name:
    | "changeSkill"
    | "powerUp"
    | "extend"
    | "radicalization"
    | "paint"
    | "unite"
    | "rayConstruction"
    | "addVariation"
    | "exploit";
} & BaseType;

// @ts-ignore
export const updateList: UpdateProgram[] = [...updatePrograms].map((v, i) => ({
  ...v,
  value: i
}));
