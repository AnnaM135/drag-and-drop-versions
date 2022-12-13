import React, { useState } from "react";
import "./App.css";
import { VariantFour } from "./pages/VariantFour";
import { VariantOne } from "./pages/VariantOne";
import { VariantThree } from "./pages/VariantThree";
import { VariantTwo } from "./pages/VariantTwo";

function App() {
  const [step, setStep] = useState(1);
  return (
    <div className="container">
      <ul className="menu">
        <li
          className={step === 1 ? "menu-list active" : "menu-list"}
          onClick={() => setStep(1)}
        >
          Variant One
        </li>
        <li
          className={step === 2 ? "menu-list active" : "menu-list"}
          onClick={() => setStep(2)}
        >
          Variant Two
        </li>
        <li
          className={step === 3 ? "menu-list active" : "menu-list"}
          onClick={() => setStep(3)}
        >
          Variant Three
        </li>
        <li
          className={step === 4 ? "menu-list active" : "menu-list"}
          onClick={() => setStep(4)}
        >
          Variant Four
        </li>
      </ul>
      {step === 1 ? (
        <VariantOne />
      ) : step === 2 ? (
        <VariantTwo />
      ) : step === 3 ? (
        <VariantThree />
      ) : (
        <VariantFour />
      )}
    </div>
  );
}

export default App;
