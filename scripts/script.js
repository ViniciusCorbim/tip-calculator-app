let price = 0;//Variável Relacionada ao preço da Gorjeta
let numberPeoples = 0;//Variável Relacionada ao número de pessoas
let percentage = 0;//Variável Relacionada a porcentagem da Gorjeta

let btn5 = window.document.getElementById('btn5');  //Pega o botão de 5% de gorjeta
let btn10 = window.document.getElementById('btn10');//Pega o botão de 10% de gorjeta
let btn15 = window.document.getElementById('btn15');//Pega o botão de 15% de gorjeta
let btn25 = window.document.getElementById('btn25');//Pega o botão de 25% de gorjeta
let btn50 = window.document.getElementById('btn50');//Pega o botão de 50% de gorjeta

//Adiciona um evento para cada botão
btn5.addEventListener('click', button);
btn10.addEventListener('click', button);
btn15.addEventListener('click', button);
btn25.addEventListener('click', button);
btn50.addEventListener('click', button);

//
function button(){
    //A variável "percentage" recebe o valor respectivo do botão
    //Pega o texto do botão e o converte para o tipo numérico
    //O texto do btn é tipo "5%" o "%" atrapanha a conversão
    //slice(0, -1) remove o ultimo caracter da string
    percentage = Number((this.innerHTML).slice(0, -1));

    //Pega todos os filhos do elemento pai do botão que chamou a função
    let children = this.parentNode.children;
    //Remove a class de cada filho
    for(let i = 0; i < children.length; i++){
        children[i].removeAttribute('class');
    }

    //Seta uma classe para o btn que chamou a função
    this.setAttribute('class', 'buttonSelect');
    custom.value = '';//Limpa o input de porcentagem customizada
    customPercentage()//Chama a Função que verifica se o Input de porcentagem está vazio
    }

    //Pega o Input em que o usuário forneceria uma porcentagem customizada de gorjeta
    let custom = window.document.getElementById('customPercentage');
    //Adiciona uma função ao Input de porcentagem customizada
    custom.addEventListener('input', customPercentage);
    function customPercentage(){
        //Verifica se o Input está vazio
        if(custom.value.length != 0){
            //Se não estiver, então atualiza a variável "percentage" com o valor fornecido no Input
            //E seta uma class que indica que o input foi ativado
            percentage = Number(window.document.getElementById('customPercentage').value);
            custom.setAttribute('class', 'activated');

            //Define um limite máximo de 100% de gorjeta
            if(percentage > 100){
                percentage = 100;
                custom.value = 100;
            }
            //define um limite mínimo de 0% de gorjeta
            if(percentage < 0){
                percentage = 0;
                custom.value = 0;
            }
            //Remove o atributo class de todos os botões
            btn5.removeAttribute('class');
            btn10.removeAttribute('class');
            btn15.removeAttribute('class');
            btn25.removeAttribute('class');
            btn50.removeAttribute('class');

        }else{ //Se o Input estiver vazio, então
            //Remove a classe "activated"
            custom.removeAttribute('class');
        }
        calculateTip();
    }


    //Adiciona uma função ao Input do número de pessoas que irão dividir a conta
    window.document.getElementById('price').addEventListener('input', calculateTip);
    window.document.getElementById('peoples').addEventListener('input', calculateTip);

    //Função que Calcula a Gorjeta
    function calculateTip(){
        //Pega o valor da conta
        price = getPrice();

        //Pega o número de pessoas, e se for 0 encerra a função
        numberPeoples = getNumberOfPeoples();
        if(numberPeoples == 'Error'){
            return;
        }

    
        //Calcula a Gorjeta por Pessoa e o Total
        let tip = price *(percentage/100);
        let tipPeople = tip/numberPeoples;
        let total = (price + tip)/numberPeoples;
        
        //Escreve o resultado na página
        window.document.getElementsByClassName('resultAmont')[0].innerHTML = `$${tipPeople.toFixed(2)}`;
        window.document.getElementsByClassName('resultTotal')[0].innerHTML = `$${total.toFixed(2)}`;
    
        //Verifica se a porcentagem e o preço são diferentes de 0
        if(percentage != 0 && price != 0){
            //Se sim, então é setado uma cor de fundo que indica que o botão de reset pode ser usado
            window.document.getElementById('btnReset').style.backgroundColor = 'var(--color1)';
        }else{
            //Se não, então é setado uma cor de fundo que indica que o botão de reset não pode ser usado
            window.document.getElementById('btnReset').style.backgroundColor = 'var(--color25)';
        }
    }


        function getPrice() {
            //Pega o valor da conta
            const txtPrice = window.document.getElementById('price');
            let numberPrice = Number(txtPrice.value);
            price = Number(numberPrice);
    
            //Define um limite máximo de 10000
            if(price > 100000){
                txtPrice.value = 100000;
                price = 100000;
                return price;
            }
            //Define um limite mínimo de 0
            if(price < 0){
                txtPrice.value = 0;
                price = 0;
                return price;
            }
            return price;
        }



    function getNumberOfPeoples(){
        //Armazena o Input em uma constante
        const txtnumberOfPeoples = window.document.getElementById('peoples');
        //Converte o valor do input para o tipo number e o armazena em uma variável
        let numberPeoples = Number(txtnumberOfPeoples.value);

        //Erros e Avisos com Número de Pessoas
        const spanWarning = document.getElementById('spanWarning');//Pega o span de aviso
        //Se o número de pessoas for definido como 0
        if(numberPeoples == 0 && txtnumberOfPeoples.value.length !=0){
            //Será dado um aviso e setado uma class que definirá uma borda vermelha ao input, e a função será encerrada
            spanWarning.innerHTML = "Can't be zero";
            txtnumberOfPeoples.setAttribute('class', 'setZeroPeople');
            return 'Error';
        }else{//Se não, então
            //O span de aviso ficará vazio e a classe será removida
            spanWarning.innerHTML = "";
            txtnumberOfPeoples.removeAttribute('class');
        }

        //Define um limite máximo de 100 pessoas
        if(numberPeoples > 100){
            txtnumberOfPeoples.value = 100;
            numberPeoples = 100;
            return numberPeoples;
        }
        //define um limite mínimo de 1 pessoas
        if((numberPeoples < 1 && txtnumberOfPeoples.value.length != 0) || txtnumberOfPeoples.value.length == 0){
            if(txtnumberOfPeoples.value.length != 0){txtnumberOfPeoples.value = 1;}
            numberPeoples = 1;
            return numberPeoples;
        }
        return numberPeoples;
    }



    //Reseta Tudo
    let btnReset= window.document.getElementById('btnReset');
    btnReset.addEventListener('click', reset);
    function reset(){
        window.document.getElementById('price').value = '';
        window.document.getElementById('peoples').value = '';

        price = 0;
        numberPeoples = 0;
        percentage = 0;
        btn5.removeAttribute('class');
        btn10.removeAttribute('class');
        btn15.removeAttribute('class');
        btn25.removeAttribute('class');
        btn50.removeAttribute('class');
        custom.value = '';
        custom.removeAttribute('class');
        document.getElementById('spanWarning').innerHTML = "";
        window.document.getElementById('peoples').removeAttribute('class');

        let tipPeople = 0;
        let total = 0;

        window.document.getElementsByClassName('resultAmont')[0].innerHTML = `$${tipPeople.toFixed(2)}`;
        window.document.getElementsByClassName('resultTotal')[0].innerHTML = `$${total.toFixed(2)}`;
        window.document.getElementById('btnReset').style.backgroundColor = 'var(--color25)';

        btnReset.setAttribute('class', 'resetPress');
}