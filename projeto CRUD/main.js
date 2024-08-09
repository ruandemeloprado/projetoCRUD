const inputItem = document.getElementById('item');
const inputFamilia = document.getElementById('familia');
const inputTipo = document.getElementById('btn__select');
const inputQuantidade = document.getElementById('quantidade');
const inputData = document.getElementById('data');
const inputSubmit = document.getElementById('btn_submit');
const containerItens = document.getElementById('item__tabela');
let botoesExcluir = document.querySelectorAll('.item__exclui');
let proximoId = JSON.parse(localStorage.getItem('proximoId')) || 0;

const itens = JSON.parse(localStorage.getItem("itens")) || [];

inputSubmit.addEventListener('click', (e) => {
    e.preventDefault();

    
  
    const novoItem = adicionaItens(
      inputItem.value,
      inputFamilia.value,
      inputTipo.value,
      inputQuantidade.value,
      inputData.value,
      
    );
  
    criaItens(novoItem.item, novoItem.familia, novoItem.tipo, novoItem.quantidade, novoItem.data, itens.length - 1);

    inputItem.value = "";
  inputFamilia.value = "";
  inputTipo.value = "Matéria Prima";
  inputQuantidade.value = "";
  inputData.value = "";
  });

  itens.forEach((item) => {
    criaItens(item.item, item.familia, item.tipo, item.quantidade, item.data, item.id);
  });

  


  


function criaItens(item, familia, tipo, quantidade, data, id) {
    
    containerItens.innerHTML += `<tr class="tabela__linha" id="${id}">
    <td class="tabela__conteudo__item">${item}</td>
    <td class="tabela__conteudo__item">${familia}</td>
    <td class="tabela__conteudo__item">${tipo}</td>
    <td class="tabela__conteudo__item">${quantidade}</td>
    <td class="tabela__conteudo__item">${data}</td>
    <td class="tabela__conteudo__item">
    <button class="item__edita"><img class="imagem__item" src="./img/pencil.svg"></button></td>
    <td class="tabela__conteudo__item">
    <button class="item__exclui" id="botao__excluir"><img class="imagem__item" src="./img/trash.svg"></button></td>

</tr>`

botoesExcluir = document.querySelectorAll('.item__exclui');
botoesEditar = document.querySelectorAll('.item__edita');

botoesExcluir.forEach((botao) => { 

  botao.addEventListener('click', (e)=>{
    console.log(e.target.parentNode.parentNode.parentNode);
      const linhaTabela = e.target.parentNode.parentNode.parentNode;
      const itemId = linhaTabela.id;
      console.log(itemId);

      const localItens = localStorage.getItem("itens");
      const itensConvertidos = JSON.parse(localItens);

      itensConvertidos.splice(itemId, 1);

      localStorage.setItem('itens', JSON.stringify(itensConvertidos));
      linhaTabela.parentNode.removeChild(linhaTabela);

      proximoId--;

      if (proximoId < 0){
        proximoId = 0;
      }
      localStorage.setItem('proximoId', JSON.stringify(proximoId));
      
    })

  })

  botoesEditar.forEach((botao) => { 

    botao.addEventListener('click', (e)=>{

      console.log(e.target.parentNode.parentNode.parentNode);
        const linhaTabela = e.target.parentNode.parentNode.parentNode;
        const itemId = linhaTabela.id;
        console.log(itemId);
  
        const localItens = localStorage.getItem("itens");
        const itensConvertidos = JSON.parse(localItens);


        console.log(itensConvertidos[itemId].item);
        console.log(itensConvertidos[itemId].tipo);
        console.log(itensConvertidos[itemId].familia);
        console.log(itensConvertidos[itemId].quantidade);
        console.log(itensConvertidos[itemId].data);
 

        inputItem.value = itensConvertidos[itemId].item;
        inputFamilia.value = itensConvertidos[itemId].familia;
        inputTipo.value = itensConvertidos[itemId].tipo;
        inputQuantidade.value = itensConvertidos[itemId].quantidade;
        inputData.value = itensConvertidos[itemId].data;


        itensConvertidos.splice(itemId, 1);
  
        localStorage.setItem('itens', JSON.stringify(itensConvertidos));
        linhaTabela.parentNode.removeChild(linhaTabela);
  
        proximoId--;
        localStorage.setItem('proximoId', JSON.stringify(proximoId));


        
      })
  
    })
  


}




function adicionaItens(item, familia, tipo, quantidade, data) {
  const novoItem = {
      item,
      familia,
      tipo,
      quantidade,
      data,
      id: proximoId,
  };

  itens.push(novoItem);

  localStorage.setItem('itens', JSON.stringify(itens));

  proximoId++;
  localStorage.setItem('proximoId', JSON.stringify(proximoId));

  return novoItem;
}




