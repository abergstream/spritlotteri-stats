import { useEffect, useState } from "react";
import { resultDataType, usersDataType } from "../../types/types";
import "./Stats.css";
type Result = {
  name: string;
  total: number;
  first: number;
  second: number;
  third: number;
};
const Stats = () => {
  const [topScore, setTopScore] = useState<Result[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const response: Response = await fetch(
        "https://www.andreasb.se/spritlotteriet/api/get/users/"
      );
      const data: usersDataType[] = await response.json();
      return data.reduce((acc, user) => {
        acc[user.number] = user.name; // Map player number to name
        return acc;
      }, {} as Record<number, string>);
    };

    const fetchResult = async () => {
      const players = await fetchPlayers();
      const response: Response = await fetch(
        "https://www.andreasb.se/spritlotteriet/api/get/results/"
      );
      const data: resultDataType[] = await response.json();
      const test: Result[] = calculateResults(data, players);
      setTopScore(test);
    };
    fetchResult();
  }, []);
  console.log(topScore);
  return (
    <div className="result">
      <div className="result__row">
        <div className="result__title">Number</div>
        <div className="result__title">First</div>
        <div className="result__title">Second</div>
        <div className="result__title">Third</div>
        <div className="result__title">Total</div>
      </div>

      {topScore &&
        topScore.map((player, index) => {
          return (
            <div key={player.name} className="result__row">
              <div className="result__column">{index}</div>
              <div className="result__column">{player.first}</div>
              <div className="result__column">{player.second}</div>
              <div className="result__column">{player.third}</div>
              <div className="result__column">{player.total}</div>
            </div>
          );
        })}
    </div>
  );
};

const createResultObject = (name: string) => ({
  name: name,
  total: 0,
  first: 0,
  second: 0,
  third: 0,
});

function calculateResults(
  results: resultDataType[],
  players: Record<number, string>
) {
  const myResultsArray: Result[] = Array.from({ length: 10 }, (_, i) =>
    createResultObject(players[i])
  );

  const incrementPlacement = (number: number, placement: keyof Result) => {
    const result = myResultsArray[number];
    result[placement]++;
    result.total++;
  };
  results.forEach((result) => {
    incrementPlacement(result.first_place.number, "first");
    incrementPlacement(result.second_place.number, "second");
    incrementPlacement(result.third_place.number, "third");
  });

  return myResultsArray;
}

export default Stats;
