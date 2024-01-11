import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueSummery from "./IssueSummery";
import LatestIssues from "./LatestIssues";
import IssueCharts from "./IssueCharts";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
  const statusCounts = await prisma.issue.groupBy({
    _count: true,
    by: "status",
  });

  const countStatus: Partial<{ [key in Status]: number }> = {};
  statusCounts.map(({ _count, status }) => (countStatus[status] = _count));

  return (
    <>
      <Grid gap={"5"} columns={{ initial: "1", md: "2" }}>
        <Flex gap={"5"} direction={"column"}>
          <IssueSummery
            open={countStatus.OPEN!}
            closed={countStatus.CLOSED!}
            inProgress={countStatus.IN_PROGRESS!}
          />
          <IssueCharts
            open={countStatus.OPEN!}
            closed={countStatus.CLOSED!}
            inProgress={countStatus.IN_PROGRESS!}
          />
        </Flex>
        <LatestIssues />
      </Grid>
    </>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of projects",
};
