const crypto = require('crypto');
crypto.DEFAULT_ENCODING = 'hex';

const getRandomString = () => {
    return crypto.randomBytes(Math.ceil(16/2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0,16);
}

const genratePassword = (password)=> {
    try{
        let salt = getRandomString();
        const hashPassword = crypto.pbkdf2Sync(password, 'salt', 100, 64, 'sha512');
        return hashPassword;
    }catch(e){
        debugger;
    }
    
} 

const validPassword = (dbPassword,password)=> {
    try{
        const hashPassword = crypto.pbkdf2Sync(password, 'salt', 100, 64, 'sha512');
        return dbPassword === hashPassword;
    }catch(e){
        debugger;
    }
}

// const gpass = genratePassword("123456").then((res)=>{
//     console.log(res);
//     console.log(validPassword(res.hashPassword,"123456",res.salt));
// });
// console.log(validPassword(gpass.hashPassword,"123456",gpass.salt));
//console.log(validPassword(gpass.hashPassword,"123456",gpass.salt));

module.exports = {
    genratePassword,
    validPassword
};