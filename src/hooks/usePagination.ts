import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const usePagination = (dataSize: number, defaultPageSize = 10) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  // Get the page size from the URL parameters (or default to 10)
  const pageSize = Number(params.get("pageSize")) || defaultPageSize;

  const { page, start, end } = useMemo(() => {
    const page = Number(params.get("page")) || 1;
    const start = (page - 1) * pageSize;
    const end = Math.min(start + pageSize, dataSize);
    return { page, start, end };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, pageSize, dataSize]);

  const updateParams = (newPage: number) => {
    params.set("page", newPage.toString());
    params.set("start", ((newPage - 1) * pageSize).toString());
    params.set("end", Math.min(newPage * pageSize, dataSize).toString());
    navigate(`?${params.toString()}`);
  };

  const handleOnNext = () => {
    if (end >= dataSize) return;
    updateParams(page + 1);
  };

  const handleOnPrevious = () => {
    if (start <= 0) return;
    updateParams(page - 1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > Math.ceil(dataSize / pageSize)) return;
    updateParams(newPage);
  };

  const handleChangePageSize = (size: number) => {
    params.set("pageSize", size.toString()); // Store pageSize in URL
    params.set("page", "1"); // Reset to first page
    params.set("start", "0");
    params.set("end", Math.min(size, dataSize).toString());
    navigate(`?${params.toString()}`);
  };

  return {
    handleOnNext,
    handleOnPrevious,
    handlePageChange,
    handleChangePageSize, 
    start,
    end,
    page,
    pageSize, // Now pageSize updates dynamically from searchParams
  };
};

export default usePagination;








