'use client';

//hooks
import { useState, useEffect } from 'react';

//Componente principal - Armazenamentos//
export default function Home() {
  const [nomeDaLista, setNomeLista] = useState('');
  const [nomeSalvo, setNomeSalvo] = useState('');


  // Carrega o nome salvo anteriormente //
  useEffect(() => {
    try {
      // 1. Busca o valor no localStorage do navegador
      const savedName = localStorage.getItem('nomeDaLista');
      // 2. Se existir um nome salvo:
      if (savedName) {
        setNomeLista(savedName);
        setNomeSalvo(savedName);
      }
    } catch (error) {
      console.error("Erro ao ler localStorage:", error);
    }
  }, []);

  const salvarLista = () => {
    try {
      if (nomeDaLista.trim()) { // verifica campo vazio
        // Salva no localStorage
        localStorage.setItem('nomeDaLista', nomeDaLista);
        // Atualiza o estado (exibição imediata)
        setNomeSalvo(nomeDaLista);
        alert(`Lista "${nomeDaLista}" salva com sucesso!`);
      } else {
        alert('Por favor, digite um nome válido.');
      }
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error);
      alert("Erro ao salvar, tente novamente");
    }
  };

  // RENDERIZAÇÃO
  return (
    <div className='dflex paddingInput'>
      <main>
        {/* Input para digitar o nome da lista */}
        <input
          type="text"
          placeholder="Nome da lista:"
          value={nomeDaLista}
          onChange={(e) => setNomeLista(e.target.value)}
          onBlur={() => {
            if (nomeDaLista.trim() === "") {
              setNomeLista(nomeSalvo || "");
            } else {
              salvarLista();
            }
          }}
        />
      </main>
    </div>
  );
}