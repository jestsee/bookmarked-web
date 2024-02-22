import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookmarkPayload,
  bookmarkPayload,
} from "@/server/notion/notion.schema";
import { trpc } from "@/trpc-client/trpc";

interface Props {
  addBookmarkId: (url: string) => void;
}

const BookmarkForm = ({ addBookmarkId }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookmarkPayload>({
    resolver: zodResolver(bookmarkPayload),
  });

  const { mutateAsync, isPending, error } = trpc.bookmarkTweet.useMutation();

  const onSubmit = handleSubmit((values) => {
    toast.promise(mutateAsync(values), {
      loading: "It may take a while, please wait...",
      success(response) {
        reset();
        addBookmarkId(response.id);
        return JSON.stringify(response);
      },
      error() {
        return error?.message;
      },
    });
  });

  return (
    <form
      {...{ onSubmit }}
      className="flex w-full max-w-sm items-center space-x-2"
    >
      <div className="flex">
        <Input type="url" placeholder="Twitter URL" {...register("url")} />
        <Button loading={isPending} type="submit">
          Bookmark
        </Button>
      </div>
      {errors.url && <p>{errors.url.message}</p>}
    </form>
  );
};

export default BookmarkForm;
