import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IPerson {
  name: string
};

interface ITodoItem {
  id:number;
  description: string;
  assignedTo?: string;
  done?: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  public people: IPerson[] = [];
  public todos: ITodoItem[] = [];

  public description: string = "";
  public selectedPerson: string = "Nobody";
  public done: boolean = false;

  public doneFilter: string = "All";
  public personFilter: IPerson;


  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.fetchTodos();
    this.fetchPeople();
  }

  private async fetchTodos(){
    this.todos = await this.httpClient.get<ITodoItem[]>("http://localhost:8080/api/todos").toPromise();
    
  }

  private async fetchPeople(){
    this.people = await this.httpClient.get<IPerson[]>("http://localhost:8080/api/people").toPromise();
  }

  private async createTodo(){
    let idCounter = this.todos.length;
    let todo:ITodoItem = {
      id: idCounter,
      description: this.description,
      assignedTo: this.selectedPerson,
      done: this.done
    }

    await this.httpClient.post<ITodoItem>("http://localhost:8080/api/todos", todo).toPromise();
    this.fetchTodos();
  }

  private async deleteTodo(){
    //Doesn't work at the moment
  }
}
