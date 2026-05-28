import { useState, useEffect } from 'react';

export function TelaJogando({ perguntaAtual, numeroPergunta, totalPerguntas, verificarResposta }) {
  // Estado local para guardar as respostas já embaralhadas
  const [respostasEmbaralhadas, setRespostasEmbaralhadas] = useState([]);

  // Toda vez que a 'perguntaAtual' mudar, esse useEffect roda de novo
  useEffect(() => {
    if (perguntaAtual) {
      // 1. Junta a resposta certa com as erradas em um array só
      const todasAsRespostas = [
        ...perguntaAtual.incorrect_answers,
        perguntaAtual.correct_answer
      ];

      // 2. Embaralha o array
      const misturadas = todasAsRespostas.sort(() => Math.random() - 0.5);
      
      // 3. Salva no estado
      setRespostasEmbaralhadas(misturadas);
    }
  }, [perguntaAtual]);

  // Trava de segurança enquanto a internet não responde
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
        {perguntaAtual.question}
      </h2>

      <div className="flex flex-col gap-3">
        {/* Renderiza um botão para cada resposta do array embaralhado */}
        {respostasEmbaralhadas.map((resposta, index) => (
          <button 
            key={index}
            onClick={() => verificarResposta(resposta)}
            className="bg-gray-100 hover:bg-blue-100 text-gray-700 font-semibold py-3 px-4 rounded-lg border border-gray-300 transition-colors"
          >
            {resposta}
          </button>
        ))}
      </div>
    </div>
  );
}