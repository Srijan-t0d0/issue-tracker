import { Table, TableCell } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "../components";
import IssueActions from "./IssueActions";

const LoadingIssuePage = () => {
  const issues = [1, 2, 3, 4, 5];
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className="w-[125px] ">
              Issue
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className=" hidden md:w-[75px]  md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden  md:w-[70px] md:table-cell">
              CreatedAt
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <TableCell>
                <Skeleton />
                <div className=" md:hidden">
                  <Skeleton />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell ">
                <Skeleton />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton />
              </TableCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingIssuePage;
