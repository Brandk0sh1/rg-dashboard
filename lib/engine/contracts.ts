export interface DataSource<TQuery, TResult> {
  execute(query: TQuery): Promise<TResult>;
}
