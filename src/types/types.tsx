import { Dispatch, SetStateAction } from "react";

export interface ProductTablePropsType {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  filterQuery: string;
  selectedRow: { [key: number]: string[] };
  setSelectedRow: Dispatch<SetStateAction<{ [key: number]: string[] }>>;
}

export interface ProductsType {
  key: string;
  name: string;
  sku: string;
  status: string;
  inventory: string;
  img: string;
}
