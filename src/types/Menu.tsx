export interface IMenu {
  path: string;
  icon: React.ReactNode;
  name: string;
  children?: IMenu[];
  className?: string;
}
