import { Text } from "@/components/retroui/Text";
import { cn } from "@/lib/utils";
import { Ghost } from "lucide-react";
import { HTMLAttributes } from "react";

interface IEmptyProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Empty = ({ className, ...props }: IEmptyProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-4 md:p-8 border-2 rounded shadow-md transition-all hover:shadow-none bg-card text-center",
        className,
      )}
      {...props}
    />
  );
};
Empty.displayName = "Empty";

const EmptyContent = ({ className, ...props }: IEmptyProps) => {
  return (
    <div
      className={cn("flex flex-col items-center gap-3", className)}
      {...props}
    />
  );
};
EmptyContent.displayName = "Empty.Content";

const EmptyIcon = ({ children, className, ...props }: IEmptyProps) => {
  return (
    <div className={cn(className)} {...props}>
      {children || <Ghost className="w-full h-full" />}
    </div>
  );
};
EmptyIcon.displayName = "Empty.Icon";

const EmptyTitle = ({ className, ...props }: IEmptyProps) => {
  return (
    <Text
      as="h3"
      className={cn("text-lg md:text-2xl font-bold", className)}
      {...props}
    />
  );
};
EmptyTitle.displayName = "Empty.Title";

const EmptySeparator = ({ className, ...props }: IEmptyProps) => {
  return <div role="separator" className={cn("w-full h-1 bg-primary", className)} {...props} />;
};
EmptySeparator.displayName = "Empty.Separator";

const EmptyDescription = ({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn("text-muted-foreground max-w-[320px]", className)}
    {...props}
  />
);
EmptyDescription.displayName = "Empty.Description";

const EmptyComponent = Object.assign(Empty, {
  Content: EmptyContent,
  Icon: EmptyIcon,
  Title: EmptyTitle,
  Separator: EmptySeparator,
  Description: EmptyDescription,
});

export { EmptyComponent as Empty };
