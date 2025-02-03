import React from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Header (){
    const navigate = useNavigate()
    return(
        <header className="w-full flex items-center justify-between border bg-orange-400 text-white px-44 h-20">
            <div className="w-8/12">
                <h1 className="text-xl">Recipes</h1>
            </div>
            <div className="w-2/12">
                <nav className="flex flex-row items-center justify-between list-none">
                    <li onClick={() =>{
                        navigate('/');
                        }}>
                            Search
                    </li>
                    <li onClick={() =>{
                        navigate('/');
                        navigate('/FavoriteRecipes');
                        }}>Favorites</li>
                </nav>
            </div>
        </header>
    )
}