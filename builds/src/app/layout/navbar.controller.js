angular.module('further.Navbar', [])
    .controller('NavbarCtrl', NavbarCtrl);

function NavbarCtrl($rootScope, AuthFactory) {
    var vm = this;
    vm.auth = AuthFactory;

    vm.auth.$onAuthStateChanged(function(firebaseUser) {
      $rootScope.firebaseUser = firebaseUser;
    });

    vm.photoURL = null;
}
