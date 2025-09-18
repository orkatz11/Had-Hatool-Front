import { getPlayersCards, getPileOrDeckCard } from './backendMockup';
import {Card, CardValue } from './gameClasses'


// # takes string and brings the corresponding enum
export function string_to_card_value_enum (value_string: string): CardValue {
    return CardValue[value_string as keyof typeof CardValue]

}