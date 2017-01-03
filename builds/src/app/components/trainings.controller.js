angular.module('futher.Trainings', [])
    .controller('TrainingsCtrl', TrainingsCtrl);

function TrainingsCtrl(fire) {
    var vm = this;
    vm.newex = null;

    vm.addNewEx = function() {
        if (vm.newex) {
            fire.addNewEx(vm.newex);
        }
    };

    fire.getAllExercises().then(function(_d) {
        vm.exslist = _d;
    });

    fire.getProgram().then(function(_d) {
        vm.program = _d;
    });
}
