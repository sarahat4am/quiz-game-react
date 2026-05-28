export function TelaInicio({ comecarJogo }) {
  return (
    <div className="bg-white p-8 rounded-xl text-center shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Super Quiz!</h1>
      <button 
        onClick={comecarJogo}
        className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold transition-colors"
      >
        Começar Agora
      </button>
    </div>
  );
}