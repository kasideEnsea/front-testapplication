import {Question} from "@/models/Question";
import {CheckedQuestion} from "@/models/CheckedQuestion";

export interface CheckedTest {
    id: number;
    name: string;
    questions: CheckedQuestion[]
    email: string;
    countOfRightAnswers: number;
    linkId: number;
}