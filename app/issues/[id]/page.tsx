import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);
  const sesson = await getServerSession(authOptions);
  if (typeof id !== "number" || isNaN(id)) notFound();

  const issue = await prisma.issue.findUnique({
    where: {
      id,
    },
  });
  if (!issue) notFound();
  return (
    <Grid gap={"5"} columns={{ initial: "1", sm: "5" }}>
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>

      {sesson && (
        <Box>
          <Flex direction={"column"} gap={"4"}>
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
