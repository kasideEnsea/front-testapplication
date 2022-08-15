import {Question} from "@/models/Question";

export interface Test {
    id: number;
    name: string;
    questions: Question[]
}