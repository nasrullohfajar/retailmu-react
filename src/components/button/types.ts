export interface ButtonActionProps {
  className: string;
  icon: React.ReactNode;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  tooltipId?: string;
  tooltipContent?: string;
  disabled?: boolean;
}
