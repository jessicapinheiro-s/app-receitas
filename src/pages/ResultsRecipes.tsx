import React, { useEffect, useState } from "react";
import { CirclePlus, Heart, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RecipesProps } from "./SearchPage";
import { useQueryClient } from "@tanstack/react-query";
import Header from "../components/Header";
import CardRecipes from "../components/Card-Recipe";
import { getRecipesById } from "../functions API/recipes";
import { RecipeInfoProps } from "../types/recipes-info-type";


export default function ResultRecipesPage() {
    const queryClient = useQueryClient();
    const recipes: RecipesProps[] = queryClient.getQueryData(['recipes']) ?? [];
    const [recipesAllInfo, setRecipesAllInfo] = useState<RecipeInfoProps[] | null>(null);

    async function getItemInfo(recipeId: number) {
        try {
            const response = await getRecipesById(recipeId);
            return response;
        } catch (error) {
            throw new Error(`Error to get recipes additional Infor= ${error}`);
        }
    };

    async function gerRecipesInfo ()  {
        const recipesInfo = await Promise.all(recipes.map(async (item) => {
            return {
                ...item,
                ...await getItemInfo(item.id)
            }
        }));
        setRecipesAllInfo(recipesInfo);
    }

    useEffect(() => {
        gerRecipesInfo();
    }, []);

    return (
        <div className='w-full h-full gap-8 flex flex-col'>
            <Header />
            <div className='w-full px-44 flex flex-row items-center justify-start flex-wrap gap-8'>
                {
                    recipesAllInfo?.map((item, index) => (
                        <CardRecipes item={item} index={index} key={index} />
                    ))
                }
            </div>
        </div>
    )
}