import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const RemovableTextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <div className="relative h-full">
      <textarea
        className={cn(
          'flex w-full h-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-black',
          className,
        )}
        ref={ref}
        {...props}
      />
      <div
        className="absolute top-2 right-2 text-sm text-muted-foreground hover:text-black mr-2" // Adjust styles as needed
        aria-label="Clear text"
      >
        {props.children}
      </div>
    </div>
  );
});

RemovableTextArea.displayName = 'Textarea';

export { RemovableTextArea };
