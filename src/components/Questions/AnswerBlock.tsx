import  { useState, useEffect, forwardRef } from "react";
import { Answer } from "../../../interfaces";

const AnswerBlock = (
  {
 
    answerOptions,
    chosenAnswers,
    handleRestart,
  }: {
  
    handleRestart: Function;
    answerOptions: Answer[] | undefined;
    chosenAnswers: string[];
  },
  ref: HTMLDivElement | any
) => {
  const [result, setResult] = useState<Answer | null>();


  useEffect(() => {

    answerOptions?.forEach((answer: Answer) => {
      if (
        chosenAnswers.includes(answer.combination[0]) &&
        chosenAnswers.includes(answer.combination[1]) &&
        chosenAnswers.includes(answer.combination[2])
      ) {
        setResult(answer);
  
      }
    });
    console.log(result);
  }, [chosenAnswers]);
  //@ts-ignore
  const refreshPage = () => {

    handleRestart(); 
    console.log('quiz restarted from child component to parent component');
  };

  return (
  


      <>
        <div ref={ref} className="UI__Quiz__answer-block__content">
          <h2 className="UI__Quiz__answer-block__content__title">{result?.text}</h2>
          <img src={result?.image} alt={result?.text}  className="UI__Quiz__answer-block__content__img"/>
      
          <button onClick={refreshPage} className="UI__Quiz__answer-block__content__cta"> take the quiz again</button>
        </div>
      
    </>
  );
};
export default forwardRef(AnswerBlock);
