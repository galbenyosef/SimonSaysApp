export type StackParamList = {
  Home: undefined;
  NewHighlight: {level: number};
  Highlights: undefined;
};
export enum Statuses {
  Idle,
  Playback,
  Listening,
}
export type Highlight = {
  name: string;
  level: number;
};
