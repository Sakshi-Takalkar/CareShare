<template>
<div id="login" :style="cssProps">
    <div class="grey lighten-3">
    <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="card">
          <div class="card-header">
            <div class="row justify-content-center">
                <div class="col-md-3">
            <h3>Login</h3>
            </div>
            </div>
          </div>
          <div class="card-body">
            <form>
              <div class="row justify-content-center">
                <div class="col-md-6">
                  <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><b-icon-people-fill style="width: 80px; height: 25px;"></b-icon-people-fill></span>
                </div>
                <input type="text" class="form-control" placeholder="username" v-model="email">
                
              </div>
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><b-icon-lock-fill style="width: 40px; height: 25px;"></b-icon-lock-fill></span>
                </div>
                <input type="password" class="form-control" placeholder="password" v-model="password">
              </div>
             
              <div class="row justify-content-center">
                <div class="col-md-6">
              <b-button id = 'loginbtn' style="background-color: #006666; color:white"  v-on:click="login">Login</b-button>
                </div>
              </div>
            </div>
            </div>
            </form>
          </div>
          <div class="card-footer">
              <div class="d-flex justify-content-center">
                <b-button v-on:click="forgot" style="background:none; border:none; color:white">Forgot your password?</b-button>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>


<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Numans');

html,body{
background-image: url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80');
background-size: cover;
background-repeat: no-repeat;
height: 100%;
width:100%;
font-family: 'Numans', sans-serif;
}

.container{
height: 100%;
align-content: center;

}

.card{
height: 300px;
margin-top: 5%;
margin-bottom: auto;
width: 40%;
background-color: rgba(39, 54, 53, 0.553)!important;
align-content: left;
}

.social_icon span{
font-size: 60px;
margin-left: 10px;
color: #FFC312;
}

.social_icon span:hover{
color: white;
cursor: pointer;
}

.card-header h3{
color: white;
}

.social_icon{
position: absolute;
right: 20px;
top: -45px;
}

.input-group-prepend span{
width: 50px;
background-color: 	#66b2b2;
color: black;
border:0 !important;
}

input:focus{
outline: 0 0 0 0  !important;
box-shadow: 0 0 0 0 !important;

}

.remember{
color: white;
}

.remember input
{
width: 20px;
height: 20px;
margin-left: 15px;
margin-right: 5px;
}

.login_btn{
color: black;
background-color: #FFC312;
width: 100px;
}

.login_btn:hover{
color: black;
background-color: white;
}

.links{
color: white;
}

.links a{
margin-left: 4px;
}

#login_btn{
  margin-left: 200px;
  
}

#login{
  margin: none;
  height: 600px;
  background-repeat: no-repeat;
  background-size:1400px 800px ;

}


</style>

<script>
import firebase from 'firebase';
export default {
  name: 'login',
  data: function() {
    return {
      cssProps:{
        backgroundImage: `url(${require('@/assets/ngoo.jpeg')})`

      },
      email: '',
      password: ''
    };
  },
  created(){
    
     firebase.auth().onAuthStateChanged(user=> {
          if (user) {
            if(user.email == 'admin@me.com'){
              this.$router.push('/admindashboard')
            }
            else{
              this.$router.push('/ngoprofile/'+user.email)
            }
          } else {
            this.$router.push('/login')
          }
        });
  },
  methods: {
    login: function(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`You are logged in as ${this.email}`);
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
              .then(function() {
                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.
                return firebase.auth().signInWithEmailAndPassword(email, password);
              })
              .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
              });

            if(this.email=="admin@me.com"){
              this.$router.push('/admindashboard');
            }
            else{
            this.$router.push('/ngoprofile/'+this.email);
            }
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    },
    forgot(){
      var auth = firebase.auth();
      var emailAddress = this.email;
      var x = confirm("Do you wish to reset your password?")
      if(x==true && this.email!=""){
          auth.sendPasswordResetEmail(emailAddress).then(function() {
          alert('password reset mail sent to your email address')
        }).catch(function(error) {
          // An error happened.
        });
      }
      else{
        alert('enter your email address first')
      }
      
          }
  }
};
</script>