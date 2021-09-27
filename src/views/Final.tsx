//* Core
import { useMemo } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

//* REDUX
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getCurrentVote, getOptions } from "store/selectors";
import { viewActions } from "store/View/slice";
import { formActions } from "store/Form/slice";
import { voteActions } from "store/Votes/slice";

const FinalResults = () => {
  const dispatch = useAppDispatch();
  const options = useAppSelector(getOptions);
  const currentVotes = useAppSelector(getCurrentVote);

  const totalVotes = useMemo(
    () =>
      Object.values(currentVotes).reduce((prev = 0, curr = 0) => prev + curr),
    [currentVotes]
  );

  return (
    <>
      <section className="d-flex" id="post-action-buttons">
        <h2 className="mb-0 me-auto">Final Results:</h2>

        <div style={{ gap: "0.5rem" }} className="d-flex align-items-center">
          <Button
            variant="dark"
            size="sm"
            className="rounded-pill"
            onClick={() => dispatch(viewActions.setView("poll"))}
          >
            ⬅ Go Back
          </Button>
          <Button
            className="rounded-pill"
            size="sm"
            onClick={() => {
              dispatch(formActions.reset());
              dispatch(voteActions.reset());
              dispatch(viewActions.setView("setup"));
            }}
          >
            Run another poll
          </Button>
          <Button
            className="rounded-pill"
            variant="secondary"
            size="sm"
            onClick={() => {
              dispatch(voteActions.reset());
              dispatch(viewActions.setView("poll"));
            }}
          >
            Run this poll again
          </Button>
        </div>
      </section>
      <section id="results" className="my-auto">
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
                <div
                  className="border border-1 bg-primary"
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
