window.onload = async function() {
    const resposta = await fetch('/alunos');
    const alunos = await resposta.json();
    const tbody = document.getElementById('tbodyAlunos');
    alunos.forEach(aluno => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="border p-2">${aluno.matricula}</td>
            <td class="border p-2">${aluno.nome}</td>
            <td class="border p-2">${aluno.email}</td>
            <td class="border p-2">${aluno.unidade?.nome || ''}</td>
            <td class="border p-2">
                <button class="bg-yellow-400 px-2 py-1 rounded" onclick="editarAluno(${aluno.id})">Editar</button>
                <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deletarAluno(${aluno.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para deletar aluno
window.deletarAluno = async function(id) {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
        const resposta = await fetch(`/alunos/${id}`, { method: 'DELETE' });
        if (resposta.status === 204) {
        alert('Aluno excluído com sucesso!');
        location.reload();
        } else {
        alert('Erro ao excluir aluno.');
        }
    }
};

// Função para abrir o modal e preencher com dados do aluno
window.editarAluno = async function(id) {
    // Preenche o select de unidades
    const select = document.getElementById('editUnidadeId');
    select.innerHTML = '<option value=\"\">Selecione a Unidade</option>';
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
        document.getElementById('editId').value = aluno.id;
        document.getElementById('editNome').value = aluno.nome;
        document.getElementById('editCpf').value = aluno.cpf;
        document.getElementById('editEmail').value = aluno.email;
        document.getElementById('editTelefone').value = aluno.telefone || '';
        document.getElementById('editNascimento').value = aluno.nascimento.split('T')[0];
        document.getElementById('editEndereco').value = aluno.endereco || '';
        document.getElementById('editUnidadeId').value = aluno.unidadeId;
    }

    document.getElementById('modalEditar').classList.remove('hidden');
    };

    // Fecha o modal
    document.getElementById('fecharModal').onclick = function() {
    document.getElementById('modalEditar').classList.add('hidden');
    document.getElementById('editMensagem').textContent = '';
    };

    // Submete o formulário de edição
    document.getElementById('formEditarAluno').addEventListener('submit', async function(e) {
    e.preventDefault();
    const id = document.getElementById('editId').value;
    const nome = document.getElementById('editNome').value;
    const cpf = document.getElementById('editCpf').value;
    const email = document.getElementById('editEmail').value;
    const telefone = document.getElementById('editTelefone').value;
    const nascimento = document.getElementById('editNascimento').value;
    const endereco = document.getElementById('editEndereco').value;
    const unidadeId = document.getElementById('editUnidadeId').value;

    const resposta = await fetch(`/alunos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cpf, email, telefone, nascimento, endereco, unidadeId: Number(unidadeId) })
    });

    const mensagem = document.getElementById('editMensagem');
    if (resposta.ok) {
        mensagem.textContent = 'Aluno atualizado com sucesso!';
        mensagem.className = 'text-green-600 mt-4';
        setTimeout(() => {
        document.getElementById('modalEditar').classList.add('hidden');
        location.reload();
        }, 1000);
    } else {
        const erro = await resposta.json();
        mensagem.textContent = erro.erro || 'Erro ao atualizar aluno.';
        mensagem.className = 'text-red-600 mt-4';
    }
});