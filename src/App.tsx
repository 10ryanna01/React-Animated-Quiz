import { useState, useEffect, createRef } from "react";
import { Content, QuizData } from "../interfaces";
import { Title } from "./components/Title/Title";
import QuestionsBlock from "./components/Questions/QuestionsBlock";
import AnswerBlock from "./components/Questions/AnswerBlock";

const App = () => {
  const [resultContainer, setResultContainer] = useState<boolean>(true);
  const [quiz, setQuiz] = useState<QuizData | null>();

  const [animateFinalResultCard, setAnimateFinalResultCard] =
    useState<string>();

  const [chosenAnswerItems, setChosenAnswerItems] = useState<string[]>([]);
  const [unAnswerdQuestionIds, setUnAnswerdQuestionIds] = useState<
    number[] | undefined
  >([]);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  type ReduceType = {
    id?: {};
  };

  const refs = unAnswerdQuestionIds?.reduce<ReduceType | any>((acc, id) => {
    acc[id as unknown as keyof ReduceType] = createRef<HTMLDivElement | null>();
    return acc;
  }, {});

  const answerRef = createRef<HTMLDivElement | null>();

  const fetchData = async () => {
    try {
      const response = await fetch("/sample-data.json");
      // toggle cloud version @ http://localhost:8000/
      
      const json = await response.json();
      setQuiz(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const unAnswerdIds = quiz?.content?.map(({ id }: Content) => id);
    setUnAnswerdQuestionIds(unAnswerdIds);
  }, [quiz]);

  useEffect(() => {
    if (chosenAnswerItems.length > 0 && unAnswerdQuestionIds) {
      if (showAnswer && answerRef.current) {
        answerRef.current.scrollIntoView({
          behavior: "auto",
          block: "center",
          inline: "center",
        });
      }

      if (unAnswerdQuestionIds.length <= 0 && chosenAnswerItems.length >= 1) {
        setShowAnswer(true);
      } else {
        const highestId = Math.min(...unAnswerdQuestionIds);
        refs[highestId].current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [
    unAnswerdQuestionIds,
    chosenAnswerItems.length,
    showAnswer,
    answerRef.current,
    refs,
  ]);

  // console.log(chosenAnswerItems);
  // console.log(unAnswerdQuestionIds);

  const handleRestart = () => {
    setAnimateFinalResultCard(" animate__bounceOut");

    // start countdown to restart the UI components
    const timer = setTimeout(() => {
      fetchData();
      setChosenAnswerItems([]);
      setShowAnswer(false);
      setAnimateFinalResultCard(" ");
      console.log(" timer ended....ready to restart!");
      // scrolls to top to begin
      window.scrollTo(0, 0)
    }, 500);
  

  };

  return (
    <div className="UI__Quiz">
      <Title title={quiz?.title} subtitle={quiz?.subtitle} />
      <div>
        {refs &&
          quiz?.content.map((content: Content) => (
            <QuestionsBlock
              key={content.id}
              quizItem={content}
              setChosenAnswerItems={setChosenAnswerItems}
              setUnAnswerdQuestionIds={setUnAnswerdQuestionIds}
              ref={refs[content.id]}
              unAnswerdQuestionIds={unAnswerdQuestionIds}
              chosenAnswerItems={chosenAnswerItems}
            />
          ))}
      </div>

      {showAnswer && (
        <div className="UI__Quiz__answer-block-c">
          <div className={` UI__Quiz__answer-block  ${animateFinalResultCard}`}>
            <AnswerBlock
              answerOptions={quiz?.answers}
              chosenAnswers={chosenAnswerItems}
              ref={answerRef}
              handleRestart={handleRestart}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
