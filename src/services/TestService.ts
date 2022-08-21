import {root} from "@/api";
import axios, {AxiosPromise} from "axios";
import {Test} from "@/models/Test";

export class TestService {
    private static base = `${root}/test`;

    public static async addTest(test: Test): Promise<Test> {
        return axios.post(`${this.base}/add`, test).then(value => value.data);
    }

    public static async editTest(test: Test): Promise<Test> {
        return axios.post(`${this.base}/edit`, test).then(value => value.data);
    }

    public static async deleteTest(id: number) {
        return axios.post(`${this.base}/del/${id}`);
    }

    public static async getTest(id: number): Promise<Test> {
        return axios.get(`${this.base}/${id}`).then(value => value.data);
    }

    public static async getTests(): Promise<Test[]> {
        return axios.get(`${this.base}/`).then(value => value.data);
    }

}

