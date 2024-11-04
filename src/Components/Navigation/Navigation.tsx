import styles from "./Navigation.module.css";
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
    <div className={styles.navItem} onClick={handleNavigation}>
      {navContent}
    </div>
  );
};

export default Navigation;
