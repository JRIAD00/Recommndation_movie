



//var comments = JSON.parse(localStorage.getItem('comments')) || [];

//console.log(comments);
// Function to refresh and display the comment list
///localStorage.removeItem('comments');
//localStorage.clear()
//var comments = JSON.parse(localStorage.getItem('comments_2718')) || [];
//console.log(comments);
function refreshCommentList(filmId) {
     // Retrieve existing comments from localStorage
     // Récupérez la clé de stockage local spécifique à ce film
  var key = 'comments_' + filmId;

  // Retrieve existing comments from localStorage for this film
  var comments = JSON.parse(localStorage.getItem(key)) || [];
    console.log(comments);
  // Convert comments to an array if it's not
  if (!Array.isArray(comments)) {
    comments = [comments];
  }

  // Sort comments by timestamp
  comments.sort(function (a, b) {
    var timestampA = new Date(a.timestamp).getTime();
    var timestampB = new Date(b.timestamp).getTime();

    // Sort in descending order (from most recent to oldest)
    return timestampB - timestampA;
  });

     // Display comments in your user interface
     var commentsContainer = document.getElementById('modal_avis_container_1');

     commentsContainer.innerHTML = ''; // Clear previous content

     comments.forEach(function (comment) {
        //console.log(comment);
           // Création de l'élément pour le nom d'utilisateur avec la classe "modal_avis_user"
           var modal_avis=document.createElement('div');
           modal_avis.classList.add('modal_avis');

           var userDiv = document.createElement('div');
           userDiv.classList.add('modal_avis_user');
           var userName = document.createElement('p');
           userName.textContent = comment.user; // Remplacez 'user 1' par le nom d'utilisateur réel
           userDiv.appendChild(userName);

           for (var i = 0; i < comment.Nbstar; i++) { // Vous pouvez ajuster le nombre d'étoiles actives ici
                 var starIcon = document.createElement('i');
                 starIcon.classList.add('fa-solid', 'fa-star', 'modal_active_star');
                 userDiv.appendChild(starIcon);
           }

           // Création de l'élément pour le texte du commentaire avec la classe "modal_avis_text"
           var textDiv = document.createElement('p');
           textDiv.classList.add('modal_avis_text');
           textDiv.textContent =comment.commentaire ; // Remplacez par le texte réel du commentaire

           

        // Ajout de l'élément principal à son conteneur parent (remplacez 'modal_avis_container' par l'ID de votre conteneur parent)
        modal_avis.appendChild(userDiv);
        modal_avis.appendChild(textDiv);
        commentsContainer.appendChild(modal_avis);

  });
}


function affiche_commentaire(commentaires){

       // Sélectionnez l'élément container où vous voulez afficher les commentaires
       var commentairesContainer = document.getElementById('modal_avis_container_1');

       // Effacez le contenu précédent du container
       commentairesContainer.innerHTML = '';

      // Bouclez à travers les commentaires et créez des éléments HTML pour chacun
      for (var i = 0; i < commentaires.length; i++) {
          var commentaire = commentaires[i];
           
          // Création de l'élément pour le nom d'utilisateur avec la classe "modal_avis_user"
          var modal_avis=document.createElement('div');
          modal_avis.classList.add('modal_avis');

          var userDiv = document.createElement('div');
          userDiv.classList.add('modal_avis_user');
          var userName = document.createElement('p');
          userName.textContent = commentaire.user; // Remplacez 'user 1' par le nom d'utilisateur réel
          userDiv.appendChild(userName);

          for (var j= 0; j < commentaire.Nbstar; j++) { // Vous pouvez ajuster le nombre d'étoiles actives ici
                var starIcon = document.createElement('i');
                starIcon.classList.add('fa-solid', 'fa-star', 'modal_active_star');
                userDiv.appendChild(starIcon);
          }

          // Création de l'élément pour le texte du commentaire avec la classe "modal_avis_text"
          var textDiv = document.createElement('p');
          textDiv.classList.add('modal_avis_text');
          textDiv.textContent =commentaire.commentaire ; // Remplacez par le texte réel du commentaire

          

       // Ajout de l'élément principal à son conteneur parent (remplacez 'modal_avis_container' par l'ID de votre conteneur parent)
       modal_avis.appendChild(userDiv);
       modal_avis.appendChild(textDiv);
       commentairesContainer.appendChild(modal_avis);
            
        }



}



