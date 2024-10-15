import clsx from "clsx";
import React from "react";

// Define the props interface
interface TitleProps {
  title: string;      // Title must be a string
  className?: string; // className is optional
}

const Title: React.FC<TitleProps> = ({ title, className }) => {
  return (
    <h2 className={clsx("text-2xl font-semibold capitalize", className)}>
      {title}
    </h2>
  );
};

export default Title;
