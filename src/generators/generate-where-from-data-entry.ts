import { DataModelDefinition } from "data-fetch-manager-entry-service/dist/definition/data-model-definition";
import type { DataFetchEntryObject } from "data-fetch-manager-entry-service/dist/types/data-fetch-entry-object.type";

export async function generateWhereFromDataEntry<T extends object>(
  { filters }: DataFetchEntryObject<T>,
  modelDefinition: DataModelDefinition<T>,
  where?: object
) {
  // Process search
  const searchFilter: { [k: string]: { contains: string } }[] = [];

  const searchText = filters?.search?.trim();
  if (searchText) {
    for (const key of modelDefinition.getSearchableKeys()) {
      searchFilter.push({ [key.toString()]: { contains: searchText } });
    }
  }

  return {
    AND: [
      searchFilter.length > 0
        ? {
            OR: searchFilter,
          }
        : null,
      where && Object.keys(where).length > 0 ? where : null,
    ].filter((v) => !!v),
  };
}
