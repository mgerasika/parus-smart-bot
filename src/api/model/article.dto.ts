import dayjs from 'dayjs';
export interface IArticleDto {
    id: string;
    title: string;
    content: string;
    date: string;
    dateObj: Date;
}
export const createArticleDto = (item: any): IArticleDto => {
    return {
        id: item.id,
        title: item.attributes.title,
        content: item.attributes.content,
        date: item.attributes.date,
        dateObj: dayjs(item.attributes.date).toDate(),
    };
};
