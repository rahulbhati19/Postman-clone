function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let addedParamCount=0;

let paramsBox=document.getElementById("parametersBox");
paramsBox.style.display='none';

let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener("click", ()=>{
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block'; 
})

let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener("click", ()=>{
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none'; 
})

let addParam = document.getElementById('addParam');
addParam.addEventListener('click', ()=>{
    let params = document.getElementById('params');
    let string =`<div class="form-row my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
    <div class="col-md-4">
      <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key" />
    </div>
    <div class="col-md-4">
      <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value" />
    </div>
    <button class="btn btn-success deleteParam">-</button>
  </div>`


  let paramElement = getElementFromString(string);
  params.appendChild(paramElement);

  let deleteParam = document.getElementsByClassName('deleteParam');
  for (items of deleteParam){
    items.addEventListener('click', (e)=>{
        e.target.parentElement.remove();
    })
  }
  addedParamCount++;
})


let submit = document.getElementById('submit');
submit.addEventListener('click', ()=>{
    document.getElementById('responseJsonText').value = "Please wait.. fetching response...";

    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='request']:checked").value;
    let contentType = document.querySelector("input[name='content']:checked").value;


    if(contentType == 'params'){
        data = {};
        for(let i=0;i<addedParamCount+1;i++){
            if(document.getElementById('parameterKey' + (i+1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i+1)).value; 
                let value = document.getElementById('parameterValue' + (i+1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    if(requestType == 'GET'){
        fetch(url, {
            method: 'GET',
        })
        .then(response=> response.text())
        .then((text)=>{
            document.getElementById('responseJsonText').value = text;
        });
    }

    else{
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response=> response.text())
        .then((text)=>{
            document.getElementById('responseJsonText').value = text;
        });
    }


    console.log(url);
    console.log(requestType);
    console.log(contentType);
    console.log(data);
    
})