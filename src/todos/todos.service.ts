import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todos } from './entity/todos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
    constructor(@InjectRepository(Todos) private repo: Repository<Todos>) {}

    create(body: any){
        const todo = this.repo.create(body);
        return this.repo.save(todo);
    }

    find(){
        return this.repo.find();
    }

    findOne(id: string){
        if(!id) return null;
        return this.repo.findOneBy({id: parseInt(id)});
    }

    async update(id: string,body: any){
        const todo = await this.repo.findOneBy({id: parseInt(id)});
        if(!todo){
            throw new NotFoundException('Todo not found');
        }
        if(body.todo){
            todo.todo = body.todo;
        }
        if(body.description){
            todo.description = body.description;
        }
        if(body.isCompleted){
            todo.isCompleted = body.isCompleted;
        }

        return this.repo.save({...todo});
    }
}
