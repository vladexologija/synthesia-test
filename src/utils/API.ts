import axios from "axios";

export interface Photo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

const URL =
  "https://picsum.photos";
const listUrl = `${URL}/v2/list`;
const imageUrl = `${URL}/id/`;

const api = axios.create();

const API = {
  getImages: async ({page = '1', limit = '20'}) => {
    const params = new URLSearchParams({
      page,
      limit,
    }).toString();

    return api.get(`${listUrl}?${params}`);
  },
  getImage: async (id: string) => {
    return api.get(`${imageUrl}/${id}/400`, {
      responseType: 'blob',
    });
  },
  getSquareURL: (id: string) => {
    return `${imageUrl}/${id}/200`;
  },
};


export default API;
