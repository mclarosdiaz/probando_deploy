import './Home.css'
import GifSapo from "../../components/gifSapo/GifSapo.jsx";
import BotonesHome from "../../components/botonesHome/BotonesHome.jsx";
import GifMosuclos from '../../components/gifMosculos/GifMosculos.jsx';

const Home = () => {
    return (
        <div className="home-body">
            <div className="contenedor-gif sapo">
                <GifSapo />
            </div>
            
            <div className="contenedor-botones">
                <BotonesHome />
            </div>
            
            <div className="contenedor-gif bicho">
                <GifMosuclos />
            </div>
        </div>
    );
};

export default Home;