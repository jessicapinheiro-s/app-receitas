import { Frown } from "lucide-react";
import React from "react";



export default function NotFoundPage() {

    return (
        <React.Fragment>
            <div className='w-screen h-screen flex flex-col items-center justify-center gap-8 p-32'>
                <div className="w-10/12 gap-6 flex flex-col items-center justify-center">
                    <div className="w-full flex flex-col items-center justify-center">
                        <Frown size={20} />
                    </div>
                    <div className="w-full flex flex-col items-center justify-center">
                        <h1 className="text-[29px] font-bold text-[#222222]">We not found a recipe with this Ingredient</h1>
                        <p className="text-[14px] text-[#474747]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus cupiditate ipsa doloremque, </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
