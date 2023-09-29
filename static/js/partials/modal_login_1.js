
// Variable pour suivre l'état de connexion de l'utilisateur
//var isLoggedIn = false;


// Fonction pour mettre à jour l'état de connexion
//function setLoggedInState(username) {
//  isLoggedIn = true;
//  var openModalButton = document.getElementById('openModalbutton');
  // Mettez à jour le bouton avec le nom d'utilisateur
//  openModalButton.innerHTML = username;
//}

function openModal_total(valeur){
       var modal_1 = document.querySelector('.modal_login_1');
       var background_1 = document.querySelector('.bg_1');
       var modal = document.querySelector('.modal_login');
       var background = document.querySelector('.bg');

         if(valeur == 'Sign up'){
             modal_1.classList.remove('openModal_1');
             background_1.style.display='none';

             modal.classList.add('openModal');
             background.style.display='block';
         }
         else{
             modal.classList.remove('openModal');
             background.style.display='none';

             modal_1.classList.add('openModal_1');
             background_1.style.display='block';
         }
         document.body.style.overflow='hidden';
  }

  function closeModal_total(valeur){
    var modal_1 = document.querySelector('.modal_login_1');
    var background_1 = document.querySelector('.bg_1');
    var modal = document.querySelector('.modal_login');
    var background = document.querySelector('.bg');

      if(valeur == 'Sign up'){
           modal_1.classList.remove('openModal_1');
           background_1.style.display='none';
      }
      else{
        modal.classList.remove('openModal');
        background.style.display='none';
      }
      document.body.style.overflow='auto';
  }

function isValidEmail(email) {
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}


function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}



//document.addEventListener("DOMContentLoaded", function () {

      
    var Button_sign_in=document.getElementById('signIn');

    if (Button_sign_in) {
       Button_sign_in.addEventListener('click', function () {
       //  closeModal_sign_up();
        // openModal_1();
          closeModal_total(Button_sign_in.innerHTML);
          openModal_total(Button_sign_in.innerHTML);
       });
    }
//});


