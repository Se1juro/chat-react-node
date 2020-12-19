const single = (resource, authUser) => ({
    id: resource._id,
    name: resource.name,
    lastname: resource.lastname,
    username: resource.username,
    role: resource.role
})

const multiple = (resource, authUser) =>
    resource.map((resource) => single(resource));

module.exports = {
    single,
    multiple
}