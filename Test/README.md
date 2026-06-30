
# Modelo de Avaliação em LaTeX - IF Sudeste MG

Este projeto é um modelo pronto para criar provas em PDF. Ele gera:

- um caderno de questões;
- uma folha de respostas no final da prova;
- um gabarito separado em outro PDF.

Você só precisa editar algumas informações em `main.tex` e escrever as questões em `questoes.tex`.

## O Que Cada Arquivo Faz

- `main.tex`: informações da prova, como nome da avaliação, pontuação, disciplina, data, professor e orientações.
- `questoes.tex`: questões da prova e respostas do gabarito.
- `gabarito.tex`: arquivo usado para gerar apenas o gabarito.
- `avaliacao-template.sty`: configurações do modelo. Em geral, não precisa mexer neste arquivo.
- `logo_horizontal_manhuacu.png`: logo usada na capa.
- `circuitos/`: pasta de imagens de exemplo. Você pode criar outras pastas para suas imagens.

## Como Editar as Informações da Prova

Abra `main.tex` e altere este bloco:

```latex
\renewcommand{\NomeAvaliacao}{Avaliação 2 (AV2)}
\renewcommand{\PontuacaoAvaliacao}{3 pontos}
\renewcommand{\CodigoDisciplina}{INF03098}
\renewcommand{\NomeDisciplina}{Tópicos Especiais em Engenharia de Software}
\renewcommand{\DataAvaliacao}{\campo{3.0cm}}
\renewcommand{\ProfessorAvaliacao}{Filipe Fernandes}
```

Exemplo:

```latex
\renewcommand{\NomeAvaliacao}{Prova Bimestral}
\renewcommand{\PontuacaoAvaliacao}{10 pontos}
\renewcommand{\CodigoDisciplina}{MAT001}
\renewcommand{\NomeDisciplina}{Matemática}
\renewcommand{\DataAvaliacao}{20/06/2026}
\renewcommand{\ProfessorAvaliacao}{Nome do Professor}
```

As orientações da prova também ficam em `main.tex`, dentro de:

```latex
\renewcommand{\OrientacoesProva}{%
  \begin{enumerate}[label=\arabic*.]
    \item Escreva aqui uma orientação.
    \item Escreva aqui outra orientação.
  \end{enumerate}
}
```

## Como Criar Questões

Abra `questoes.tex`. Cada questão deve ficar dentro deste bloco:

```latex
\begin{questao}[1,0 ponto]
Texto da questão aqui.

\resposta[6]{Resposta esperada no gabarito.}
\end{questao}
```

O valor entre colchetes aparece no caderno de questões:

```latex
\begin{questao}[2,0 pontos]
```

## Questão Aberta

Use `\resposta[numero de linhas]{resposta do gabarito}`.

```latex
\begin{questao}[1,0 ponto]
Explique a importância da leitura.

\resposta[8]{A resposta deve mencionar que a leitura amplia vocabulário, interpretação e conhecimento.}
\end{questao}
```

O número `8` indica o tamanho da caixa de resposta na folha de respostas. Por padrão, cada linha usa `0.75cm` de altura.
Na folha de respostas, as linhas aparecem numeradas à esquerda.

Se precisar personalizar a altura das linhas, use `\respostaLinhas[numero de linhas]{altura da linha}{resposta do gabarito}`.

```latex
\begin{questao}[1,0 ponto]
Resolva o problema abaixo e apresente os cálculos.

\respostaLinhas[10]{0.7cm}{A resposta deve apresentar os cálculos e o resultado final.}
\end{questao}
```

O valor `0.7cm` define o espaço vertical entre as linhas. A macro `\respostaAlturaLinhas` também pode ser usada como sinônimo.

Se você não quiser que uma questão aberta apareça no gabarito, deixe a resposta vazia:

```latex
\resposta[8]{}
```

## Resposta Com Caixa Vazia

Use `\respostaCaixa[altura]{resposta do gabarito}` para reservar uma área em branco, sem linhas internas.

```latex
\begin{questao}[2,0 pontos]
Desenhe a solução do problema no espaço indicado.

\respostaCaixa[8cm]{A resposta deve conter um desenho coerente com o enunciado.}
\end{questao}
```

