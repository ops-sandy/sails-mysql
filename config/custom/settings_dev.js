module.exports.settings_dev = {
    Password: {
        MinLength: 8,
        MaxLength: 50,
        Expiry_Days: 60,
        History_Count: 6
    },
    Security: {
        JwtSecurityKey: "Power@1234",
        JwtTokenExpiryTime: 10800,
        SaltRounds : 10
    },
    Mailgun: {
        API_Key: "key-617ak81sjexzrakhblclwlyhe5sxh-u0",
        Api_Url: "https://api.mailgun.net/v2",
        Domain: "mg.vmokshagroup.com"
    },
    Email: {
        From: "IonHaccp <no-reply@IonHaccp.com>",
        Subject_ForgotPassword: "Forgot Password",
        Subject_EmailVerification: "Email Verification",
        TemplateUrl_ForgotPassword: "emailTemplates/forgotPassword",
        Verification_UserName: "User"
    },
    Minio: {
        AccessKey : 'AKIAIPJ7YNRIVZ7OG7HA',
        SecretKey : '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',
        Port : 9000,
        EndPoint : '54.255.190.134',
        Secure : false,
        BucketName : 'ionhaccp.dev',
        FileLinkExpiryTime : 86400
    },
    AWS: {
        Url: "https://s3-us-west-2.amazonaws.com/",
        BucketName: "ionhaccp-server-dev",
        AccessKey: "AKIAISJTEEF2NDM5DYWQ",
        SecretKey: "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",
        BucketRegion: "us-west-2",
    },
    App: {
        DocumentProvider: 'Minio',
        CompanyCode : "VM001"
    }
};