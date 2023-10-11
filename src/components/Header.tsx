import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Vending Machine</h1>
      <span className={styles.header__tagline}>A refreshing break!</span>
    </header>
  );
};

export default Header;
