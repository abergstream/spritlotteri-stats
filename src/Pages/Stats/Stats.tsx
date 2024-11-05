import { useEffect, useState } from "react";
import { resultDataType, usersDataType } from "../../types/types";
import "./Stats.css";
import Icon from "@mdi/react";
import {
  mdiBottleWine,
  mdiNumeric1Box,
  mdiNumeric2Box,
  mdiNumeric3Box,
} from "@mdi/js";
import { AnimatePresence, motion } from "framer-motion";
type Result = {
  name: string;
  number: number;
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

  const wrapperVariants = {
    visible: {
      transition: {
        staggerChildren: 0.05, // Sets a 0.2-second delay between each child's animation
        when: "beforeChildren",
      },
    },
    hidden: {},
  };

  const itemVariants = {
    visible: { opacity: 1 },
    initial: { opacity: 0 },
    exit: { opacity: 0, scaleY: 0 },
  };
  const handleSort = (key: keyof Result) => {
    const newOrder = sortByKey([...topScore], key);
    setTopScore(newOrder);
  };
  return (
    <>
      {topScore.length > 0 && (
        <div className="stats-wrapper">
          <div className="result__row result__row--header">
            <div
              className="result__title"
              onClick={() => {
                handleSort("number");
              }}
            >
              Results
            </div>
            <div
              className="result__header result__column--numbers"
              onClick={() => {
                handleSort("first");
              }}
            >
              <Icon path={mdiNumeric1Box} size={2} />
            </div>
            <div
              className="result__header result__column--numbers"
              onClick={() => {
                handleSort("second");
              }}
            >
              <Icon path={mdiNumeric2Box} size={2} />
            </div>
            <div
              className="result__header result__column--numbers"
              onClick={() => {
                handleSort("third");
              }}
            >
              <Icon path={mdiNumeric3Box} size={2} />
            </div>
            <div
              className="result__header"
              onClick={() => {
                handleSort("total");
              }}
            >
              <Icon path={mdiBottleWine} size={3} />
            </div>
          </div>
          <motion.div
            initial="hidden"
            animate="visible"
            className="result-wrapper"
            transition={{ duration: 0.2 }}
            variants={wrapperVariants}
          >
            {topScore &&
              topScore.map((player) => {
                return (
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={player.name}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="result__row"
                      variants={itemVariants}
                    >
                      <div className="result__column result__column--numbers">
                        <div className="result__column--ball">
                          {player.number}
                        </div>
                      </div>
                      <div className="result__column result__column--name">
                        {player.name.split(" ")[0]}
                      </div>

                      <div className="result__column result__column--numbers">
                        {player.first}
                      </div>
                      <div className="result__column result__column--numbers">
                        {player.second}
                      </div>
                      <div className="result__column result__column--numbers">
                        {player.third}
                      </div>
                      <div className="result__column result__column--numbers">
                        {player.total}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                );
              })}
          </motion.div>
        </div>
      )}
    </>
  );
};

const createResultObject = (name: string, number: number) => ({
  name: name,
  number: number,
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
    createResultObject(players[i], i)
  );

  const incrementPlacement = (number: number, placement: keyof Result) => {
    const result = myResultsArray[number];
    result[placement]++;
    const placementScores: { [key: string]: number } = {
      first: 7,
      second: 2,
      third: 1,
    };
    const addTotal = placementScores[placement];
    result.total = result.total + addTotal;
  };
  results.forEach((result) => {
    incrementPlacement(result.first_place.number, "first");
    incrementPlacement(result.second_place.number, "second");
    incrementPlacement(result.third_place.number, "third");
  });

  return myResultsArray;
}
function sortByKey(array: Result[], key: keyof Result) {
  if (key == "number") {
    return array.sort((a, b) => (a[key] as number) - (b[key] as number));
  }
  return array.sort((a, b) => (b[key] as number) - (a[key] as number));
}
export default Stats;
