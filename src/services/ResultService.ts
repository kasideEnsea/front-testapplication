import {root} from "@/api";
import {EmailList} from "@/models/EmailList";
import axios from "axios";
import {ValidOptions} from "@/models/ValidOptions";
import {Test} from "@/models/Test";

export class ResultService {
    private static base = `${root}/result`;

    public static async postResult(test: Test): Promise<void> {
        return axios.post(`${this.base}/sendLinks/`, test).then(value => value.data);
    }

    public static async getTest(validOptions: ValidOptions): Promise<Test> {
        return axios.post(`${this.base}/getTest/`, validOptions).then(value => value.data);
    }

}