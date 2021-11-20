//* Test
import Header from "components/Header";
import Container from "react-bootstrap/Container";
import Footer from "components/Footer";
import classNames from "classnames/bind";

//* Views
import PollSetup from "views/Setup";
import PollOfTheDay from "views/Poll";
import FinalResults from "views/Final";

//* REDUX
import { useAppSelector } from "store/hooks";
import { getCurrentView } from "store/selectors";

const viewClasses = {
  poll: "justify-content-around",
  setup: "justify-content-start",
  end: "justify-content-between",
};
const cx = classNames.bind(viewClasses);

function App() {
  //*REDUX
  const currentView = useAppSelector(getCurrentView);

  const containerClasses = cx(
    currentView,
    "flex-column",
    "d-flex",
    "flex-fill"
  );

  return (
    <div className="App">
      <Header />
      <Container as="main" className={containerClasses} fluid="md">
        {currentView === "setup" && <PollSetup />}
        {currentView === "poll" && <PollOfTheDay />}
        {currentView === "end" && <FinalResults />}
      </Container>
      <Footer />
    </div>
  );
}

export default App;
