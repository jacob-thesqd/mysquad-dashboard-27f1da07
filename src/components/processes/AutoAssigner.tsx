
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ReactMarkdown from "react-markdown";
import { useAutoAssignerDocs } from "@/hooks/useAutoAssignerDocs";

const AutoAssigner = () => {
  const { markdown, loading, error } = useAutoAssignerDocs();

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-8 w-1/3 mt-6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <ScrollArea className="h-[70vh] pr-4">
      <div className="prose prose-stone dark:prose-invert max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-4 mt-6" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-xl font-bold mb-3 mt-5" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-lg font-semibold mb-2 mt-4" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />,
            li: ({ node, className, children, ...props }) => {
              // Check if children contain another list to handle nested lists properly
              const hasNestedList = React.Children.toArray(children).some(
                child => React.isValidElement(child) && (child.type === 'ul' || child.type === 'ol')
              );
              
              return (
                <li className={`${hasNestedList ? 'mb-0' : 'mb-1'}`} {...props}>
                  {children}
                </li>
              );
            },
            p: ({ node, ...props }) => <p className="mb-4" {...props} />,
            a: ({ node, href, ...props }) => (
              <a 
                href={href} 
                className="text-blue-600 dark:text-blue-400 hover:underline" 
                target="_blank" 
                rel="noopener noreferrer"
                {...props} 
              />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4" {...props} />
            ),
            code: ({ node, className, ...props }) => (
              <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm" {...props} />
            ),
            pre: ({ node, ...props }) => (
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto my-4" {...props} />
            ),
            hr: ({ node, ...props }) => <hr className="my-6 border-t border-gray-300 dark:border-gray-600" {...props} />,
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </ScrollArea>
  );
};

export default AutoAssigner;
