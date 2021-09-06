import queryString from 'query-string';
import { EndPoints } from '../config/EndPoints';
import { Distrito } from '../domains/Distrito';
import Api, { RequestResponse } from './api';
import { removeEmptyProperties } from '../helpers/removeEmptyProperties';

export const fetchDistrito = (
  _: string,
  search: { [key: string]: unknown },
  page = 0,
  pageSize = 50,
): Promise<RequestResponse<Distrito>> => {
  const qrySearch = search ? `&${queryString.stringify(search)}` : '';

  return Api.get<RequestResponse<Distrito>>(
    `${EndPoints.DISTRITO}?_page=${page || 0}&_limit=${pageSize || 50}${qrySearch}`,
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

export const findDistrito = (id: number): Promise<Distrito | undefined> => {
  return Api.get<Distrito>(`${EndPoints.DISTRITO}?id:${id}`).then((response) => {
    return response.data;
  });
};

export const createDistrito = (distrito: Distrito): Promise<any> => {
  console.log({ distrito });
  return Api.post(`${EndPoints.DISTRITO}`, removeEmptyProperties(distrito as any));
};

export const removeDistrito = (id: number | string): Promise<any> => {
  return Api.remove(`${EndPoints.DISTRITO}/${id}`);
};

export const updateDistrito = (distrito: Distrito): Promise<any> => {
  return Api.patch(`${EndPoints.DISTRITO}/${distrito.id}`, {
    ...distrito,
    id: undefined,
  });
};
