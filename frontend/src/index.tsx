import * as React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

// Must use a JSXElement otherwise hooks don't work
createRoot(document.getElementById("root")!).render(<App />);
