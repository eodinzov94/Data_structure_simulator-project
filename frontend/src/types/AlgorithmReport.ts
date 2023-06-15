import { ChartItem } from "../components/Charts/interface";

export interface dataByAlgAndSubjectType {
    [subject: string]: { key: string; value: number }[];
}
export interface AlgorithmReport {
    dataBySubject: ChartItem[]
    dataByAlgAndSubject: dataByAlgAndSubjectType
}