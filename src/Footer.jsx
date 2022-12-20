import './Footer.css';
import LogoSaa from './img/LogoSaa.svg';

// en footer solo importamos la imagen del lodo dev y los estilos y creamos la 
// estructura de footer en el return como un html normal. 


const Footer = () => {
    return (
        <div className="Footer">
            <div className="footer-up">
                <div className="footer-p">
                    <p>DESCARGO DE RESPONSABILIDAD IMPORTANTE: todo el contenido disponible en nuestro sitio web, en los sitios web hipervinculados,
                        y en las aplicaciones, foros, blogs, cuentas de redes sociales y otras plataformas asociados ("Sitio") tienen como único
                        objetivo proporcionarle información general procedente de fuentes externas.</p>
                </div>
                <div className="footer-c">
                    <p>Crypto Stadistics</p>
                    <p>© 2022</p>
                </div>
            </div>
            <div className="footer-down">
                <p>Developed by</p>
                <div>
                    <img src={LogoSaa} alt="Logo Saa"/>
                </div>
            </div>
        </div>
    );
}
export default Footer;