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
      loading: "Please wait...",
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
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Option One</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Option Two</Label>
          </div>
        </RadioGroup>
        <Button loading={isPending} type="submit">
          Bookmark
        </Button>
      </div>
      {errors.url && <p>{errors.url.message}</p>}
    </form>
  );
};

export default BookmarkForm;
