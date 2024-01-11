"use client";

import { Card } from "@radix-ui/themes";
import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}
const IssueCharts = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In progress", value: inProgress },
    { label: "Closed", value: closed },
  ];
  return (
    <Card>
      <ResponsiveContainer height={300} width={"100%"}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            barSize={60}
            dataKey="value"
            style={{ fill: "var(--accent-9)", opacity: "80%" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueCharts;
