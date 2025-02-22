import React, { useEffect, useRef, useState } from "react";
import { Heart, Search } from 'lucide-react';
import { getRecipesByWord } from '../functions API/recipes';
import SearchBar from '../components/Search';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { ditesType } from "../enums/dietType.enum";

export interface RecipesProps {
    id: number;
    title: string;
    image: string;
    imageType: string;
}

export default function SearchPage() {
    const [dietSelected, setDiet] = useState<string>('');
    const [ingredient, setIngredient] = useState<string>('');
    const navigate = useNavigate();


    const {
        data: recipes,
        isLoading,
        refetch
    } = useQuery({
        queryKey: ['recipes'],
        queryFn: async () => {
            const itens = await getRecipesByWord(ingredient, dietSelected.replaceAll('  ', '-'));
            return itens.results;
        },
        enabled: false, // Não executa automaticamente
        refetchOnWindowFocus: false
    });
    console.log(recipes)

    const handleSearch = async () => {
        if (!ingredient.trim()) {
            alert('Preencha o campo de ingredientes corretamente.');
            return;
        }
        await refetch();
        /*if(recipes.lenght !== 0){
            navigate('ResultsRecipes');
        }else{
            
        }*/
        navigate('NotFound');
    };

    const handleSearchContent = (value: string) => {
        setIngredient(value); 
    };

    return (
        <React.Fragment>

            <div className='w-screen h-screen flex flex-col items-center justify-center gap-8 p-32'>
                <div className="w-10/12 gap-6 flex flex-col items-center justify-center">
                    <div className="w-full flex flex-col items-center justify-center">
                        <h1 className="text-[29px] font-bold text-[#222222]">Search for a Recipe</h1>
                        <p className="text-[14px] text-[#474747]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cupiditate ipsa doloremque, </p>
                    </div>
                    <div className="w-full flex flex-row items-center h-12 justify-between">
                        <div className='border rounded-xl w-9/12 flex flex-row items-center border-[#dfdfdf] '>
                            <SearchBar searchFunc={handleSearchContent} />
                            <button
                                type='button'
                                className="flex items-center justify-center w-20 h-12 bg-orange-400 rounded-xl"
                                onClick={handleSearch}
                            >
                                <Search style={{ color: '#fff' }} />

                            </button>
                        </div>
                        <select
                            name="dietType"
                            id="dietType"
                            className='border rounded-xl h-12 focus:outline-none w-2/12 text-[#474747] border-[#dfdfdf]'
                            value={dietSelected}
                            onChange={(event) => setDiet(event.target.value)}
                        >
                            {ditesType.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <div className='flex flex-col items-center justify-center border rounded-xl h-12 w-16 border-[#dfdfdf]'>
                            <Heart
                                size={16}
                                className="text-[#474747]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
