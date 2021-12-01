import { memo, useState } from "react";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { ReactComponent as Gear } from "assets/gear.svg";

const Footer = memo(() => {
  const [show, setShow] = useState(false);
  return (
    <footer>
      <Container className="text-center mb-2" fluid="md">
        <hr className="mb-2" />
        <div>
          Version <strong>{process.env.REACT_APP_VERSION}</strong>{" "}
          <OverlayTrigger overlay={<Tooltip>Extra Settings</Tooltip>}>
            <Button
              size="sm"
              variant="link"
              className="rounded-pill"
              style={{ padding: "0.125rem 0.25rem" }}
              onClick={() => setShow(true)}
            >
              <Gear
                className="d-inline-block"
                style={{ verticalAlign: "-.125em" }}
              />
            </Button>
          </OverlayTrigger>
        </div>
        <div>
          Made with{" "}
          <span aria-label="love" role="img">
            ❤️
          </span>
        </div>
      </Container>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Extra Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>These are coming soon...</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </footer>
  );
});

export default Footer;
