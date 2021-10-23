import axios from "axios";
import api_DNS from "./_dns";

const api_version = "/api/b1";

export const get_DNS = () => api_DNS;

const fetchProm = (api, method, bodyObj) => {
  return new Promise(async (resolve) => {
    try {
      if (!api) return resolve({ status: 400, message: "api 不能为空" });
      //   console.log(api, method, bodyObj);
      const api_server = api_DNS + api_version + api;
      const token = localStorage.getItem("accessToken");
      const fetchObj = {
        method,
        headers: {
          "content-type": "application/json",
          authorization: "Bear " + token,
        },
      };
      if (method === "GET" || method === "DELETE") {
      } else if (method === "POST" || method === "PUT") {
        fetchObj.body = JSON.stringify(bodyObj);
      } else {
        resolve({ status: 400, message: `[front] method Error` });
      }
      const resPromise = await fetch(api_server, fetchObj);
      const result = await resPromise.json();
      // console.log("result", result)
      return resolve(result);
    } catch (error) {
      console.log("fetchProm Error:", error);
      return resolve({ status: 500, message: `[front] fetchProm Error` });
    }
  });
};

export const fetch_Prom = (api, method = "GET", bodyObj) => {
  return new Promise(async (resolve) => {
    try {
      if (!api) return resolve({ status: 400, message: "api 不能为空" });
      method = method.toUpperCase();
      let result = await fetchProm(api, method, bodyObj);
      //unauthorized user
      if (result.status === 401) {
        const auth_res = await refreshToken_Prom();
        if (auth_res.status === 200) {
          result = await fetchProm(api, method, bodyObj);
        } else {
          result.status = auth_res.status;
          result.message = auth_res.message;
        }
      }
      // console.log(result)
      return resolve(result);
    } catch (e) {
      console.log(e);
      return resolve({
        status: 600,
        message: `[front] fetch_Prom Error: ${e}`,
      });
    }
  });
};

export const axiosProm = async (api, method, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!api) return resolve({ status: 400, message: "api 不能为空" });
      const api_server = api_DNS + api_version + api;
      const token = localStorage.getItem("accessToken");
      let result = null;
      if (method === "GET") {
        result = await axios.get(api_server, {
          headers: {
            "content-type": "application/json",
            authorization: "Bear " + token,
          },
        });
      } else if (method === "DELETE") {
        result = await axios.delete(api_server, {
          headers: {
            "content-type": "application/json",
            authorization: "Bear " + token,
          },
        });
      } else if (method === "POST") {
        result = await axios.post(api_server, formData, {
          headers: {
            "content-type": "application/json",
            authorization: "Bear " + token,
          },
        });
      } else if (method === "PUT") {
        result = await axios.put(api_server, formData, {
          headers: {
            "content-type": "application/json",
            authorization: "accessToken " + token,
          },
        });
      }
      if (!result)
        return resolve({ status: 600, message: "[front] axios parames error" });
      // console.log(result)
      return resolve(result.data);
    } catch (e) {
      console.log(e);
      return resolve({ status: 600, message: "[front error] axiosProm" });
    }
  });
};
export const axios_Prom = async (api, method = "GET", formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!api) return resolve({ status: 400, message: "api 不能为空" });
      method = method.toUpperCase();
      let result = await axiosProm(api, method, formData);
      //unauthorized user
      if (result.status === 401) {
        const auth_res = await refreshToken_Prom();
        if (auth_res.status === 200) {
          result = await axiosProm(api, method, formData);
        } else {
          result.status = auth_res.status;
          result.message = auth_res.message;
        }
      }
      // console.log(result)
      return resolve(result);
    } catch (e) {
      console.log(e);
      return resolve({
        status: 600,
        message: `[front] fetch_Prom Error: ${e}`,
      });
    }
  });
};

export const refreshToken_Prom = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("refreshToken");
      const api = api_DNS + api_version + "/refreshtoken";
      const resPromise = await fetch(api, {
        headers: {
          "content-type": "application/json",
          authorization: "code " + token + " re",
        },
        method: "GET",
      });
      const result = await resPromise.json();
      if (result.status === 200) {
        localStorage.setItem("accessToken", result.data?.accessToken);
        localStorage.setItem("refreshToken", result.data?.refreshToken);
      } else {
        localStorage.removeItem("refreshToken");
        // window.location.reload();
      }
      resolve(result);
    } catch (error) {
      reject({ message: "refreshToken_Prom error", error });
    }
  });
};
