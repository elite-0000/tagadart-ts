import React, { ReactNode, useEffect, useState } from "react";
import useSWR, { KeyedMutator } from "swr";
import { defaultQueryParams, fetchUseSWR } from "@/request/request";
import { Data, RestQueryParams } from "@/types/global";
import * as qs from "qs";

interface FetcherChildProps<T> {
  data: Data;
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  isLoading: boolean;
  mutate: KeyedMutator<T>;
  hasNextPage: boolean;
  loadMore: () => void;
}

interface FetcherProps<T> {
  url: string;
  sort?: string;
  populate?: string | object;
  filters?: [];
  paginationMode?: "infinite" | "pagination";
  params?: RestQueryParams;
  children: (fetchData: FetcherChildProps<T>) => ReactNode;
}

function Fetcher<T>({
  url,
  children,
  params = defaultQueryParams,
  filters,
  paginationMode = "pagination",
  sort,
  populate,
}: FetcherProps<T>) {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [accumulatedData, setAccumulatedData] = useState<Data>();

  const effectiveFilters = { ...params.filters, ...filters };
  const effectivePopulate = populate || params.populate;
  const effectiveSort = sort || params.sort;

  const effectiveParams = {
    ...params,
    filters: effectiveFilters,
    sort: effectiveSort,
    populate: effectivePopulate,
    pagination: { ...params.pagination, page: currentPage },
  };

  const queryString = qs.stringify(effectiveParams, {
    encode: false,
    arrayFormat: "indices",
    allowDots: false,
  });

  const { data, error, mutate } = useSWR<any>(
    `${url}?${queryString}`,
    fetchUseSWR,
    {
      refreshInterval: 30000,
    }
  );

  const hasNextPage =
    data?.meta?.pagination?.page < data?.meta?.pagination?.pageCount;

  const goToPage = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  useEffect(() => {
    if (data) {
      if (paginationMode === "infinite") {
        setAccumulatedData((prevData) => ({
          data: prevData ? [...prevData.data, ...data.data] : [...data.data],
          meta: data.meta,
        }));
      } else {
        setAccumulatedData(data);
      }
    }
  }, [data]);

  const loadMore = () => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (!accumulatedData) return null; // Loading state can be handled differently
  if (error) return <div>Error loading data...</div>;

  return children({
    data: accumulatedData,
    currentPage,
    goToPage,
    isLoading: !data && !error,
    mutate,
    totalPages: data?.meta?.pagination?.pageCount || 0,
    loadMore,
    hasNextPage,
  });
}

export default Fetcher;