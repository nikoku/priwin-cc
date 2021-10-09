import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useStorageData } from "./storage";
import { StorageList } from "./storageDrawer";

import UUID from "uuidjs";

const gasUrl =
  "https://script.google.com/macros/s/AKfycbx4XX2hHGcxOExvPREuARdqhvx6sE6xmmxYw3FzN5OVgR-IbcQ-3J4QoAFgu0t4xfMU5w/exec";

export const getKey = () => {
  if (window.location.search === "") {
    return null;
  }
  const search = new URLSearchParams(window.location.search);
  const key = search.get("key") ?? "";
  return key;
};

const postHeaders = {
  Accept: "application/json, text/javascript, */*; q=0.01",
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
};
export const deleteDBData = (key: string) =>
  fetch(gasUrl + "?method=delete", {
    method: "POST",
    headers: postHeaders,
    body: `id=${key}`
  }).catch((resp) => console.log(resp));

const pushData = (data: object) =>
  fetch(gasUrl, {
    method: "POST",
    headers: postHeaders,
    body: `id=${getKey()}&json=${encodeURIComponent(JSON.stringify(data))}`
  }).catch((resp) => console.log(resp));

export const subscribeData = (id: string) =>
  fetch(gasUrl + `?q=${id}`, { method: "GET" })
    .then((response) => response.json())
    .then((data) => data[0]["json"])
    .catch(() => null);

const Save = ({ style }: { style: React.CSSProperties }) => {
  const data = useStorageData();
  const saveData = () => {
    const json = JSON.stringify(data);
    const key =
      new URLSearchParams(window.location.search).get("key") ?? UUID.generate();
    localStorage.setItem(key, json);
    const params = new URLSearchParams({ key: key });
    window.location.search = params.toString();
  };

  return (
    <Button
      variant="contained"
      size="small"
      startIcon={<SaveIcon />}
      onClick={saveData}
      style={style}
    >
      保存
    </Button>
  );
};

const Copy = ({ style }: { style: React.CSSProperties }) => {
  const data = useStorageData();
  const copyData = () => {
    const json = JSON.stringify(data);
    const key = UUID.generate();
    localStorage.setItem(key, json);
    const params = new URLSearchParams({ key: key });
    window.location.search = params.toString();
  };

  return (
    <Button
      variant="contained"
      size="small"
      startIcon={<SaveIcon />}
      onClick={copyData}
      style={style}
    >
      コピー
    </Button>
  );
};

const Publish = ({ style }: { style: React.CSSProperties }) => {
  const data = useStorageData();
  const publishData = () => {
    const func = async () => {
      const key = getKey();
      if (key === null) return;
      await deleteDBData(key);
      await pushData(data);
      alert("公開しました");
    };
    func();
  };

  return (
    <Button
      variant="contained"
      size="small"
      startIcon={<CloudUploadIcon />}
      onClick={publishData}
      style={style}
    >
      公開
    </Button>
  );
};

const Delete = ({ style }: { style: React.CSSProperties }) => {
  const deleteData = () => {
    const func = async () => {
      const key = getKey();
      if (key === null) {
        return;
      }

      await deleteDBData(key);
      localStorage.removeItem(key);
      window.location.search = "";
    };
    func();
  };

  return (
    <Button
      variant="contained"
      size="small"
      startIcon={<DeleteIcon />}
      onClick={deleteData}
      style={style}
    >
      削除
    </Button>
  );
};

export const Memory = () => {
  const key = getKey();
  const hasKey = key !== null;
  const hasLocal = localStorage.getItem(key ?? "") !== null;
  const visibility = (cond: boolean): { visibility: "visible" | "hidden" } => ({
    visibility: cond ? "visible" : "hidden"
  });

  return (
    <>
      <Grid item>
        <Save style={visibility(!hasKey || hasLocal)} />
      </Grid>
      <Grid item>
        <Copy style={visibility(hasKey)} />
      </Grid>
      <Grid item>
        <Publish style={visibility(hasLocal)} />
      </Grid>
      <Grid item>
        <Delete style={visibility(hasLocal)} />
      </Grid>
      <Grid item>
        <StorageList />
      </Grid>
    </>
  );
};
