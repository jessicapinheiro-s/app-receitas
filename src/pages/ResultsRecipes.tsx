import React, { useEffect, useState } from "react";
import { CirclePlus, Heart, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RecipesProps } from "./SearchPage";
import { useQueryClient } from "@tanstack/react-query";
import Header from "../components/Header";
import CardRecipes from "../components/Card-Recipe";


export default function ResultRecipesPage() {
    const queryClient = useQueryClient();
    const recipes: RecipesProps[] = queryClient.getQueryData(['recipes']) ?? [];

    return (
        <div className='w-full h-full gap-8 flex flex-col'>
            <Header />
            <div className='w-full px-44 flex flex-row items-center justify-start flex-wrap gap-8'>
                {
                    recipes?.map((item, index) => (
                        <CardRecipes item={item} index={index} />
                    ))
                }
                
            </div>
        </div>
    )
}