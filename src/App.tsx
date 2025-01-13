import React, { useState } from 'react';
import './App.css'
import { CirclePlus, Search } from 'lucide-react';
import { getRecipesByWord } from './functions API/recipes';

export interface RecipesProps {
  id: number
  title: string
  image: string
  imageType: string
}

function App() {
  const [ingredient, setIngredient] = useState<string>('');
  const [recipes, setRecipes] = useState<RecipesProps[]>([]);

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

  console.log(recipes)

  return (
    <React.Fragment>
      <div className='w-screen h-screen flex flex-col items-center justify-center gap-8 p-32'>
        <div className="w-full flex flex-row items-center border rounded-xl h-12">
          <input
            type="text"
            className="flex-1 p-2 focus:outline-none"
            placeholder="Digite a receita ou o ingrediente"
            value={ingredient}
            onChange={(e) => { setIngredient(e.target.value) }}
          />
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
        <div className='w-full h-full flex flex-row items-start justify-start flex-wrap gap-8'>
          {
            recipes?.map(item => (
              <div className='w-56 h-[220px] flex flex-col items-start justify-start border rounded-2xl gap-6 p-2 overflow-hidden'>
                <img className='w-full h-40 rounded-2xl' src={item.image} alt={item.title} />
                <div className='w-full flex flex-row items-start justify-between '>
                  <div className='w-full  break-words'>
                    <h2 className='text-left font-bold text-lg break-words'>{item.title}</h2>
                  </div>
                  <div className='w-12  h-7 flex flex-col items-center justify-center border rounded-md p-1'>
                    <CirclePlus size={20} style={
                      {
                        color: 'grey'
                      }
                    }/>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </React.Fragment>
  )
}



export default App;
