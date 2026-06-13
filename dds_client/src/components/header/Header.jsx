import './Header.css';

const Header = (props) => {
  return (
    <header className="header">
        <b>{props.username}, wachin!</b>
    </header>
  );
};

export default Header;