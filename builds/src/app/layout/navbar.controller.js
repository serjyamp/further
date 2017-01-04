angular.module('futher.Navbar', [])
    .controller('NavbarCtrl', NavbarCtrl);

function NavbarCtrl($rootScope) {
    var vm = this;
    var provider = new firebase.auth.GoogleAuthProvider();

    $rootScope.isSigned = false;
    vm.signin = function() {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            $rootScope.isSigned = true;
        }).catch(function(error) {});
    };
    vm.signout = function() {
        firebase.auth().signOut().then(function() {
            $rootScope.isSigned = false;
        }, function(error) {});
    };
}