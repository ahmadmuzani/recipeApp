// Pagination.js
import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageItems = [];

    for (let i = 1; i <= totalPages; i++) {
        pageItems.push(
            <Pagination.Item key={i} active={i === currentPage} onClick={() => onPageChange(i)}>
                {i}
            </Pagination.Item>
        );
    }

    return (
        <Pagination>
            <Pagination.First onClick={() => onPageChange(1)} />
            <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
            {pageItems}
            <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => onPageChange(totalPages)} />
        </Pagination>
    );
};

export default Pagination;
