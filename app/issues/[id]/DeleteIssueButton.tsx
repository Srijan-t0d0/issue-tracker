import { Button } from "@radix-ui/themes";
import axios from "axios";
import React from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const handleClick = async () => {
    await axios.delete("/api/issue/" + issueId);
  };

  return <Button color="red">Delete Issue</Button>;
};

export default DeleteIssueButton;
