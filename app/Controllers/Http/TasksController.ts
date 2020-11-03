 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import Task from 'App/Models/Task'
 import {schema, rules} from '@ioc:Adonis/Core/Validator'
 

export default class TasksController {
    /**
     * name
     */
    public async index( {view} :HttpContextContract) {
       const tasks = await Task.all()
        return view.render('tasks/index', {tasks})
    }

 
    public async store({request, response, session}: HttpContextContract) {
        const validationSchema = schema.create({
            title: schema.string({trim:true},[
                rules.maxLength(255),
                rules.minLength(7)
            ])
        })

        const validatedData = await request.validate({
            schema:validationSchema,
            messages:{
                'title.required': 'Title is required',
                'title.maxLength':'Task text cannot exceed 255 characters',
                'title.minLength': 'Task text cannot be less than 7 characters'
            }
        })
        Task.create({
            title: validatedData.title
        })
        session.flash('notification','Task has been added succesifully')
        response.redirect('back')
    }


    public async completeTask({request, response, session, params}: HttpContextContract) {
        const task = await Task.findOrFail(params.id);
        task.isComplete = !!request.input('completed')
        await task.save()

        session.flash('notification','Task has been updated')
        response.redirect('back')
    }

    public async deleteTask({request, response, session, params} :HttpContextContract) {
        const task = await Task.findOrFail(params.id);
        await task.delete()
        session.flash('notification','Task has been deleted')
        response.redirect('back')
    } 
}
 