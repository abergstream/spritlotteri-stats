import { useEffect, useState } from "react";
import ResultCard from "../../Components/ResultCard/ResultCard";
import "./Result.css";
import { type resultDataType } from "../../types/types";

const Result = () => {
  const [results, setResults] = useState<resultDataType[]>([]);
  useEffect(() => {
    const fetchResults = async () => {
      const response: Response = await fetch(
        "https://www.andreasb.se/spritlotteriet/api/get/results/"
      );
      const data: resultDataType[] = await response.json();

      setResults(data);
    };
    fetchResults();
  }, []);
  return (
    // This has scroll-snap-type: y mandatory;
    <div className="result-card__container">
      {results &&
        results.map((result) => {
          // return <h3>{result.resultID}</h3>;
          if (result) {
            return <ResultCard key={result.resultID} result={result} />;
          }
        })}
    </div>
  );
};

export default Result;
