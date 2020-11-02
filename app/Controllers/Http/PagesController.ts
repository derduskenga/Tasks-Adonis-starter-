 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PagesController {

    public home({view}: HttpContextContract) {
        return view.render('tasks/index')
    }
}
