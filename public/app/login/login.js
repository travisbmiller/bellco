(function() {
    'use strict';

    angular
        .module('app')
        .controller('Login', Login)

    Login.$inject = ['$state', 'authService', '$timeout'];

    function Login($state, authService, $timeout) { 
        var vm = this;
        vm.showModalError = false;
        vm.showOverlay = false;
        vm.showErrorMsg = false;
        vm.passwordError = false;
        vm.emailError = false;
        console.log("Login controller")

        vm.submit = function () {
            console.log("hit submit")
            
            var obj = {
                email: vm.email,
                password: vm.password
            }
            console.log(obj)
            authService.login(obj)
            .then(function (res) {
                
                if ( res == 1 ) {
                    console.log("hit no user found")
                    vm.emailError = true;
                    $timeout(function () {
                        vm.emailError = false;
                    }, 1000)
                } 
                else if ( res == 2) {
                    console.log("hit")
                    vm.passwordError = true;
                    vm.showErrorMsg = true;
                    $timeout(function () {
                        vm.passwordError = false;
                        vm.showErrorMsg = false;
                    }, 3000)
                } 

                 


            })
            
        }

        
    }   


})();   

