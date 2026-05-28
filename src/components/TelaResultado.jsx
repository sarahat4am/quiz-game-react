export function TelaResultado({ pontuacao, voltarParaInicio }) {
  return (
    <div className="bg-white p-8 rounded-xl text-center shadow-xl">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Fim de Jogo!</h2>
      <p className="text-xl mb-6 text-gray-600">
        Você acertou <span className="font-bold text-blue-600">{pontuacao}</span> de 10 perguntas.
      </p>
      <button 
        onClick={voltarParaInicio}
        className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold transition-colors"
      >
        Jogar Novamente
      </button>
    </div>
  );
}