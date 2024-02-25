function pegar_valor(param){

   var pegar = $(param).text()  //pega a string com o valor
   var valor = ""               // armazenar o valor do produto

   for(i = 0 ; i < pegar.length ; i++){ // ele vai pegar o valor indepedente da quantidade de números que estiver antes da virgula

        if(pegar[i] >= 0 || pegar[i] <= 9 || pegar[i] == "."){

            valor += pegar[i]
           
        }
   }
   valor = parseFloat(valor) //Conversão de string para número
   console.log(valor)
   console.log(typeof(valor))


   // verificando se a div dos produtos está vísivel

   if($(".produto").is(":visible")){

    $(".produto").hide()
    $("#pagamento").show()
    $("#pagamento").change(function(){
        
        var opcao = $('input[name="pagamento"]:checked').val() // opção de pagamento selecionada
        
        if(opcao == "pix"){
            $("#metodo_cartao").hide()
            $("#metodo_pix").show()
            
        }else{
            $("#metodo_pix").hide()
            $("#metodo_cartao").show()
            //mostrar cartão correspondente ao numero que o usuario digitou
            $("#num_cartao").keyup(function(){

                var numero_cartao = $("#num_cartao").val()
                var quatro_digitos = numero_cartao.slice(0,4) //pega os primeiros quatro digitos do cartão
                if(quatro_digitos == 1234){
                    $("#cartao_visa").show()

                }else if(quatro_digitos == 4123){
                    $("#cartao_master").show()
                }else{
                    $("#cartao_visa").hide()
                    $("#cartao_master").hide()
                }

            })

        }

    })
    //Adicionando valor das parcelas no select e calculando as parcelas
    var valor_final= valor
    var parcela =0
    for(i=1;i <= 5; i ++){
        if( i <= 3){
            parcela = valor_final / i
            $("#parcelamento").append(new Option(i + "x sem juros R$" + parcela.toFixed(2) , i +"x sem juros"))
        }else{
            valor_final+=valor_final*0.03
            parcela = valor_final/i
            $("#parcelamento").append(new Option(i + "x com juros R$" + parcela.toFixed(2),i + "x com juros"))
        }
    }
    $("#pagar_pix").submit(function(e){

        
        /*Explicação das expressões regulares

        ^ - inicio da linha 
        \s - corresponde ao caracter do espaço em branco
        * - quantitativo para que elemento anterior pode aparecer como não pode aparecer
        a-z - pega letras minusculas
        A-z - pega letras maiusculas
        \d - corresponde a digitos 0 - 9
        ()-  grupo de captura
        + - quantitator de um ou mais dos elementos anterior
        ? - Caractere opcional
        {} - quantitativo ou seja correpende quantidade de caracteres 
        $ - fim da linha
        0-9 corresponde a digitos 0 - 9 
        / -  inicio ou fim da expressão  regular
        */

        //validar nome

        var nome = $("#nome").val()
        if(!/^[a-zA-Z]+$/.test(nome)){
            alert("Preencha o nome corretamente");
            e.preventDefault();
            return;
        }

        //validar o cpf
        var cpf = $("#cpf").val()
        if(!/^(\d{3}[\.]?\d{3}[\.]?\d{3}-?\d{2})$/.test(cpf)){
            alert("Preencha o cpf corretamente");
            e.preventDefault();
            return;
        }

        alert("Compra no valor de R$"+ Number(valor).toFixed(2) +" Concluida Com sucesso" + "\nObrigado por comprar na nossa loja")
      
    })
    $("#pagar_cartao").submit(function(e){

       
        //validar o numero do cartão
        var numero_cartao = $("#num_cartao").val()
        var quatro_digitos = numero_cartao.slice(0,4)
        // verifica os quatro primeiros digitos do cartão
        if(quatro_digitos != 1234 && quatro_digitos != 4123){
            alert("O número do cartão deve começar com 1234 ou 4123");
            e.preventDefault();
            return;
        }
        //verifica o número do cartão
        if(!/^(\d{4})\s(\d{4})\s(\d{4})\s(\d{4})$/.test(numero_cartao)){
            alert("Ops digite um número de cartão valido contendo espaços");
            e.preventDefault();
            return;

        }
        
        //valida o nome do titular
        var nome_titular = $("#nome_titular").val()
        if(!/^[a-zA-Z]+$/.test(nome_titular)){
            alert("Nome inválido digite novamente um nome válido");
            e.preventDefault();
            return;
        }
        //validar mes
        var mes = $("#mes").val()
        var ano = $("#ano").val()

        var atual = new Date()
        var mes_atual = atual.getMonth()
        var ano_atual = atual.getFullYear()

        if(!/^[0-9]{2}$/.test(mes) || mes == "00" || mes > 12  || mes <= mes_atual && ano == ano_atual ){
            alert("Ops mês inválido por favor digite novamente o mês");
            e.preventDefault();
            return;
        }

        //validar ano 
        if(!/^\d{4}$/.test(ano) || ano < ano_atual){
            alert("Ops digite um ano válido por favor digite novamente");
            e.preventDefault();
            return;
        }

        //validar cvv
        var cvv = $("#cvv").val()
        console.log(cvv)
        if(!/^[0-9]{3}$/.test(cvv)){
            alert("Ops o número do código de segurança está errado por favor digite novamente");
            e.preventDefault();
            return;
        }

        var selecionada = $("#parcelamento option:selected").text()
        alert("A compra de " + selecionada + " foi concluida com sucesso!")
    })
}

}









