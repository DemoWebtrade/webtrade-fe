import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "flex items-center justify-center rounded cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-purple-base text-white text-sm hover:bg-purple-hover disabled:bg-purple-disabled disabled:text-content-disable",
        success:
          "bg-green-base text-white text-sm hover:bg-green-hover disabled:bg-green-disabled disabled:text-content-disable",
        none: "text-sm text-purple-base hover:bg-secondary-hover disabled:text-content-disable disabled:bg-content-disable",
      },
      size: {
        default: "md:px-[18px] md:px-3 px-2 py-2 has-[>svg]:px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

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
