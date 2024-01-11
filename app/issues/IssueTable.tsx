import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table, TableCell } from "@radix-ui/themes";
import NextLink from "next/link";
import { IssueStatusBadge, Link } from "../components";

export interface IssueQuery {
  page: string;
  status: Status;
  orderBy: keyof Issue;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ issues, searchParams }: Props) => {
  return (
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
  );
};

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
export const columnNames = columns.map((column) => column.value);
export default IssueTable;
