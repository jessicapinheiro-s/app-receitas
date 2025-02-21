import { Heart, Search } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Header() {
    const navigate = useNavigate()
    return (
        <header className="w-full flex items-center justify-between border bg-orange-400 text-white px-44 h-20 rounded-b-xl">
            <div className="w-11/12">
                
            </div>
            <div className="w-1/12">
                <nav className="flex flex-row items-center justify-between list-none">
                    <li onClick={() => {
                        navigate('/');
                    }}>
                        <Search size={25} />
                    </li>
                    <li onClick={() => {
                        navigate('/');
                        navigate('/FavoriteRecipes');
                    }}><Heart size={25} /></li>
                </nav>
            </div>
        </header>
    )
}