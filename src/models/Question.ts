import {Option} from "@/models/Option";

export interface Question {
    id: number;
    text: string;
    options: Option[]
}