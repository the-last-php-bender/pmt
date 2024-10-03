import jwt from 'jsonwebtoken';
class tokenizer{
   static  generateToken (public_key,email){
        const token =  jwt.sign(
          { public_key: public_key, email:email},
          process.env.JWT_SECRET,
          { expiresIn: '30d' }
        );
        if(token){
          return token
        }else{
          return "No token generated";
        }
      }
}

export  default tokenizer

