import { useState, useEffect } from 'react';
import { TelaInicio } from './components/TelaInicio';
import { TelaJogando } from './components/TelaJogando';
import { TelaResultado } from './components/TelaResultado';

export default function App() {
  const [etapa, setEtapa] = useState('inicio');
  const [pontuacao, setPontuacao] = useState(0);
  const [perguntas, setPerguntas] = useState([]);
  const [indicePergunta, setIndicePergunta] = useState(0);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
      .then((resposta) => resposta.json())
      .then((dados) => {
        setPerguntas(dados.results);
      });
  }, []);

  const comecarJogo = () => {
    setPontuacao(0);
    setIndicePergunta(0);
    setEtapa('jogando');
  };

  // ATUALIZANDO O CÓDIGO: A função que o botão de resposta vai chamar
  const verificarResposta = (respostaClicada) => {
    const perguntaAtual = perguntas[indicePergunta];

    // Se acertou, ganha ponto
    if (respostaClicada === perguntaAtual.correct_answer) {
      setPontuacao(pontuacao + 1);
    }

    // Passa para a próxima pergunta OU finaliza o jogo
    if (indicePergunta + 1 < perguntas.length) {
      setIndicePergunta(indicePergunta + 1);
    } else {
      setEtapa('resultado');
    }
  };

  const voltarParaInicio = () => {
    setEtapa('inicio');
  };

  return (
    <div className="min-h-screen bg-blue-900 flex items-center justify-center p-4">
      {etapa === 'inicio' && (
        <TelaInicio comecarJogo={comecarJogo} />
      )}

      {etapa === 'jogando' && (
        <TelaJogando 
          // Agora passamos apenas a pergunta atual e as informações necessárias
          perguntaAtual={perguntas[indicePergunta]} 
          numeroPergunta={indicePergunta + 1}
          totalPerguntas={perguntas.length}
          verificarResposta={verificarResposta} 
        />
      )}

      {etapa === 'resultado' && (
        <TelaResultado 
          pontuacao={pontuacao} 
          voltarParaInicio={voltarParaInicio} 
        />
      )}
    </div>
  );
}