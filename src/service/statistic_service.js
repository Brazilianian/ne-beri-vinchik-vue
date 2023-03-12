import axios from "axios";

export function loadStatistic() {
    return axios.get("/statistic")
        .then(res => {
            return res.data
        })
}