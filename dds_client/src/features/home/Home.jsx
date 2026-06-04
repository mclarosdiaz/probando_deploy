import './Home.css'
import GifSapo from "../../components/gifSapo/GifSapo.jsx";
import BotonesHome from "../../components/botonesHome/BotonesHome.jsx";
import GifMosuclos from '../../components/gifMosculos/GifMosculos.jsx';

const Home = () =>{
    return (
        <>
        <div className = "home-body">
            <GifSapo />
            <BotonesHome />
            <GifMosuclos />
        </div>
        </>
    );
};

export default Home;