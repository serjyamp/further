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

    vm.removeExFromProgram = function(day, exercise) {
        fire.removeExFromProgram(day, exercise);
    };

    fire.getAllExercises().then(function(_d) {
        vm.exslist = _d;
    });

    fire.getProgram().then(function(_d) {
        vm.program = _d;
    });
}
