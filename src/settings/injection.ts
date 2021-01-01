const INJECTION = {
    IUserAppService: Symbol.for("IUserAppService"),
    IUserService: Symbol.for("IUserService"),
    IUserRepository: Symbol.for("IUserRepository")
};

export { INJECTION };