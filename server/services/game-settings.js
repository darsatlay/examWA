export function getGameSettings(difficulty){

    switch(difficulty){

        case "easy":
            return {
                gridSize:6,
                torpedoes:16,
                shipSizes:[4,3,2,2]
            };

        case "intermediate":
            return {
                gridSize:10,
                torpedoes:35,
                shipSizes:[5,4,3,2,2]
            };

        case "hard":
            return {
                gridSize:15,
                torpedoes:60,
                shipSizes:[5,5,4,4,3,3,2,2]
            };

    }

}