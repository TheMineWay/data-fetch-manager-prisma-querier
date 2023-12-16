import { DataFetchEntryObject } from "data-fetch-manager-entry-service/dist/types/data-fetch-entry-object.type";
import { generateWhereFromDataEntry } from "./generate-where-from-data-entry";
import { DataModelDefinition } from "data-fetch-manager-entry-service/dist/definition/data-model-definition";

type Options = {
  where?: object;
};

export async function generateQueryFromDataEntry<T extends object>(
  entryObject: DataFetchEntryObject<T>,
  modelDefinition: DataModelDefinition<T>,
  options?: Options
) {
  return {
    where: await generateWhereFromDataEntry(
      entryObject,
      modelDefinition,
      options?.where
    ),
    skip: entryObject.offset,
    take: entryObject.limit,
    orderBy: entryObject.sort?.map(([key, mode]) => ({
      [key]: mode,
    })),
  };
}
