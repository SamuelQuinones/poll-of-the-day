//* Core
import { useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { variants } from "utils";

//* REDUX
import { useAppSelector, useAppDispatch } from "store/hooks";
import { getCurrentVote, getOptions, getQuestion } from "store/selectors";
import { viewActions } from "store/slice/View";
import { voteActions } from "store/slice/Votes";

const rowHelper = (numCols: number) => {
  switch (numCols) {
    case 2:
      return {
        xs: 1,
        md: 2,
      };

    case 3:
      return {
        xs: 1,
        sm: 1,
        md: 3,
      };

    case 4:
      return {
        xs: 1,
        md: 2,
        xxl: 4,
      };

    case 5:
      return {
        xs: 1,
        md: 2,
        xl: 3,
        xxl: 5,
      };

    case 6:
      return {
        xs: 1,
        md: 2,
        xl: 3,
      };

    default:
      return;
  }
};

const PollOfTheDay = () => {
  const question = useAppSelector(getQuestion);
  const options = useAppSelector(getOptions);
  const currentVotes = useAppSelector(getCurrentVote);
  const dispatch = useAppDispatch();

  const debouncedVote = useDebouncedCallback((option: number) => {
    dispatch(voteActions.increment(option));
  }, 250);

  const optionButtons = useMemo(
    () => (
      <>
        {options.map((option, index) => {
          return (
            <Col key={`voting-option-${index + 1}`} className="mb-2">
              <Button
                variant={variants[index]}
                className="w-100 rounded-pill"
                onClick={() => debouncedVote(index + 1)}
              >
                {option}
              </Button>
            </Col>
          );
        })}
      </>
    ),
    [debouncedVote, options]
  );

  const totalVotes = useMemo(
    () =>
      Object.values(currentVotes).reduce((prev = 0, curr = 0) => prev + curr),
    [currentVotes]
  );

  return (
    <>
      <Button
        variant="dark"
        size="sm"
        className="align-self-start"
        onClick={() => dispatch(viewActions.setView("end"))}
      >
        End Poll
      </Button>
      <h2 className="text-center">{question}</h2>
      {/* Percentages */}
      <section id="voting-percentages" className="d-flex mt-3">
        {totalVotes && totalVotes > 0
          ? options.map((_, index) => {
              const cv = currentVotes?.[`option${index + 1}`];
              const percentage = cv && (cv / totalVotes) * 100;
              return (
                <span
                  key={`voting-results-${index + 1}`}
                  className={`text-center border border-1 bg-${variants[index]}`}
                  style={{
                    height: "2rem",
                    width: percentage ? `${percentage}%` : "auto",
                  }}
                />
              );
            })
          : null}
      </section>
      {/* percentages end */}
      {/* Vote Counts */}
      <Row id="vote-counts" as="section" {...rowHelper(options.length)}>
        {options.map((_, index) => (
          <Col
            key={`voting-results-${index + 1}`}
            className={`text-center text-${variants[index]}`}
          >
            {currentVotes?.[`option${index + 1}`]} Votes
          </Col>
        ))}
      </Row>
      {/* Vote Counts End */}
      {/* Buttons */}
      <Row id="voting-buttons" as="section" {...rowHelper(options.length)}>
        {optionButtons}
      </Row>
      {/* Buttons end */}
    </>
  );
};

export default PollOfTheDay;
