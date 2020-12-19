const single = (resource, authUser) => ({
    message: resource.message,
    user: resource.user,
    role: resource.role
})

const multiple = (resource, authUser) =>
    resource.map((resource) => single(resource));

module.exports = {
    single,
    multiple
}