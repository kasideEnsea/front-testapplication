import {root} from "@/api";
import axios, {AxiosPromise} from "axios";
import {Question} from "@/models/Question";
import {Option} from "@/models/Option";

export class QuestionService {
    private static base = `${root}/question`;

    public static async addOption(option: Option, id: number): Promise<Question> {
        return axios.post(`${this.base}/add/${id}`, option).then(value => value.data);
    }

    public static async deleteQuestion(id: number) {
        return axios.post(`${this.base}/del/${id}`);
    }

}