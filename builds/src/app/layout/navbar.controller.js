angular.module('further.Navbar', [])
    .controller('NavbarCtrl', NavbarCtrl);

function NavbarCtrl($rootScope, $state, AuthFactory) {
    var vm = this;
    vm.auth = AuthFactory;

    vm.auth.authVar.$onAuthStateChanged(function(firebaseUser) {
      $rootScope.firebaseUser = firebaseUser;
    });

    vm.signOut = function(){
    	vm.auth.signOut();
        $state.go('/');
    };
    vm.signIn = function(){
        vm.auth.signIn();
    	$state.go('trainings');
    };

    vm.photoURL = null;
}
