import React from "react";
import IssueForm from "@/app/issues/_components/IssueForm";

const NewIssuePage = ({ params: { id } }: { params: { id: string } }) => {
  return <IssueForm />;
};

export default NewIssuePage;
