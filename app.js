const addCafeform = document.querySelector('#add-cafe-form');
const cafeList = document.querySelector('#cafe-list');
const toEdit=document.querySelector('#modal-body');
const editForm=document.querySelector('#edit-cafe-form');

function renderCafe(doc){
    let li=document.createElement('li');
    let name=document.createElement('span');
    let city = document.createElement('span');
    let deleter=document.createElement('div');
    let editer=document.createElement('button');

    li.setAttribute('data-id',doc.id)
    name.textContent=doc.data().name;
    name.setAttribute('id','name');
    city.textContent=doc.data().city;
    city.setAttribute('id','city');
    deleter.textContent='delete';
    //open edit modal button
    editer.textContent='edit';
    editer.setAttribute("type", "button");
    editer.setAttribute("class", "btn edit");
    editer.setAttribute("data-toggle", "modal");
    editer.setAttribute("data-target", "#editModal");
    

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(deleter);
    li.appendChild(editer);
    
    cafeList.appendChild(li);

    //delete
    deleter.addEventListener('click',(e)=>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection("cafe's").doc(id).delete();
    })
    
    //reference data to be edited
    editer.addEventListener('click',(e)=>{
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection("cafe's").doc(id);
        editForm.setAttribute('data-id',doc.id);
        document.getElementById('edit-name').setAttribute('value', doc.data().name);
        document.getElementById('edit-city').setAttribute('value', doc.data().city);
    })
    //edit
    let editerSubmit=document.getElementById('edit-submit');
    editerSubmit.addEventListener('click',(e)=>{
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection("cafe's").doc(id).update({
            name:editForm.name.value,
            city:editForm.city.value
        });
        cafeList.querySelector('[data-id').querySelector('#name').innerHTML=editForm.name.value;
        cafeList.querySelector('[data-id').querySelector('#city').innerHTML=editForm.city.value;
    })
}

addCafeform.addEventListener('submit', (e)=>{
    e.preventDefault();
    db.collection("cafe's").add({
        name:addCafeform.name.value,
        city:addCafeform.city.value
    })
    addCafeform.name.value='';
    addCafeform.city.value='';
})

db.collection("cafe's").orderBy('name').onSnapshot(snapshot=>{
    let changes = snapshot.docChanges();
    console.log(changes)
    changes.forEach(change => {
       if (change.type=='added'){
           renderCafe(change.doc);
       }else if(change.type=='removed'){
           let li = cafeList.querySelector('[data-id='+change.doc.id+']');
           cafeList.removeChild(li);
       }

    });
});
