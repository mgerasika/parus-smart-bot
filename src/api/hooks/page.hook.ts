import { ENV } from "../../constants/env.constant";
import { ICollection, createCollection } from "../../utils/collection";
import { IQueryResult, useQueryAsync } from "../../utils/use-query.utils";
import { IArticleDto } from "../model/article.dto";
import { createPageDto } from "../model/page.dto";

const useGetPagesAsync = async (): Promise<
  IQueryResult<ICollection<IArticleDto>>
> => {
  const res = await useQueryAsync({
    url: `${ENV.STRAPI_URL}api/pages?token=${ENV.STRAPI_TOKEN}`,
  });
  return {
    ...res,
    data: res.data
      ? createCollection(
          res.data.data.map((article: any) => createPageDto(article)) || []
        )
      : undefined,
  };
};

export const page = {
  useGetPagesAsync,
};
