import React, { useRef, useState } from "react";

type SearchBarProps = {
    searchFunc: (value: string) => void; // Função para enviar o valor ao pai
};

export default function SearchBar({ searchFunc }: SearchBarProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <input
            type="text"
            className="flex-1 p-2 focus:outline-none "
            placeholder="Digite a receita ou o ingrediente"
            ref={inputRef}
            value={inputRef.current?.value}
            onChange={(e) => {
                e.preventDefault();
                searchFunc(e.target.value);
            }}
        />
    )
}