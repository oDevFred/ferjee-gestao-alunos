document.getElementById('formUnidade').addEventListener('submit', async function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const responsavel = document.getElementById('responsavel').value;

    const resposta = await fetch('/unidades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, endereco, responsavel })
    });

    const mensagem = document.getElementById('mensagem');
    if (resposta.ok) {
        mensagem.textContent = 'Unidade cadastrada com sucesso!';
        mensagem.className = 'text-green-600 mt-4';
        document.getElementById('formUnidade').reset();
    } else {
        const erro = await resposta.json();
        mensagem.textContent = erro.erro || 'Erro ao cadastrar unidade.';
        mensagem.className = 'text-red-600 mt-4';
    }
});