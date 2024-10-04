import { api } from '../api'

export class BaseRepository<T> {
  constructor(private endpoint: string) {}

  getAll(offset = 0, limit = 10): Promise<T[]> {
    return api<T[]>(this.endpoint, { query: { offset, limit } })
  }

  get(id: number): Promise<T> {
    return api<T>(`${this.endpoint}/${id}`)
  }

  create(data: T): Promise<T> {
    return api<T>(this.endpoint, { method: 'POST', body: JSON.stringify(data) })
  }

  update(id: number, data: Partial<T>): Promise<T> {
    return api<T>(`${this.endpoint}/${id}`, { method: 'PATCH', body: JSON.stringify(data) })
  }

  destroy(id: number): Promise<void> {
    return api<void>(`${this.endpoint}/${id}`, { method: 'DELETE' })
  }
}
