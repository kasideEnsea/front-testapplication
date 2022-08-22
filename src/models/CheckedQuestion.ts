import {Option} from "@/models/Option";
import {CheckedOption} from "@/models/CheckedOption";

export interface CheckedQuestion {
    id: number;
    text: string;
    options: CheckedOption[];
}