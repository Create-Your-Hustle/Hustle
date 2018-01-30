myApp.filter('skill', function(){
    return function (array, skills) {
        var skillList = {
            skills: skills,
            out: []
        };
        angular.forEach(array, function (value, key) {
            console.log(value.skill_list)
            let check = value.skill_list;
            if(str.match(skills))
            // if (this.array[value.skill_list] === true) {
            //     this.out.push(value);
            // }
        }, skillList);
        return skillList.out;
    };
});