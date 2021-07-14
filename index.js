console.log("This is postmaster");
// 1. Utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
//Hide initally content type  and json request  box and parameter box
document.getElementById('ctb').style.display = 'none';
document.getElementById('requestJsonBox').style.display = 'none';
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// display contenttype and box .when clicked on post
let post = document.getElementById('post');
post.addEventListener('click',()=>{
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    document.getElementById('ctb').style.display = 'block';
    if(contentType=='JSON'){
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
    }
    else{
        document.getElementById('requestJsonBox').style.display = 'none';
        document.getElementById('parametersBox').style.display = 'block';
    }
});

//hide content type and box when clicked on get
let get = document.getElementById('get');
get.addEventListener('click',()=>{
    document.getElementById('ctb').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'none';
});



//if the user click on prams box, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
});

//if the user click on json box, hide the params box
let JsonRadio = document.getElementById('jsonRadio');
JsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
});

//if USer Click on + Button .add more parameter
let addParam = document.getElementById('addParam');
let html = "";
let cnt = 1;

addParam.addEventListener('click', (e) => {
    e.preventDefault();
    cnt++;
    html = `<form class="row g-3 my-1">
                            <label for="url" class="col-sm-2 col-form-label">Parameter</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="parameterKey${cnt}" placeholder="Enter Parameter  Key">
                            </div>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="parameterValue${cnt}" placeholder="Enter Parameter  Value">
                            </div>
                            <button id="delete${cnt}" class="btn btn-danger col-sm-2 deleteParam">Remove Parameter</button>
                            </form>`;
    //converting element node to dom node
    let paramElement = getElementFromString(html);
    let params = document.getElementById('params');
    params.appendChild(paramElement);

    //deleting  a parameter 
    let deleteParam = document.getElementsByClassName('deleteParam');
    let flag=0;
    for (let index = 0; index < deleteParam.length; index++) {
        deleteParam[index].addEventListener('click',(e)=>{
            e.target.parentElement.remove();
            // todo :add a confirmation to remove
            
        });
    }
});

// if user clicks on submit button 
let submit = document.getElementById('submit');
submit.addEventListener('click',()=>{
    //Dispalying a message in text arae
    // document.getElementById('responseJsonText').innerHTML ="Please wait.. Fetching response...";
    document.getElementById('responsePrism').innerHTML ="Please wait.. Fetching response...";

    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    //Log all value To consol to debugging
    // console.log(url);
    // console.log(requestType);
    // console.log(contentType);

    // if user had params option instesd of json ,collect all the parameter in an object 
    let data = {};
    if(contentType=='CustomeParameter')
    {
        
        for(let i=1;i<=cnt;i++)
        {
            if(document.getElementById('parameterKey' + (i))!=undefined){
                let key = document.getElementById('parameterKey' + (i)).value;
                let value = document.getElementById('parameterValue' + (i)).value;
                console.log(key,value);
                data[key] = value;
            }
            
        }
        data = JSON.stringify(data);
    }
    else
    {
        data = document.getElementById('requestJsonText').value;
    }


    //if request type is get ,invoke fetch api to create a post request
    if(requestType=='GET')
    {
        fetch(url,{
            method : 'GET'
        })
        .then(response=>response.text())
        .then((text)=>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });       
    }
    else
    {
        //code for post request 
        fetch(url,{
            method : 'POST',
            body:data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then(response=>response.text())
        .then((text)=>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });    
    }

});

