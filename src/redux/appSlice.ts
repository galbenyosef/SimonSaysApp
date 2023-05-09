import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {Statuses} from '../types';
import {getRandomInt} from '../utilities';

export interface State {
  currentSequence: number[];
  playTriggers: number[];
  typedSequence: number[];
  status: Statuses;
}

const initialState: State = {
  currentSequence: [getRandomInt(0, 3)],
  playTriggers: new Array(4).fill(0),
  typedSequence: [],
  status: Statuses.Idle,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentSequence: (state, action: PayloadAction<number[]>) => {
      state.currentSequence = action.payload;
    },
    setPlayTriggers: (state, action: PayloadAction<number[]>) => {
      state.playTriggers = action.payload;
    },
    setTypedSequence: (state, action: PayloadAction<number[]>) => {
      state.typedSequence = action.payload;
    },
    setStatus: (state, action: PayloadAction<Statuses>) => {
      state.status = action.payload;
    },
    onWin: state => {
      state.currentSequence = [...state.currentSequence, getRandomInt(0, 3)];
      state.typedSequence = [];
      state.status = Statuses.Idle;
    },
    onGameover: state => {
      state.currentSequence = [getRandomInt(0, 3)];
      state.typedSequence = [];
      state.status = Statuses.Idle;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCurrentSequence,
  setPlayTriggers,
  setTypedSequence,
  setStatus,
  onWin,
  onGameover,
} = appSlice.actions;

export default appSlice.reducer;
