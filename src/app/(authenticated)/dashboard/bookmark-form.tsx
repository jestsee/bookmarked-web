import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookmarkPayload,
  bookmarkPayload,
} from "@/server/notion/notion.schema";
import { trpc } from "@/trpc-client/trpc";

const BookmarkForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookmarkPayload>({
    resolver: zodResolver(bookmarkPayload),
  });

  const { mutate, isPending } = trpc.bookmarkTweet.useMutation();

  const onSubmit = handleSubmit((values) => {
    console.log(values);
    mutate(values);
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
