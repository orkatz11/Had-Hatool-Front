import api from './api'


export interface ApiResultNewGame {
    game_id: number;
    player_numbers: number[]
    pile_Card: string
  }


export  async function createNewGameApiCall(user_id: number): Promise<ApiResultNewGame> {
    try {
        const newGameResponse =  await api.post(`/api/v1/${user_id}/gameplay/newgame`);
        const resultData = newGameResponse.data as ApiResultNewGame;
        return(resultData);
      } catch (error) {
        console.error('Error fetching new game:', error);
        throw error;
      }
}


export interface ApiFirstLookCards {
    player_outer_cards: string[];
    next_turn: number;

}


export async function getFirstLookCards(user_id: number, game_id: number): Promise<ApiFirstLookCards> {
  try {
        const firstLookResponse =  await api.get(`/api/v1/${user_id}/gameplay/${game_id}:reveal`);
        const resultData = firstLookResponse.data as ApiFirstLookCards;
        return(resultData);
      } catch (error) {
        console.error('Error in First Look:', error);
        throw error;
      }
}

