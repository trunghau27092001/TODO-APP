import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const TaskListPagination = ({
  handleNextPage,
  handlePrevPage,
  handlePageChanged,
  page,
  totalPages,
}) => {
  const generatePage = () => {
    const pages = [];

    // if (totalPages <= 7) {
    //   for (let i = 1; i <= totalPages; i++) {
    //     pages.push(i);
    //   }
    // }
    // //   for (let i = 1; i <= totalPages; i++) {
    // //     pages.push(i);
    // //   }
    // // } else if(totalPages > 4) {
    // //   if (page <=  2) {
    // //     pages.push(1, 2, 3, "...", totalPages);
    // //   } else if (page >= totalPages - 1) {
    // //     pages.push(1,"...", totalPages - 2, totalPages - 1, totalPages);
    // //   }
    // }

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 1) {
        pages.push(1, 2, "...", totalPages);
      }

      // ✅ Nếu trang hiện tại ở gần đầu (trang 2)
      else if (page === 2) {
        if (totalPages === 4) pages.push(1, 2, 3, 4);
        else pages.push(1, 2, 3, "...", totalPages);
      } else if (page === 3) {
        if (totalPages === 4) pages.push(1, 2, 3, 4) 
        else if(totalPages === 5) pages.push(1, 2, 3, 4,5) 
        else pages.push(1, 2, 3, 4, "...", totalPages);
      }

      // ✅ Nếu trang hiện tại ở giữa (không gần đầu/cuối)
      else if (page > 2 && page < totalPages - 2) {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      } else if (page === totalPages - 2) {
        if (totalPages === 4) pages.push(1, 2, 3, 4);
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
      // ✅ Nếu trang hiện tại ở gần cuối (trang áp chót)
      else if (page === totalPages - 1) {
        if (totalPages === 4) pages.push(1, 2, 3, 4);
        else pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      }

      // ✅ Nếu trang hiện tại là cuối cùng
      else if (page === totalPages) {
        pages.push(1, "...", totalPages - 1, totalPages);
      }
    }

    return pages;
  };

  const pageToShow = generatePage();

  return (
    <div className="flex justify-center mt-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={page === 1 ? undefined : handlePrevPage}
              className={cn(
                "cursor-pointer",
                page === 1 && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>
          {pageToShow.map((p, index) => (
            <PaginationItem key={index}>
              {p === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={p === page}
                  onClick={() => {
                    if (p !== page) handlePageChanged(p);
                  }}
                  className="cursor-pointer"
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={page === totalPages ? undefined : handleNextPage}
              className={cn(
                "cursor-pointer",
                page === totalPages && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TaskListPagination;
