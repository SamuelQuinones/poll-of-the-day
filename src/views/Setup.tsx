import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { svgProps } from "utils";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ReactComponent as Trash } from "assets/trash-fill.svg";
import { ReactComponent as Plus } from "assets/plus-circle.svg";
import { ReactComponent as Cross } from "assets/x-lg.svg";
import { ReactComponent as Check } from "assets/check-circle.svg";

//* REDUX
import { useAppDispatch } from "store/hooks";
import { formActions } from "store/slice/Form";
import { viewActions } from "store/slice/View";
import { voteActions } from "store/slice/Votes";

export type FormValues = {
  question: string;
  options: {
    answer: string;
  }[];
};

const PollSetup = () => {
  //* Core
  const {
    register,
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      question: "",
      options: [{ answer: "" }, { answer: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "options",
    control,
  });

  //* 2 option mimnimum
  useEffect(() => {
    if (fields.length < 2) {
      append({ answer: "" });
    }
  }, [append, fields.length]);

  //* REDUX
  const dispatch = useAppDispatch();

  const onSubmit = (data: FormValues) => {
    //* first set up all of the voting options in the store
    for (let i = 0; i < data.options.length; i++) {
      dispatch(voteActions.set({ option: i + 1, count: 0 }));
    }
    //* then set up the values
    const question = /\?$/gm.test(data.question)
      ? data.question
      : data.question + "?";
    dispatch(formActions.setQuestion(question));
    dispatch(formActions.setOptionsFormValue(data.options));
    dispatch(viewActions.setView("poll"));
  };

  return (
    <form id="poll-setup" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      {/* INPUT FIELD */}
      <section id="text-inputs">
        {/* QUESTION */}
        <Form.Group as="fieldset" id="the-question" controlId="poll-question">
          <Form.Label>Today's Question</Form.Label>
          <Form.Control
            type="text"
            autoComplete="off"
            placeholder="What is today's question"
            {...register("question", { required: true })}
            // className="rounded-pill"
            isInvalid={!!errors?.question}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.question && "Question is a Required Field"}
          </Form.Control.Feedback>
        </Form.Group>
        {/* QUESTION END */}
        {/* ANSWERS */}
        <fieldset id="the-answers" className="my-2">
          <p className="mb-0">Answers...</p>
          {fields.map((field, index) => {
            const errorMessage =
              index < 2
                ? "This option is required"
                : "If included, this option is required";
            return (
              <div
                id={`option-${field.id}-wrapper`}
                key={field.id}
                className="my-2"
              >
                <div
                  id={`option-${field.id}-group`}
                  className="d-flex"
                  style={{ gap: "0.5rem" }}
                >
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    aria-label="Add a poll option"
                    placeholder="Add a poll option"
                    data-lpignore="true"
                    {...register(`options.${index}.answer` as const, {
                      required: true,
                    })}
                    // className="rounded-pill"
                    isInvalid={!!errors?.options?.[index]?.answer}
                  />
                  <Button
                    id={`option-${field.id}-button`}
                    onClick={() => remove(index)}
                    variant="outline-secondary"
                    title="Remove this option"
                    // className="rounded-circle"
                  >
                    <Cross {...svgProps} />
                  </Button>
                </div>
                {errors?.options?.[index]?.answer && (
                  <Form.Control.Feedback
                    type="invalid"
                    id={`option-${field.id}-feedback`}
                    className="d-block mt-0"
                  >
                    {errors?.options?.[index]?.answer && errorMessage}
                  </Form.Control.Feedback>
                )}
              </div>
            );
          })}
        </fieldset>
        {/* ANSWERS END */}
      </section>
      {/* INPUT FIELD END */}
      {/* ACTIONS */}
      <section id="action-buttons" className="d-flex flex-column flex-md-row">
        <Button
          className="rounded-pill flex-grow-1"
          onClick={() => append({ answer: "" })}
          disabled={fields.length >= 6}
        >
          <Plus {...svgProps} /> Add Option
        </Button>
        <Button
          className="rounded-pill flex-grow-1"
          onClick={() => {
            setValue("options", [{ answer: "" }, { answer: "" }]);
            clearErrors("options");
          }}
          variant="warning"
        >
          <Trash {...svgProps} /> Clear All
        </Button>
        <Button
          className="rounded-pill flex-grow-1"
          type="submit"
          variant="success"
        >
          <Check {...svgProps} /> Start Poll
        </Button>
      </section>
    </form>
  );
};

export default PollSetup;
