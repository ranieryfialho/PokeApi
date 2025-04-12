document.getElementById("search-button").addEventListener("click", async function() {
    const pokemonInput = document.getElementById("pokemon-input").value.toLowerCase();
    const pokemonInfoDiv = document.getElementById("pokemon-info");
    const pokemonImage = document.getElementById("pokemon-image");
    const pokemonName = document.getElementById("pokemon-name");
    const pokemonId = document.getElementById("pokemon-id");
    const pokemonTypes = document.getElementById("pokemon-types");
    const pokemonAbilities = document.getElementById("pokemon-abilities");
    const pokemonHeight = document.getElementById("pokemon-height");
    const pokemonWeight = document.getElementById("pokemon-weight");

    if (!pokemonInput) {
        alert("Por favor, insira um nome ou número de Pokémon.");
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}`);
        
        if (!response.ok) {
            throw new Error("Pokémon não encontrado.");
        }

        const data = await response.json();

        // Exibindo a imagem do Pokémon
        pokemonImage.src = data.sprites.front_default;
        pokemonImage.style.display = "block";

        // Nome e ID do Pokémon
        pokemonName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1); // Primeira letra maiúscula
        pokemonId.innerHTML = `<strong>ID:</strong> #${data.id}`;

        // Tipos do Pokémon
        let typesHTML = "<strong>Tipo(s):</strong> ";
        data.types.forEach(type => {
            typesHTML += `<span class="type-icon">${getTypeIcon(type.type.name)}</span>${type.type.name}, `;
        });
        pokemonTypes.innerHTML = typesHTML.slice(0, -2); // Remove a última vírgula e espaço

        // Habilidades do Pokémon
        let abilitiesHTML = "<strong>Habilidades:</strong> ";
        data.abilities.forEach(ability => {
            abilitiesHTML += `${ability.ability.name}, `;
        });
        pokemonAbilities.innerHTML = abilitiesHTML.slice(0, -2); // Remove a última vírgula e espaço

        // Altura e peso do Pokémon
        pokemonHeight.innerHTML = `<strong>Altura:</strong> ${data.height / 10} m`;
        pokemonWeight.innerHTML = `<strong>Peso:</strong> ${data.weight / 10} kg`;

        // Tornar as informações visíveis
        pokemonInfoDiv.style.display = "block";
    } catch (error) {
        alert(error.message);
        pokemonInfoDiv.style.display = "none";
    }
});

// Função para pegar os ícones dos tipos
function getTypeIcon(type) {
    const typeIcons = {
        "normal": "🐾",
        "fire": "🔥",
        "water": "💧",
        "grass": "🌿",
        "electric": "⚡",
        "ice": "❄️",
        "fighting": "🥊",
        "poison": "☠️",
        "ground": "🌍",
        "flying": "🦅",
        "psychic": "🧠",
        "bug": "🐛",
        "rock": "🪨",
        "ghost": "👻",
        "dragon": "🐉",
        "dark": "🌑",
        "steel": "🛠️",
        "fairy": "🧚"
    };
    return typeIcons[type] || "⚪"; // Se o tipo não tiver ícone, retorna um ícone padrão
}
