import React, { useEffect, useState } from 'react';

type Props = {
	amountPerPage?: number;
	currentPage: number;
	handlePageChange: (num: number) => void;
	totalPages: number;
};

const Pagination: React.FC<Props> = ({
	amountPerPage = 10,
	currentPage,
	handlePageChange,
	totalPages,
}) => {
	const [links, setLinks] = useState(0);

	useEffect(() => {
		setLinks(Math.ceil(totalPages / amountPerPage));
	}, [totalPages, amountPerPage]);

	const handlePagination = (page: number) => {
		handlePageChange(page);
	};

	return (
		<section className="text-center">
			{links > 1 &&
				Array.from(Array(links).keys()).map((link) => (
					<button
						className={`focus:outline-none focus:shadow-outline mr-4 py-2 px-4 rounded-full transition duration-150 ${
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
