import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Company from '../models/company.js'; 
import dotenv from 'dotenv'
dotenv.config();
class AuthController {
    async login(req, res, next) {
        try {
            const { email, password, role } = req.body;
            if (!email || !password || !role) {
                return res.status(400).json({ message: 'Email, password, and role are required' });
            }

            if (role === 'company' || role === 'superadmin') {
                const company = await Company.findOne({cEmail: email } ).select('+password');
                if (!company || !(await company.comparePassword(password))) {
                    return res.status(401).json({ message: 'Invalid email or password' });
                }
                const token = jwt.sign({ id: company.id, role: 'company' }, process.env.SECRET_KEY, { expiresIn: '30d' });
                return res.status(200).json({ token });
            } else if (role === 'user') {
                const user = await User.findOne({email}).select('+password');
                if (!user || !(await user.comparePassword(password))) {
                    return res.status(401).json({ message: 'Invalid email or password' });
                }
                const token = jwt.sign({ id: user.id, role: 'user' }, process.env.SECRET_KEY, { expiresIn: '30d' });
                return res.status(200).json({ token });
            }
            return res.status(400).json({ message: 'Invalid role specified' });
        } catch (error) {
            next(error);
        }
    }
    async createSuperadmin(req,res){
        try{
       Company.create({companyName:process.env.SUPER_ADMIN_NAME,cEmail:process.env.SUPER_ADMIN_EMAIL,cPassword:process.env.SUPER_ADMIN_PASSWORD,role:'superadmin'})
                return res.status(201).json({
                    message:'superadmin created successfully',
                })
        }catch(err){
            return res.status(400).json({ message: err.message });
        }
        
    }
}
export default new AuthController();
