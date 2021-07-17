//deklariranje na varijabli i povrazuvanje 
const listItems = document.getElementById('list');
const addItems = document.getElementById('forma');
const filterItems = document.getElementById('search');
const mklists =document.querySelector('.mklist');
let output = "";
//url so informacii
const url = "https://jsonplaceholder.typicode.com/users";
let fname = document.getElementById('fname');
let username = document.getElementById('username');


filterItems.addEventListener('input', () => SearchInput(filterItems.value));

//dodavanje na event listener za slusanje na eveniti 
addItems.addEventListener('submit', (e) =>{
    e.preventDefault();

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            name: fname.value,
            username: username.value
        }),
        headers:{
            "Content-Type" : "application/json; charset=UTF-8"
        }
    })

    .then(res => res.json())
    .then(data => {
        const dataArr = [];
        dataArr.push(data);
        listaPosts(dataArr);
    })
    addItem();
})

//zemanje na podatoci
fetch(url)
.then(res => res.json())
.then(data => listaPosts(data))

//funkcija za pecatenje na lista 
const listaPosts = (lista) => {
    lista.forEach(item => {
        output += `
        <tbody id="list">
                        <tr>
                        <td>${item.name}</td>
                        <td>${item.username}</td>
                        </tr>
                    </tbody>`
    });
    listItems.innerHTML = output;
   
}

//search funkcija
const SearchInput = async searchTxt =>{
    const res = await fetch(url);
    const names = await res.json();

    //console.log(names);

    let matches = names.filter(fullname =>{
        const regex = new RegExp(`^${searchTxt}`, 'gi');
        return fullname.name.match(regex) || fullname.username.match(regex);
    });

    if(searchTxt.length === 0){
        //matches = [];
        
        if ( matches === true){
            listItems.innerHTML = output;
        }
       
        //listaPosts.innerHTML = listItems;
    }
    outputHtml(matches);
    //povikuvanje na funkcija
    onclickbtn(filterItems);
    
}

// matching  iminja od srco si tabelata 
const outputHtml = matches =>{
    if(matches.length > 0){
        const mile = matches.map( match => `<tbody id="list">
        <tr>
        <td>${match.name}</td>
        </tr>
    </tbody>`).join('');
    listItems.innerHTML = mile;
    }    
};


// funkcija za da go snema user name-o
function onclickbtn() {
    usersn =  document.getElementById('usersn');
    if (filterItems === true) {
        usersn.style.display = "block";
    } else {
        usersn.style.display = "none";
    }
}

//vrakanje na username
function addItem() {
    usersn =  document.getElementById('usersn');
    if (addItems === true) {
        usersn.style.display = "none";
    } else {
        usersn.style.display = "block";
    }
}
