import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="w-full flex justify-center md:fixed mb-2 md:mb-0 md:top-3">
      <div className="flex justify-between items-end w-11/12 sm:w-4/5 md:11/12 lg:w-4/5">
        <img src={logo} alt="Logomarca da ABRIC" style={{ maxWidth: '400px', maxHeight: '100px' }} />
        <nav>
          <a className="appearance-none cursor-pointer">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary">
              Gere seu certificado aqui
            </h1>
          </a>
        </nav>
      </div>
    </header>
  );
};

export { Header };
