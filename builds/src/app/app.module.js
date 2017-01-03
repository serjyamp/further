angular
    .module('futher', [
        'ui.router',
        'futher.fire.service',
        'futher.Trainings'
    ])
    .config(config);

function config($stateProvider, $urlRouterProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('/', {
            url: '/',
            template: ''
        })
        .state('trainings', {
            url: '/trainings',
            templateUrl: 'app/components/trainings.html',
            controller: 'TrainingsCtrl',
            controllerAs: 'vm'
        })
        .state('nutrition', {
            url: '/nutrition',
            templateUrl: 'app/components/nutrition.html'
        });
}
