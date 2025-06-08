import { RootState } from "../store";

export function selectCount(state: RootState) {
  return state.counter.count;
}

export function selectStep(state: RootState) {
  return state.counter.step;
}
