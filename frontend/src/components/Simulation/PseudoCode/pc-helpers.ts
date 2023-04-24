export interface PseudoProps {
  line: number;
  code: PseudoItem[];
  children?: JSX.Element | JSX.Element[];
}

export interface PseudoItem {
  text: string;
  tabAmount: number;
}
