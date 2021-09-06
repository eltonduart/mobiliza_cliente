import queryString, { parse } from 'query-string';
import { EndPoints } from '../config/EndPoints';
import { Ocorrencia } from '../domains/Ocorrencia';
import Api, { RequestResponse } from './api';
import { removeEmptyProperties } from '../helpers/removeEmptyProperties';

export const fetchOcorrencia = (
  _: string,
  search: { [key: string]: unknown },
  page = 0,
  pageSize = 50,
): Promise<RequestResponse<Ocorrencia>> => {
  const qrySearch = search ? `&${queryString.stringify(search)}` : '';

  return Api.get<RequestResponse<Ocorrencia>>(
    `${EndPoints.OCORRENCIA}?_page=${page || 0}&_limit=${pageSize || 50}${qrySearch}`,
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

export const findOcorrencia = (id: number): Promise<Ocorrencia | undefined> => {
  return Api.get<Ocorrencia>(`${EndPoints.OCORRENCIA}?id:${id}`).then((response) => {
    return response.data;
  });
};

export const createOcorrencia = (ocorrencia: Ocorrencia): Promise<any> => {
  console.log(ocorrencia);
  return Api.post(`${EndPoints.OCORRENCIA}`, removeEmptyProperties(ocorrencia as any));
};

export const removeOcorrencia = (id: number | string): Promise<any> => {
  return Api.remove(`${EndPoints.OCORRENCIA}/${id}`);
};

export const updateOcorrencia = (ocorrencia: Ocorrencia): Promise<any> => {
  const parsedOcorrencia = ocorrencia;
  delete parsedOcorrencia.pessoa_id;

  return Api.patch(`${EndPoints.OCORRENCIA}/${ocorrencia.id}`, {
    ...parsedOcorrencia,
    id: undefined,
  });
};
