import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Numbers.css";
import { usersDataType } from "../../types/types";

const Numbers = () => {
  const [players, setPlayers] = useState<usersDataType[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const response: Response = await fetch(
        "https://www.andreasb.se/spritlotteriet/api/get/users/"
      );
      const data: usersDataType[] = await response.json();
      setPlayers(data);
    };
    fetchPlayers();
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // 0.2 seconds delay between child animations
        when: "beforeChildren", // Ensures container animates first, then children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      {players.length > 0 && (
        <motion.div
          className="players__container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {players &&
            players.map((player) => (
              <motion.div
                key={player.userID}
                className="players__item"
                variants={itemVariants} // Each item now should follow the container's stagger
              >
                <div className="players__number">{player.number}</div>
                <div className="players__name">{player.name}</div>
              </motion.div>
            ))}
        </motion.div>
      )}
    </>
  );
};

export default Numbers;
