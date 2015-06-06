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
        //console.log("Login controller")

        vm.submit = function () {
            console.log("hit submit")
            
            var obj = {
                email: vm.email,
                password: vm.password
            }
            //console.log(obj)
            authService.login(obj)
            .then(function (res) {
                console.log(res)
                if ( res == 1 ) {
                    vm.showErrorMsg = true;
                    vm.emailError = true;
                    vm.errMsg = "No user found by e-mail."
                    $timeout(function () {
                        vm.emailError = false;
                        vm.showErrorMsg = false;
                    }, 4000)
                } 
                else if ( res == 2) {
                    
                    vm.passwordError = true;
                    vm.showErrorMsg = true;
                    vm.errMsg = "Password does not match username."
                    $timeout(function () {
                        vm.passwordError = false;
                        vm.showErrorMsg = false;
                    }, 4000)
                } 
            }, function (err) {
                console.log("hit")
            });
            
        }

        
    }   


})();   

