import api from './api'



export interface apiResultNewGame {
    game_id: number;
    player_numbers: number[]
    pile_Card: string
  }


export  async function createNewGameApiCall(): Promise<apiResultNewGame> {
    try {
        let newGameResponse =  await api.post('/api/v1/gameplay/newgame');
        let resultData = newGameResponse.data as apiResultNewGame;
        return(resultData);
      } catch (error) {
        console.error('Error fetching new game:', error);
        throw error;
      }
}

export default createNewGameApiCall