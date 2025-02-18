import React, { useEffect, useState } from "react";
import { ChefHat, CirclePlus, Clock, CookingPot, Heart, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RecipeInfoProps } from "../types/recipes-info-type";
import HTMLContent from 'dangerously-set-html-content';

type Item = {
    title: string;
    image: string
    id: number
}
interface PropsCard {
    item: RecipeInfoProps,
    index: number
}

export default function CardRecipes(props: PropsCard) {
    const { item, index } = props;
    const [favFlag, setFavFlag] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>();
    const instructionsArr = (item.instructions).replace('<ol>', '').replace('</ol>', '').replaceAll('<li>', '').split('</li>').filter(item => item !== '');
    const handleFav = (id: string) => {
        const idArrStr = [id];
        const localFavItens: string[] = JSON.parse(localStorage.getItem("ItemId") || "[]");
        const allItens = [...localFavItens, ...idArrStr];

        localStorage.setItem(
            "ItemId",
            JSON.stringify(allItens)
        );
        setFavFlag(true)
    };

    useEffect(() => {
        if (favFlag) {
            const id = window.setTimeout(() => {
                setFavFlag(false);
            }, 1000);

            return () => clearTimeout(id)
        }
    }, [favFlag]);

    return (
        <React.Fragment>
            <AnimatePresence>
                {selectedId !== undefined && selectedId === index && (
                    <motion.div
                        className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black/50 z-50"
                        onClick={() => setSelectedId(undefined)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            layoutId={index.toString()}
                            className="bg-white w-[1000px] h-[50%] rounded-xl flex flex-row"
                            onClick={(e) => e.stopPropagation()} // Impede que o clique feche o modal
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ type: "just", stiffness: 300, damping: 30 }}
                        >
                            <div className="w-[50%] flex flex-row items-center gap-4 justify-between">
                                <img
                                    className="w-[100%] rounded-xl h-full"
                                    src={item.image}
                                    alt={item.title}
                                />

                            </div>
                            <div className="w-[50%] p-6 break-words ">
                                <div className="flex flex-col items-start gap-6">
                                    <div className="w-full flex flex-row">
                                        <div className="w-full  break-words ">
                                            <h2 className="text-[29px] text-left font-bold text-lg break-words">{item.title}</h2>
                                        </div>
                                        <div className="w-full flex flex-col items-end justify-center" onClick={(e) => { handleFav(e.currentTarget.id) }} id={(item.id).toString()}>
                                            <Heart size={20} style={
                                                {
                                                    color: "#ef4444"
                                                }
                                            } />
                                        </div>
                                    </div>
                                    <div className="w-full grid grid-cols-2 grid-rows-2 gap-2 ">
                                        <div className="w-full border rounded-xl p-4 flex flex-row items-center justify-start gap-2">
                                            <Clock size={16} className="text-[#ef4444]" /> <p>{item.readyInMinutes} Minutes</p>
                                        </div>
                                        <div className="w-full border rounded-xl p-4 flex flex-row items-center justify-start gap-2">
                                            <CookingPot size={16} className="text-[#ef4444]" /> <p>{(item.diets).join(', ')}</p>
                                        </div>
                                        <div className="w-full border rounded-xl p-4 flex flex-row items-center justify-start gap-2">
                                            <Heart size={16} className="text-[#ef4444]" />  <p>Popular: {item.veryPopular ? 'Sim' : 'Não'}</p>
                                        </div>
                                        <div className="w-full border rounded-xl p-4 flex flex-row items-center justify-start gap-2">
                                            <ChefHat size={16} className="text-[#ef4444]" /> <p>{item.cuisines[0]}</p>
                                        </div>
                                    </div>

                                    <div className="w-full overflow-y-auto h-[172px] flex flex-col gap-4">
                                        <div className="w-full">
                                            <ul className="flex flex-row gap-2 flex-wrap">
                                                {(item.extendedIngredients).map(item => (
                                                    <div className="bg-[#d5d5d5] border rounded-xl border-[#d5d5d5]">
                                                        <li className="px-4 text-white">
                                                            {item.name}
                                                        </li>
                                                    </div>
                                                ))}
                                            </ul>
                                        </div>
                                        <div >
                                            {instructionsArr.map(item => (
                                                <li>{item}</li>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                className=" w-[350px] relative flex flex-col items-start justify-start border rounded-2xl gap-6  overflow-hidden cursor-pointer "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "just" }}
                layoutId={index.toString()}
            >
                <div className="w-full relative">
                    <img className="w-full h-full object-cover  rounded-2xl" src={item.image} alt={item.title} />
                    <div className="absolute inset-0  bg-black bg-opacity-50 rounded-lg"></div>
                </div>
                <div className="w-full flex flex-row items-start justify-between top-40 absolute px-3 py-0">
                    <div className="w-full  break-words overflow-hidden">
                        <h2 className="text-left font-bold text-lg break-words text-white text-[16px]">{item.title}</h2>
                    </div>
                    <div className="w-[40px]  h-7 flex flex-col items-center justify-center border rounded-md p-1" onClick={() => setSelectedId(index)}>
                        <CirclePlus size={20} style={
                            {
                                color: "white"
                            }
                        }
                        />
                    </div>
                </div>
            </motion.div>


            <AnimatePresence>
                {favFlag && (
                    <motion.div
                        className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black/50 z-50"
                        onClick={() => setFavFlag(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white w-[20%] h-[10%] rounded-xl p-8 flex-col gap-8"
                            onClick={(e) => e.stopPropagation()} // Impede que o clique feche o modal
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <h2>Receita adicionada a lista de Favoritos!</h2>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </React.Fragment >
    )
}