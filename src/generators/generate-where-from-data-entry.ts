import { DataModelDefinition } from "data-fetch-manager-entry-service/dist/definition/data-model-definition";
import type { DataFetchEntryObject } from "data-fetch-manager-entry-service/dist/types/data-fetch-entry-object.type";

export async function generateWhereFromDataEntry<T extends object>(
  { filters }: DataFetchEntryObject<T>,
  modelDefinition: DataModelDefinition<T>,
  where?: object
) {
  // Process search
  const searchFilter = [];
  if (filters?.search) {
    for (const key of modelDefinition.getSearchableKeys()) {
      searchFilter.push({ [key.toString()]: { contains: filters.search } });
    }
  }

  return {
    AND: [
      {
        OR: [searchFilter],
      },
      where && Object.keys(where).length > 0 ? where : null,
    ].filter((v) => !!v),
  };
}
