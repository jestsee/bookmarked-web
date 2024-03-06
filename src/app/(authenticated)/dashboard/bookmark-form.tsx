import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  BookmarkPayload,
  bookmarkPayload,
} from "@/server/notion/notion.schema";
import { trpc } from "@/trpc-client/trpc";

import { ProcessedBookmark } from "./type";

interface Props {
  processBookmark: (item: ProcessedBookmark) => void;
}

const BookmarkForm = ({ processBookmark }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookmarkPayload>({
    resolver: zodResolver(bookmarkPayload),
    defaultValues: { type: "thread" },
  });

  const { mutateAsync, isPending, error } = trpc.bookmarkTweet.useMutation();

  const onSubmit = handleSubmit((values) => {
    toast.promise(mutateAsync(values), {
      loading: "Please wait...",
      success(response) {
        reset();
        processBookmark({ id: response.id, ...values });
        return JSON.stringify(response);
      },
      error() {
        return error?.message;
      },
    });
  });

  return (
    <form className="mx-auto max-w-lg" {...{ onSubmit }}>
      <div className="space-y-4">
        <div className="flex w-full gap-2">
          <Input
            className="rounded-l-3xl px-6 py-4"
            type="url"
            placeholder="Paste the tweet URL here"
            {...register("url")}
          />
          <Button className="rounded-r-3xl" loading={isPending} type="submit">
            Bookmark
          </Button>
        </div>
        <RadioGroup defaultValue="thread" {...register("type")}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="tweet" id="tweet" />
            <Label htmlFor="tweet">Tweet</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="thread" id="thread" />
            <Label htmlFor="thread">Thread</Label>
          </div>
        </RadioGroup>
      </div>
      {errors.url && <p>{errors.url.message}</p>}
    </form>
  );
};

export default BookmarkForm;
