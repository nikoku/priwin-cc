import armWeapons from "./data/armWeapon.json";
import autoWeapons from "./data/autoWeapon.json";
import topsWeapons from "./data/topsWeapon.json";
import bottomsWeapons from "./data/bottomsWeapon.json";
import wingDrives from "./data/wingDrive.json";
import cores from "./data/core.json";
import skills from "./data/skill.json";
import updatePrograms from "./data/update.json";

type NumberOrEffect = number | "効果参照" | "ー";

export type Weapon = {
  value: number;
  label: string;
  type: "A" | "R" | "P";
  power: NumberOrEffect;
  minRange: NumberOrEffect;
  maxRange: number;
  avoid: NumberOrEffect;
  page: string;
  desc: string;
};

function convertInteger(list: Weapon[]): Weapon[] {
  const convert = (node: NumberOrEffect) =>
    typeof node === "number" ? Number(node) : node;

  return [...list].map((node) => ({
    ...node,
    power: convert(node.power)
  }));
}

// @ts-ignore
export const autoList: Weapon[] = convertInteger(autoWeapons);
// @ts-ignore
export const armList: Weapon[] = convertInteger(armWeapons);
// @ts-ignore
export const topsList: Weapon[] = convertInteger(topsWeapons);
// @ts-ignore
export const bottomsList: Weapon[] = convertInteger(bottomsWeapons);

export type WingDrive = {
  value: number;
  label: string;
  timing: string;
  page: string;
  desc: string;
};

// @ts-ignore
export const wingDriveList: WingDrive[] = wingDrives;

export type PrincessCore = {
  value: number;
  label: string;
  hp: number;
  tp: number;
  ss: number;
  move: number;
  special: string;
  variation: number;
  page: string;
  desc: string;
};

// @ts-ignore
export const princessCoreList: PrincessCore[] = cores;

export type Skill = {
  value: number;
  label: string;
  cost: number;
  page: string;
  desc: string;
};

// @ts-ignore
export const skillList: Skill[] = skills;

export type UpdateProgram = {
  label: string;
  cost: number;
  desc: string;
  page: string;
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
};

// @ts-ignore
export const updateList: UpdateProgram[] = updatePrograms;
