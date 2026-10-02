// ==========================================
// 1. DADOS INICIAIS
// ==========================================
const biblioteca = [
  { id: 1, titulo: "Dom Casmurro", autor: "Machado de Assis", anoPublicacao: 1899, genero: "Romance", exemplares: 3 },
  { id: 2, titulo: "1984", autor: "George Orwell", anoPublicacao: 1949, genero: "Ficção Científica", exemplares: 0 },
  { id: 3, titulo: "O Hobbit", autor: "J.R.R. Tolkien", anoPublicacao: 1937, genero: "Fantasia", exemplares: 5 }
];

// ==========================================
// 2. FUNÇÕES DE REGRAS DE NEGÓCIO
// ==========================================

// Expõe as funções para o escopo global (window) para funcionar com onclick="" no HTML
window.emprestarLivro = function(idLivro) {
  const livro = biblioteca.find(item => item.id === idLivro);

  if (livro && livro.exemplares > 0) {
    livro.exemplares -= 1;
    renderizarCatalogo();
  }
};

window.devolverLivro = function(idLivro) {
  const livro = biblioteca.find(item => item.id === idLivro);

  if (livro) {
    livro.exemplares += 1;
    renderizarCatalogo();
  }
};

function adicionarLivro(dados) {
  // Encontra o maior ID atual para evitar IDs duplicados
  const maiorId = biblioteca.length > 0 ? Math.max(...biblioteca.map(l => l.id)) : 0;
  
  const novoLivro = {
    id: maiorId + 1,
    ...dados
  };

  biblioteca.push(novoLivro);
  renderizarCatalogo();
}

// ==========================================
// 3. FUNÇÕES DE RENDERIZAÇÃO NA TELA
// ==========================================
function renderizarCatalogo() {
  const container = document.getElementById("lista-livros");
  if (!container) return; // Evita erro se o HTML não tiver o container
  
  container.innerHTML = "";

  biblioteca.forEach(livro => {
    const disponivel = livro.exemplares > 0;
    const card = document.createElement("div");
    card.className = "card-livro";

    card.innerHTML = `
      <div>
        <h3>${livro.titulo}</h3>
        <p><strong>Autor:</strong> ${livro.autor}</p>
        <p><strong>Gênero:</strong> ${livro.genero} (${livro.anoPublicacao})</p>
        <p><strong>Exemplares:</strong> ${livro.exemplares}</p>
        <span class="badge ${disponivel ? 'disponivel' : 'indisponivel'}">
          ${disponivel ? 'Disponível' : 'Indisponível'}
        </span>
      </div>
      <div class="acoes">
        <button class="btn-emprestar" onclick="emprestarLivro(${livro.id})" ${!disponivel ? 'disabled' : ''}>
          Emprestar
        </button>
        <button class="btn-devolver" onclick="devolverLivro(${livro.id})">
          Devolver
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

// ==========================================
// 4. INICIALIZAÇÃO DE EVENTOS
// ==========================================
// Aguarda o HTML carregar completamente antes de vincular eventos
document.addEventListener("DOMContentLoaded", () => {
  const formCadastrar = document.getElementById("form-cadastrar");

  if (formCadastrar) {
    formCadastrar.addEventListener("submit", (e) => {
      e.preventDefault();

      const novoLivro = {
        titulo: document.getElementById("titulo").value.trim(),
        autor: document.getElementById("autor").value.trim(),
        anoPublicacao: Number(document.getElementById("ano").value),
        genero: document.getElementById("genero").value.trim(),
        exemplares: Number(document.getElementById("exemplares").value)
      };

      adicionarLivro(novoLivro);
      e.target.reset(); // Limpa os campos do formulário
    });
  }

  // Inicializa o catálogo na tela
  renderizarCatalogo();
});