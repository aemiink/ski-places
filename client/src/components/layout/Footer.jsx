const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">
          © {new Date().getFullYear()} Ski Places Turkey
        </p>

        <div className="flex gap-4 text-sm">
          <span>Hakkımızda</span>
          <span>İletişim</span>
          <span>Gizlilik</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
