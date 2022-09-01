import database from "../index.js"
import createCompany from "./createCompany.js"
import createDepartment from "./createDepartment.js"
import createUserDepartment from "./createUserDepartment.js"
import populateGroups from "./populateGroups.js"
import populateSectors from "./populateSectors.js"
import populateUsers from "./populateUsers.js"

(async () => {

    try {
        await database.sync()
        const users = await populateUsers()
        const groups = await populateGroups()
        const sectors = await populateSectors()
        
        createCompany(sectors[0].uuid, groups[0].uuid, "Skina Lanches")
        createCompany(sectors[0].uuid, groups[0].uuid, "Gela Guela")

        createCompany(sectors[5].uuid, groups[1].uuid, "Boacharria")
        createCompany(sectors[5].uuid, groups[1].uuid, "Offcina")

        const nerdLab = await createCompany(sectors[6].uuid, groups[2].uuid, "Nerd lab", true)
        createCompany(sectors[6].uuid, groups[2].uuid, "Chipset manutenções")


        const ti = await createDepartment("TI", "Departamento de TI", nerdLab.uuid, users[1].uuid)
        const rh = await createDepartment("RH", "Recrutamento e seleção", nerdLab.uuid, users[2].uuid)

        for(let i = 1; i < users.length; i++) {
            if(i < 4){
                createUserDepartment(users[i].uuid, ti.uuid)
            } else {
                createUserDepartment(users[i].uuid, rh.uuid)
            }
        }

    } catch (error) {
        console.log(error)
    }
})();