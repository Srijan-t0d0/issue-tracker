"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { IssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Box, Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueFormData = z.infer<typeof IssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const [IsSubmitting, setIsSubmitting] = useState(false);
  const [Error, setError] = useState("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });
  return (
    <Box className="max-w-xl space-y-3 ">
      {Error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{Error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="max-w-xl "
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmitting(true);
            if (issue) await axios.patch("/api/issues/" + issue.id, data);
            else await axios.post("/api/issues", data);
            router.push("/issues");
            router.refresh();
          } catch (error) {
            setError("An unexpected error occurred.");
          }
        })}
      >
        <TextField.Root mb={"3"}>
          <TextField.Input
            defaultValue={issue?.title}
            {...register("title")}
            placeholder="Title"
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={IsSubmitting}>
          {issue ? "Edit Issue" : "Submit New Issue"}{" "}
          {IsSubmitting && <Spinner />}
        </Button>
      </form>
    </Box>
  );
};

export default IssueForm;
