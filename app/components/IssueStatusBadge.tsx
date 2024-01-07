import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const IssueStatusBadge = ({ status }: { status: Status }) => {
  switch (status) {
    case "OPEN":
      return <Badge color="red">Open</Badge>;
    case "IN_PROGRESS":
      return <Badge color="violet">In progress</Badge>;
    case "CLOSED":
      return <Badge color="grass">Closed</Badge>;
    default:
      return null; // Handle the default case if needed
  }
};

export default IssueStatusBadge;
