import { useState, useEffect } from 'react';
import { TelaInicio } from './components/TelaInicio';
import { TelaJogando } from './components/TelaJogando';
import { TelaResultado } from './components/TelaResultado';

export default function App() {
  const [etapa, setEtapa] = useState('inicio');
  const [pontuacao, setPontuacao] = useState(0);
  const [perguntas, setPerguntas] = useState([]);
  
  // BLOCO 1: O Contador do Jogo
  const [indicePergunta, setIndicePergunta] = useState(0);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("A API nos bloqueou!");
        }
        return resposta.json();
      })
      .then((dados) => {
        setPerguntas(dados.results || []);
      })
      .catch((erro) => {
        console.log("Ativando o Plano B! Motivo:", erro);
        setPerguntas([
          {
            question: "A API bloqueou a gente! Mas o React continua funcionando. Qual destas ferramentas usamos para estilizar nosso projeto?",
            correct_answer: "Tailwind CSS",
            incorrect_answers: ["Bootstrap", "Sass", "Material UI"]
          },
          {
            question: "Qual comando utilizamos para criar um projeto React moderno?",
            correct_answer: "npm create vite@latest",
            incorrect_answers: ["npx create-react-app", "npm install react", "npm run dev"]
          },
          {
            question: "Qual Hook do React nós usamos para fazer o fetch na internet com segurança?",
            correct_answer: "useEffect",
            incorrect_answers: ["useState", "useFetch", "useComponent"]
          }
        ]);
      });
  }, []);

  const comecarJogo = () => {
    setPontuacao(0);
    setIndicePergunta(0); // Sempre zera ao iniciar uma nova partida
    setEtapa('jogando');
  };

  // BLOCO 3: Validando a resposta e somando pontos
  const verificarResposta = (respostaClicada) => {
    const perguntaAtual = perguntas[indicePergunta];

    // Se a resposta for a correta, ganha 1 ponto
    if (respostaClicada === perguntaAtual.correct_answer) {
      setPontuacao(pontuacao + 1);
    }

    // Passa para a próxima pergunta OU finaliza o jogo se for a última
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
          // Enviamos apenas a pergunta da rodada atual
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