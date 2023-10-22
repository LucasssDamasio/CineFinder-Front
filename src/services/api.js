import axios from "axios";

export const api= axios.create({
    baseURL:"https://api.themoviedb.org/3",
    params:{
        api_key: "a8b2c4f03b827ba269c17ee47ee516c9",
        language:"pt-BR",
        include_adults:false,

    },
});