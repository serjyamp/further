angular
    .module('further', [
        'ui.router',
        'further.Navbar',
        'further.Trainings',
        'further.fire.service',
        'further.auth.factory'
    ])
    .config(config);

function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/program');

    $stateProvider
        .state('/', {
            url: '/',
            template: "<h1>Hello</h1>"
        })
        .state('/program', {
            url: '/program',
            templateUrl: 'app/components/trainings.html',
            controller: 'TrainingsCtrl',
            controllerAs: 'vm'
        });
}