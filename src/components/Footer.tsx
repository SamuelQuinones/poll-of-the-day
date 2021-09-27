import { memo } from "react";
import Container from "react-bootstrap/Container";

const Footer = memo(() => {
  return (
    <footer>
      <Container className="text-center mb-2" fluid="md">
        <hr className="mb-2" />
        <div>
          Version <strong>{process.env.REACT_APP_VERSION}</strong>
        </div>
        <div>
          Made with{" "}
          <span aria-label="love" role="img">
            ❤️
          </span>
        </div>
      </Container>
    </footer>
  );
});

export default Footer;
