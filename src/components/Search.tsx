import React, { useRef, useState } from "react";

type SearchBarProps = {
  searchFunc: (value: string) => void; // Função para enviar o valor ao pai
};

export default function SearchBar({ searchFunc }: SearchBarProps) {
  const [inputValue, setInputValue] = useState<string>('');
    console.log('a')
  return (
    <input
      type="text"
      className="flex-1 p-2 focus:outline-none"
      placeholder="Digite a receita ou o ingrediente"
      value={inputValue} // Use o estado local para gerenciar o valor
      onChange={(e) => {
        e.preventDefault();
        setInputValue(e.target.value); // Atualize o estado local
        searchFunc(e.target.value); // Chame a função pai com o novo valor
      }}
    /> 
  );
}
