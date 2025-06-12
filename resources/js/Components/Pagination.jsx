import React from 'react';

export default function Pagination({ currentPage, lastPage, onPageChange }) {
    const getPages = () => {
        const pages = [];

        if (lastPage <= 7) {
            for (let i = 1; i <= lastPage; i++) pages.push(i);
        } else {
            pages.push(1);

            if (currentPage > 4) pages.push('left-dots');

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(lastPage - 1, currentPage + 1);

            for (let i = start; i <= end; i++) pages.push(i);

            if (currentPage < lastPage - 3) pages.push('right-dots');

            pages.push(lastPage);
        }

        return pages;
    };

    const pages = getPages();

    return (
        <div className="flex flex-wrap gap-2 justify-center mt-4 items-center">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                Previous
            </button>

            {pages.map((page, index) =>
                page === 'left-dots' || page === 'right-dots' ? (
                    <span key={index} className="px-3 py-1">...</span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 border rounded ${
                            page === currentPage
                                ? 'bg-blue-600 text-white'
                                : 'bg-white hover:bg-gray-100'
                        }`}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}
