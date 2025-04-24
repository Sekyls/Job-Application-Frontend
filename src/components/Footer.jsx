const Footer = () => {
  return (
    <footer className="footer bg-secondary text-white pt-2 pb-2 mt-1">
      <div className="text-center medium">
        &copy; {new Date().getFullYear()} JOBDEPOT. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
