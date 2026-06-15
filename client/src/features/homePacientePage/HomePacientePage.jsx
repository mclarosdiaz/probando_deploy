import './HomePacientePage.css'
import GifSapo from "../../components/gifSapo/GifSapo.jsx";
import BotonesHome from "../../components/botonesHome/BotonesHome.jsx";
import GifMosuclos from '../../components/gifMosculos/GifMosculos.jsx';
import HeroCarousel from '../../components/heroCarousel/HeroCarousel.jsx';

const HomePacientePage = () => {
    return (
        <div className="home-body">
            <div className="contenedor-gif sapo">
                <GifSapo />
            </div>
            
            <div className="contenedor-hero">

                <HeroCarousel />

            </div>

            
            <div className="contenedor-gif bicho">
                <GifMosuclos />
            </div>
        </div>
    );
};

export default HomePacientePage;