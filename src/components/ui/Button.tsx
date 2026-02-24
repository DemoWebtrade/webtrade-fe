import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "flex items-center justify-center rounded cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-bg-button text-white text-sm hover:bg-primary-hover disable:bg-primary-disable disable:text-content-disable",
        none: "text-bg-button hover:bg-secondary-hover disable:text-content-disable disable:bg-content-disable",
      },
      size: {
        default: "md:px-[18px] px-3 py-2 has-[>svg]:px-3",
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
