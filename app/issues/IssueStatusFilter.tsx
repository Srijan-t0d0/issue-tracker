"use client";
import { Status } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Select } from "@radix-ui/themes";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "All"}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        status = status === "All" ? "" : status;
        if (status) params.append("status", status);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);
        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues/" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by Status..."></Select.Trigger>
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || "All"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
