import { getStatistics } from "../dao/statistics-dao.js";

export async function loadStatistics() {

    return await getStatistics();

}