function fetchAndStoreComments(comment,filmId){
      
      // Récupérer les commentaires existants dans le local storage pour ce film
  var key = 'comments_' + filmId;
  var comments = JSON.parse(localStorage.getItem(key)) || [];

  // Assurez-vous que "comments" est un tableau
  if (!Array.isArray(comments)) {
    comments = [];
  }

  // Ajoutez le nouveau commentaire à la liste
  comments.push(comment);

  localStorage.setItem(key, JSON.stringify(comments));

  // Refresh and display the comment list for this film
  refreshCommentList(filmId)
}


document.addEventListener("DOMContentLoaded", function () {
    // Obtenez une liste d'éléments .movie
    var movieElements = document.querySelectorAll(".movie");
  
    // Parcourez les éléments pour ajouter des écouteurs d'événements
    movieElements.forEach(function (movieElement) {
      movieElement.addEventListener("click", function () {
        var filmId = movieElement.getAttribute("data-film-id");
        fetch("/get_film_data/" + filmId + "/")
          .then(function (response) {
            return response.json();
          })
          .then(function (filmData) {
            // Utilisez querySelector pour obtenir l'élément modal par sa classe
            var modalContainer = document.querySelector(".modalContainer");
            modalContainer.classList.remove("hideModal");
            modalContainer.classList.add("showModal");
  
            var modalMovieTitle = document.querySelector(".modal_movie_title");
            modalMovieTitle.innerHTML = filmData.titre;
  
            // Sélectionnez l'élément image par son ID
            var imageElement = document.getElementById("film_image");
            imageElement.src = filmData.image;
  
            var rateElement = document.getElementById("film_rate");
            rateElement.innerHTML = filmData.vote;
  
            var dateElement = document.querySelector(".modal_date");
            dateElement.innerHTML = filmData.date_sortie;
  
            var genres = filmData.genres;
            var genresText = genres.join(", ");
  
            var modalMovieCat = document.querySelector(".modal_movie_cat");
            modalMovieCat.innerHTML = genresText;
  
            var descrElement = document.querySelector(".modal_movie_desc");
            descrElement.innerHTML = filmData.description;

            //La partie de commentaire 
           // var commentaires = filmData.commentaires;
           // console.log(commentaires);

           // affiche_commentaire(commentaires);
  
            document.body.classList.add("no-scroll");
  
            var link_button = document.getElementById("see-more_link");
  
            link_button.addEventListener("click", function (event) {
              event.preventDefault();
              var filmTitle = filmData.titre;
  
              // Encodez le titre du film pour l'URL (remplacer les espaces par des tirets, par exemple)
              var encodedFilmTitle = encodeURIComponent(filmTitle);
  
              // Construisez l'URL de redirection avec le titre encodé en tant que paramètre
              var redirectURL = "/Cluster/" + encodedFilmTitle;
  
              // Redirigez l'utilisateur vers la page de détails du film
              window.location.href = redirectURL;
  
              modalContainer.classList.add("hideModal");
              // Supprimez la classe "showModal" si elle est présente (au cas où)
              modalContainer.classList.remove("showModal");
              document.body.classList.remove("no-scroll");
            });

            var form_comm=document.getElementById('form_comm');
                form_comm.addEventListener('submit',function(event){
                event.preventDefault();

                var username=document.getElementById('user_name').value;
                var Nbstar=document.getElementById('Nb_star').value;
                var commentaire=document.getElementById('commentaire').value;
                // Vérifiez si les champs ne sont pas vides
                if (username.trim() === '') {
                       document.getElementById('error_comm').innerHTML='le champ name ne doit pas etre null';
                       return; // Arrêtez l'exécution du formulaire
                }

                if (Nbstar.trim() === '') {
                  /*console.log('Le champ du nombre d\'étoiles ne peut pas être vide.');*/
                  document.getElementById('error_comm').innerHTML='Le champ du nombre d\'étoiles ne peut pas être vide.'
                  return; // Arrêtez l'exécution du formulaire
                }

                // Vérifiez si le commentaire n'est pas nul
                if (commentaire.trim() === '') {
                   document.getElementById('error_comm').innerHTML='Le champ du commentaire ne peut pas être vide.';
                   return; // Arrêtez l'exécution du formulaire
                }
              // Vérifiez si le nom d'utilisateur contient uniquement des caractères alphabétiques
              var usernameRegex = /^[A-Za-z]+$/;
              if (!username.match(usernameRegex)) {
                  //alert('Le nom d\'utilisateur ne doit contenir que des caractères alphabétiques.');
                  document.getElementById('error_comm').innerHTML='Le nom d\'utilisateur ne doit contenir que des caractères alphabétiques.'
                  return; // Arrêtez l'exécution du formulaire
              }

              // Vérifiez si le nombre d'étoiles est un nombre
              if (isNaN(Nbstar)) {
                 //alert('Le nombre d\'étoiles doit être un nombre.');
                 document.getElementById('error_comm').innerHTML='Le nombre d\'étoiles doit être un nombre.';
                 return; // Arrêtez l'exécution du formulaire
              }

              
              var csrfToken = getCookie('csrftoken');
              var url = "/Post_comment/" + filmId + "/";
              fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "X-CSRFToken": csrfToken, // Vous pouvez ajouter d'autres en-têtes si nécessaires, par exemple, l'authentification
                },
                body: JSON.stringify({
                    username: username,
                    Nbstar: Nbstar,
                    commentaire: commentaire,
                    csrfmiddlewaretoken: csrfToken,
                }),
            })
            .then(function (response) {
              if (!response.ok) {
                // Gérer les erreurs HTTP ici
                throw new Error('Erreur HTTP : ' + response.status);
              }
              return response.json();
            })
            .then(function (response) {
                if (response.success) {
                    // Le commentaire a été enregistré avec succès
                    // Vous pouvez afficher un message de succès à l'utilisateur ici
                    // Refresh comments after successful submission
                    // fetchAndStoreComments(response.comment);
                    //console.log(response.comment);
                    // Réinitialisez les champs du formulaire à vide
                    var film_id=response.filmId;
                    console.log(film_id);
                    document.getElementById('user_name').value = '';
                    document.getElementById('Nb_star').value = '';
                    document.getElementById('commentaire').value = '';
                    document.getElementById('error_comm').innerHTML = '';
                    // Refresh comments after successful submission, passing the filmId
                   //fetchAndStoreComments(response.comment, film_id);
                    
                } else {
                    //document.getElementById('error_comm').innerHTML='vous devez connecter pour ernregistré votre commentaire';
                    modalContainer.classList.add("hideModal");
                    modalContainer.classList.remove("showModal");
                    document.body.classList.remove("no-scroll");

                    openModal_total('Sign in');
                    var error_sign=document.getElementById('error-message_1');
                    error_sign.innerHTML='vous devez connecter pour ernregistré votre commentaire';
                    error_sign.style.color='red';

                } 
            })
            .catch(function (error) {
                console.error("Erreur lors de l'envoi du commentaire au backend : ", error);
            });
          
          })
          .catch(function (error) {
            console.error("Erreur lors de la récupération des données du film : ", error);
          });
      });
    });
  
    // Sélectionnez l'élément d'arrière-plan ()
    var modalContainer = document.querySelector(".modalContainer");
  
    // Ajoutez un écouteur d'événements de clic à l'élément d'arrière-plan
    modalContainer.addEventListener("click", function (event) {
      // Assurez-vous que l'événement ne se propage pas aux éléments enfants (comme le contenu modal)
      if (event.target === modalContainer) {
        // Cacher le modal en ajoutant la classe "hideModal"
        modalContainer.classList.add("hideModal");
        // Supprimez la classe "showModal" si elle est présente (au cas où)
        modalContainer.classList.remove("showModal");
  
        document.body.classList.remove("no-scroll");
      }
    });
  
    // Ajoutez un événement "popstate" pour détecter le retour en arrière du navigateur
    window.addEventListener("popstate", function (event) {
      // Vérifiez si le modal est actuellement ouvert
      var modalContainer = document.querySelector(".modalContainer");
      if (modalContainer.classList.contains("showModal")) {
        // Si le modal est ouvert, fermez-le
        modalContainer.classList.add("hideModal");
        modalContainer.classList.remove("showModal");
        document.body.classList.remove("no-scroll");
      }
    });
  });
});
