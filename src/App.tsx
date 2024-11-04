import { useState } from "react";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import Result from "./Pages/Result/Result";
import Stats from "./Pages/Stats/Stats";

function App() {
  const [page, setPage] = useState<"Joker" | "Top score">("Joker");
  return (
    <>
      {/* <Stats /> */}
      {page == "Joker" ? <Result /> : <Stats />}
      {/* <Result /> */}
      <Navigation page={page} setPage={setPage} />
    </>
  );
}

export default App;
