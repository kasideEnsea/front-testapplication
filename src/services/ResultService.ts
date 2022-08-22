import {root} from "@/api";
import axios from "axios";
import {CheckedTest} from "@/models/CheckedTest";
import {Test} from "@/models/Test";
import {StringDto} from "@/models/StringDto";

export class ResultService {
    private static base = `${root}/result`;

    public static async saveAttempt(test: Test, code: string): Promise<void> {
        return axios.post(`${this.base}/saveAttempt/${code}/`, test).then(value => value.data);
    }

    public static async getByCode(code: string): Promise<CheckedTest> {
        return axios.get(`${this.base}/getByCode/${code}`).then(value => value.data);
    }

    public static async getCheckedTestByLinkId(linkId: number): Promise<CheckedTest> {
        return axios.get(`${this.base}/getCheckedTestByLinkId/${linkId}`).then(value => value.data);
    }

    public static async getAllByTestId(id: number): Promise<CheckedTest[]> {
        return axios.get(`${this.base}/getAllByTestId/${id}`).then(value => value.data);
    }

    public static async getAllByCode(code: string): Promise<CheckedTest[]> {
        return axios.get(`${this.base}/getAllByCode/${code}`).then(value => value.data);
    }

}