import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { getRecipesById } from "../functions API/recipes";
import { RecipesById } from "../types/api-types";


export default function FavoriteRecipesPage() {
    const [favoriteRecipes, setFavoritesRecipes] = useState<RecipesById[]>();

    async function porra() {
        const itemsFromLocal = JSON.parse(localStorage.getItem('ItemId') || '[]');

        if (itemsFromLocal.length > 0) {
            const favItensInformation = itemsFromLocal?.map(async (item: string) => {
                try {
                    return await getRecipesById(parseInt(item));
                } catch (error) {
                    return [];
                }
            });
            setFavoritesRecipes(favItensInformation);
        }

    }

    console.log(favoriteRecipes)
    return (
        <div className="w-full h-full gap-8 flex flex-col">
            <Header />
            <div className='w-full px-44 flex flex-row items-center justify-start flex-wrap gap-8'>
                {

                }

            </div>
        </div>
    )
}


