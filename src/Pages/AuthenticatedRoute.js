export async function AuthenticatedRoute(){
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/api/Authorize', {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'authorization' : 'Bearer ' + token
    },
  });
    if(response.status === 200){
      const data = await response.json();
      return {user : data.user};
    }
    else{
      return null;
    } 
  }catch(err){
    console.error(err);
  }
}

