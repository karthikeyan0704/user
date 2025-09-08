import React, { useContext } from 'react';
import Navbar from './Navbar';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
import { PlayerContext } from '../context/PlayerContext';

const DisplayHome = () => {
	const { songsData, albumData } = useContext(PlayerContext); // fixed albumsData → albumData
	return (
		<>
			<Navbar />
			<div className='mb-4'>
				<h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
				<div className='flex overflow-auto'>
					{albumData && albumData.map((item, index) => (
						<AlbumItem
							key={index}
							name={item.name}
							desc={item.desc}
							id={item._id}
							image={item.image}
						/>
					))}
				</div>
			</div>
			<div className='mb-4'>
				<h1 className='my-5 font-bold text-2xl'>Today's biggest hits</h1>
				<div className='flex overflow-auto'>
					{songsData && songsData.map((item, index) => (
						<SongItem
							key={index}
							name={item.name}
							desc={item.desc}
							id={item._id}
							image={item.image}
						/>
					))}
				</div>
			</div>
		</>
	);
};
export default DisplayHome;
