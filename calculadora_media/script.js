function calcularMedia() {
    const nome = document.getElementById('nomeAluno').value.trim();
    const notas = [
      parseFloat(document.getElementById('nota1').value),
      parseFloat(document.getElementById('nota2').value),
      parseFloat(document.getElementById('nota3').value),
      parseFloat(document.getElementById('nota4').value)
    ];
  
    const resultadoDiv = document.getElementById('resultado');
    const avaliacaoExtraInput = document.getElementById('avaliacaoExtra').value;
    const notaExtra = parseFloat(avaliacaoExtraInput);
  
    if (!nome) {
      resultadoDiv.innerText = 'Por favor, insira o nome do aluno.';
      resultadoDiv.style.color = '#f44336';
      return;
    }
  
    if (notas.some(isNaN)) {
      resultadoDiv.innerText = 'Por favor, insira todas as 4 notas.';
      resultadoDiv.style.color = '#f44336';
      return;
    }
  
    const mediaOriginal = notas.reduce((acc, nota) => acc + nota, 0) / notas.length;
    let mediaFinal = mediaOriginal;
    let situacao = '';
    let detalhes = `Média Original: ${mediaOriginal.toFixed(2)}\n`;
  
    if (mediaOriginal >= 7) {
      situacao = 'Aprovado ✅';
      resultadoDiv.style.color = '#4caf50';
    } else if (mediaOriginal >= 4 && mediaOriginal < 7) {
      if (!isNaN(notaExtra)) {
        mediaFinal = (mediaOriginal + notaExtra) / 2;
        detalhes += `Nota da AVF: ${notaExtra.toFixed(2)}\nMédia Final: ${mediaFinal.toFixed(2)}\n`;
  
        if (mediaFinal >= 5) {
          situacao = 'Aprovado após AVF ✅📘';
          resultadoDiv.style.color = '#4caf50';
        } else {
          situacao = 'Reprovado após AVF ❌';
          resultadoDiv.style.color = '#f44336';
        }
      } else {
        const notaNecessaria = (5 * 2) - mediaOriginal;
        situacao = 'Necessita realizar a AVF ⚠️';
        detalhes += `Nota mínima necessária na AVF: ${notaNecessaria.toFixed(2)}\n`;
        resultadoDiv.style.color = '#ff9800';
      }
    } else {
      situacao = 'Reprovado ❌';
      resultadoDiv.style.color = '#f44336';
    }
  
    resultadoDiv.innerText = `${nome}\n${detalhes}Situação: ${situacao}`;
  }