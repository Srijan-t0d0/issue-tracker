import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueSummery from "./IssueSummery";
import LatestIssues from "./LatestIssues";
import IssueCharts from "./IssueCharts";

export default async function Home() {
  const statusCounts = await prisma.issue.groupBy({
    _count: true,
    by: "status",
  });

  const countStatus: Partial<{ [key in Status]: number }> = {};
  statusCounts.map(({ _count, status }) => (countStatus[status] = _count));

  return (
    <>
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
      <LatestIssues />
    </>
  );
}
