import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch_Prom, axios_Prom } from "../js/api";
// import { sortBy } from "../js/global";

const initialState = {
  errMsg: "",
  status: "idle",
  ongoingOrderCount: 0,
  orderCountStatus: "idle",
};

export const getObjects = createAsyncThunk(
  "objects/getObjects",
  async (
    { flagSlice, api, isReload = true },
    { getState, rejectWithValue }
  ) => {
    const queryStr = genQueryStr(flagSlice, getState());
    const res = await fetch_Prom(api + queryStr);
    if (res.status === 200) {
      const objs = getState().objects[flagSlice]?.objects || [];
      let getObjs = [...res.data.objects];
      const objects = isReload ? getObjs : [...objs, ...getObjs];
      // console.log(objects);
      return { flagSlice, objects };
    } else {
      return rejectWithValue("getObjects error info");
      // return rejectWithValue({flagSlice, info:'my error info'});
    }
  }
);
export const getObject = createAsyncThunk(
  "objects/getObject",
  async ({ flagSlice, api }, { rejectWithValue }) => {
    const res = await fetch_Prom(api);
    if (res.status === 200) {
      const object = res.data.object;
      return { flagSlice, object };
    } else {
      return rejectWithValue("getObject error info");
      // return rejectWithValue({flagSlice, info:'my error info'});
    }
  }
);

export const fetchOngoingOrderCount = createAsyncThunk(
  "objects/fetchOngoingOrderCount",
  async (foo = null, { rejectWithValue }) => {
    const res = await fetch_Prom("/Orders?status=[200,400,700]");
    // console.log(res);
    if (res.status === 200) {
      return res.data.count;
    }
  }
);

export const postObject = createAsyncThunk(
  "objects/postObject",
  async ({ flagSlice, api, data }, { getState, rejectWithValue }) => {
    // console.log(formdata)
    const post_res = await axios_Prom(api, "POST", data);
    if (post_res.status === 200) {
      const objs = [...getState().objects[flagSlice]?.objects] || [];
      const newObj = post_res.data.object;
      let i = 0;
      for (; i < objs.length; i++) {
        const obj = objs[i];
        if (obj._id === newObj._id) {
          objs[i] = newObj;
          break;
        }
      }
      let objects = [];
      if (i < objs.length) {
        objects = objs;
      } else {
        objects = [newObj, ...objs];
      }
      // objects.sort(sortBy("role"));
      alert("添加成功");
      return { flagSlice, objects };
    } else {
      return rejectWithValue("postObject error info");
    }
  }
);
// export const postObject = createAsyncThunk(
//   "objects/postObject",
//   async ({ flagSlice, api, data }, { getState, rejectWithValue }) => {
//     // console.log(formdata)
//     const post_res = await fetch_Prom(api, "POST", data);
//     if (post_res.status === 200) {
//       const objs = getState().objects[flagSlice]?.objects || [];
//       const newObj = post_res.data.object;
//       const objects = [newObj, ...objs];
//       objects.sort(sortBy("role"));
//       return { flagSlice, objects };
//     } else {
//       return rejectWithValue("postObject error info");
//     }
//   }
// );
export const putObject = createAsyncThunk(
  "objects/putObject",
  async ({ flagSlice, api, data, isList = false }, { rejectWithValue }) => {
    const put_res = await axios_Prom(api, "PUT", data);
    console.log(put_res);
    if (put_res.status === 200) {
      const object = put_res.data.object;
      alert("修改成功");
      return { flagSlice, object, isList };
    } else {
      return rejectWithValue("putObject error info");
      // return rejectWithValue({flagSlice, info:'my error info'});
    }
  }
);
// export const putObject = createAsyncThunk(
//   "objects/putObject",
//   async ({ flagSlice, api, data }, { rejectWithValue }) => {
//     const put_res = await fetch_Prom(api, "PUT", data);
//     if (put_res.status === 200) {
//       const object = put_res.data.object;
//       return { flagSlice, object };
//     } else {
//       return rejectWithValue("putObject error info");
//       // return rejectWithValue({flagSlice, info:'my error info'});
//     }
//   }
// );
export const deleteObject = createAsyncThunk(
  "objects/deleteObject",
  async (
    { flagSlice, api, id, isList = false },
    { getState, rejectWithValue }
  ) => {
    // console.log(api)
    const res = await fetch_Prom(api, "DELETE");
    if (res.status === 200) {
      return { flagSlice, id, isList };
    } else {
      alert(res.message);
      return rejectWithValue("deleteObject error info");
      // return rejectWithValue({flagSlice, info:'my error info'});
    }
  }
);

