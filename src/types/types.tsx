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
  container_id: string;
}

export interface RowType {
  first: string;
  second: string;
  third: string;
}

export interface OptionsType {
  responsive?: boolean;
  plugins?: {
    legend?: {
      position: string;
    };
    title?: {
      display: boolean;
      text: string;
    };
  };
}

export interface RowArrayType {
  id: number;
  first: string;
  second: string;
  third: string;
}

export interface RowProps {
  rowId: number;
  nRows: number;
  setRowArrayMemo: Dispatch<SetStateAction<RowArrayType[]>>;
}

export interface GroupArrayType {
  id: number;
  rowsArray: RowArrayType[];
}

export interface GroupProps {
  groupId: number;
  nGroups: number;
  setGroupArrayMemo: Dispatch<SetStateAction<GroupArrayType[]>>;
}

export interface CategoryType {
  label: string;
  value: string;
  hasChildren?: boolean;
  nextLevel?: string;
  path?: string;
}

export interface OptionalOptionType {
  label: string;
  options: any;
}

export interface SingleProductType {
  container_id: string;
  description: string;
  image: string;
  title: string;
  sku: string;
  price: number;
  quantity: number;
  tags: string;
  type: string;
  source_product_id: string;
  visibility: string;
}

export interface VariantsType {
  attributes: any;
  price: number;
  quantity: number;
  image: string;
}
