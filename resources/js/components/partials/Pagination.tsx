import React, { useEffect, useState } from 'react';

type Props = {
	amountPerPage?: number;
	handlePageChange: (num: number) => void;
	total: number;
};

const Pagination: React.FC<Props> = ({
	amountPerPage = 10,
	handlePageChange,
	total,
}) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [links, setLinks] = useState(0);

	useEffect(() => {
		setLinks(Math.ceil(total / amountPerPage));
	}, [total, amountPerPage]);

	const handlePagination = (page: number) => {
		setCurrentPage(page);
		handlePageChange(page);
	};

	return (
		<section className="text-center">
			{Array.from(Array(links).keys()).map((link) => (
				<button
					className={`mr-4 py-2 px-4 rounded-full transition duration-150 ${
						currentPage === link + 1
							? 'bg-primary text-white'
							: 'bg-white hover:bg-secondary text-gray-600'
					}`}
					key={link}
					type="button"
					onClick={() => handlePagination(link + 1)}
				>
					{link + 1}
				</button>
			))}
		</section>
	);
};

export default Pagination;
