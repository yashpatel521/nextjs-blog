"use client";
import React from "react";

const error = ({ error }: { error: Error }) => {
  return (
    <div>
      Error Oops
      <p className="text-red-500">{error.message}</p>
    </div>
  );
};

export default error;
