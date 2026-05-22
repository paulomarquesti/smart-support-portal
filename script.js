// 1. Mapeia os elementos do HTML que vamos manipular
const form = document.getElementById('form-chamado');
const btnEnviar = document.getElementById('btn-enviar');
const mensagemStatus = document.getElementById('mensagem-status');

// 2. Escuta o momento em que o usuário clica no botão de enviar
form.addEventListener('submit', async (event) => {
    // Evita que a página recarregue
    event.preventDefault();

    // Altera o estado do botão para o usuário saber que o sistema está processando
    btnEnviar.innerText = "Processando com IA...";
    btnEnviar.disabled = true;

    // 3. Captura os valores digitados nos campos
    const dadosChamado = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        descricao: document.getElementById('descricao').value,
        dataAbertura: new Date().toISOString() // Adiciona a data/hora atual
    };

    // 4. URL temporária do seu futuro Webhook do n8n (vamos mudar depois)
    const URL_N8N = "https://paulomrqx.app.n8n.cloud/webhook-test/920aaa3d-1082-497e-9409-b2f27cb1eaa5";

    try {
        // Envia os dados para o n8n via requisição POST HTTP
        const resposta = await fetch(URL_N8N, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosChamado)
        });

        // Se o n8n receber com sucesso (status 200-299)
        if (resposta.ok) {
            exibirMensagem("Chamado aberto com sucesso! A IA já está processando sua demanda.", "sucesso");
            form.reset(); // Limpa os campos do formulário
        } else {
            throw new Error("Erro no servidor");
        }

    } catch (erro) {
        // Como a URL ainda não existe, o código vai cair aqui por enquanto!
        console.error("Erro ao enviar dados:", erro);
        exibirMensagem("Ops! O portal está em manutenção (Backend offline). Mas a lógica do JavaScript funcionou!", "erro");
    } finally {
        // Restaura o botão ao estado original
        btnEnviar.innerText = "Abrir Chamado Técnico";
        btnEnviar.disabled = false;
    }
});

// Função auxiliar para mostrar as caixas de sucesso ou erro na tela
function exibirMensagem(texto, tipo) {
    mensagemStatus.innerText = texto;
    mensagemStatus.className = tipo; // Adiciona a classe CSS '.sucesso' ou '.erro'
}