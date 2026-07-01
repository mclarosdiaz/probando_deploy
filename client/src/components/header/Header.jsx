import './Header.css';

const Header = ({ username }) => {

  return (
    <header className="top-header">

      <div className="top-header-left">

        <span className="header-item emergency">
          EMERGENCIAS: 0810-333-0004
        </span>

        <span className="divider">|</span>

        <span className="header-item">
          BENEFICIARIOS: 0800-666-0400
        </span>

        <span className="divider">|</span>

        <span className="header-item">
          TURNOS: 0810-999-0101
        </span>

        <span className="divider">|</span>

        <span className="header-item">
          CONTACTO
        </span>

      </div>

      <div className="top-header-right">

        <span className="header-user">
          {
            username
              ? `Hola ${username}!`
              : 'Grog grog!'
          }
        </span>

      </div>

    </header>
  );
};

export default Header;