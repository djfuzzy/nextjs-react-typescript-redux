const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer has-border-top">
      <div className="content has-text-centered">
        <span>Copyright &copy; {year} Dillon Forsberg</span>
      </div>
    </footer>
  );
};

export default Footer;
