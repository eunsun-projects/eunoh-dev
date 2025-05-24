"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ChatTextArea from "./ChatTextArea";

const formSchema = z.object({
  message: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
});

function Chat() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full relative">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full space-y-0">
              <FormLabel className="hidden">Message</FormLabel>
              <FormControl>
                <ChatTextArea {...field} />
              </FormControl>
              <FormDescription className="hidden">
                This is your message.
              </FormDescription>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />
        <div className="absolute top-0 right-2 w-fll h-[60px] flex justify-center items-center">
          <div className="w-fit h-9 flex justify-center items-center">
            <Button
              variant="secondary"
              type="submit"
              className="h-full w-9 p-0 hover:bg-neutral-900"
            >
              <Send className="!size-6" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default Chat;
