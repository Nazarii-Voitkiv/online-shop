export declare enum EventTypes {
    /**
     *  This only works in the AppModule Constructor
     */
    ConfigLoaded = 0,
    CheckingAuth = 1,
    CheckingAuthFinished = 2,
    CheckingAuthFinishedWithError = 3,
    ConfigLoadingFailed = 4,
    CheckSessionReceived = 5,
    UserDataChanged = 6,
    NewAuthenticationResult = 7,
    TokenExpired = 8,
    IdTokenExpired = 9,
    SilentRenewStarted = 10,
    SilentRenewFailed = 11
}
