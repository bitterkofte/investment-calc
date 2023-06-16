import logo from '../../assets/investment-calculator-logo.png';
import inv from '../../assets/earning.png'
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      {/* <img src={logo} alt="logo" /> */}
      <img src={inv} alt="logo" />
      <h1>Investment Calculator</h1>
    </header>
  );
};

export default Header;
