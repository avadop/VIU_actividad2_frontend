export class Paginador {
  constructor(
    public pageNumber: number,
    public pageIndex: number,
    public pageSize: number,
    public totalItems: number
  ) {}
}
