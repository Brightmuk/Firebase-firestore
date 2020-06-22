const addCafeform = document.querySelector('#add-cafe-form');
const cafeList = document.querySelector('#cafe-list');

function renderCafe(doc){
    let li=document.createElement('li');
    let name=document.createElement('span');
    let city = document.createElement('span');
    let deleter=document.createElement('div');
    let editer=document.createElement('p');

    li.setAttribute('data-id',doc.id)
    name.textContent=doc.data().name;
    city.textContent=doc.data().city;
    deleter.textContent='delete';
    editer.textContent='edit';
    
    

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
}
// //get
// db.collection("cafe's").orderBy('name').get().then((snapshot)=>{
// snapshot.docs.forEach(doc => {
//     renderCafe(doc);
// });
// })
//save
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
    changes.forEach(change => {
       if (change.type=='added'){
           renderCafe(change.doc);
       }else if(change.type=='removed'){
           let li = cafeList.querySelector('[data-id='+change.doc.id+']');
           cafeList.removeChild(li);
       }

    });
});
