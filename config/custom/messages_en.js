module.exports.messages_en = {
    Default :{
        Save: {
            Success: "Saved successfully",
            Failure: "Save failed"
        },
        Update: {
            Success: "Updated successfully",
            Failure: "Update failed",
            IdRequired : "Id property is required for any update"
        },
        Read: {
            Success: "Record(s) retrived successfully",
            Failure: "Record(s) retrieval failure"
        },
        Delete: {
            Success: "Deleted successfully",
            Failure: "Delete failed"
        },
        NotFound: "Record not exists",
        API: {
            MethodNotSupported: "API does not support the current HTTP method"
        }
    },
    Account :
    {
        Session_Expired: "Session has been expired.",
        Signup_Success : "User registered successfully",
        Invalid_Credentials: "The email or password you have entered is incorrect.",
        Email_Already_Registered: "This Email is already registered.",
        Authentication_Success: "Authentication Success",
        User_Not_Exists: "This Email is not registered with us.",
        Un_Authorized_Access: "Unauthorized access",
        Password:{
            Incorrect: "Incorrect Password",
            IncorrectOld: "Incorrect old Password",
            New_Old_Matched: "New password and old password cannot be the same",
            MaxLength: "Password length should be atleast {0} characters",
            MinLength: "Password length should not exceed {0} characters",
            Expired: "Password has been expired",
            Matched_From_History: "New Password cannot be the same from last {0} password(s)",
            Matched_With_UserName: "Password should not contain or match with Username",
            Changed_Success: "Password changed successfully.",
            SentToEmail : "Your password has been sent to the registered email id."
        }
    },
    Document :
    {
        InputFileNotExist : "No inputs file(s) provided",
        Reterived_Success : "File reterived successfully",
        Upload_Success : "File uploaded successfully",
        Update_Success : "MetaData updated successfully",
        Delete_Success : "File deleted successfully"
    }   
};