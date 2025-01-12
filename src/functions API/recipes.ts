interface RecipesByIngredientsProps {
    Ingredient: string;
}

export async function getRecipesByWord (props: RecipesByIngredientsProps) {
    const { Ingredient } = props;
    require('dotenv').config();

    const keys = process.env.API_KEY;
    const hostAPI = 'https://api.spoonacular.com/recipes/';

    try{
        const response = await fetch(`${hostAPI}complexSearch?query=${Ingredient}&apiKey=${keys}`);
        if(!response.ok) {
            throw new Error(`Error to get recipes ${response.status}`);
        }
        const data = await response.json();
        return data;

    }catch (error) {
        throw new Error (`Error to get recipes ${error}`);
    }
}