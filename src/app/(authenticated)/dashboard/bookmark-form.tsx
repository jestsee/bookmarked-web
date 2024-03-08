import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Bookmark } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  BookmarkPayload,
  bookmarkPayload,
  BookmarkType,
} from "@/server/notion/notion.schema";
import { trpc } from "@/trpc-client/trpc";

import { ProcessedBookmark } from "./type";

interface Props {
  processBookmark: (item: ProcessedBookmark) => void;
}

const BookmarkForm = ({ processBookmark }: Props) => {
  const DEFAULT_TYPE = "thread";
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookmarkPayload>({
    resolver: zodResolver(bookmarkPayload),
    defaultValues: { type: DEFAULT_TYPE },
  });

  const { mutateAsync, isPending, error } = trpc.bookmarkTweet.useMutation();

  const onSubmit = handleSubmit((values) => {
    toast.promise(mutateAsync(values), {
      loading: "Please wait...",
      success(response) {
        reset();
        processBookmark({ id: response.id, ...values });
        return "Track your bookmark status below";
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
          <Button
            className="space-x-1.5 rounded-r-3xl pl-5 pr-6"
            loading={isPending}
            type="submit"
          >
            <Bookmark className="h-5 w-5" />
            <span className="hidden font-semibold sm:block">Bookmark</span>
          </Button>
        </div>
        <ToggleGroup
          className="gap-0"
          variant="outline"
          defaultValue={DEFAULT_TYPE}
          type="single"
          onValueChange={(value) => {
            setValue("type", value as BookmarkType);
          }}
        >
          <ToggleGroupItem className="rounded-r-none px-4" value="tweet">
            Tweet
          </ToggleGroupItem>
          <ToggleGroupItem className="rounded-l-none px-4" value="thread">
            Thread
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      {errors.url && <p>{errors.url.message}</p>}
    </form>
  );
};

export default BookmarkForm;
