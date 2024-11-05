import styles from "./Navigation.module.css";
import { motion } from "framer-motion";

type NavigationProps = {
  page: "Joker" | "Top score"; // Specify exact strings for safety
  setPage: React.Dispatch<React.SetStateAction<"Joker" | "Top score">>;
};

const Navigation: React.FC<NavigationProps> = ({ page, setPage }) => {
  const navContent = page == "Joker" ? "Top score" : "Joker";
  const handleNavigation = () => {
    setPage(navContent); // Toggle between "Joker" and "Top score"
  };
  return (
    <motion.div
      whileTap={{ scale: 0.9, boxShadow: "inset -4px -4px 4px #111" }}
      className={styles.navItem}
      onClick={handleNavigation}
    >
      {navContent}
    </motion.div>
  );
};

export default Navigation;
