import { Question } from "../../../interfaces";
 
export const QuestionBlock = ({
  quizItemId,
  question,
  setChosenAnswerItems,
  setUnAnswerdQuestionIds,
  unAnswerdQuestionIds,
  chosenAnswerItems,
}: {
  quizItemId: number;
  question: Question;
  setChosenAnswerItems: Function;
  setUnAnswerdQuestionIds: Function;
  unAnswerdQuestionIds: number[] | undefined;
  chosenAnswerItems: string[];
}) => {

  
  const handleQClick = () => {
    console.log("you clicked ittt");
    setChosenAnswerItems((prevState: string[]) => [...prevState, question.text]);
    setUnAnswerdQuestionIds(
      unAnswerdQuestionIds?.filter((id: number) => id !== quizItemId)
    );
  };

  const validPick =
    !chosenAnswerItems?.includes(question.text) &&
    !unAnswerdQuestionIds?.includes(quizItemId);

  return (
    <>
      <button
        
        className="UI__Quiz__question-c"
        onClick={handleQClick}
        disabled={validPick}
      >
        
        <img
          src={question.image}
          className="UI__Quiz__question-c__img"
          alt={question.alt}
        />
       
        <div className="UI__Quiz__question-c__details--credit">    
      
          <a href="https://www.unsplash.com" className="UI__Quiz__question-c__details__link--alt">
          {question.credit}{" "}    @ UnSplash
          </a> 
        </div>
        <div className="UI__Quiz__question-c__details">
        <h3 className="UI__Quiz__question-c__title">{question.text}</h3>
      
        </div>
      </button>
    </>
  );
};
