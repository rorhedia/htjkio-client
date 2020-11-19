export default function Navbar() {
  return (
    <>
      <header className="container-fluid bg-header">
        <nav className="row">
          <div className="col-12 col-md-6 legals-container">
            <a className="legals" href="#" target="_blank">
              Aviso de privacidad
            </a>
            <a className="legals" href="#" target="_blank">
              Términos y condiciones
            </a>
          </div>
          <div className="col-12 col-md-6 login-container">
            <button className="login">Ingresar</button>
          </div>
        </nav>
        {/* <div className="row">
          div.col
        </div> */}
      </header>
    </>
  );
}
