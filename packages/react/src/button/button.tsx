import { tv } from 'tailwind-variants';

const button = tv({
  base: 'hitch:p-2 hitch:rounded-lg hitch:text-sm',
  variants: {
    variant: {
      primary: 'hitch:bg-blue-50 hitch:hover:bg-blue-100',
      secondary: 'hitch:bg-green-100 hitch:hover:bg-green-200',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export type ButtonProps = {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  id?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  formAction?: string | ((formData: FormData) => void | Promise<void>);
  form?: string;
  disabled?: boolean;
  invalid?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  ariaDescribedBy?: string;
  ariaLabelledBy?: string;
};

export function Button({
  id,
  onClick,
  formAction,
  form,
  variant,
  children,
  disabled,
  invalid,
  ref,
  type = 'button',
  ariaDescribedBy,
  ariaLabelledBy,
}: ButtonProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      formAction={formAction}
      form={form}
      className={button({ variant })}
      ref={ref}
      disabled={disabled}
      type={type}
      aria-labelledby={ariaLabelledBy}
      aria-invalid={invalid}
      aria-describedby={ariaDescribedBy}
    >
      {children}
    </button>
  );
}
