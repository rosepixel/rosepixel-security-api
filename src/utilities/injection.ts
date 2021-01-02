const INJECTION = {
    IRedisService: Symbol.for("IRedisService"),

    IUserAppService: Symbol.for("IUserAppService"),
    IUserService: Symbol.for("IUserService"),
    IUserRepository: Symbol.for("IUserRepository")
};

export { INJECTION };