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

// Função para editar aluno (pode abrir um modal ou redirecionar para uma página de edição)
window.editarAluno = function(id) {
    alert('Funcionalidade de edição pode ser implementada aqui!');
    // Você pode redirecionar para uma página de edição ou abrir um modal
};