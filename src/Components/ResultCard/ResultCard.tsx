import React, { useRef } from "react";
import "./ResultCard.css";
import { motion, useInView } from "framer-motion";
type ResultCardProps = {
  result: {
    resultID: number;
    date: string;
    first_place: {
      number: number;
      name: string;
    };
    second_place: {
      number: number;
      name: string;
    };
    third_place: {
      number: number;
      name: string;
    };
  };
};

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  console.log(result);
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: "all", once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        staggerDirection: -1,
      },
    },
  };
  const itemVariants = {
    hidden: { x: -300 },
    visible: { x: 0, transition: { duration: 1 } },
  };
  const numberVariants = {
    hidden: { rotate: -700 },
    visible: { rotate: 0, transition: { duration: 1 } },
  };
  return (
    <div className="result-container">
      <div className="result" ref={ref}>
        <div className="result__date">{result.date}</div>
        <motion.div
          className="result__places"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : ""}
        >
          <motion.div variants={itemVariants} className="result__ball">
            <motion.div className="result__number" variants={numberVariants}>
              {result.third_place.number}
            </motion.div>
          </motion.div>
          <motion.div variants={itemVariants} className="result__ball">
            <motion.div className="result__number" variants={numberVariants}>
              {result.second_place.number}
            </motion.div>
          </motion.div>
          <motion.div variants={itemVariants} className="result__ball">
            <motion.div className="result__number" variants={numberVariants}>
              {result.first_place.number}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>{" "}
      <div className="result__placements">
        <div className="result__names">
          <motion.div
            initial={{ y: 60 }}
            animate={{ y: inView ? 0 : 60 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="result__placement-row result__placement-row--left"
          >
            First
          </motion.div>
        </div>
        <div className="result__names">
          <motion.div
            initial={{ y: 60 }}
            animate={{ y: inView ? 0 : 60 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="result__placement-row result__placement-row--right"
          >
            {result.first_place.name}
          </motion.div>
        </div>
        <div className="result__names">
          <motion.div
            initial={{ y: 60 }}
            animate={{ y: inView ? 0 : 60 }}
            transition={{ duration: 1, delay: 0.85 }}
            className="result__placement-row result__placement-row--left"
          >
            Second
          </motion.div>
        </div>
        <div className="result__names">
          <motion.div
            initial={{ y: 60 }}
            animate={{ y: inView ? 0 : 60 }}
            transition={{ duration: 1, delay: 0.85 }}
            className="result__placement-row result__placement-row--right"
          >
            {result.second_place.name}
          </motion.div>
        </div>
        <div className="result__names">
          <motion.div
            initial={{ y: 60 }}
            animate={{ y: inView ? 0 : 60 }}
            transition={{ duration: 1, delay: 1.35 }}
            className="result__placement-row result__placement-row--left"
          >
            Third
          </motion.div>
        </div>
        <div className="result__names">
          <motion.div
            initial={{ y: 60 }}
            animate={{ y: inView ? 0 : 60 }}
            transition={{ duration: 1, delay: 1.35 }}
            className="result__placement-row result__placement-row--right"
          >
            {result.third_place.name}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
