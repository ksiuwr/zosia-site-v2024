import React from "react";

interface CardProps {
  title: string;
  content: string;
  authors: string;
  description: string;
}

export const Card = ({ title, content, authors, description }: CardProps) => {
  return (
    <div className="mx-auto w-full 2xl:container">
      <div className="card card-compact mx-auto mb-8 w-5/6 bg-base-300 lg:card-normal lg:w-7/12">
        <div className="card-body">
          <h2 className="card-title text-lg lg:text-xl">{title}</h2>
          <p className="whitespace-pre-wrap">{content}</p>
          <div className="divider divider-accent my-1"></div>
          <div className="card-actions flex-wrap justify-between gap-y-1">
            <span className="font-bold">{authors}</span>
            <span>{description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
