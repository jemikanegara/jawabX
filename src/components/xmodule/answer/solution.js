import { ajax } from "../../../graphql/settings";

export const getSolution = async (_id, query) => {
    const variables = { _id };
    const token = localStorage.getItem("token");
    const res = await ajax(fetch, { query, variables, token });
    if (res.data.errors) return null;
    else return res;
};