// Écoutez le clic sur le bouton de fermeture
document.addEventListener('DOMContentLoaded', function () {
    var openModalButton = document.getElementById('openModalbutton');
    var modalContainer_User=document.querySelector('.modalContainer_User');
    var isAuthenticated = openModalButton.getAttribute('data-authenticated');
    if (isAuthenticated === 'false') {
      openModalButton.addEventListener('click', function (e) {
          // Empêchez l'ouverture du modal si l'utilisateur n'est pas authentifié
          e.preventDefault();
          openModal_total('Sign in');
      });
    }
    else{
       openModalButton.addEventListener('click',function (e){
             e.preventDefault();
             modalContainer_User.classList.add('showModal_User');
             modalContainer_User.classList.remove('hideModal_User');
             document.body.style.overflow='hidden';
       })

       var closeButton_User=document.getElementById('closeModalButton_User');
      if(closeButton_User) {
       closeButton_User.addEventListener('click',function (e){
        e.preventDefault();
        modalContainer_User.classList.remove('showModal_User');
        modalContainer_User.classList.add('hideModal_User');
        document.body.style.overflow='auto';
    })
      }

       var cards = document.querySelectorAll('.card'); // Sélectionnez tous les éléments avec la classe "card"

cards.forEach(function(card) {
  card.addEventListener('click', function(e) {
    e.preventDefault();
    //alert('imad');

    var filmTitle = card.getAttribute("data-film-title");

    // Encodez le titre du film pour l'URL (remplacer les espaces par des tirets, par exemple)
    var encodedFilmTitle = encodeURIComponent(filmTitle);

    var modalContainer_User = document.querySelector('.modalContainer_User');

    modalContainer_User.classList.remove('showModal_User');
    modalContainer_User.classList.add('hideModal_User');
    document.body.style.overflow = 'auto';

    // Construisez l'URL de redirection avec le titre encodé en tant que paramètre
    var redirectURL = "/Cluster/" + encodedFilmTitle;

    // Redirigez l'utilisateur vers la page de détails du film
    window.location.href = redirectURL;

  });
  //var modalContainer_User = document.querySelector('.modalContainer_User');

  // Ajoutez un écouteur d'événements de clic à l'élément d'arrière-plan
  
  if(modalContainer_User){
  modalContainer_User.addEventListener("click", function (event) {
    // Assurez-vous que l'événement ne se propage pas aux éléments enfants (comme le contenu modal)
     if (event.target === modalContainer_User) {
      //alert('imad');
          // Cacher le modal en ajoutant la classe "hideModal"
          modalContainer_User.classList.remove("showModal_User");
          modalContainer_User.classList.add("hideModal_User");
          // Supprimez la classe "showModal" si elle est présente (au cas où)
           //modalContainer_User.classList.remove("showModal_User");

        document.body.style.overflow='auto';
  }

});
  }
});

       
    }
      

      var homepage=document.querySelector('.homepage');
      homepage.addEventListener("click", function (event) {
             
        var homepage = homepage.getAttribute("data-homepage");

        window.location.href = homepage;

    });


    var closeModalButton = document.getElementById('closeModalButton');
    if (closeModalButton) {
      closeModalButton.addEventListener('click', function () {
        closeModal_total('Sign in')
      });
    }

    var Button_sign_up = document.getElementById('signUp');
        if (Button_sign_up) {
          Button_sign_up.addEventListener('click', function () {
            closeModal_total(Button_sign_up.innerHTML);
            openModal_total(Button_sign_up.innerHTML);
          });
    }

    var closeModalButton_1 = document.getElementById('closeModalButton_1');
    if (closeModalButton_1) {
      closeModalButton_1.addEventListener('click', function () {
       closeModal_total('Sign up');
       
      });
    }
    var Button_sign_in=document.getElementById('signIn');

    if (Button_sign_in) {
       Button_sign_in.addEventListener('click', function () {
       //  closeModal_sign_up();
        // openModal_1();
          closeModal_total(Button_sign_in.innerHTML);
          openModal_total(Button_sign_in.innerHTML);
       });
    }

    var Button_sign_up = document.getElementById('signUp');
        if (Button_sign_up) {
          Button_sign_up.addEventListener('click', function () {
            closeModal_total(Button_sign_up.innerHTML);
            openModal_total(Button_sign_up.innerHTML);
          });
    }

    var Form_Sign_In=document.getElementById('modal_container_signIn');
    if(Form_Sign_In){
      Form_Sign_In.addEventListener('submit',function(e){
        e.preventDefault();

        var email_sign=document.getElementById('email1').value;
        var password_sign=document.getElementById('password1').value;
        var error_sign=document.getElementById('error-message_1');
        var openModalButton = document.getElementById('openModalbutton');
             
          // Validez les champs


          if (!email_sign.trim()) {
            error_sign.innerHTML = 'Le champ de l\'email ne peut pas être vide.';
            return;
          }
      
          if (!password_sign.trim()) {
            error_sign.innerHTML = 'Le champ du mot de passe ne peut pas être vide.';
            return;
          }
          
          if (!isValidEmail(email_sign)) {
            error.innerHTML = 'L\'email n\'est pas valide.';
            return;
          }

          if (!password_sign) {
            error_sign.innerHTML = 'Le champ du mot de passe ne peut pas être vide.';
            return;
          }

          // Récupérez le jeton CSRF à partir du cookie
          var csrfToken = getCookie('csrftoken');

          var formData={
             email:email_sign,
             password:password_sign,
             csrfmiddlewaretoken: csrfToken,
          }


           // Envoi des données de connexion au backend via AJAX
           fetch("/signin/", {
               method: "POST",
               headers: {
                   "Content-Type": "application/json",
                   "X-CSRFToken": csrfToken  // Utilisez également le jeton CSRF dans l'en-tête
               },
               body: JSON.stringify(formData)
           })
           .then(response => response.json())
           .then(data => {
                if (data.success) {
                   //closeModal_total('Sign up');
                   //openModalButton.innerHTML=data.username;
                   window.location.reload();
                   //setLoggedInState(data.username);
                 } else {
                    error_sign.innerHTML=data.message;
                    error_sign.style.color='red';
                 }
          })
        .catch(error => {
            console.error("Erreur lors de la requête AJAX : ", error);
        });
       });


    }

    var signup_form=document.getElementById('modal_container_signUp');
      if (signup_form){
        signup_form.addEventListener("submit", function (e) {
          e.preventDefault()
          var username=document.getElementById('username').value;
          var email=document.getElementById('email').value;
          var password=document.getElementById('password').value;
          var confirm=document.getElementById('confirm-password').value;
          
          var error=document.getElementById('error-message');

          

        // Définissez des expressions régulières pour la validation
        var usernameRegex = /^[A-Za-z]+$/; // Autorise seulement les caractères alphabétiques
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Valide le format de l'email
        var passwordRegex = /^(?=.*[A-Z].*[A-Z])(?=.{6,})/; // Au moins deux majuscules et six caractères au total

        // Vérifiez les données du formulaire avec les expressions régulières
        if (!usernameRegex.test(username)) {
             //alert("Le nom ne doit contenir que des caractères alphabétiques.");
             error.innerHTML="Le nom ne doit contenir que des caractères alphabétiques.";
             signup_form.reset();
             return;
        }

        if (!emailRegex.test(email)) {
            // alert("L'email n'est pas au bon format.");
            error.innerHTML="L'email n'est pas au bon format.";
            signup_form.reset();
            return;
        }
         
        // Vérifiez si les mots de passe correspondent
        if (password !== confirm) {
          //alert("Les mots de passe ne correspondent pas.");
          error.innerHTML="Les mots de passe ne correspondent pas."
          signup_form.reset();
          return;
        }

        if (!passwordRegex.test(password)) {
            // alert("Le mot de passe doit contenir au moins deux majuscules et six caractères.");
             error.innerHTML="Le mot de passe doit contenir au moins deux majuscules et six caractères.";
             signup_form.reset();
            return;
        }
        // Créez un objet avec les données du formulaire
        var formData = {
             username: username,
             email: email,
             password: password,
             confirm_password: confirm,
  // Inclut le jeton CSRF
        };

        // Récupérez le jeton CSRF à partir du cookie
        var csrfToken = getCookie('csrftoken');
          // Envoiez les données au backend via AJAX
          fetch("/signup/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,  // Inclut le jeton CSRF dans l'en-tête
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Réinitialisez le formulaire après une inscription réussie
                //error.innerHTML=data.message;
                signup_form.reset();
                openModal_total('Sign in');
                document.getElementById('error-message_1').innerHTML=data.message;
                document.getElementById('error-message_1').style.color="green";
            } else {
                signup_form.reset();
                error.innerHTML=data.message;
            }
        })
        .catch(error => {
            console.error("Erreur lors de la requête AJAX : ", error);
        });

      });
      }
  });

