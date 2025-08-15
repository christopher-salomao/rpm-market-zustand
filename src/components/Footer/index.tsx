function Footer() {
  return (
    <footer className="w-full flex items-center justify-center font-medium text-lg py-8 px-4 text-center mt-8 border-t-2">
      &copy; 2010-{new Date().getFullYear()} RPM Market. Todos os direitos reservados.
    </footer>
  );
}

export default Footer;
