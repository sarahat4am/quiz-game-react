import { useState, useEffect } from 'react';

const decodificarTexto = (texto) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = texto;
  return textArea.value;
};

export function TelaJogando({ perguntaAtual, numeroPergunta, totalPerguntas, verificarResposta }) {
  // Estado para guardar as alternativas já misturadas
  const [respostasEmbaralhadas, setRespostasEmbaralhadas] = useState([]);

  // BLOCO 2: O Desafio do Embaralhamento
  // Sempre que a perguntaAtual mudar, este bloco reorganiza as opções
  useEffect(() => {
    if (perguntaAtual) {
      const todasAsRespostas = [
        ...perguntaAtual.incorrect_answers, // "Desempacota" as opções erradas
        perguntaAtual.correct_answer        // Adiciona a opção certa
      ];

      // Mistura a ordem de forma aleatória
      const misturadas = todasAsRespostas.sort(() => Math.random() - 0.5);
      
      setRespostasEmbaralhadas(misturadas);
    }
  }, [perguntaAtual]);

  // Trava de segurança para o "undefined"
  if (!perguntaAtual) {
    return (
      <div className="bg-white p-8 rounded-xl text-center w-full max-w-lg shadow-xl">
        <p className="text-gray-500 font-bold animate-pulse text-xl">
          Carregando perguntas da internet...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl text-center w-full max-w-lg shadow-xl">
      <span className="text-sm text-blue-500 font-bold uppercase tracking-wider mb-2 block">
        Pergunta {numeroPergunta} de {totalPerguntas}
      </span>

      <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-8">
        {decodificarTexto(perguntaAtual.question)}
      </h2>

      <div className="flex flex-col gap-3">
        {/* BLOCO 3: Criando os botões de forma automática com map */}
        {respostasEmbaralhadas.map((resposta, index) => (
          <button 
            key={index}
            onClick={() => verificarResposta(resposta)}
            className="bg-gray-100 hover:bg-blue-100 text-gray-700 font-semibold py-3 px-4 rounded-lg border border-gray-300 transition-colors"
          >
            {decodificarTexto(resposta)}
          </button>
        ))}
      </div>
    </div>
  );
}