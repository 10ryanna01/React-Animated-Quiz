import React, { FC } from "react";
import { QuizData } from "../../../interfaces";

export const Title = ({
  title,
  subtitle,
}: {
  title: QuizData["title"] | undefined;
  subtitle: QuizData["subtitle"] | undefined;
}) => {
  return (
    <>
  
      <h1 className="UI__Quiz__header__title">{title}</h1>
      <p className="UI__Quiz__header__subtitle">{subtitle}</p>
    </>
  );
};
