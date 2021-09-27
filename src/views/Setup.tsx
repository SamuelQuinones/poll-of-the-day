import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//* REDUX
import { useAppDispatch } from "store/hooks";
import { formActions } from "store/Form/slice";
import { viewActions } from "store/View/slice";
import { voteActions } from "store/Votes/slice";

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
    dispatch(formActions.setQuestion(data.question));
    dispatch(formActions.setOptionsFormValue(data.options));
    dispatch(viewActions.setView("poll"));
  };

  return (
    <form id="poll-setup" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      {/* INPUT FIELD */}
      <section id="text-inputs">
        {/* QUESTION */}
        <Form.Group id="the-question" controlId="poll-question">
          <Form.Label>Today's Question</Form.Label>
          <Form.Control
            type="text"
            autoComplete="off"
            placeholder="What is today's question"
            {...register("question", { required: true })}
            isInvalid={!!errors?.question}
          />
        </Form.Group>
        {/* QUESTION END */}
        {/* ANSWERS */}
        <div id="the-answers">
          <p className="mb-0 mt-2">Answers...</p>
          {fields.map((field, index) => {
            return (
              <InputGroup
                id={`option-${field.id}-group`}
                className="my-2 rounded"
                key={field.id}
                hasValidation
              >
                <Form.Control
                  style={{
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                  }}
                  autoComplete="off"
                  type="text"
                  aria-describedby={`option-${field.id}-button`}
                  aria-label="Add a poll option"
                  placeholder="Add a poll option"
                  {...register(`options.${index}.answer` as const, {
                    required: true,
                  })}
                  isInvalid={!!errors?.options?.[index]?.answer}
                />
                <Button
                  id={`question-${field.id}-button`}
                  onClick={() => remove(index)}
                  variant="outline-secondary"
                >
                  X
                </Button>
              </InputGroup>
            );
          })}
        </div>
        {/* ANSWERS END */}
      </section>
      {/* INPUT FIELD END */}
      {/* ACTIONS */}
      <section id="action-buttons" className="d-flex flex-column flex-md-row">
        <Button
          className="rounded-0 flex-grow-1"
          onClick={() => append({ answer: "" })}
          disabled={fields.length >= 6}
        >
          Add Option +
        </Button>
        <Button
          className="rounded-0 flex-grow-1"
          onClick={() => setValue("options", [{ answer: "" }, { answer: "" }])}
          variant="warning"
        >
          Clear All
        </Button>
        <Button
          className="rounded-0 flex-grow-1"
          type="submit"
          variant="danger"
        >
          Start Poll
        </Button>
      </section>
    </form>
  );
};

export default PollSetup;
