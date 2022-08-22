import {root} from "@/api";
import {Test} from "@/models/Test";
import axios from "axios";
import {EmailList} from "@/models/EmailList";

export class StudentLinkService {
    private static base = `${root}/student`;

    public static async sendLinks(emailList: EmailList): Promise<void> {
        return axios.post(`${this.base}/sendLinks/`, emailList).then(value => value.data);
    }

    public static async getTest(code: string): Promise<Test> {
        return axios.get(`${this.base}/getTest/${code}`).then(value => value.data);
    }

}