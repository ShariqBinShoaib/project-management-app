import { Repository } from "typeorm";

export class BaseRepository<Entity> extends Repository<Entity> {
  async getAll(limit?: number, offset?: number) {
    type FetchedData = { data: Entity[]; count: number };

    const fetchedData: FetchedData = {
      data: [],
      count: 0,
    };

    if (limit !== undefined && offset !== undefined) {
      const [result, total] = await this.findAndCount({
        skip: offset,
        take: limit,
      });
      fetchedData.data = result;
      fetchedData.count = total;
    } else {
      const [result, total] = await this.findAndCount();
      fetchedData.data = result;
      fetchedData.count = total;
    }

    return fetchedData;
  }
}
