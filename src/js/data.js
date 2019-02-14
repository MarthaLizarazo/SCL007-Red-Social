const settingsPage = (email, username, birthdate, sport) => {
  firebase.database().ref("users/" + firebase.auth().currentUser.uid).update({
      email: email,
      userName: username,
      birthdate: birthdate,
      sport: sport
    })
    .then(() => {
      alert(username + " sus datos se registraron correctamente");
    })
    .catch((error) => {
      console.error("Error > " + error.message);
    });
}
//funcion registrar publicacion
const registerPost = (postText, postStatus,email) => {
    const newPostKey = firebase.database().ref('users/post/').child('post').push().key;
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/post/${newPostKey}`).set({
      post : postText,
      status : postStatus,
      email: email
    }).then(() => {
      alert(firebase.auth().currentUser.email + " se ha publicado");
    })
    .catch((error) => {
      console.error("Error > " + error.message);
    });
    //location.reload(); //recargo pagina
};

const readPost = (onPostChange) => {
  const postRef = firebase.database().ref(`users/${firebase.auth().currentUser.uid}/post`);
  postRef.on('child_added', (post) => {
    onPostChange(post);
  });
};

  const  editPost =(post,key)=>{
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/post/${key}`).update({
        post:post
    })
    .then(() => {
        alert(username + "su publicación se editó correctamente");
    })
    .catch((error)  => {
        console.error("Error > " + error.message);
    });
  }
//Borrar un post
//Me posiciono en post a eliminar
const deletePost = (key) => {
  let botonId = key.target.getAttribute("id").substring(10, 50);// Target Devuelve el elemento del DOM que disparó el evento (inicialmente)
  let alert = confirm('Seguro deseas eliminar tu comentario?');
  if (alert === true) {
    //Direccion o ruta del post que quiero eliminar
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/post/${botonId}`).remove();
    location.reload(); //recargamos la pagina
  } else {
    return null;
  }

}

// función Likes
const likePost = (keyPost) =>{
  
}