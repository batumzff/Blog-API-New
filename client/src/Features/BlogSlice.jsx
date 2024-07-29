import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  categories: [],
  blogs: [],
  comments: [],
  blogDetail: {},
  categoryDetail: [],
  loading: false,
  error: false,
};

const BlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    getAllData: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.users = payload[0];
      state.categories = payload[1];
      state.blogs = payload[2];
      // state.comments = payload[3];
    },

    getSingleData: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      if(payload.data && typeof payload.data == "object" && "updatedData" in payload.data){ state[payload.url] = payload.data.updatedData}else {
        state[payload.url] = payload.data.data
      }
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, fetchFail, getAllData, getSingleData } =
  BlogSlice.actions;

export default BlogSlice.reducer;
