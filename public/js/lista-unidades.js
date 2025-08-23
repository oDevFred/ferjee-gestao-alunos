window.onload = async function() {
    const resposta = await fetch('/unidades');
    const unidades = await resposta.json();
    const tbody = document.getElementById('tbodyUnidades');
    unidades.forEach(unidade => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td class="border p-2">${unidade.nome}</td>
        <td class="border p-2">${unidade.endereco}</td>
        <td class="border p-2">${unidade.responsavel}</td>
        <td class="border p-2">
            <button class="bg-yellow-400 px-2 py-1 rounded" onclick="editarUnidade(${unidade.id})">Editar</button>
            <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deletarUnidade(${unidade.id})">Excluir</button>
        </td>
        `;
        tbody.appendChild(tr);
    });
};

window.editarUnidade = async function(id) {
    // Busca dados da unidade
    const resposta = await fetch(`/unidades/${id}`);
    if (resposta.ok) {
        const unidade = await resposta.json();
        document.getElementById('editUnidadeId').value = unidade.id;
        document.getElementById('editUnidadeNome').value = unidade.nome;
        document.getElementById('editUnidadeEndereco').value = unidade.endereco;
        document.getElementById('editUnidadeResponsavel').value = unidade.responsavel;
    }
    document.getElementById('modalEditarUnidade').classList.remove('hidden');
    };

    document.getElementById('fecharModalUnidade').onclick = function() {
    document.getElementById('modalEditarUnidade').classList.add('hidden');
    document.getElementById('editUnidadeMensagem').textContent = '';
    };

    document.getElementById('formEditarUnidade').addEventListener('submit', async function(e) {
    e.preventDefault();
    const id = document.getElementById('editUnidadeId').value;
    const nome = document.getElementById('editUnidadeNome').value;
    const endereco = document.getElementById('editUnidadeEndereco').value;
    const responsavel = document.getElementById('editUnidadeResponsavel').value;

    const resposta = await fetch(`/unidades/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, endereco, responsavel })
    });

    const mensagem = document.getElementById('editUnidadeMensagem');
    if (resposta.ok) {
        mensagem.textContent = 'Unidade atualizada com sucesso!';
        mensagem.className = 'text-green-600 mt-4';
        setTimeout(() => {
        document.getElementById('modalEditarUnidade').classList.add('hidden');
        location.reload();
        }, 1000);
    } else {
        const erro = await resposta.json();
        mensagem.textContent = erro.erro || 'Erro ao atualizar unidade.';
        mensagem.className = 'text-red-600 mt-4';
    }
});

window.deletarUnidade = async function(id) {
    if (confirm('Tem certeza que deseja excluir esta unidade?')) {
        const resposta = await fetch(`/unidades/${id}`, { method: 'DELETE' });
        if (resposta.status === 204) {
        alert('Unidade excluída com sucesso!');
        location.reload();
        } else {
        const erro = await resposta.json();
        alert(erro.erro || 'Erro ao excluir unidade.');
        }
    }
};