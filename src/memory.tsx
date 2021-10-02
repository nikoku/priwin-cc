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
const deleteDBData = () =>
  fetch(gasUrl + "?method=delete", {
    method: "POST",
    headers: postHeaders,
    body: `id=${getKey()}`
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
    .then((data) => data[0]["json"]);

const Save = ({
  data,
  style
}: {
  data: object;
  style: React.CSSProperties;
}) => {
  const saveData = () => {
    const json = JSON.stringify(data);
    const key =
      new URLSearchParams(window.location.search).get("key") ?? UUID.generate();
    localStorage.setItem(key, json);
    const params = new URLSearchParams({ key: key });
    window.location.search = params.toString();
  };

  return (
    <button onClick={saveData} style={style}>
      保存
    </button>
  );
};

const Copy = ({
  data,
  style
}: {
  data: object;
  style: React.CSSProperties;
}) => {
  const copyData = () => {
    const json = JSON.stringify(data);
    const key = UUID.generate();
    localStorage.setItem(key, json);
    const params = new URLSearchParams({ key: key });
    window.location.search = params.toString();
  };

  return (
    <button onClick={copyData} style={style}>
      コピー
    </button>
  );
};

const Publish = ({
  data,
  style
}: {
  data: object;
  style: React.CSSProperties;
}) => {
  const publishData = () => {
    const func = async () => {
      await deleteDBData();
      await pushData(data);
      alert("公開しました");
    };
    func();
  };

  return (
    <button onClick={publishData} style={style}>
      公開
    </button>
  );
};

const Delete = ({ style }: { style: React.CSSProperties }) => {
  const deleteData = () => {
    const func = async () => {
      const key = getKey();
      if (key === null) {
        return;
      }

      await deleteDBData();
      localStorage.removeItem(key);
      window.location.search = "";
    };
    func();
  };

  return (
    <button onClick={deleteData} style={style}>
      削除
    </button>
  );
};

export const Memory = ({ data }: { data: object }) => {
  const key = getKey();
  const hasKey = key !== null;
  const hasLocal = localStorage.getItem(key ?? "") !== null;
  const visibility = (cond: boolean): { visibility: "visible" | "hidden" } => ({
    visibility: cond ? "visible" : "hidden"
  });

  return (
    <div>
      <Save data={data} style={visibility(!hasKey || hasLocal)} />
      <Copy data={data} style={visibility(hasKey)} />
      <Publish data={data} style={visibility(hasLocal)} />
      <Delete style={visibility(hasLocal)} />
    </div>
  );
};

const getData = () => {
  const key = getKey();
  if (key === null) {
    return;
  }
  const json = localStorage.getItem(key);
  if (json === null) {
    window.location.search = "";
    return;
  }

  return JSON.parse(json);
};
export const load = () => {
  const data = getData();
};
