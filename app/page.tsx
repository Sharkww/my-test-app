'use client'
import { Movie } from "./movie";
import { useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Home() {
	const apiKey = "39b72c6";
	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const TABLE_HEAD = ["", "Title", "Year of release", ""];

	const nextPage = () => {
		if (page === totalPages) return;
		setPage(page + 1);
		searchMovies();
	};

	const prevPage = () => {
		if (page === 1) return;
		setPage(page - 1);
		searchMovies();
	};

	function searchMovies() {
		fetch(`http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${searchTerm}&page=${page}`)
			.then((response) => response.json())
			.then((data) => {
				setMovies(data.Search);
				setTotalPages(Math.ceil(data.totalResults / 10));
			})
			.catch((err) => {
				console.log(err.message);
			});
	}

	return (
		<main className="min-h-screen flex-col items-center justify-between p-16">
			<div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex pb-8">
				<input className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="search" type="text" placeholder="Title"
					value={searchTerm} onChange={(evt) => setSearchTerm(evt.target.value)} />
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline" type="button" onClick={searchMovies}>
					Search
				</button>
			</div>

			<div className="w-full max-w-5xl font-mono text-sm lg:flex">
				<table className="w-full min-w-5xl table-auto text-left">
					<thead>
						<tr>
							{TABLE_HEAD.map((head) => (
								<th key={head} className="border-b p-4">
									{head}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{movies.map((movie: Movie) => (
							<tr key={movie.imdbID}>
								<td className="p-4">
									<img className="h-40" src={movie.Poster} alt={movie.Title} />
								</td>
								<td className="p-4">
									{movie.Title}
								</td>
								<td className="p-4">
									{movie.Year}
								</td>
								<td className="p-4">
									<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
										View Details
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="flex items-center gap-8 py-8 float-right">
				<button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
					type="button" onClick={prevPage} disabled={page === 1}>
					<ArrowLeftIcon strokeWidth={4} className="h-4 w-4" />
				</button>
				<span className="font-normal">
					Page <strong>{page}</strong> of <strong>{totalPages}</strong>
				</span>
				<button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
					type="button" onClick={nextPage} disabled={page === totalPages}>
					<ArrowRightIcon strokeWidth={4} className="h-4 w-4" />
				</button>
			</div>
		</main>
	);
}
