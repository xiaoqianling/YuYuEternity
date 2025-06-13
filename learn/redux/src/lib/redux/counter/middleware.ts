export function isCounterMiddleware(action: { type: string }) {
  if (action.type === "counter/increment") {
    console.log("counter middleware");
  }
}
