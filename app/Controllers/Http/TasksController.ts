 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import Task from 'App/Models/Task'

export default class TasksController {
    /**
     * name
     */
    public index( {view} :HttpContextContract) {
        return view.render('tasks/index')
    }

    /**
     * name
     */
    public async store({request, response}: HttpContextContract) {
        Task.create({
            title: request.input('title')
        })

        response.redirect('back')
    }
}
