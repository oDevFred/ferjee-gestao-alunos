// Função para buscar dados do aluno e preencher o formulário
async function carregarAluno() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) return;

    // Preenche o select de unidades
    const select = document.getElementById('unidadeId');
    const respostaUnidades = await fetch('/unidades');
    if (respostaUnidades.ok) {
        const unidades = await respostaUnidades.json();
        unidades.forEach(u => {
        const opt = document.createElement('option');
        opt.value = u.id;
        opt.textContent = u.nome;
        select.appendChild(opt);
        });
    }

    // Busca dados do aluno
    const resposta = await fetch(`/alunos/${id}`);
    if (resposta.ok) {
        const aluno = await resposta.json();
        document.getElementById('id').value = aluno.id;
        document.getElementById('nome').value = aluno.nome;
        document.getElementById('cpf').value = aluno.cpf;
        document.getElementById('email').value = aluno.email;
        document.getElementById('telefone').value = aluno.telefone || '';
        document.getElementById('nascimento').value = aluno.nascimento.split('T')[0];
        document.getElementById('endereco').value = aluno.endereco || '';
        document.getElementById('unidadeId').value = aluno.unidadeId;
    }
}

document.getElementById('formEditarAluno').addEventListener('submit', async function(e) {
    e.preventDefault();
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const nascimento = document.getElementById('nascimento').value;
    const endereco = document.getElementById('endereco').value;
    const unidadeId = document.getElementById('unidadeId').value;

    const resposta = await fetch(`/alunos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cpf, email, telefone, nascimento, endereco, unidadeId: Number(unidadeId) })
    });

    const mensagem = document.getElementById('mensagem');
    if (resposta.ok) {
        mensagem.textContent = 'Aluno atualizado com sucesso!';
        mensagem.className = 'text-green-600 mt-4';
    } else {
        const erro = await resposta.json();
        mensagem.textContent = erro.erro || 'Erro ao atualizar aluno.';
        mensagem.className = 'text-red-600 mt-4';
    }
});

window.onload = carregarAluno;