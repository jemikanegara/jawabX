export const query = `query ($_id: ID!) {
    solution (_id: $_id) {
        journal {
            trueAnswer
        }
    }
}`;