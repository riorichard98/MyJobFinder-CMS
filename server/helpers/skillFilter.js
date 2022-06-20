const skillFilter = (skills, skillsFound) => {
    const result = []

    for (let i = 0; i < skills.length; i++) {
        let found = false
        for (let j = 0; j < skillsFound.length; j++) {
            if (skills[i].name === skillsFound[j].name && skills[i].level === skillsFound[j].level) {
                found = true
                break
            }
        }
        if (!found) {
            result.push(skills[i])
        }
    }
    return result
}

module.exports ={skillFilter}