export const objectsSlice = createSlice({
  name: "objects",
  initialState,
  reducers: {
    // 固定Query
    setQueryFixed: (state, action) => {
      const { flagSlice, queryFixed } = action.payload;
      if (!state[flagSlice]) state[flagSlice] = {};
      state[flagSlice].queryFixed = queryFixed;
    },
    setQuery: (state, action) => {
      const { flagSlice, query, isReload = true } = action.payload;
      // console.log(isReload);
      if (!state[flagSlice]) state[flagSlice] = {};
      if (!state[flagSlice].query) state[flagSlice].query = {};
      if (isReload === true) {
        state[flagSlice].query = { [query.key]: query.val };
        // console.log(state[flagSlice].query);
      } else {
        state[flagSlice].query = {
          ...state[flagSlice].query,
          [query.key]: query.val,
        };
      }
    },

    cleanField: (state, action) => {
      const { flagSlice, flagField } = action.payload;
      if (state[flagSlice]) delete state[flagSlice][flagField];
    },
    unObjectsSlice: (state, action) => {
      const { flagSlice } = action.payload;
      delete state[flagSlice];
    },
  },

  extraReducers: {
    [getObjects.pending]: (state) => {
      state.status = "loading";
    },
    [getObjects.fulfilled]: (state, action) => {
      const { flagSlice, objects } = action.payload;
      state.status = "succeed";
      if (!state[flagSlice]) state[flagSlice] = {};
      state[flagSlice].objects = objects;
    },
    [getObjects.rejected]: (state, action) => {
      state.errMsg = action.error.message;
    },
    [getObject.pending]: (state) => {
      state.status = "loading";
    },
    [getObject.fulfilled]: (state, action) => {
      const { flagSlice, object } = action.payload;
      state.status = "succeed";
      if (!state[flagSlice]) state[flagSlice] = {};
      state[flagSlice].object = object;
    },
    [getObject.rejected]: (state, action) => {
      state.errMsg = action.error.message;
    },
    [postObject.pending]: (state) => {
      state.status = "loading";
    },
    [postObject.fulfilled]: (state, action) => {
      const { flagSlice, objects } = action.payload;
      state.status = "succeed";
      if (!state[flagSlice]) state[flagSlice] = {};
      state[flagSlice].objects = objects;
    },
    [postObject.rejected]: (state, action) => {
      state.errMsg = action.error.message;
    },

    [putObject.pending]: (state) => {
      state.status = "loading";
    },
    [putObject.fulfilled]: (state, action) => {
      const { flagSlice, object, isList } = action.payload;
      state.status = "succeed";
      if (!state[flagSlice]) state[flagSlice] = {};
      if (isList) {
        let i = 0;
        for (; i < state[flagSlice].objects.length; i++) {
          if (String(state[flagSlice].objects[i]._id) === String(object._id))
            break;
        }
        if (i < state[flagSlice].objects.length)
          state[flagSlice].objects[i] = object;
      } else {
        state[flagSlice].object = object;
      }
    },
    [putObject.rejected]: (state, action) => {
      state.errMsg = action.error.message;
    },
    [deleteObject.pending]: (state) => {
      state.status = "loading";
    },
    [deleteObject.fulfilled]: (state, action) => {
      const { flagSlice, id, isList } = action.payload;
      state.status = "succeed";
      if (!state[flagSlice]) state[flagSlice] = {};
      if (isList) {
        let i = 0;
        console.log(11);
        for (; i < state[flagSlice].objects.length; i++) {
          if (String(state[flagSlice].objects[i]?._id) === String(id)) break;
        }
        console.log(i);
        if (i < state[flagSlice].objects.length)
          state[flagSlice].objects.splice(i, 1);
        //splice returns modified array
        //slice returns deleted element array
      }
    },
    [deleteObject.rejected]: (state, action) => {
      state.errMsg = action.error.message;
    },
    [fetchOngoingOrderCount.fulfilled]: (state, action) => {
      state.orderCountStatus = "succeed";
      state.ongoingOrderCount = action.payload;
    },
  },
});

export const { setQueryFixed, setQuery, cleanField, unObjectsSlice } =
  objectsSlice.actions;

export const selectQuery = (flagSlice) => (state) => {
  if (state.objects[flagSlice] && state.objects[flagSlice].query)
    return state.objects[flagSlice].query;
  return {};
};

const genQueryStr = (flagSlice, state) => {
  const query = state.objects[flagSlice]?.query || {};
  const filters = [];
  Object.keys(query).forEach((key) => {
    if (query[key] !== "" || query[key] !== undefined || query[key] !== null)
      filters.push(`${key}=${query[key]}`);
  });
  let queryStr = "";
  if (filters.join("&")) queryStr = `?${filters.join("&")}`;

  const queryFixed = state.objects[flagSlice]?.queryFixed || "";
  if (queryFixed) {
    if (queryStr.length > 0) queryStr += `&${queryFixed}`;
    else queryStr += `?${queryFixed}`;
  }
  return queryStr;
};

export const selectObject = (flagSlice) => (state) => {
  if (state.objects[flagSlice] && state.objects[flagSlice].object) {
    return state.objects[flagSlice].object;
  } else {
    return {};
  }
};

export const selectObjects = (flagSlice) => (state) => {
  if (state.objects[flagSlice] && state.objects[flagSlice].objects) {
    return state.objects[flagSlice].objects;
  } else {
    return [];
  }
};
export const selectAsObjects = (flagSlice, selectAs) => (state) => {
  const objs = [];
  if (state.objects[flagSlice] && state.objects[flagSlice].objects) {
    state.objects[flagSlice].objects.forEach((object) => {
      const obj = {};
      obj._id = object._id;
      selectAs.forEach((item) => {
        obj[item.as] = object[item.select];
      });
      objs.push(obj);
    });
  }
  return objs;
};

export default objectsSlice.reducer;
