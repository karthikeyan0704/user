import React, { useEffect, useRef, useContext } from 'react';
import DisplayHome from './DisplayHome';
import { Routes, Route, useLocation } from 'react-router-dom';
import DisplayAlbum from './DisplayAlbum';
import { PlayerContext } from '../context/PlayerContext';

const Display = () => {
	const { albumData } = useContext(PlayerContext); // fixed albumsData → albumData
	const displayRef = useRef();
	const location = useLocation();
	const isAlbum = location.pathname.includes("album");
	const albumId = isAlbum ? location.pathname.split('/').pop() : "";
	const album = isAlbum ? albumData.find(x => x._id === albumId) : null;
	const bgColor = album?.bgColour || "#121212";
	useEffect(() => {
		if (displayRef.current) {
			if (isAlbum) {
				displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
			} else {
				displayRef.current.style.background = `#121212`;
			}
		}
	}, [isAlbum, bgColor]); // added dependencies for clean updates
	return (
		<div
			ref={displayRef}
			className="w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
		>
			<Routes>
				<Route path="/" element={<DisplayHome />} />
				<Route
					path="/album/:id"
					element={<DisplayAlbum album={album} />}
				/>
			</Routes>
		</div>
	);
};
export default Display;
