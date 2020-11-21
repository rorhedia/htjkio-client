import CustomNavbar from "../components/CustomNavbar";
import Bullets from "../components/Bullets";
import CardInfo from "../components/CardInfo";

export default function Home() {
  const aboutUs = ["Nosotros", "Blog", "Contacto"];
  const services = ["Servicios Cloud", "Centro de datos", "Ciberseguridad"];

  return (
    <div className="">
      <CustomNavbar />

      <section className="container-fluid container-body">
        <div className="row">
          <div className="col-12 logo">
            <img src="/logo_kio.svg" alt="logo" />
          </div>

          <div className="col-12 carousel">
            <img
              src="https://www.kionetworks.com/hubfs/BaconLab2020/banner/2020/desk/banner%202.png"
              alt=""
            />
          </div>
        </div>

        <div className="row my-3 d-flex justify-content-around">
          <div className="col-12 col-md-5">
            <CardInfo />
          </div>
          <div className="col-12 col-md-5">
            <CardInfo />
          </div>
        </div>
      </section>

      <section className="container-fluid home-container-section2">
        <div className="row">
          <div className="col-12">
            <h3>Lorem ipsum dolor sit amet.</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              quasi placeat tempore eum ratione autem, atque sed voluptatem.
              Minus ad tenetur natus asperiores fugit, explicabo ipsam vero id
              adipisci blanditiis.
            </p>
          </div>
        </div>
      </section>

      <footer className="container-fluid home-container-footer">
        <div className="row">
          <div className="col-12 col-md-4">
            <img
              className="logo_footer"
              src="/logo_footer.png"
              alt="logo footer"
            />
          </div>
          <div className="col-12 col-md-4">
            <h5>ACERCA DE KIO NETWORKS</h5>
            <ul className="home-bullets-footer">
              {aboutUs.length &&
                aboutUs.map((bullet, idx) => (
                  <Bullets key={idx} dataList={bullet} />
                ))}
            </ul>
          </div>
          <div className="col-12 col-md-4">
            <h5>SERVICIOS</h5>
            <ul className="home-bullets-footer">
              {services.length &&
                services.map((service, idx) => (
                  <Bullets key={idx} dataList={service} />
                ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
