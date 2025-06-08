import { RootState } from "../store";

export function selectCount(state: RootState) {
  return state.counter.count;
}
