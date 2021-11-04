import Header from "components/Header";
import Container from "react-bootstrap/Container";
import Footer from "components/Footer";

//* Views
import PollSetup from "views/Setup";
import PollOfTheDay from "views/Poll";
import FinalResults from "views/Final";

//* REDUX
import { useAppSelector } from "store/hooks";
import { getCurrentView } from "store/selectors";

function App() {
  //*REDUX
  const currentView = useAppSelector(getCurrentView);

  return (
    <div className="App">
      <Header />
      <Container
        as="main"
        className={`flex-column d-flex flex-fill ${
          currentView === "poll" && "justify-content-around"
        } ${currentView === "setup" && "justify-content-start"}`}
        fluid="md"
      >
        {currentView === "setup" && <PollSetup />}
        {currentView === "poll" && <PollOfTheDay />}
        {currentView === "end" && <FinalResults />}
      </Container>
      <Footer />
    </div>
  );
}

export default App;
