import React, { useEffect, useState } from 'react';
import './App.css'
import { CirclePlus, Heart, Search } from 'lucide-react';
import { getRecipesByWord } from './functions API/recipes';
import SearchBar from './components/Search';
import { motion, AnimatePresence } from 'framer-motion';
export interface RecipesProps {
  id: number
  title: string
  image: string
  imageType: string
}

function App() {
  const [dietSelected, setDiet] = useState<string>('');
  const [recipes, setRecipes] = useState<RecipesProps[]>([]);
  const [ingredient, setIngredient] = useState<string>('');
  const [selectedId, setSelectedId] = useState<number>();

  const ditesType = [
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole30"
  ];

  const handleRecipes = async () => {
    if (!ingredient) {
      alert('Preencha o campo de Ingredientes corretamente..');
      return [];
    }
    try {
      const itens = await getRecipesByWord(ingredient);
      setRecipes(itens.results);
    } catch (error) {
    }
  };


  const hanldeSarchContent = (value: string) => {
    setIngredient(value);
  };

  const handleFav = () => {
  };


  useEffect(() => {
    console.log(selectedId);
  }, [selectedId]);


  return (
    <React.Fragment>
      <div className='w-screen h-screen flex flex-col items-center justify-center gap-8 p-32'>
        <div className="w-full flex flex-row items-center h-12 justify-between">
          <div className='border rounded-xl w-9/12 flex flex-row items-center'>
            <SearchBar searchFunc={hanldeSarchContent} />
            <button
              type='submit'
              className="flex items-center justify-center w-20 h-12 bg-blue-400 rounded-xl"
              onClick={handleRecipes}
            >
              <Search style={{
                color: '#fff'
              }} />
            </button>
          </div>
          <select name="" id="" className='border rounded-xl h-12 focus:outline-none w-2/12' value={dietSelected} onChange={(event) => { setDiet(event.target.value) }}>
            {
              ditesType.map((item, index) => (
                <option key={index} value={dietSelected} >{item}</option>
              ))
            }
          </select>
          <div className='flex flex-col items-center justify-center border rounded-xl h-12 w-16'>
            <Heart size={20} onClick={() => { handleFav }} />
          </div>
        </div>
        <div className='w-full h-full flex flex-row items-start justify-start flex-wrap gap-8'>
          {
            recipes?.map((item, index) => (
              <React.Fragment>
                <AnimatePresence>
                  {selectedId !== undefined && selectedId === index && (
                    <motion.div
                      className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black/50 z-50"
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
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
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
                  transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  layoutId={index.toString()}
                >
                  <img className='w-full h-40 rounded-2xl' src={item.image} alt={item.title} />
                  <div className='w-full flex flex-row items-start justify-between'>
                    <div className='w-7/12  break-words'>
                      <h2 className='text-left font-bold text-lg break-words'>{item.title}</h2>
                    </div>
                    <div className='w-2/12  h-7 flex flex-col items-center justify-center border rounded-md p-1'>
                      <CirclePlus size={20} style={
                        {
                          color: 'grey'
                        }
                      }
                        onClick={() => setSelectedId(index)}
                      />

                    </div>
                    <div className='w-2/12 h-7 flex flex-col items-center justify-center rounded-md p-1 bg-red-500' onClick={(e) => handleFav}>
                      <Heart size={20} style={
                        {
                          color: "#fff"
                        }
                      } />
                    </div>
                  </div>
                </motion.div>
              </React.Fragment>
            ))
          }
        </div>
      </div>
    </React.Fragment>
  )
}



export default App;