Se você não quiser que a resposta apareça no gabarito, deixe o último argumento vazio:

```latex
\respostaCaixa[8cm]{}
```

## Resposta Com Diagrama e Linhas

Use `\respostaDiagrama[altura do diagrama]{numero de linhas}{resposta do gabarito}`.

```latex
\begin{questao}[2,0 pontos]
Desenhe um diagrama que represente o processo descrito e explique as etapas principais.

\respostaDiagrama[6cm]{8}{A resposta deve apresentar um diagrama coerente com o processo e explicar as etapas na ordem correta.}
\end{questao}
```

O primeiro valor, como `6cm`, define a altura da área em branco para o diagrama. O segundo valor define quantas linhas aparecem abaixo do diagrama na folha de respostas.
As linhas abaixo do diagrama também aparecem numeradas à esquerda.

Se você não quiser que a resposta apareça no gabarito, deixe o último argumento vazio:

```latex
\respostaDiagrama[6cm]{8}{}
```

## Respostas Em Mais de Uma Página

As respostas abertas, caixas vazias e respostas com diagrama podem ocupar mais de uma página. O template usa primeiro o espaço restante da página atual e continua nas próximas páginas quando necessário. A partir da segunda parte, a folha de respostas mostra o título como `Questão 4 (continuação)`.

## Questão de Alternativas

Use `alternativas` e marque a correta com `\item[correta]`.

```latex
\begin{questao}[1,0 ponto]
Qual alternativa está correta?

\begin{alternativas}
  \item Alternativa errada.
  \item[correta] Alternativa correta.
  \item Outra alternativa errada.
\end{alternativas}
\end{questao}
```

Na prova, aparece apenas a lista normal de alternativas. No gabarito, aparece a letra correta.

## Questão de Certo ou Errado

Use:

```latex
\opcoesCertoErrado
\respostaCertoErrado{Certo}
```

Exemplo:

```latex
\begin{questao}[1,0 ponto]
A água ferve a 100 graus Celsius ao nível do mar.

\opcoesCertoErrado
\respostaCertoErrado{Certo}
\end{questao}
```

Também pode usar:

```latex
\respostaCertoErrado{Errado}
```

## Como Colocar Uma Imagem

Coloque a imagem na pasta do projeto. Depois use:

```latex
\begin{figure}[h]
  \centering
  \includegraphics[width=0.6\textwidth]{nome-da-imagem.png}
\end{figure}
```

Se a imagem estiver dentro de uma pasta, inclua o caminho:

```latex
\includegraphics[width=0.6\textwidth]{imagens/grafico.png}
```

## Como Colocar Uma Tabela

Exemplo simples:

```latex
\begin{center}
\begin{tabularx}{0.8\textwidth}{@{}lcc@{}}
\toprule
\textbf{Turma} & \textbf{Alunos} & \textbf{Média} \\
\midrule
A & 30 & 8,0 \\
B & 28 & 7,5 \\
\bottomrule
\end{tabularx}
\end{center}
```

## Como Colocar Código

Use `lstlisting`.

```latex
\begin{lstlisting}[language=Python]
notas = [8, 7, 9]
media = sum(notas) / len(notas)
print(media)
\end{lstlisting}
```

Você pode trocar `Python` por outra linguagem, como `Java`, `C`, `C++` ou `SQL`.

## Como Gerar os PDFs

No terminal, dentro da pasta do projeto, execute:

```bash
pdflatex main.tex
pdflatex main.tex
pdflatex gabarito.tex
pdflatex gabarito.tex
```

Serão gerados:

- `main.pdf`: prova completa com caderno de questões e folha de respostas;
- `gabarito.pdf`: gabarito separado.

Também é possível usar `latexmk`:

```bash
latexmk main.tex
latexmk gabarito.tex
```

## Dicas Para Evitar Erros

- Não apague `\begin{questao}` nem `\end{questao}`.
- Toda chave `{` precisa ter uma chave de fechamento `}`.
- Use `%` antes de comentários.
- Evite nomes de imagem com espaços. Prefira `minha-imagem.png`.
- Depois de mudar as questões, compile `main.tex` e `gabarito.tex` novamente.

*Desenvolvido por [Filipe Fernandes, PhD](filipefernandesphd.com)*
