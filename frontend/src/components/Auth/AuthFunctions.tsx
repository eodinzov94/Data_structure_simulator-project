// -----ERRORS-----
//password:
const PASSWORD_LENGTH= "The password must be at least 8 characters long"
const PASSWORD_CHARACTRES = "The password must contain an uppercase letter, a lowercase letter, a number and a special character"
const CONFIRM_PASSWORD = "The password and password verification must be equal"


export const CheckEmail = (email:string)=>{
    //email length need to be at least 6 and "@" need to be in the email.
    if (email.trim().length<6 || email.search('@')<0){
        return false;
    }
    return true;
} 


export const CheckPassword = (password:string) =>{
    const Symbols =/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/; // regex for allowed symbols
    if (password.trim().length>=8 &&  /[a-z]/.test(password) &&  /[A-Z]/.test(password) && /[0-9]/.test(password)
        && Symbols.test(password)){
        return true;
    }
    return false;
}

export const CheckConfirmPassword = (password:string, ConfirmPassword:string)=>{
    return password===ConfirmPassword;
}

export const CheckAge = (age:Number)=>{
    return age>0 && age<=120;
}

export const CheckName = (name:string)=>{
    var letters = /^[A-Za-z]+$/;
    if(name.match(letters))
       return true;
    return false;
}