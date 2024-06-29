import React from "react";

interface CardProps {
  title: string;
  content: string;
  authors: string[];
  description: string;
}

export const Card = ({ title, content, authors, description }: CardProps) => {
  return (
    <div className="container card mx-auto mb-8 w-5/6 bg-base-300 lg:w-1/2">
      <div className="card-body lg:text-lg">
        <h2 className="card-title">{title}</h2>
        <p className="whitespace-pre-wrap">{content}</p>
        <div className="divider my-1 before:bg-accent after:bg-accent"></div>
        <div className="card-actions justify-start gap-5">
          <span className="font-bold">{authors.join(", ")}</span>
          <span>{description}</span>
        </div>
      </div>
    </div>
  );
};
