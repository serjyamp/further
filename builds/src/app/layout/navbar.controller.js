angular.module('further.Navbar', [])
    .controller('NavbarCtrl', NavbarCtrl);

function NavbarCtrl($rootScope, AuthFactory) {
    var vm = this;
    vm.auth = AuthFactory;

    vm.auth.$onAuthStateChanged(function(firebaseUser) {
      $rootScope.firebaseUser = firebaseUser;
      console.log($rootScope.firebaseUser);
    });

    // vm.signin = function() {
    //     console.log(vm.auth)
    //     vm.auth.signInWithPopup(provider).then(function(result) {
    //         $rootScope.isSigned = true;
    //     }).catch(function(error) {});
    // };
    // vm.signout = function() {
    //     vm.auth.signOut().then(function() {
    //         $rootScope.isSigned = false;
    //     }, function(error) {});
    // };
}
