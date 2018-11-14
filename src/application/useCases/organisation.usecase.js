class OrganizationAction {
    constructor(){
    }

    newOrganization(name,location){
        console.log(name)
    }

    editOrganizationsAddress(location){
        console.log(address)
    }
    editOrganizationsName(name){
        console.log(name)
    }

    deleteOrganization(name){
        console.log("deleted")
    }

    // Add a user to an organization
    addUserToOrganization(user,organization) {
        console.log("add " + user + " to " + organization)
    }

    // Remove a user to an organization
    removeUserFromOrganization(user) {
        console.log("removed " + user + " from its organization")
    }
}

