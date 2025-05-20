function products(){
    document.getElementById('cardHeader').innerHTML='<h5>Listado de productos</h5>'
    const REQRES_ENDPOINT ='https://api.escuelajs.co/api/v1/products'
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
}