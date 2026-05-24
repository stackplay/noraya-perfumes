const fs = require('fs');

function corrigirArquivo(caminho) {
    console.log(`\n📁 Analisando ${caminho}...`);
    let conteudo = fs.readFileSync(caminho, 'utf8');
    
    // Verificar se tem o padrão de erro
    if (conteudo.includes('};\n     { id: 8,')) {
        console.log(`   → Padrão de erro encontrado!`);
        // Remove o fechamento precoce e guarda o bloco de perfumes novos
        conteudo = conteudo.replace('};\n     { id: 8,', ',\n     { id: 8,');
        
        // Agora precisamos achar onde fechar o arquivo corretamente. 
        // Vamos colocar o }; no final absoluto do arquivo.
        conteudo = conteudo.trim();
        if (conteudo.endsWith(',')) {
            conteudo = conteudo.slice(0, -1);
        }
        conteudo += '\n};';
        
        fs.writeFileSync(caminho, conteudo, 'utf8');
        console.log(`   ✅ ${caminho} corrigido com sucesso!`);
        return true;
    } 
    // Verificar padrão alternativo
    else if (conteudo.includes('};\n    { id: 8,')) {
        console.log(`   → Padrão alternativo encontrado!`);
        conteudo = conteudo.replace('};\n    { id: 8,', ',\n    { id: 8,');
        conteudo = conteudo.trim();
        if (conteudo.endsWith(',')) {
            conteudo = conteudo.slice(0, -1);
        }
        conteudo += '\n};';
        fs.writeFileSync(caminho, conteudo, 'utf8');
        console.log(`   ✅ ${caminho} corrigido com sucesso!`);
        return true;
    }
    else {
        console.log(`   ⚠️ Padrão de erro não encontrado em ${caminho}`);
        return false;
    }
}

// Executar correção
console.log('🔧 INICIANDO CORREÇÃO ESTRUTURAL...');
corrigirArquivo('content.js');
corrigirArquivo('content-ptpt.js');
console.log('\n✨ CORREÇÃO FINALIZADA!');
