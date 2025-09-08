// import React, { useContext } from "react";
// import Sidebar from "./components/Sidebar";
// import Player from "./components/Player";
// import Display from "./components/Display";
// import { PlayerContext } from "./context/PlayerContext";

// const App = () => {
//   const { audioRef, track, songsData } = useContext(PlayerContext);

//   return (
//     <div className="h-screen bg-black">
//       {songsData.lenght !== 0 ? (
//         <>
//           <div className="h-[90%] flex">
//             <Sidebar />
//             <Display />
//           </div>
//           <Player />
//         </>
//       ) : null}

//       <audio ref={audioRef} src={track?track.file:""} preload="auto"></audio>
//     </div>
//   );
// };

// export default App;
import React, { useContext } from "react";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import { PlayerContext } from "./context/PlayerContext";

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black">
      {songsData.length !== 0 ? ( // fixed typo from lenght ➔ length
        <>
          <div className="h-[90%] flex">
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
      ) : null}

      {/* Only render audio if track exists */}
      {track && track.file && (
        <audio ref={audioRef} src={track.file} preload="auto"></audio>
      )}
    </div>
  );
};

export default App;
