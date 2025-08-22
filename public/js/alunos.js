// Preenche o select de unidades ao carregar a página
window.onload = async function() {
    const select = document.getElementById('unidadeId');
    const resposta = await fetch('/unidades');
    if (resposta.ok) {
        const unidades = await resposta.json();
        unidades.forEach(u => {
        const opt = document.createElement('option');
        opt.value = u.id;
        opt.textContent = u.nome;
        select.appendChild(opt);
        });
    }
};

document.getElementById('formAluno').addEventListener('submit', async function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const nascimento = document.getElementById('nascimento').value;
    const endereco = document.getElementById('endereco').value;
    const unidadeId = document.getElementById('unidadeId').value;

    const resposta = await fetch('/alunos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cpf, email, telefone, nascimento, endereco, unidadeId: Number(unidadeId) })
    });

    const mensagem = document.getElementById('mensagem');
    if (resposta.ok) {
        mensagem.textContent = 'Aluno cadastrado com sucesso!';
        mensagem.className = 'text-green-600 mt-4';
        document.getElementById('formAluno').reset();
    } else {
        const erro = await resposta.json();
        mensagem.textContent = erro.erro || 'Erro ao cadastrar aluno.';
        mensagem.className = 'text-red-600 mt-4';
    }
});