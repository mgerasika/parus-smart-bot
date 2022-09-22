import { ENV } from "../../constants/env.constant";
import { ICollection, createCollection } from "../../utils/collection";
import { IQueryResult, useQueryAsync } from "../../utils/use-query.utils";
import { IArticleDto, createArticleDto } from "../model/article.dto";

const useGetArticlesAsync = async (): Promise<
  IQueryResult<ICollection<IArticleDto>>
> => {
  const res = await useQueryAsync({
    url: `${ENV.STRAPI_URL}api/articles?token=${ENV.STRAPI_TOKEN}`,
  });
  return {
    ...res,
    data: res.data
      ? createCollection(
          res.data.data.map((article: any) => createArticleDto(article)) || []
        )
      : undefined,
  };
};

export const article = {
  useGetArticlesAsync,
};
