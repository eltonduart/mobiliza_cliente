import queryString from 'query-string';
import { EndPoints } from '../config/EndPoints';
import { Pessoa } from '../domains/Pessoa';
import Api, { RequestResponse } from './api';
import { removeEmptyProperties } from '../helpers/removeEmptyProperties';

export const fetchPessoa = (
  search: { [key: string]: unknown },
  page = 0,
  pageSize = 50,
): Promise<RequestResponse<Pessoa>> => {
  const qrySearch = search ? `&${queryString.stringify(search)}` : '';

  return Api.get<RequestResponse<Pessoa>>(
    `${EndPoints.PESSOA}?_page=${page || 0}&_limit=${pageSize || 50}${qrySearch}`,
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

export const fetchColaborador = (): Promise<RequestResponse<Pessoa>> => {
  return Api.get<RequestResponse<Pessoa>>(
    `${EndPoints.PESSOA}/owner`,
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

export const findPessoa = (id: number): Promise<Pessoa | undefined> => {
  return Api.get<Pessoa>(`${EndPoints.PESSOA}?id:${id}`).then((response) => {
    return response.data;
  });
};

export const findPessoaCPF = (cpf: string): Promise<Pessoa | undefined> => {
  return Api.get<Pessoa>(`${EndPoints.PESSOA}/${cpf}`).then((response) => {
    return response.data;
  });
};

export const createPessoa = (pessoa: Pessoa): Promise<any> => {
  return Api.post(`${EndPoints.PESSOA}`, removeEmptyProperties(pessoa as any));
};

export const removePessoa = (id: number | string): Promise<any> => {
  return Api.remove(`${EndPoints.PESSOA}/${id}`);
};

export const updatePessoa = (pessoa: Pessoa): Promise<any> => {
  const parsedPessoa = pessoa;
  delete parsedPessoa.distrito;
  return Api.patch(`${EndPoints.PESSOA}/${pessoa.id}`, {
    ...parsedPessoa,
    id: undefined,
  });
};
