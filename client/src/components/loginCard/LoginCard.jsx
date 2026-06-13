// components/LoginCard.jsx
import './loginCard.css'

//TODO Im

const LoginCard = ({ onClose }) => {
    return (
        <div className="login-card">
            <div className="login-header">
                <h3>Iniciar sesión</h3>

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    ✕
                </button>
            </div>

            <form className="login-form">
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder="Usuario"
                    />
                </div>

                <div className="input-group">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        placeholder="********"
                    />
                </div>

                <button
                    type="submit"
                    className="login-btn"
                >
                    Iniciar sesión
                </button>
            </form>

            <div className="login-footer">
                <a href="/">¿Olvidaste tu contraseña?</a>

                <span>
                    ¿No tenés cuenta? <a href="/">Registrarse</a>
                </span>
            </div>
        </div>
    )
}

export default LoginCard