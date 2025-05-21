function products(page){
    document.getElementById('cardHeader').innerHTML='<h5>Listado de productos</h5>'
    const REQRES_ENDPOINT ='https://api.escuelajs.co/api/v1/products?page='+page
    fetch(REQRES_ENDPOINT,{

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
        let listProducts=`
        <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">año</th>
      <th scope="col">valor</th>
    </tr>
  </thead>
  <tbody>
        `
         console.log('productos',result.info.data)
         result.info.forEach(element =>{
        console.log('products', element)
            listProducts = listProducts + `
            <tr>
              <td>${element.id}</td>
              <td>${element.title}</td>
              <td>${element.slug}</td>
              <td>${element.price}</td>
              <td> <button type="button" class="btn btn-outline-info" onclick="getProducts('${element.id}')">Ver</button> </td>
            
            
            </tr>
            
            `
            
        });
        listProducts=listProducts + `
            </tbody>
            </table>

             <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" href="#" onclick="products('1')" >1</a></li>
    <li class="page-item"><a class="page-link" href="#" onclick="products('2') ">2</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
        
        `

        document.getElementById('info').innerHTML=listProducts

    }else{
        document.getElementById('info').innerHTML='no existen productos en la red'
    }
})

    

}
function getProducts(idProducts){
    const PLATZI_ENDPOINT ='https://api.escuelajs.co/api/v1/products/'+idProducts
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
        const product=response.body
        const modalProduct=`
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
                            <p class="card-text">Nombre: ${product.title} </p>
                             <p class="card-text">slug: ${product.slug} </p>
                              <p class="card-text">Valor: ${product.price} </p>
                           
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
        document.getElementById('viewModalProducts').innerHTML=modalProduct
        const modalP = new bootstrap.Modal(document.getElementById('modalProduct'))
        modalP.show()

    }else{
        document.getElementById('info').innerHTML='<h3> No se encontro el producto en la Api</h3>'
    }
})




}
