export class INJECTION {
    public static readonly IRedisContext = Symbol.for("IRedisContext");
    public static readonly ISecurityContext = Symbol.for("ISecurityContext");

    public static readonly IUsersAppService = Symbol.for("IUsersAppService");
    public static readonly IUsersService = Symbol.for("IUsersService");
    public static readonly IUsersRepository = Symbol.for("IUsersRepository");
};