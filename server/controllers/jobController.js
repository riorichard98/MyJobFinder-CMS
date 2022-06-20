const { skillFilter } = require('../helpers/skillFilter.js')
const { Company, Job, User, Skill, JobSkill, sequelize } = require('../models/index.js')
const { Op } = require("sequelize");
const { commaCounter } = require('../helpers/commaCounter.js');

class JobController {
    static async readAllJob(req, res, next) {
        try {
            let option = {}
            if (req.query.search) {
                option = {
                    title: {
                        [Op.iLike]: `${req.query.search}%`
                    }
                }
            }
            const jobs = await Job.findAll({
                where: option,
                include: [
                    {
                        model: Skill
                    },
                    {
                        model: Company
                    },
                    {
                        model: User
                    }
                ],
                order: [['id', 'DESC']]
            })
            res.status(200).json(
                jobs
            )
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async deleteJob(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const { id } = req.params
            const foundJob = await Job.findOne({ where: { id } })
            if (!foundJob) {
                throw ({
                    type: "known",
                    code: 404,
                    message: "Job to be deleted is not found"
                })
            }
            await JobSkill.destroy({ where: { jobId: id } }, { transaction: t })
            await Job.destroy({ where: { id } }, { transaction: t })
            await t.commit()
            res.status(200).json({
                message: "Job success to be deleted"
            })
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }

    static async createJob(req, res, next) {
        const t = await sequelize.transaction();
        try {
            if (!req.body.title) {
                throw ({
                    type: "known",
                    code: 400,
                    message: "Title is required"
                })
            }
            if (!req.body.description) {
                throw ({
                    type: "known",
                    code: 400,
                    message: "Description is required"
                })
            }
            if (!req.body.jobType) {
                throw ({
                    type: "known",
                    code: 400,
                    message: "Type of job is required"
                })
            }
            if (!req.body.companyId) {
                throw ({
                    type: "known",
                    code: 400,
                    message: "Company for job is required"
                })
            }
            if (!req.body.skills) {
                throw ({
                    type: "known",
                    code: 400,
                    message: "Skills for job is required"
                })
            }
            if (!req.body.levels) {
                throw ({
                    type: "known",
                    code: 400,
                    message: "Skill levels for job is required"
                })
            }
            if (commaCounter(req.body.skills) !== commaCounter(req.body.levels)) {
                throw ({
                    type: "known",
                    code: 400,
                    message: "Skill must have level or otherwise"
                })
            }
            const { authorId } = req.loggedIn
            const { title, description, companyId, jobType } = req.body
            const job = await Job.create({ title, description, companyId, jobType, authorId }
                , { transaction: t })
            let { skills, levels } = req.body
            skills = skills.split(',')
            levels = levels.split(',')
            let arrOfSkills = []
            for (let i = 0; i < skills.length; i++) {
                arrOfSkills.push({ name: skills[i], level: levels[i] })
            }
            const foundSkills = await Skill.findAll({
                where: {
                    [Op.or]: arrOfSkills
                }
            })
            if (!foundSkills.length) {
                await Skill.bulkCreate(arrOfSkills, { transaction: t })
                const skillsCreated = await Skill.findAll({
                    where: {
                        [Op.or]: arrOfSkills
                    },
                    transaction: t
                }
                )
                // console.log(skillsCreated,'<<<<<,');
                if (!skillsCreated.length) {
                    throw new Error('failed')
                }
                let arrJobSkills = []
                for (let i = 0; i < skillsCreated.length; i++) {
                    arrJobSkills.push({
                        jobId: job.id,
                        skillId: skillsCreated[i].id
                    })
                }
                await JobSkill.bulkCreate(arrJobSkills, { transaction: t })
                await t.commit()
                const job2 = await Job.findOne({
                    where: { title, description, companyId, jobType, authorId },
                    include: [
                        {
                            model: Skill
                        },
                        {
                            model: Company
                        },
                        {
                            model: User
                        }
                    ]
                })
                res.status(201).json(job2)
            } else {
                const newArrOfSkills = skillFilter(arrOfSkills, foundSkills)
                await Skill.bulkCreate(newArrOfSkills, { transaction: t })
                const skillsCreated = await Skill.findAll({
                    where: {
                        [Op.or]: newArrOfSkills
                    },
                    transaction: t
                }
                )
                const arrJobSkills = []
                for (let i = 0; i < skillsCreated.length; i++) {
                    arrJobSkills.push({
                        jobId: job.id,
                        skillId: skillsCreated[i].id
                    })
                }
                for (let j = 0; j < foundSkills.length; j++) {
                    arrJobSkills.push({
                        jobId: job.id,
                        skillId: foundSkills[j].id
                    })
                }
                await JobSkill.bulkCreate(arrJobSkills, { transaction: t })
                await t.commit()
                const job2 = await Job.findOne({
                    where: { title, description, companyId, jobType, authorId },
                    include: [
                        {
                            model: Skill
                        },
                        {
                            model: Company
                        },
                        {
                            model: User
                        }
                    ]
                })
                res.status(201).json(job2)
            }
        } catch (error) {
            console.log(error);
            await t.rollback()
            next(error)
        }
    }

    static async updateJob(req, res, next) {
        const t = await sequelize.transaction();
        try {
            if (!req.body.title) {
                throw ({
                    type: "known",
                    code: 400,
                    message: "Title is required"
                })
            }
            if (!req.body.description) {
                throw ({
                    type: "known",
                    code: 400,
                    message: "Description is required"
                })
            }
            if (!req.body.jobType) {
                throw ({
                    type: "known",
                    code: 400,
                    message: "Type of job is required"
                })
            }
            if (!req.body.companyId) {
                throw ({
                    type: "known",
                    code: 400,
                    message: "Company for job is required"
                })
            }
            if (!req.body.skills) {
                throw ({
                    type: "known",
                    code: 400,
                    message: "Skills for job is required"
                })
            }
            if (!req.body.levels) {
                throw ({
                    type: "known",
                    code: 400,
                    message: "Skill levels for job is required"
                })
            }
            if (commaCounter(req.body.skills) !== commaCounter(req.body.levels)) {
                throw ({
                    type: "known",
                    code: 400,
                    message: "Skill must have level or otherwise"
                })
            }
            const { title, description, companyId, jobType } = req.body
            await Job.update({ title, description, companyId, jobType },
                {
                    where:
                    {
                        id: req.params.id
                    }
                }
                , { transaction: t })
            await JobSkill.destroy({ where: { jobId: req.params.id } }, { transaction: t })
            let { skills, levels } = req.body
            skills = skills.split(',')
            levels = levels.split(',')
            let arrOfSkills = []
            for (let i = 0; i < skills.length; i++) {
                arrOfSkills.push({ name: skills[i], level: levels[i] })
            }
            const foundSkills = await Skill.findAll({
                where: {
                    [Op.or]: arrOfSkills
                }
            })
            if (!foundSkills.length) {
                await Skill.bulkCreate(arrOfSkills, { transaction: t })
                const skillsCreated = await Skill.findAll({
                    where: {
                        [Op.or]: arrOfSkills
                    },
                    transaction: t
                })
                console.log(arrOfSkills);
                let arrJobSkills = []
                for (let i = 0; i < skillsCreated.length; i++) {
                    arrJobSkills.push({
                        jobId: +req.params.id,
                        skillId: skillsCreated[i].id
                    })
                }
                await JobSkill.bulkCreate(arrJobSkills, { transaction: t })
                await t.commit()
                const job2 = await Job.findOne({
                    where: {
                        id: req.params.id
                    },
                    include: [
                        {
                            model: Skill
                        },
                        {
                            model: Company
                        },
                        {
                            model: User
                        }
                    ]
                })
                res.status(201).json(job2)
            } else {
                const newArrOfSkills = skillFilter(arrOfSkills, foundSkills)
                await Skill.bulkCreate(newArrOfSkills, { transaction: t })
                const skillsCreated = await Skill.findAll({
                    where: {
                        [Op.or]: newArrOfSkills
                    },
                    transaction: t
                }
                )
                const arrJobSkills = []
                for (let i = 0; i < skillsCreated.length; i++) {
                    arrJobSkills.push({
                        jobId: +req.params.id,
                        skillId: skillsCreated[i].id
                    })
                }
                for (let j = 0; j < foundSkills.length; j++) {
                    arrJobSkills.push({
                        jobId: +req.params.id,
                        skillId: foundSkills[j].id
                    })
                }
                await JobSkill.bulkCreate(arrJobSkills, { transaction: t })
                await t.commit()
                const job2 = await Job.findOne({
                    where: {
                        id: req.params.id
                    },
                    include: [
                        {
                            model: Skill
                        },
                        {
                            model: Company
                        },
                        {
                            model: User
                        }
                    ]
                })
                res.status(201).json(job2)
            }
        } catch (error) {
            console.log(error);
            await t.rollback()
            next(error)
        }
    }

    static async findOneJob(req, res, next) {
        try {
            const { id } = req.params
            const job = await Job.findOne({
                where: { id },
                include: [
                    {
                        model: Skill
                    },
                    {
                        model: Company
                    },
                    {
                        model: User
                    }
                ]
            })
            if (!job) {
                throw ({
                    type: "known",
                    code: 404,
                    message: "Food not found"
                })
            }
            res.status(200).json(job)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = { JobController }