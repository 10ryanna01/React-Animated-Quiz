import React, { forwardRef } from "react";
import { Content, Question } from "../../../interfaces";

import  {QuestionBlock}  from "./QuestionBlock"

const QuestionsBlock = (
  { quizItem, setChosenAnswerItems, setUnAnswerdQuestionIds, unAnswerdQuestionIds, chosenAnswerItems}: { 
  quizItem: Content, setChosenAnswerItems: Function, setUnAnswerdQuestionIds:Function,
  unAnswerdQuestionIds:number[] | undefined, 
  chosenAnswerItems:string[] },
  ref: React.LegacyRef<HTMLHeadingElement> | undefined ) => {


  return ( 
    <>
      <h2 ref={ref} id={String(quizItem.id)} className="UI__Quiz__questions-c__title">{quizItem.text}</h2>

      <div className="UI__Quiz__questions-c">
        {quizItem?.questions.map((question: Question, _index: number) => (
        
        <QuestionBlock key={_index} 
        question={question} 
        setChosenAnswerItems={setChosenAnswerItems}
          setUnAnswerdQuestionIds={setUnAnswerdQuestionIds}
          unAnswerdQuestionIds={unAnswerdQuestionIds}
          quizItemId={quizItem.id}
          chosenAnswerItems={chosenAnswerItems} />
        ))}
      </div>
    </>
  );
};


export default forwardRef(QuestionsBlock);
