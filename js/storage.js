var playerSaved;

function addPlayerToSystem(pName, pLevelPass) {
	let Player = {
		name: pName,
		level: pLevelPass
	};

	localStoragePlayerData(Player);
}

const localStoragePlayerData = (player) => {
	localStorage.setItem('PlayerList', JSON.stringify(player));
};
const getPlayerFromSytem = () => {
	let playerStored = localStorage.getItem('PlayerList');

	playerSaved = playerStored === null ? (playerSaved = null) : JSON.parse(playerStored);

	return playerSaved;
};
