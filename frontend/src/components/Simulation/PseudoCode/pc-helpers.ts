export interface PseudoProps {
  line: number;
  code: PseudoItem[];
  width?:number;
  children?: JSX.Element | JSX.Element[];
}

export interface PseudoItem {
  text: string;
  tabAmount: number;
}
