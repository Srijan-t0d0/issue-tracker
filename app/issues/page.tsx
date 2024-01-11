import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Table, TableCell } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "../components";
import IssueActions from "./IssueActions";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { count } from "console";
import Pagination from "../components/Pagination";

const columns: { className: string; label: string; value: keyof Issue }[] = [
  { className: "w-[125px]", label: "Issue", value: "title" },
  {
    className: "hidden md:w-[75px]  md:table-cell",
    label: "Status",
    value: "status",
  },
  {
    className: "hidden  md:w-[70px] md:table-cell",
    label: "Created",
    value: "createdAt",
  },
];
const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { page: string; status: Status; orderBy: keyof Issue };
}) => {
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;

  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: pageSize * (page - 1),
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <TableCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </TableCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={page}
        itemCount={issueCount}
        pageSize={pageSize}
      />
    </div>
  );
};
export const dynamic = "force-dynamic";
export default IssuesPage;
