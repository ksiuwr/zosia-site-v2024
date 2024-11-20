import React from "react";
import { CenteredContentContainer } from "./containers/CenteredContentContainer";

interface CardProps {
  title: string;
  content: string;
  authors: string;
  description: string;
}

export const Card = ({ title, content, authors, description }: CardProps) => {
  return (
    <CenteredContentContainer>
      <div className="card card-bordered card-compact mb-8 border-base-content bg-base-100 lg:card-normal">
        <div className="card-body">
          <h2 className="card-title text-lg lg:text-xl">{title}</h2>
          <p className="whitespace-pre-wrap">{content}</p>
          <div className="divider my-1"></div>
          <div className="card-actions flex-wrap justify-between gap-y-1">
            <span className="font-bold">{authors}</span>
            <span>{description}</span>
          </div>
        </div>
      </div>
    </CenteredContentContainer>
  );
};
