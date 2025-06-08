import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./lib/redux/store";
import Counter from "./pages/Base";
import RTKQBase from "./pages/RTKQ/Pokemon";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <StrictMode>
        <div>Hello World</div>
        <Counter />
        <RTKQBase />
      </StrictMode>
    </Provider>,
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  );
}
