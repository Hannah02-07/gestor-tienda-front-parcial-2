function users(page){
    document.getElementById('cardHeader').innerHTML='<h5>Listado de usuarios</h5>'
    const PLATZI_ENDPOINT ='https://api.escuelajs.co/api/v1/users?page='+page
    fetch(PLATZI_ENDPOINT,{

        method:'GET',
        headers: {
            'Content-type':'application/json',
            'x-api-key':'reqres-free-v1'
        },
       
    })

    .then((response)=>{

          return response.json().then(
            data=> {
                return{
                    status:response.status,
                    info: data
                }
            }
          )

    })

.then((result)=>{
    console.log('resultado',result)
    if(result.status===200){
        let listUsers=`
        <table class="table justify-content-center">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Email</th>
      <th scope="col">Avatar</th>
       
    </tr>
  </thead>
  <tbody>
        `;
           
        result.info.forEach(element =>{
            listUsers = listUsers + `
            <tr>
              <td>${element.id}</td>
              <td>${element.name}</td>
              <td>${element.email}</td>
              <td><img src="${element.image}" class="img-thumbnail"alt="avatar del usuario"></td>
              <td> <button type="button" class="btn btn-outline-info" onclick="getUser('${element.id}')">Ver</button> </td>
            
            
            </tr>
            
            `
            
        });
        listUsers=listUsers + `
            </tbody>
            </table>

            <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" href="#" onclick="users('1')" >1</a></li>
    <li class="page-item"><a class="page-link" href="#" onclick="users('2') ">2</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
        
        `
        

        document.getElementById('info').innerHTML=listUsers

    }else{
        document.getElementById('info').innerHTML='no existen usuarios en la red'
    }
})

}
function getUser(idUser){
    const REQRES_ENDPOINT ='https://api.escuelajs.co/api/v1/users/'+idUser
    fetch(REQRES_ENDPOINT,{

        method:'GET',
        headers: {
            'Content-type':'application/json',
            'x-api-key':'reqres-free-v1'
        },
       
    })
.then((result)=> {

    return result.json().then(
        data=>{
            return {
                status:result.status,
                body: data
            }
        }
    )
})
.then((response)=>{
    if(response.status===200){
        const user=response.body
        const modalUser=`
        <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                   
                    <div class="card" " >
                        <img src="${user.image}" class="card-img-top" alt="Avatar del usuario">
                        <div class="card-body">
                            <h5 class="card-title">Informacion del usuario: </h5>
                            <p class="card-text">Nombre: ${user.name} </p>
                             <p class="card-text">Email: ${user.email} </p>
                           
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    
                </div>
                </div>
            </div>
        </div>
        
        
        
        `
        document.getElementById('viewModal').innerHTML=modalUser
        const modal = new bootstrap.Modal(document.getElementById('modalUser'))
        modal.show()

    }else{
        document.getElementById('info').innerHTML='<h3> No se encontro el usuario en la Api</h3>'
    }
})




}