import { Component, signal, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarefa } from "./tarefa";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TODOapp');

  arrayDeTarefas: Tarefa[] = [];
  apiURL: string;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.apiURL = 'https://todolist-frameworks-production.up.railway.app';
    if (isPlatformBrowser(this.platformId)) {
      this.READ_tarefas();
    }
  }

  CREATE_tarefa(descricaoNovaTarefa: string) {
    const novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa).subscribe({
      next: (tarefaSalva) => {
        this.arrayDeTarefas = [...this.arrayDeTarefas, tarefaSalva];
      },
      error: erro => console.error('Erro ao criar:', erro)});
  }


  READ_tarefas() {
    this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll?t=${new Date().getTime()}`).subscribe({
      next: resultado => this.arrayDeTarefas = resultado,
      error: erro => console.error('Erro ao ler tarefas:', erro)
    });
  }

  UPDATE_tarefa(tarefaAserModificada: Tarefa){
    const id = tarefaAserModificada._id;
    if (!id) return;

    this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`,
      tarefaAserModificada).subscribe({
        next: (resultado) => {
        this.arrayDeTarefas = this.arrayDeTarefas.map(t => t._id === id ? resultado : t);
      },
      error: erro => console.error('Erro ao atualizar:', erro)
    });
  }

  DELETE_tarefa(tarefaAserRemovida : Tarefa) {
    const id = tarefaAserRemovida._id;
    if (!id) return;

    this.http.delete(`${this.apiURL}/api/delete/${id}`).subscribe({
      next: () => {
        // Filtra a lista removendo apenas a tarefa com o ID deletado
        this.arrayDeTarefas = this.arrayDeTarefas.filter(t => t._id !== id);
      },
      error: erro => console.error('Erro ao remover:', erro)
    });
  } 


}
