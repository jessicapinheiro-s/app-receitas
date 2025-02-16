import.meta.env; 
export async function getRecipesByWord(props: string, dietType:string) {
    const keys =  import.meta.env.VITE_API_SECRET;
    const hostAPI = 'https://api.spoonacular.com/recipes/';

    const query = props;
    const queryDiet = dietType;
    try {
        const response = await fetch(`${hostAPI}complexSearch?query=${query}&apiKey=${keys}&number=5&diet=${queryDiet}`);
        if (!response.ok) {
            throw new Error(`Error to get recipes ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        throw new Error(`Error to get recipes ${error}`);
    }
}

export async function getRecipesById(props: number) {
    const keys =  import.meta.env.VITE_API_SECRET;
    const hostAPI = 'https://api.spoonacular.com/recipes/';

    const query = props;
    try {
        const response = await fetch(`${hostAPI}${query}/information?apiKey=${keys}`);
        if (!response.ok) {
            throw new Error(`Error to get recipes ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        throw new Error(`Error to get recipes ${error}`);
    }
}
