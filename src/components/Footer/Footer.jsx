import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <p className="author">
        Isaac Boateng <span className="year">{new Date().getFullYear()}</span>
      </p>
    </footer>
  );
}

export default Footer;
