const {Company, Job, sequelize} = require('../models/index.js')
const { Op } = require("sequelize");

class CompanyController{
    static async readAllCompany(req,res,next){
        try {
            let option = {}
            if(req.query.search){
                option={name:{
                    [Op.iLike]: `${req.query.search}%`
                }}
            }
            const companies = await Company.findAll({where:option, order: [['id', 'DESC']]})
            res.status(200).json(
                companies
            )
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }

    static async deleteCompany(req,res,next){
        const t = await sequelize.transaction();
        try {
            const{id} = req.params
            const foundCompany = await Company.findOne({where:{id}})
            if(!foundCompany){
                throw({
                    type:"known",
                    code:404,
                    message:"Company to be deleted is not found"
                })
            }
            await Company.destroy({where:{id}},{transaction:t})
            await Job.destroy({where:{companyId:id}},{transaction:t})
            await t.commit()
            res.status(200).json({
                message:"Company success to be deleted"
            })
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }

    static async createCompany(req,res,next){
        try {
            if(!req.body.name){
                throw ({
                    type: "known",
                    code: 400,
                    message: "Name is required"
                })
            }
            if(!req.body.companyLogo){
                throw ({
                    type: "known",
                    code: 400,
                    message: "Company logo is required"
                })
            }
            if(!req.body.location){
                throw ({
                    type: "known",
                    code: 400,
                    message: "Location is required"
                })
            }
            if(!req.body.description){
                throw ({
                    type: "known",
                    code: 400,
                    message: "Description is required"
                })
            }
            const{name,description,companyLogo,location,email} = req.body
            const company = await Company.create({name,description,companyLogo,location,email})
            res.status(201).json(company)
        } catch (error) {
            next(error)
        }
    }
    
}

module.exports = {CompanyController}