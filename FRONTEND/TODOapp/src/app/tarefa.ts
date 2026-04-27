export class Tarefa {
    descricao: string;
    statusRealizada: boolean;
    _id?: string;
    constructor(_descricao: string, _statusRealizada: boolean) {
        this.descricao = _descricao;
        this.statusRealizada = _statusRealizada;
    }
}