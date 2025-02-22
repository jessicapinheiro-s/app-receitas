import React, { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import { getRecipesById } from "../functions API/recipes";
import { RecipesById } from "../types/api-types";
import CardRecipes from "../components/Card-Recipe";


export default function FavoriteRecipesPage() {
    const [favoriteRecipes, setFavoritesRecipes] = useState<RecipesById[]>();

    /*async function getRecipesByLocalStorage() {
        const itemsFromLocal = JSON.parse(localStorage.getItem('ItemId') || '[]');
        if (itemsFromLocal.length > 0) {
            const favItensInformation = await Promise.all(
                itemsFromLocal.map(async (id: number) => {
                    const response = await getRecipesById(id);
                    return response;
                })
            )
            setFavoritesRecipes(favItensInformation);
        }
    }*/

    const getRecipesByLocalStorage = useCallback(async () => {
        const itemsFromLocal = JSON.parse(localStorage.getItem('ItemId') || '[]');
        if (itemsFromLocal.length > 0) {
            const favItensInformation = await Promise.all(
                itemsFromLocal.map(async (id: number) => {
                    const response = await getRecipesById(id);
                    return response;
                })
            );

            setFavoritesRecipes((prev) => {
                if(JSON.stringify(prev) !== JSON.stringify(favItensInformation)) {
                    return favItensInformation;
                }
                return prev;
            });
        }
    }, [])


    useEffect(() => {
        getRecipesByLocalStorage();
    }, [getRecipesByLocalStorage]);

    
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


