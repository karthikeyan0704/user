import { createContext, useRef, useState, useEffect } from "react";
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
	const audioRef = useRef();
	const seekBg = useRef();
	const seekBar = useRef();
	const url = 'http://localhost:4000';
	const [songsData, setSongsData] = useState([]);
	const [albumData, setAlbumData] = useState([]);
	const [track, setTrack] = useState(null);
	const [playStatus, setPlayStatus] = useState(false);
	const [time, setTime] = useState({
		currentTime: { second: 0, minute: 0 },
		totalTime: { second: 0, minute: 0 },
	});
	const play = () => {
		audioRef.current?.play();
		setPlayStatus(true);
	};
	const pause = () => {
		audioRef.current?.pause();
		setPlayStatus(false);
	};
	const playWithId = async (id) => {
		const foundTrack = songsData.find(item => item._id === id);
		if (foundTrack) {
			setTrack(foundTrack);
			setTimeout(() => { // ensure track state is updated before play
				audioRef.current?.play();
				setPlayStatus(true);
			}, 0);
		}
	};
	const previous = () => {
		if (!track) return;
		const index = songsData.findIndex(item => item._id === track._id);
		if (index > 0) {
			setTrack(songsData[index - 1]);
			setTimeout(() => {
				audioRef.current?.play();
				setPlayStatus(true);
			}, 0);
		}
	};
	const next = () => {
		if (!track) return;
		const index = songsData.findIndex(item => item._id === track._id);
		if (index < songsData.length - 1) {
			setTrack(songsData[index + 1]);
			setTimeout(() => {
				audioRef.current?.play();
				setPlayStatus(true);
			}, 0);
		}
	};
	const seekSong = (e) => {
		if (audioRef.current && seekBg.current) {
			audioRef.current.currentTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
		}
	};
	const getSongsData = async () => {
		try {
			const response = await axios.get(`${url}/api/song/list`);
			const fetchedSongs = response.data.song || [];
			setSongsData(fetchedSongs);
			if (fetchedSongs.length > 0) setTrack(fetchedSongs[0]);
		} catch (error) {
			console.log("Error fetching songs:", error);
		}
	};
	const getAlbumData = async () => {
		try {
			const response = await axios.get(`${url}/api/album/list`);
			const fetchedAlbums = response.data.album || [];
			setAlbumData(fetchedAlbums);
		} catch (error) {
			console.log("Error fetching albums:", error);
		}
	};
	useEffect(() => {
		getSongsData();
		getAlbumData();
	}, []);
	useEffect(() => {
		if (!audioRef.current) return;
		const handleTimeUpdate = () => {
			if (audioRef.current && seekBar.current) {
				const current = audioRef.current.currentTime;
				const duration = audioRef.current.duration || 0;
				seekBar.current.style.width = `${Math.floor((current / duration) * 100)}%`;
				setTime({
					currentTime: {
						second: Math.floor(current % 60),
						minute: Math.floor(current / 60),
					},
					totalTime: {
						second: Math.floor(duration % 60),
						minute: Math.floor(duration / 60),
					},
				});
			}
		};
		audioRef.current.ontimeupdate = handleTimeUpdate;
		return () => {
			audioRef.current.ontimeupdate = null;
		};
	}, [audioRef.current]);
	const contextValue = {
		audioRef,
		seekBg,
		seekBar,
		track,
		setTrack,
		playStatus,
		setPlayStatus,
		time,
		setTime,
		play,
		pause,
		playWithId,
		previous,
		next,
		seekSong,
		songsData,
		albumData,
	};
	return (
		<PlayerContext.Provider value={contextValue}>
			{props.children}
		</PlayerContext.Provider>
	);
};
export default PlayerContextProvider;
