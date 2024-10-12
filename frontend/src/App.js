// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import SoloFF from './components/SoloFF';
import FreeFireReg from './components/FreeFireReg';
import BGMIReg from './components/BGMIReg';
import RegistrationDetails from './components/RegistrationDetails';
import MakeMatch from './components/MakeMatch';
import ViewMatchDetails from './components/ViewMatchDetails';
import DuoFF from './components/DuoFF';
import SquadFF from './components/SquadFF';
import SoloBGMI from './components/SoloBGMI';
import DuoBGMI from './components/DuoBGMI';
import SquadBGMI from './components/SquadBGMI';
import CheatReport from './components/CheatReport';
import PlayerSelectionTable from './components/PlayerSelectionTable';
import Winners from './components/Winners';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/home/freefire-reg" element={<FreeFireReg/>} />
        <Route path="/home/bgmi-reg" element={<BGMIReg/>} />
        <Route path="/home/soloFF" element={<SoloFF/>} />
        <Route path="/home/soloBGMI" element={<SoloBGMI/>} />
        <Route path="/home/duoFF" element={<DuoFF/>} />
        <Route path="/home/duoBGMI" element={<DuoBGMI/>} />
        <Route path="/home/squadFF" element={<SquadFF/>} />
        <Route path="/home/squadBGMI" element={<SquadBGMI/>} />
        <Route path="/home/reg-details" element={<RegistrationDetails/>} />
        <Route path="/home/make-match" element={<MakeMatch/>} />
        <Route path="/home/view-match-details" element={<ViewMatchDetails/>} />
        <Route path="/home/view-match-details/player-selection" element={<PlayerSelectionTable/>} />
        <Route path="/home/cheat-report" element={<CheatReport/>} />
        <Route path="/home/cheat-winners" element={<Winners/>} />
      </Routes>
    </Router>
  );
}

export default App;
