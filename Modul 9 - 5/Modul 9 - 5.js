const btn = document.querySelector('.btn');
const result = document.querySelector('.result');
const err = document.querySelector('.error');

function receiveData(url, callback){
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onload = () => { 
        if (xhr.status != 200){
            console.log('Статус ответа: ', xhr.status)
        } else {
            let result = JSON.parse(xhr.response)
            if (callback)
                callback(result)
            console.log('Result', result)
        }
    }
    xhr.send()
}

function displayResult(apiData){
    for (let i = 0; i < apiData.length; i++){
        let displayElem = `
            <img src=${apiData[i].download_url} class="item"/>
        `
        result.innerHTML += displayElem
    }

    localStorage.setItem('images', result.innerHTML )    
  }

btn.addEventListener('click', function(){

    const inp_firstValue = document.querySelector('#inp1').value
    const inp_secValue = document.querySelector('#inp2').value
     
    if ((inp_firstValue < 1 || inp_firstValue > 10) 
            && (inp_secValue <=1 || inp_secValue > 10)){
        console.log('Номер страницы и лимит вне диапазона от 1 до 10')

      } else if (inp_secValue < 1 || inp_secValue > 10) {
        console.log('Лимит вне диапазона от 1 до 10')
    } else if (inp_firstValue < 1 || inp_firstValue > 10){
                console.log('Номер страницы вне диапазона от 1 до 10')
    } else {
        let a = `https://picsum.photos/v2/list?page=${inp_firstValue}&limit=${inp_secValue}`
        receiveData(a, displayResult)
            }
})
document.addEventListener('DOMContentLoaded', function(){
    let imagesHTML = localStorage.getItem('images');
    if (imagesHTML){
        result.innerHTML += imagesHTML;
    }
});