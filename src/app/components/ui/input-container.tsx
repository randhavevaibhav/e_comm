import { cn } from "@/lib/utils";

export const InputContainer = ({
  children,
  loading = false,
}: {
  children: React.ReactNode;
  loading?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex items-center  w-full border border-input h-12 rounded-full overflow-hidden pl-4 gap-2 has-focus:ring-2 has-focus:ring-indigo-500 transition ",
        {
          "bg-accent-foreground/10": loading,
        }
      )}
    >
      {children}
    </div>
  );
};
