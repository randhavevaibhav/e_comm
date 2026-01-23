import { cn } from "@/lib/utils";

export const ProductStatus = ({ status }: { status: "Pending" | "Delivered" }) => {
  const isPending = status === "Pending";
  const isDelivered = status === "Delivered";
  return (
    <p
      className={cn(
        "border px-2 flex items-center gap-2 w-fit rounded-sm text-sm tracking-wide py-0.5",
        {
          "border-orange-400": isPending,
          "bg-orange-300/70 dark:bg-orange-300/20": isPending,
          "text-orange-500": isPending,

          "border-green-400": isDelivered,
          "bg-green-300/70 dark:bg-green-300/20": isDelivered,
          "text-green-500": isDelivered,
        },
      )}
    >
      <span
        className={cn("size-1.5 rounded-full block", {
          "bg-orange-500": isPending,
          "bg-green-500": isDelivered,
        })}
      ></span>
      {status}
    </p>
  );
};