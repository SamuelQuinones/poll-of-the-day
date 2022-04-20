//* Core
import { useMemo } from "react";
import { batch } from "react-redux";
import { variants, svgProps } from "utils";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ReactComponent as BackArrow } from "assets/arrow-left-circle.svg";
import { ReactComponent as Repeat } from "assets/arrow-repeat.svg";

//* REDUX
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getCurrentVote, getOptions, getQuestion } from "store/selectors";
import { viewActions } from "store/slice/View";
import { formActions } from "store/slice/Form";
import { voteActions } from "store/slice/Votes";

const FinalResults = () => {
  const dispatch = useAppDispatch();
  const options = useAppSelector(getOptions);
  const currentVotes = useAppSelector(getCurrentVote);
  const question = useAppSelector(getQuestion);

  const totalVotes = useMemo(
    () =>
      Object.values(currentVotes).reduce((prev = 0, curr = 0) => prev + curr),
    [currentVotes]
  );

  return (
    <>
      <section
        className="d-flex flex-column flex-sm-row justify-content-center align-items-center"
        id="post-action-buttons"
      >
        <h2 className="mb-0 flex-grow-1">Final Results:</h2>

        <div style={{ gap: "0.5rem" }} className="d-flex align-items-center">
          <Button
            size="sm"
            className="rounded-pill"
            onClick={() => dispatch(viewActions.setView("poll"))}
          >
            <BackArrow {...svgProps} /> Go Back
          </Button>
          <Button
            className="rounded-pill"
            variant="secondary"
            size="sm"
            onClick={() => {
              batch(() => {
                dispatch(voteActions.reset());
                dispatch(viewActions.setView("poll"));
              });
            }}
          >
            <Repeat {...svgProps} /> Run this poll again
          </Button>
          <Button
            className="rounded-pill"
            variant="dark"
            size="sm"
            onClick={() => {
              batch(() => {
                dispatch(formActions.reset());
                dispatch(voteActions.reset());
                dispatch(viewActions.setView("setup"));
              });
            }}
          >
            Run another poll
          </Button>
        </div>
      </section>
      <section id="results" className="my-auto">
        <p className="text-center mb-5 fs-4" id="the-question-again">
          <em>{question}</em>
        </p>
        {options.map((option, index) => {
          const cv = currentVotes?.[`option${index + 1}`];
          const percentage = totalVotes && cv && (cv / totalVotes) * 100;
          return (
            <Row key={`final-results-${index + 1}`}>
              <Col className="text-end">
                <p>
                  {option}:{" "}
                  <strong>{currentVotes?.[`option${index + 1}`]}</strong>
                </p>
              </Col>
              <Col>
                <span
                  className={`border border-1 bg-${variants[index]} d-block`}
                  style={{
                    height: "2rem",
                    width: percentage ? `${percentage}%` : "0%",
                  }}
                />
              </Col>
            </Row>
          );
        })}
      </section>
    </>
  );
};

export default FinalResults;
