const fs = require('fs');
let content = fs.readFileSync('content.js', 'utf8');

// Encontrar onde começa a lista avulsa de produtos
const linhas = content.split('\n');
let inicioListaAvulsa = -1;
let fimListaAvulsa = -1;

for (let i = 0; i < linhas.length; i++) {
    if (linhas[i].includes('id: 8') && linhas[i].includes('Tharwah')) {
        inicioListaAvulsa = i;
        break;
    }
}

if (inicioListaAvulsa !== -1) {
    // Encontrar o fim da lista
    for (let i = inicioListaAvulsa; i < linhas.length; i++) {
        if (linhas[i].includes('};') && i > inicioListaAvulsa) {
            fimListaAvulsa = i;
            break;
        }
    }
    
    // Extrair os produtos avulsos
    const produtosAvulsos = linhas.slice(inicioListaAvulsa, fimListaAvulsa + 1).join('\n');
    
    // Remover os produtos avulsos do lugar errado
    const novaLinhas = [...linhas];
    novaLinhas.splice(inicioListaAvulsa - 2, fimListaAvulsa - inicioListaAvulsa + 5);
    
    // Encontrar onde está a seção feminine
    let feminineIndex = -1;
    for (let i = 0; i < novaLinhas.length; i++) {
        if (novaLinhas[i].includes('export const feminine')) {
            feminineIndex = i;
            break;
        }
    }
    
    if (feminineIndex !== -1) {
        // Encontrar onde termina a lista de produtos feminine
        let feminineEndIndex = -1;
        for (let i = feminineIndex; i < novaLinhas.length; i++) {
            if (novaLinhas[i].includes('];')) {
                feminineEndIndex = i;
                break;
            }
        }
        
        if (feminineEndIndex !== -1) {
            // Inserir os produtos avulsos antes do fechamento da lista
            novaLinhas.splice(feminineEndIndex, 0, ',');
            const produtosFormatados = produtosAvulsos.split('\n').map(line => {
                if (line.includes('id:')) return '    ' + line;
                return line;
            }).join('\n');
            novaLinhas.splice(feminineEndIndex + 1, 0, produtosFormatados);
        }
    }
    
    // Salvar o arquivo corrigido
    fs.writeFileSync('content.js', novaLinhas.join('\n'));
    console.log('✅ Arquivo corrigido!');
    console.log(`Produtos avulsos movidos para dentro da seção feminine.`);
} else {
    console.log('❌ Não encontrou produtos avulsos para corrigir.');
}
