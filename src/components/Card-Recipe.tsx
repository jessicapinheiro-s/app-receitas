import React, { useEffect, useState } from "react";
import { CirclePlus, Heart, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Item = {
    title: string;
    image: string
    id: number
}

interface PropsCard {
    item: Item,
    index: number
}


export default function CardRecipes(props: PropsCard) {
    const { item, index } = props;
    const [favFlag, setFavFlag] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>();

    const handleFav = (id: string) => {
        const idArrStr = [id];
        const localFavItens: string[] = JSON.parse(localStorage.getItem('ItemId') || '[]');
        const allItens = [...localFavItens, ...idArrStr];

        localStorage.setItem(
            'ItemId',
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
                            className="bg-white w-[50%] h-[50%] rounded-xl p-8 flex-col gap-8"
                            onClick={(e) => e.stopPropagation()} // Impede que o clique feche o modal
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ type: 'just', stiffness: 300, damping: 30 }}
                        >
                            <img
                                className=' h-40 rounded-2xl'
                                src={item.image}
                                alt={item.title}
                            />
                            <div className='w-full flex flex-col items-start'>
                                <div className='w-7/12  break-words border'>
                                    <h2 className='text-left font-bold text-lg break-words'>{item.title}</h2>
                                </div>
                                <div className='border'>
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. In voluptate voluptatem adipisci, unde quae quaerat ex voluptatibus ipsum. Numquam possimus sed quibusdam sit voluptatem aliquid distinctio architecto veniam dignissimos laboriosam?</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                className='w-56 h-[220px] flex flex-col items-start justify-start border rounded-2xl gap-6 p-2 overflow-hidden cursor-pointer '
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "just" }}
                layoutId={index.toString()}
            >
                <img className='w-full h-40 rounded-2xl' src={item.image} alt={item.title} />
                <div className='w-full flex flex-row items-start justify-between'>
                    <div className='w-7/12  break-words'>
                        <h2 className='text-left font-bold text-lg break-words'>{item.title}</h2>
                    </div>
                    <div className='w-2/12  h-7 flex flex-col items-center justify-center border rounded-md p-1' onClick={() => setSelectedId(index)}>
                        <CirclePlus size={20} style={
                            {
                                color: 'grey'
                            }
                        }
                        />

                    </div>
                    <div className='w-2/12 h-7 flex flex-col items-center justify-center rounded-md p-1 bg-red-500' onClick={(e) => { handleFav(e.currentTarget.id) }} id={(item.id).toString()}>
                        <Heart size={16} style={
                            {
                                color: "#fff"
                            }
                        } />
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
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            <h2>Receita adicionada a lista de Favoritos!</h2>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </React.Fragment >
    )
}