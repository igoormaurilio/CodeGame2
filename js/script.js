let contador = 0;
const openModalButton = document.getElementById("openModal");
const modal = document.getElementById("modal");
const closeModalButton = document.getElementById("closeModal");
const formCadastro = document.getElementById("formCadastro");
const listaJogo = document.getElementById("listaJogo");
const ModalExcluir = document.getElementById("modal-Excluir");
const cancelar = document.getElementById("cancelar");
const excluir = document.getElementById("excluir");

let linhaParaExcluir = null;
let jogoIdParaExcluir = null; // ID do jogo a ser excluído

// Abrir o modal
openModalButton.addEventListener("click", function () {
  modal.classList.add("show");
});

// Fechar o modal
closeModalButton.addEventListener("click", function () {
  modal.classList.remove("show");
});



formCadastro.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.getElementById("Nome").value;
  const categoria = document.getElementById("Categoria").value;
  const classificacao = document.getElementById("Classificação").value;
  const avaliacao = document.getElementById("Avaliação").value;
  const lancamento = document.getElementById("Lançamento").value;
  const url = document.getElementById("Imagem").value;

  const jogo = {
    nome: nome,
    categoria: categoria,
    classificacao: classificacao,
    avaliacao: avaliacao,
    lancamento: lancamento,
    url: url,
  };

  fetch("http://localhost:8080/catalogo/adicionar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jogo),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Erro ao enviar dados.");
    })
    .then((data) => {
      console.log("Jogo salvo com sucesso:", data);
      adicionarLinhaNaTabela(data); // Adicionar linha usando a função reutilizável
      modal.classList.remove("show");
      formCadastro.reset();
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao salvar o jogo.");
    });
});

function carregarJogos() {
  fetch("http://localhost:8080/catalogo/listar", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((jogos) => {
      console.log("Jogos carregados com sucesso:", jogos);
      listaJogo.innerHTML = "";
      jogos.forEach((jogo) => adicionarLinhaNaTabela(jogo));
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao carregar os jogos.");
    });
}

function adicionarLinhaNaTabela(jogo) {
  const novaLinha = document.createElement("tr");
  novaLinha.setAttribute("data-id", jogo.id);
  novaLinha.innerHTML = `
    <td><img class="capas" src="${jogo.url}" alt=""></td>
    <td>${jogo.nome}</td>
    <td>${jogo.categoria}</td>
    <td>${jogo.classificacao}</td>
    <td>${jogo.avaliacao}</td>
    <td>${jogo.lancamento}</td>
    <td>
      <button class = "excluir" onclick="abrirExcluir(this)">🗑️</button>
      <button class = "alterar" onclick="alterarJogo(this)">✏️</button>
    </td>
  `;
  listaJogo.appendChild(novaLinha);
}

// Abrir modal de exclusão e armazenar o ID do jogo
function abrirExcluir(botao) {
  linhaParaExcluir = botao.closest("tr");
  jogoIdParaExcluir = linhaParaExcluir.getAttribute("data-id");
  ModalExcluir.showModal();
}

// Cancelar exclusão
cancelar.addEventListener("click", function () {
  ModalExcluir.close();
});

// Confirmar exclusão
excluir.addEventListener("click", function () {
  if (jogoIdParaExcluir) {
    fetch(`http://localhost:8080/catalogo/${jogoIdParaExcluir}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao excluir o jogo.");
        }
        console.log("Jogo excluído com sucesso!");
        linhaParaExcluir.remove();
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao excluir o jogo.");
      })
      .finally(() => {
        jogoIdParaExcluir = null;
        linhaParaExcluir = null;
        ModalExcluir.close();
      });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  carregarJogos();
});

const modalEdicao = document.getElementById("modal-Editar");
const closeModal = document.getElementById("closeModalAlterar");


  let linhaParaAlterar = null;
  let jogoIdParaAlterar = null;
  
  // Abrir modal de edição e preencher os campos
  function alterarJogo(botao) {
    linhaParaAlterar = botao.closest("tr");
    jogoIdParaAlterar = linhaParaAlterar.getAttribute("data-id");
    modalEdicao.showModal();
  
    console.log("Abrindo edição para o jogo ID:", jogoIdParaAlterar);
  
    // Preencher os campos com os valores atuais da linha
    document.getElementById("NomeEdicao").value = linhaParaAlterar.children[1].innerText;
    document.getElementById("CategoriaEdicao").value = linhaParaAlterar.children[2].innerText;
    document.getElementById("ClassificaçãoEdicao").value = linhaParaAlterar.children[3].innerText;
    document.getElementById("AvaliaçãoEdicao").value = linhaParaAlterar.children[4].innerText;
    document.getElementById("LançamentoEdicao").value = linhaParaAlterar.children[5].innerText;
    document.getElementById("ImagemEdicao").value = linhaParaAlterar.querySelector("img").src;
  
    modalEdicao.showModal();
  }
  
  // Fechar modal de edição
  closeModal.addEventListener("click", function () {
    modalEdicao.close();
  });
  
  // Submeter o formulário de edição
  document.getElementById("formAlterar").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const jogoEditado = {
      nome: document.getElementById("NomeEdicao").value,
      categoria: document.getElementById("CategoriaEdicao").value,
      classificacao: document.getElementById("ClassificaçãoEdicao").value,
      avaliacao: document.getElementById("AvaliaçãoEdicao").value,
      lancamento: document.getElementById("LançamentoEdicao").value,
      url: document.getElementById("ImagemEdicao").value,
    };
  
    console.log("Enviando PUT para o jogo ID:", jogoIdParaAlterar, jogoEditado);
  
    fetch(`http://localhost:8080/catalogo/${jogoIdParaAlterar}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jogoEditado),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao atualizar o jogo.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Jogo atualizado com sucesso:", data);
        atualizarLinhaNaTabela(data);
        modalEdicao.close();
        alert("Jogo atualizado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao atualizar o jogo.");
      });
  });
  
  // Atualizar a linha na tabela após a edição
  function atualizarLinhaNaTabela(jogo) {
    linhaParaAlterar.innerHTML = `
      <td><img class="capas" src="${jogo.url}" alt=""></td>
      <td>${jogo.nome}</td>
      <td>${jogo.categoria}</td>
      <td>${jogo.classificacao}</td>
      <td>${jogo.avaliacao}</td>
      <td>${jogo.lancamento}</td>
      <td>
        <button class = "excluir" onclick="abrirExcluir(this)">🗑️</button>
        <button class = "alterar" onclick="alterarJogo(this)">✏️</button>
      </td>
    `;
  }
  const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("search");

// Evento de busca quando o usuário clicar no botão
searchButton.addEventListener("click", function () {
  const nomeJogo = searchInput.value.trim(); // Obter o nome do jogo digitado
  if (nomeJogo) {
    buscarJogoPorNome(nomeJogo); // Chama a função de busca
  } else {
    alert("Por favor, insira o nome do jogo.");
  }
});

// Função que faz a requisição GET para buscar o jogo por nome
function buscarJogoPorNome(nome) {
  fetch(`http://localhost:8080/catalogo/buscar?nome=${nome}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Jogo não encontrado.");
      }
      return response.json();
    })
    .then((jogo) => {
      console.log("Jogo encontrado:", jogo);
      listaJogo.innerHTML = ""; // Limpar a tabela atual
      adicionarLinhaNaTabela(jogo); // Adicionar o jogo encontrado à tabela
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("O jogo procurado não existe");
    });
}


  
  
