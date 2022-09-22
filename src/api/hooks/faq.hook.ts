import { ENV } from "../../constants/env.constant";
import { ICollection, createCollection } from "../../utils/collection";
import { IQueryResult, useQueryAsync } from "../../utils/use-query.utils";
import { IArticleDto } from "../model/article.dto";
import { createFaqDto } from "../model/faq.dto";

const useGetFaqsAsync = async (): Promise<
  IQueryResult<ICollection<IArticleDto>>
> => {
  const res = await useQueryAsync({
    url: `${ENV.STRAPI_URL}api/faqs?token=${ENV.STRAPI_TOKEN}`,
  });
  return {
    ...res,
    data: res.data
      ? createCollection(
          res.data.data.map((article: any) => createFaqDto(article)) || []
        )
      : undefined,
  };
};

export const faq = {
  useGetFaqsAsync,
};
