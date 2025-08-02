// vamos ver se o javascript funciona
// console.log("Javascript carregado!");
// rodando certo! comentei para não poluir o console
// agora vou trabalhar no input do HTML
// o input é onde o usuário vai digitar o valor
// o input está no <main> <form> e é do tipo text
// tem um name e um id
// vamos usar o id que é: id=amount

// cotação de moedas do dia:
const USD = 5.54
const EUR = 6.42
const GBP = 7.36


const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result")

// quero capturar o valor conforme a pessoa digita
// quero observar a interação do usuário

// manipulando o input amount para receber somente números
/*amount.addEventListener("input", () => {
    console.log(amount.value);

})
*/

// neste momento já estou capturando o valor do input conforme a pessoa digita
// mas ainda sim o input aceita letras, espaços e outros caracteres

// então vamos restringir o input para aceitar somente números
// vamos usar uma expressão regular para isso

// vou comentar o código interior para fazer testes

amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g;
    amount.value = amount.value.replace(hasCharactersRegex, "");
    console.log(amount.value);
});
// agora o input só aceita números

// agora vamos obter a moeda
// const adicionada na linha 18
// está na linha 27 do HTML o id=currency 

// podemos pegar o valor quando o usuário fizer o envio do formulário
// ou seja, quando clicar no botão "Converter"
// evento submit do formulário
// adicionarei na linha 16 a const form

form.onsubmit = (event) => {
    event.preventDefault(); // previne o envio do formulário

    switch(currency.value){ // criei um switch para verificar a moeda selecionada
        case "USD":
            convertCurrency(amount.value, USD, "US$");
            break;
        case "EUR":
            convertCurrency(amount.value, EUR, "€");
            break;
        case "GBP":
            convertCurrency(amount.value, GBP, "£");
            break;
    }
};


// a próxima etapa é a conversão do valor

// vamos criar uma função para isso
function convertCurrency(amount, price, symbol){ // exibindo a cotação da moeda selecionada
    try {
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}` 
        let total = amount * price // calcula o total
        total = formatCurrencyBRL(total) 
        result.textContent = `${total} Reais` // exibe o resultado total
        footer.classList.add("show-result"); // usar o show-result para mostrar o resultado no rodapé, esse show result está numa class do CSS
    } catch (error) {
        console.log("Erro na conversão:", error);
        footer.classList.remove("show-result"); // remove o footer da terra se tiver erro
    }
}

// formata a moeda em real brasileiro
function formatCurrencyBRL(value){
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}