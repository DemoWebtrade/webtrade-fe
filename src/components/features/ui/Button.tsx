import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva("flex items-center justify-center rounded", {
  variants: {
    variant: {
      default:
        "bg-red-base text-context-primary text-sm hover:bg-red-hover disable:bg-red-disabled active:bg-red-active",
    },
    size: {
      default: "md:h-9 h-7 md:px-4 px-2 py-2 has-[>svg]:px-3",
      sm: "md:h-8 h-6 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
      lg: "md:h-10 h-8 rounded-md px-6 has-[>svg]:px-4",
      icon: "md:size-9 size-6",
      "icon-sm": "size-8",
      "icon-lg": "size-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  return (
    <button
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}

export { Button };
