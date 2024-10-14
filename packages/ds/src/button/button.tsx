import { Box } from '../box.js';

export type ButtonProps = {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent) => void;
};

export function Button({ children, onClick }: ButtonProps) {
  return (
    <Box
      as="button"
      onClick={onClick}
      className="hh-bg-blue-500 hh-p-sm hh-rounded hh-text-white hover:hh-bg-blue-600"
    >
      {children}
    </Box>
  );
}
