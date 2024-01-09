import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);

  if (typeof id !== "number" || isNaN(id)) notFound();

  const issue = await prisma.issue.findUnique({
    where: {
      id,
    },
  });
  if (!issue) notFound();
  return (
    <Grid gap={"5"} columns={{ initial: "1", md: "2" }}>
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
