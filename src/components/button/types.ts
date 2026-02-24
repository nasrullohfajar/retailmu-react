export interface ButtonActionProps {
  className: string;
  icon: React.ReactNode;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  tooltipId?: string;
  tooltipContent?: string;
  disabled?: boolean;
}

export interface ButtonProps {
  name?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  isLoading?: boolean;
  disabled?: boolean;
}
