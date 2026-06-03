import './Home.css'
import GifSapo from "../../components/gifSapo/GifSapo.jsx";
import BotonesHome from "../../components/botonesHome/BotonesHome.jsx";

const Home = () =>{
    return (
        <>
        <div className = "home-body">
            <GifSapo />
            <BotonesHome />
        </div>
        </>
    );
};

export default Home;