function categories(page){
    document.getElementById('cardHeader').innerHTML='<h5>Listado De Categorias</h5>'
    const PLATZI_ENDPOINT ='https://api.escuelajs.co/api/v1/categories?page='+page
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
        let listCategories=`
        <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Slug</th>
      <th scope="col">Imagen</th>
    </tr>
  </thead>
  <tbody>
        `
         console.log('productos',result.info.data)
         result.info.forEach(element =>{
        console.log('products', element)
            listCategories = listCategories + `
            <tr>
              <td>${element.id}</td>
              <td>${element.name}</td>
              <td>${element.slug}</td>
              <td><img src="${element.image}" class="img-thumbnail"alt="avatar del usuario"></td>
              <td> <button type="button" class="btn btn-outline-info" onclick="getCategories('${element.id}')">Ver</button> </td>
            
            
            </tr>
            
            `
            
        });
        listCategories=listCategories + `
            </tbody>
            </table>

             <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" href="#" onclick="categories('1')" >1</a></li>
    <li class="page-item"><a class="page-link" href="#" onclick="categories('2') ">2</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
        
        `

        document.getElementById('info').innerHTML=listCategories

    }else{
        document.getElementById('info').innerHTML='no existen productos en la red'
    }
})

    

}
function getCategories(idProducts){
    const  PLATZI_ENDPOINT ='https://api.escuelajs.co/api/v1/categories/'+idProducts
    fetch(PLATZI_ENDPOINT,{

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
        const categorie=response.body.data
        const modalCategories=`
        <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                   
                    <div class="card" ">
                        
                        <div class="card-body">
                            <h5 class="card-title">Informacion del producto: </h5>
                            <p class="card-text">Nombre: ${categorie.name} </p>
                             <p class="card-text">Año: ${categorie.year} </p>
                              <p class="card-text">Valor: ${categorie.pantone_value} </p>
                           
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
        document.getElementById('viewModalCategories').innerHTML=modalCategories
        const modalC = new bootstrap.Modal(document.getElementById('modalCategories'))
        modalC.show()

    }else{
        document.getElementById('info').innerHTML='<h3> No se encontro la categoria en la Api</h3>'
    }
})




}