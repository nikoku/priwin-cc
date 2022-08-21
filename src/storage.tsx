import { ReactNode, createContext, useState, useContext } from "react";
import { getKey, subscribeData } from "./memory";

const getJson = async (key: string) => {
  let result = localStorage.getItem(key);
  if (result === null) {
    result = await subscribeData(key);
  }
  return result;
};

const useStorage = () => {
  const skills = [useState(-1), useState(-1), useState(-1)];
  const princessCore = useState(-1);
  const wingDrive = useState(-1);
  const weapons = [useState(-1), useState(-1), useState(-1), useState(-1)];
  const variations1 = [useState(-1), useState(-1), useState(-1), useState(-1)];
  const variations2 = [useState(-1), useState(-1), useState(-1), useState(-1)];
  const variations3 = [useState(-1), useState(-1), useState(-1), useState(-1)];
  const pcName = useState("");
  const plName = useState("");
  const memo = useState("");
  const update = useState({
    changeSkill: 0,
    powerUp: 0,
    extend: 0,
    radicalization: 0,
    paint: 0,
    unite: 0,
    rayConstruction: 0,
    addVariation: 0,
    exploit: 0,
    homing: 0,
    repair: 0,
    summon: 0
  });
  const lifeTags = useState<string[]>(Array(13).fill(""));
  const personalFlavors = useState<string[]>(Array(6).fill(""));
  const additionalSkills = useState<number[]>([]);

  const [first, setFirst] = useState(true);
  const [end, setEnd] = useState(false);
  if (first) {
    setFirst(false);
    const func = async () => {
      const key = getKey();
      if (key === null) {
        return;
      }
      const json = await getJson(key);
      if (json === null) {
        window.location.search = "";
        return;
      }

      const data = JSON.parse(json);
      document.title = `${data["pcName"]} － プリンセスウイング キャラクターシート`;

      skills.forEach((v, i) => v[1](data["skills"][i] ?? -1));
      princessCore[1](data["core"] ?? -1);
      wingDrive[1](data["wingDrive"]);
      weapons.forEach((v, i) => v[1](data["weapons"][i]));
      variations1.forEach((v, i) => v[1](data["variations1"][i]));
      variations2.forEach((v, i) => v[1](data["variations2"][i]));
      variations3.forEach((v, i) => v[1](data["variations3"][i]));
      pcName[1](data["pcName"]);
      plName[1](data["plName"]);
      memo[1](data["memo"]);
      update[1]({ ...update[0], ...data["update"] });
      lifeTags[1](
        lifeTags[0].map((v, i) =>
          data["lifeTags"]?.[i] ? data["lifeTags"][i] : v
        )
      );
      personalFlavors[1](
        personalFlavors[0].map((v, i) =>
          data["personalFlavors"]?.[i] ? data["personalFlavors"][i] : v
        )
      );
      additionalSkills[1](
        [...(data["additionalSkills"] ?? [])].map((v, i) =>
          data["additionalSkills"]?.[i] ? data["additionalSkills"][i] : v
        )
      );
    };
    func().then(() => setEnd(true));
  }

  const value = {
    pcName,
    plName,
    skills,
    princessCore,
    wingDrive,
    weapons,
    variations1,
    variations2,
    variations3,
    memo,
    update,
    lifeTags,
    personalFlavors,
    additionalSkills
  };
  return {
    value,
    end
  };
};

type Storage = ReturnType<typeof useStorage>["value"];
const temp: any = {};
const StorageContext = createContext<Storage>(temp);

export const useStorageContext = () => {
  return useContext(StorageContext);
};

export const StorageProvider = ({
  children,
  loadingNode
}: {
  children: ReactNode;
  loadingNode: ReactNode;
}) => {
  const { value, end } = useStorage();
  return end ? (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  ) : (
    <>{loadingNode}</>
  );
};

export const useStorageData = () => {
  const {
    pcName,
    plName,
    skills,
    princessCore,
    wingDrive,
    weapons,
    variations1,
    variations2,
    variations3,
    memo,
    update,
    lifeTags,
    personalFlavors,
    additionalSkills
  } = useStorageContext();

  return {
    pcName: pcName[0],
    plName: plName[0],
    skills: skills.map((n) => n[0]),
    core: princessCore[0],
    wingDrive: wingDrive[0],
    weapons: weapons.map((n) => n[0]),
    variations1: variations1.map((n) => n[0]),
    variations2: variations2.map((n) => n[0]),
    variations3: variations3.map((n) => n[0]),
    memo: memo[0],
    update: update[0],
    lifeTags: lifeTags[0],
    personalFlavors: personalFlavors[0],
    additionalSkills: additionalSkills[0]
  };
};
