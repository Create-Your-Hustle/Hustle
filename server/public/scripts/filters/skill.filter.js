myApp.filter('skill', function(){
    return function (resultArray, skills) {
        const skillList = {
            skills: skills,
            out: []
        };

        const skillArray = resultArray[i].skill_list

        for (let i = 0; i < resultArray.length; i++) {
            for (let j = 0; j < skills.length; j++) {
                const skill = skills[j];
                let isMatch = skillArray.includes(skills[0])
            }
        }

        
        // angular.forEach(array, function (value, key) {
        //     console.log(value.skill_list)
        //     let check = value.skill_list;
        // //     if(str.match(skills)
        // //     // if (this.array[value.skill_list] === true) {
        // //     //     this.out.push(value);
        // //     // }
        // // }, skillList);
        return skillList.out;
    };
});