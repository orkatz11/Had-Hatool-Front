import api from './api'



export interface ApiResultNewGame {
    game_id: number;
    player_numbers: number[]
    pile_Card: string
  }


export  async function createNewGameApiCall(): Promise<ApiResultNewGame> {
    try {
        const newGameResponse =  await api.post('/api/v1/gameplay/newgame');
        const resultData = newGameResponse.data as ApiResultNewGame;
        return(resultData);
      } catch (error) {
        console.error('Error fetching new game:', error);
        throw error;
      }
}
