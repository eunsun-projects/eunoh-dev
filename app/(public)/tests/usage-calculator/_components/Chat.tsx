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
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/auth/useAuth";
import { useChat } from "@ai-sdk/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";
import { useGenTxtToImgQuery } from "../_hooks/query.hooks";
import { type Model, useUsageCalculatorStore } from "../_libs/zustand";
import ChatTextArea from "./ChatTextArea";

interface MarkdownProps {
  children: React.ReactNode;
  node: React.ReactNode;
}

const formSchema = z.object({
  message: z.string(),
});

function Chat() {
  const [isComposing, setIsComposing] = useState(false);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { user } = useAuth();
  const { mode, model, base, setUsage } = useUsageCalculatorStore(
    useShallow((state) => ({
      base: state.base,
      mode: state.mode,
      model: state.model,
      setUsage: state.setUsage,
    }))
  );
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
      console.log("chat usage ===>", options.usage);
      setUsage(options.usage);
    },
  });

  const {
    data: txtToImgData,
    status: txtToImgImagesStatus,
    fetchStatus: txtToImgImagesFetchStatus,
    error: txtToImgImagesError,
    refetch: imagesRefetch,
  } = useGenTxtToImgQuery({
    prompt,
    model,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<number>(0);

  const resetAll = () => {
    setInput("");
    form.reset({ message: "" });
    form.clearErrors("message");
  };

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    if (data.message.length < 5) {
      toast.error("메시지는 5자 이상이어야 합니다.");
      return;
    }
    if (!user) {
      toast.error("Please login to use the chat");
      return;
    }
    if (!user.isAdmin) {
      toast.error("Please login as an admin to use the chat");
      return;
    }

    const selectedModel: Model = base.input_txt_base.model
      ? base.input_txt_base.model
      : base.input_image_base.model!;

    if (mode === "txt-to-image") {
      setPrompt(data.message);
      resetAll();
      return;
    }

    handleChatSubmit(
      {},
      {
        body: {
          model: selectedModel,
        },
      }
    );

    resetAll();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing || isComposing) return;
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  const handleComposition = (
    e: React.CompositionEvent<HTMLTextAreaElement>
  ) => {
    if (e.type === "compositionstart") {
      setIsComposing(true);
    } else if (e.type === "compositionend") {
      setIsComposing(false);
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    console.log("txtToImgData ===>", txtToImgData);
    if (!txtToImgData || txtToImgData.length === 0) return;
    if (countRef.current < txtToImgData.length) {
      setGeneratedImage(txtToImgData[countRef.current].partial_image_b64s[0]);
      if (txtToImgData[countRef.current].status === "partial") {
        countRef.current++;
        return;
      }
      if (txtToImgData[countRef.current].status === "completed") {
        setUsage(txtToImgData[txtToImgData.length - 1].usage ?? null);
        console.log(
          "image usage ===>",
          txtToImgData[txtToImgData.length - 1].usage
        );
        countRef.current = 0;
        return;
      }
    }
  }, [txtToImgData, setUsage]);

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="w-full h-auto min-h-[calc(100%-74px)] flex flex-col gap-2 text-xs overflow-y-auto justify-center items-center">
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
        {txtToImgImagesFetchStatus === "fetching" ? (
          <div className="w-[256px] h-[256px] rounded-lg overflow-hidden transition-shadow duration-300">
            <Skeleton className="w-full h-full" />
          </div>
        ) : null}
        {txtToImgData && txtToImgData.length > 0 && (
          <div className="w-[256px] h-[256px] rounded-lg overflow-hidden transition-shadow duration-300">
            <img
              src={`data:image/png;base64,${generatedImage}`}
              alt={"Generated content"}
              className="object-cover aspect-square"
            />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="min-w-[680px] w-[90svw] h-[60px] lg:w-1/2 relative left-1/2 -translate-x-1/2"
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
                    onKeyDown={handleKeyDown}
                    onCompositionStart={handleComposition}
                    onCompositionEnd={handleComposition}
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormDescription className="hidden">
                  This is your message.
                </FormDescription>
                <FormMessage className="absolute bottom-0 left-2 text-[10px] text-red-400" />
              </FormItem>
            )}
          />
          <div className="absolute top-0 right-2 w-fll h-[60px] flex justify-center items-center">
            <div className="w-fit h-9 flex justify-center items-center">
              {mode === "txt+image-to-image" ? (
                <Button
                  variant="secondary"
                  type="button"
                  className="h-full w-9 p-0 hover:bg-neutral-900 animate-bounce"
                >
                  <Image className="!size=5" />
                </Button>
              ) : null}
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
    </div>
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
