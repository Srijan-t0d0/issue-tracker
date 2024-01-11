import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummery = ({ closed, inProgress, open }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    {
      label: "Open Issues",
      value: open,
      status: "OPEN",
    },
    {
      label: "In Progess Issues",
      value: inProgress,
      status: "IN_PROGRESS",
    },
    {
      label: "Closed Issues",
      value: closed,
      status: "CLOSED",
    },
  ];
  return (
    <Flex gap={"4"}>
      {containers.map((container) => (
        <Link
          className="text-sm font-medium"
          key={container.label}
          href={`/issues?status=${container.status}`}
        >
          <Card>
            <Flex gap={"1"} direction={"column"}>
              {container.label}

              <Text className="font-bold" size={"5"} align={"center"}>
                {container.value}
              </Text>
            </Flex>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};

export default IssueSummery;
