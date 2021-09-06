import queryString from 'query-string';
import { EndPoints } from '../config/EndPoints';
import { Municipio } from '../domains/Municipio';
import Api, { RequestResponse } from './api';

export const fetchMunicipios = (
  _: string,
  search: { [key: string]: unknown },
  page = 0,
  pageSize = 50,
): Promise<RequestResponse<Municipio>> => {
  const qrySearch = search ? `&${queryString.stringify(search)}` : '';

  return Api.get<RequestResponse<Municipio>>(
    `${EndPoints.MUNICIPIO}?_page=${page}&_limit=${pageSize}${qrySearch}`,
  ).then((response) => {
    const resp = {
      data: response.data as any,
      meta: {
        totalRecords: response.headers['x-total-count'],
      },
    };

    return resp;
  });
};

export const findMunicipio = (id: number): Promise<Municipio | undefined> => {
  return Api.get<Municipio>(`${EndPoints.MUNICIPIO}?id:${id}`).then(
    (response) => {
      return response.data;
    },
  );
};

export const createMunicipio = (agentType: Municipio): Promise<any> => {
  return Api.post(`${EndPoints.MUNICIPIO}`, agentType);
};

export const removeMunicipio = (id: string): Promise<any> => {
  return Api.remove(`${EndPoints.MUNICIPIO}/${id}`);
};

export const updateMunicipio = (agentType: Municipio): Promise<any> => {
  return Api.put(`${EndPoints.MUNICIPIO}/${agentType.id}`, agentType);
};
