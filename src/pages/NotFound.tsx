import { Frown } from "lucide-react";
import React from "react";
import Header from "../components/Header";



export default function NotFoundPage() {
    return (
        <div className='w-full'>
            <Header/>
            <div className='w-full h-full flex flex-col items-center justify-center p-32'>
                <div className="w-full gap-6 flex flex-col items-center justify-center">
                    <div className="w-full flex flex-col items-center justify-center">
                        <Frown size={40} />
                    </div>
                    <div className="w-full flex flex-col items-center justify-center">
                        <h1 className="text-[29px] font-bold text-[#222222]">We not found a recipe with this Ingredient</h1>
                        <p className="text-[14px] text-[#474747]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cupiditate ipsa doloremque, </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
