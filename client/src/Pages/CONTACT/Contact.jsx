import { Link } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { BsFillEnvelopeAtFill } from "react-icons/bs";
import style from "./Contact.module.scss"


const Contact = () => {
  return (
    <main>
      <section className={style["contact-container"]}>
        <h3>
          Illuminate Your <span>Thoughts</span> Your <span>Dreams</span>
        </h3>
        <div className={style["contact-info"]}>
          <a href="tel:123456789">Phone</a>
          <a href="mailto:pyscript@gmail.com">
            <BsFillEnvelopeAtFill />
            Mail Us:
            <h4>pyscript@gmail.com</h4>
          </a>
        </div>
        <div className={style["contact-footer"]}>
          <div className={style.icons}>
            <div className={style.whatsapp}>
              <IoLogoWhatsapp />
            </div>
            <div className={style.facebook}>
              <FaFacebook />
            </div>
            <div className={style.instagram}>
              <IoLogoInstagram />
            </div>
            <div className={style.telegram}>
              <FaTelegram />
            </div>
            <div className={style.twitter}>
              <FaXTwitter />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
