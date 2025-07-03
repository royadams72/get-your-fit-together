import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserFormType } from "@/types/interfaces/form";
import { setUserInfo } from "@/lib/features/user/userSlice";
import { setUiDataForRetreive } from "@/lib/features/uiData/uiDataSlice";
import { setCanNavigateTrue } from "@/lib/features/journey/journeySlice";

export const asyncSetUserInfo = createAsyncThunk(
  "user/asyncSetUserInfo",
  async (user: UserFormType, { dispatch }) => {
    dispatch(setUserInfo(user));
  }
);

export const asyncSetUiDataForRetreive = createAsyncThunk(
  "uiData/asyncSetUiDataForRetreive",
  async (_, { dispatch }) => {
    dispatch(setUiDataForRetreive());
  }
);

export const asyncSetCanNavigateTrue = createAsyncThunk(
  "uiData/asyncSetCanNavigateTrue",
  async (_, { dispatch }) => {
    dispatch(setCanNavigateTrue());
  }
);
