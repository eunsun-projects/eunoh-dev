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
import { useAuth } from "@/hooks/auth/useAuth";
import { useChat } from "@ai-sdk/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { z } from "zod";
import { useUsageCalculatorStore } from "../_libs/zustand";
import ChatTextArea from "./ChatTextArea";

interface MarkdownProps {
  children: React.ReactNode;
  node: React.ReactNode;
}

const formSchema = z.object({
  message: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
});

function Chat() {
  const { user } = useAuth();
  const { inputModel: model, setUsage } = useUsageCalculatorStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: handleChatSubmit,
    setInput,
  } = useChat({
    onFinish: (message, options) => {
      // console.log("finished message", message);
      console.log("usage ===>", options.usage);
      setUsage(options.usage);
    },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    if (!user) {
      toast.error("Please login to use the chat");
      return;
    }
    if (!user.isAdmin) {
      toast.error("Please login as an admin to use the chat");
      return;
    }
    handleChatSubmit(
      {},
      {
        body: {
          model: model,
        },
      }
    );
  };

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <div className="w-full h-[440px] flex flex-col gap-2 text-xs overflow-y-auto">
        {messages.map((m) => (
          <div key={m.id} className="w-full break-keep">
            {m.role === "user" ? (
              <div className="flex w-full justify-end min-h-6 rounded-md whitespace-pre-wrap">
                <p className="flex w-[70%] items-center bg-black/30 text-cyan-400 text-stroke-green rounded-md px-2">
                  <span className="leading-2">{`🍀 User: ${m.content}`}</span>
                </p>
              </div>
            ) : (
              <div className="flex w-full justify-start min-h-8 flex-col gap-2">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={components}
                >
                  {m.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="min-w-[680px] w-[90svw] lg:w-1/2 fixed bottom-3 left-1/2 -translate-x-1/2"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full space-y-0">
                <FormLabel className="hidden">Message</FormLabel>
                <FormControl>
                  <ChatTextArea
                    value={input}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        e.currentTarget.form?.requestSubmit();
                        form.reset({ message: "" });
                        setInput("");
                      }
                    }}
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e);
                    }}
                  />
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
                <Send className="!size-5" />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}

export default Chat;

const components = {
  p: ({ ...props }: MarkdownProps) => (
    <p className="text-neutral-200" {...props} />
  ),
  a: ({ ...props }: MarkdownProps) => (
    <a className="text-neutral-200" {...props} />
  ),
  h1: ({ ...props }: MarkdownProps) => (
    <h1 className="text-neutral-200" {...props} />
  ),
  h2: ({ ...props }: MarkdownProps) => (
    <h2 className="text-neutral-200" {...props} />
  ),
  h3: ({ ...props }: MarkdownProps) => (
    <h3 className="text-neutral-200" {...props} />
  ),
  h4: ({ ...props }: MarkdownProps) => (
    <h4 className="text-neutral-200" {...props} />
  ),
  h5: ({ ...props }: MarkdownProps) => (
    <h5 className="text-neutral-200" {...props} />
  ),
  h6: ({ ...props }: MarkdownProps) => (
    <h6 className="text-neutral-200" {...props} />
  ),
  ul: ({ ...props }: MarkdownProps) => (
    <ul className="text-neutral-200" {...props} />
  ),
  ol: ({ ...props }: MarkdownProps) => (
    <ol className="text-neutral-200" {...props} />
  ),
  li: ({ ...props }: MarkdownProps) => (
    <li className="text-neutral-200" {...props} />
  ),
  blockquote: ({ ...props }: MarkdownProps) => (
    <blockquote className="text-neutral-200" {...props} />
  ),
  code: ({ ...props }: MarkdownProps) => (
    <code className="text-neutral-200" {...props} />
  ),
  img: ({ ...props }: MarkdownProps) => (
    <img
      className="text-neutral-200 w-full h-full"
      {...props}
      alt="this is markdown img"
    />
  ),
  pre: ({ ...props }: MarkdownProps) => (
    <pre className="text-neutral-200" {...props} />
  ),
  table: ({ ...props }: MarkdownProps) => (
    <table className="text-neutral-200" {...props} />
  ),
} as Components;
