import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { useTranslation } from "react-i18next";

const buttonVariants = cva(
  "flex items-center justify-center rounded cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-purple-base text-white text-sm hover:bg-purple-hover disabled:bg-purple-disabled disabled:text-content-disable",
        success:
          "bg-green-base text-white text-sm hover:bg-green-hover disabled:bg-green-disabled disabled:text-content-disable",
        error:
          "bg-red-base text-white text-sm hover:bg-red-hover disabled:bg-red-disabled disabled:text-content-disable",
        warning:
          "bg-yellow-base text-white text-sm hover:bg-yellow-hover disabled:bg-yellow-disabled disabled:text-content-disable",
        secondary:
          "bg-secondary-base text-white text-sm hover:bg-secondary-hover disabled:bg-secondary-disabled disabled:text-content-disable",
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
  isLoading = false,
  children,
  disabled,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  }) {
  const { t } = useTranslation();

  return (
    <button
      data-slot="button"
      data-variant={variant}
      data-size={size}
      disabled={disabled || isLoading}
      className={buttonVariants({ variant, size, className })}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-1 md:gap-2.5">
          <div className="md:w-5 md:h-5 w-4 h-4 border-2 border-content-disable border-t-transparent rounded-full animate-spin" />
          <span>{t("loading")}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}

export { Button };
