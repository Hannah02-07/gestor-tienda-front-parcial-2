document.getElementById('loginForm').addEventListener('submit', function(e){

    e.preventDefault();
    const email = document.getElementById('email').value;
    const password =document.getElementById('password').value;

    login(email,password)

});

function login(email, password){
    localStorage.removeItem('token')
    let message=''
    let alertType= ''
    

    const REQRES_ENDPOINT =' https://api.escuelajs.co/api/v1/auth/login'
    fetch(REQRES_ENDPOINT,{

        method:'POST',
        headers: {
            'Content-type':'application/json',
            'x-api-key':'reqres-free-v1'
        },
        body: JSON.stringify({email,password})
    })

    .then((response) =>{
        if(response.status===201){

            alertType= 'success'
            message = 'Inicio de seccion exitoso'
            alertBuilder(alertType,message)
            localStorage.setItem('token','jaiuhn9283kiij92jm')
            setTimeout(()=>{
                location.href='admin/dashboard.html'

            },2000)//2000ms=2s

          


        }else{

            alertType='danger'
          message='Correo o contraseña invalida'
          alertBuilder(alertType,message)


        }
       
        console.log('respuesta del servicio', response)
        alertBuilder(alertType,message)
    })

    .catch((error)=>{
        alertType='danger'
        message='Correo o contraseña invalida'
        
        console.log('error inesperado',error)

       
    })


   

}


function alertBuilder(alertType, message){

    let alert = `
    <div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
                          ${message}
                           <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                         </div>

   `
   document.getElementById('mensaje').innerHTML= alert;

}